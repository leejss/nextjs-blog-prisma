import { findUser } from "@/lib/db/queries";
import { UserLoginSchema } from "@/lib/schema/user-schema";
import { Session } from "@/lib/session";

const ERRORS = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  BAD_REQUEST: "BAD_REQUEST",
  UNKOWN_ERROR: "UNKOWN_ERROR",
};

export async function POST(request: Request) {
  try {
    const validation = UserLoginSchema.validate(await request.json());

    if (!validation.success) {
      throw ERRORS.BAD_REQUEST;
    }

    const { email, password } = validation.data;
    const result = await findUser({ email });

    if (result.isFail()) {
      if (result.error.message === "USER_NOT_FOUND") {
        throw ERRORS.USER_NOT_FOUND;
      }
      throw ERRORS.UNKOWN_ERROR;
    }

    const { value } = result;

    if (password !== value.password) {
      throw ERRORS.INVALID_CREDENTIALS;
    }

    // Create JWT token
    // const token = Jwt.sign(value.email);
    await Session.save({ email });

    // if everything is correct
    return Response.json(
      { email },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error === ERRORS.USER_NOT_FOUND) {
      return Response.json(
        {
          error: ERRORS.USER_NOT_FOUND,
        },
        {
          status: 401,
        },
      );
    }
    if (error === ERRORS.INVALID_CREDENTIALS) {
      return Response.json(
        {
          error: ERRORS.INVALID_CREDENTIALS,
        },
        {
          status: 401,
        },
      );
    }
    if (error === ERRORS.BAD_REQUEST) {
      return Response.json(
        {
          error: ERRORS.BAD_REQUEST,
        },
        {
          status: 400,
        },
      );
    }

    return Response.json(
      {
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}
