import { insertUser } from "@/lib/db/queries";
import { Jwt } from "@/lib/jwt";
import { UserCreateSchema } from "@/lib/schema/user-schema";

// get type from prisma client
export async function POST(request: Request) {
  const validationResult = UserCreateSchema.validate(await request.json());

  if (!validationResult.success) {
    return Response.json(
      {
        error: "Invalid input",
      },
      {
        status: 400,
      },
    );
  }
  const result = await insertUser(validationResult.data);
  if (result.isFail()) {
    return Response.json(
      {
        error: "Failed to create user",
      },
      {
        status: 500,
      },
    );
  }

  const token = Jwt.sign(validationResult.data.email);
  return Response.json(
    {
      token,
    },
    {
      status: 201,
    },
  );
}
