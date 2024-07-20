import { Queries } from "@/lib/db";
import { PostCreateSchema } from "@/lib/schema/post-schema";
import { Session } from "@/lib/session";
import { revalidatePath } from "next/cache";

// Use Authorization header to verify the user
// To accomplish this, we need to import the following:

export async function POST(request: Request) {
  // Pipe A
  const userData = await Session.getSession();
  if (!userData) {
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

  // find user by email
  const { email } = userData;
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

  revalidatePath("/");
  return Response.json(insertResult.value);
}
