import { Queries } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function DELETE(request: Request) {
  const pathname = new URL(request.url).pathname; // /api/posts/1
  const id = pathname.split("/").pop(); // 1
  await Queries.deletePostById(Number(id));
  revalidatePath("/");
  return Response.json({ success: true });
}
