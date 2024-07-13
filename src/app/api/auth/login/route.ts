import { findUser } from "@/lib/db/queries";
import { Jwt } from "@/lib/jwt";
import { UserLoginSchema } from "@/lib/schema/user-schema";

const ERRORS = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  BAD_REQUEST: "BAD_REQUEST",
};

export async function POST(request: Request) {
  try {
    const json = UserLoginSchema.validate(await request.json());

    if (!json.success) {
      throw ERRORS.BAD_REQUEST;
    }

    const { email, password } = json.data;
    const result = await findUser({ email });

    if (!result) {
      throw ERRORS.USER_NOT_FOUND;
    }

    if (password !== result.password) {
      throw ERRORS.INVALID_CREDENTIALS;
    }

    // Create JWT token
    const token = Jwt.sign(result.email);

    // if everything is correct
    return Response.json(
      {
        token,
      },
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
