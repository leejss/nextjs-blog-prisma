import { Prisma } from "@prisma/client";
import prisma from "./db";

export const insertUser = async (user: Prisma.UserCreateInput) => {
  const result = await prisma.user.create({
    data: user,
  });
  return result;
};

export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
  const result = await prisma.user.findUnique({
    where,
    include: {
      posts: true,
    },
  });
  return result;
};

export const findPosts = async () => {
  // const result = await prisma.post.findMany({
  //   where,
  // });
  // return result;

  const result = await prisma.post.findMany();
  return result;
};

export const insertPost = async (post: Prisma.PostCreateInput) => {
  const result = await prisma.post.create({
    data: post,
  });
  return result;
};
