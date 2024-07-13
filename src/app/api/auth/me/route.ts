import { findUser } from "@/lib/db/queries";
import { checkAuth } from "@/lib/utils";

export async function GET(request: Request) {
  const result = checkAuth(request);
  if (result.type === "error") {
    return new Response(JSON.stringify(result.error), {
      status: 401,
    });
  }
  const { email } = result.data;
  const user = await findUser({ email });

  return new Response(JSON.stringify(user), {
    status: 200,
  });
}
