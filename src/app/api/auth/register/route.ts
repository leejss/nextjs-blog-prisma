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
  await insertUser(validationResult.data);
  // Insert user with body data
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
