import { Prisma } from "@prisma/client";
import prisma from "./db";
import { Result } from "../helper";
import { revalidatePath } from "next/cache";

const errorCode = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  POST_NOT_FOUND: "POST_NOT_FOUND",
};

export const insertUser = async (user: Prisma.UserCreateInput) => {
  try {
    const result = await prisma.user.create({
      data: user,
    });
    return Result.success(result);
  } catch (error) {
    return Result.fail(error as Error);
  }
};

export const findUser = async <T extends Prisma.UserSelect>(
  where: Prisma.UserWhereUniqueInput,
  select?: T,
) => {
  try {
    const result = await prisma.user.findUnique({
      where,
      select: select as T,
    });
    if (!result) {
      return Result.fail(new Error(errorCode.USER_NOT_FOUND));
    }
    return Result.success(result);
  } catch (error) {
    return Result.fail(error as Error);
  }
};

export const insertPost = async (post: Prisma.PostCreateInput) => {
  try {
    const result = await prisma.post.create({
      data: {
        ...post,
      },
    });
    return Result.success(result);
  } catch (error) {
    return Result.fail(error as Error);
  }
};

export const selectAllPosts = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const selectPostById = async (id: number) => {
  try {
    // findUnique is used to find a single record by its primary key
    const result = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return Result.fail(new Error(errorCode.POST_NOT_FOUND));
    }
    return Result.success(result);
  } catch (error) {
    return Result.fail(error as Error);
  }
};

export const deletePostById = async (id: number) => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return Result.success(true);
  } catch (error) {
    return Result.fail(error as Error);
  }
};
