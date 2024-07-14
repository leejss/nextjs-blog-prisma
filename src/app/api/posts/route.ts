// import { Jwt } from "@/lib/jwt";
import { PostCreateSchema } from "@/lib/schema/post-schema";

// Use Authorization header to verify the user
// To accomplish this, we need to import the following:

export async function POST(request: Request) {
  const unknownBody = await request.json();

  const parseResult = PostCreateSchema.validate(unknownBody);

  // Get token from authorization header. Format is `Authriozation: Bearer <token>`
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
  const token = authHeader.replace("Bearer ", "");
  // const email = Jwt.verify(token);

  // inset data where email is the email from the token
}
