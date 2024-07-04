import { insertUser } from "@/lib/db/queries";
import { Jwt } from "@/lib/jwt";
import { UserCreateSchema } from "@/lib/schema/user-schema";

// get type from prisma client
export async function POST(request: Request) {
  const unknownBody = await request.json();
  const userCreateInput = UserCreateSchema.safeParse(unknownBody);

  if (!userCreateInput.success) {
    return Response.json(
      {
        error: "Invalid input",
      },
      {
        status: 400,
      },
    );
  }

  await insertUser(userCreateInput.data);
  // Insert user with body data
  const token = Jwt.sign(userCreateInput.data.email);
  return Response.json(
    {
      token,
    },
    {
      status: 201,
    },
  );
}
