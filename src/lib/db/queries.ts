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
  });
  return result;
};
