import { Prisma } from "@prisma/client";
import prisma from "./db";
import { Result } from "../helper";

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
      return Result.fail(new Error("USER_NOT_FOUND"));
    }
    return Result.success(result);
  } catch (error) {
    return Result.fail(error as Error);
  }
};

export const findPosts = async () => {
  const result = await prisma.post.findMany();
  return result;
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
