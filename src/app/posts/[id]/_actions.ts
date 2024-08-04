"use server";

import { deletePostById } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

export const deletePostAction = async (prevState: any, formState: FormData) => {
  const postId = formState.get("postId");
  await deletePostById(Number(postId));
  revalidatePath("/");
  return true;
};
