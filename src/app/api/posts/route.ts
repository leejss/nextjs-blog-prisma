import { Queries } from "@/lib/db";
import { Jwt } from "@/lib/jwt";
import { PostCreateSchema } from "@/lib/schema/post-schema";

// Use Authorization header to verify the user
// To accomplish this, we need to import the following:

export async function POST(request: Request) {
  // Pipe A
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return Response.json(
      {
        error: "UNAUTHORIZED",
      },
      {
        status: 401,
      },
    );
  }

  // Pipe B
  const validation = PostCreateSchema.validate(await request.json());
  if (!validation.success) {
    return Response.json(
      {
        error: "BAD_REQUEST",
      },
      {
        status: 400,
      },
    );
  }

  // if success, save to database
  const token = authHeader.replace("Bearer ", "");
  const email = Jwt.verify(token);

  // find user by email
  const findResult = await Queries.findUser({ email }, { id: true });
  if (findResult.isFail()) {
    return Response.json(
      {
        error: "USER_NOT_FOUND",
      },
      {
        status: 404,
      },
    );
  }
  const { id } = findResult.value;
  const { content, title } = validation.data;
  const insertResult = await Queries.insertPost({
    title,
    content,
    author: { connect: { id } },
  });

  if (insertResult.isFail()) {
    return Response.json(
      {
        error: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      },
    );
  }
  return Response.json(insertResult.value);
}
