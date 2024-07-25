"use server";

import { deletePostById } from "@/lib/db/queries";

export const deletePostAction = async (prevState: any, formState: FormData) => {
  const postId = formState.get("postId");
  await deletePostById(Number(postId));

  return true;
};
