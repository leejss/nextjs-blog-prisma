import { PostCreateSchema } from "@/lib/schema/post-schema";

// Use Authorization header to verify the user
// To accomplish this, we need to import the following:

export async function POST(request: Request) {
  const unknownBody = await request.json();

  const parseResult = PostCreateSchema.validate(unknownBody);
  if (!parseResult.success) {
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
}
