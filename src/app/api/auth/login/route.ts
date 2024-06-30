import { findUser } from "@/lib/db/queries";
import { UserLoginSchema } from "@/lib/schema/user-schema";

const ERRORS = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  BAD_REQUEST: "BAD_REQUEST",
};

export async function POST(request: Request) {
  const unknownJson = await request.json();
  const json = UserLoginSchema.safeParse(unknownJson);
  if (!json.success) {
    return Response.json(
      {
        error: ERRORS.BAD_REQUEST,
      },
      {
        status: 400,
      },
    );
  }
  const { email, password } = json.data;
  // find user with email
  const result = await findUser({ email });
  // if user not found,
  if (!result) {
    return Response.json(
      {
        error: ERRORS.USER_NOT_FOUND,
      },
      {
        status: 401,
      },
    );
  }

  // if password is incorrect
  if (password !== result.password) {
    return Response.json(
      {
        error: ERRORS.INVALID_CREDENTIALS,
      },
      {
        status: 401,
      },
    );
  }

  // if everything is correct
  return Response.json(
    {
      message: "Logged in",
    },
    {
      status: 200,
    },
  );
}
