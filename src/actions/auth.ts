"use server";

import { findUser } from "@/lib/db/queries";
import { UserLoginSchema } from "@/lib/schema/user-schema";
import { Session } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ERRORS = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  BAD_REQUEST: "BAD_REQUEST",
  UNKOWN_ERROR: "UNKOWN_ERROR",
};

export const loginAction = async (request: { email: string; password: string }) => {
  const validation = UserLoginSchema.validate(request);
  if (!validation.success) {
    throw ERRORS.BAD_REQUEST;
  }
  const { email, password } = validation.data;
  const result = await findUser({ email });
  if (result.isFail()) {
    if (result.error.message === "USER_NOT_FOUND") {
      throw ERRORS.USER_NOT_FOUND;
    }
    throw ERRORS.UNKOWN_ERROR;
  }

  const { value } = result;

  if (password !== value.password) {
    throw ERRORS.INVALID_CREDENTIALS;
  }

  // Create JWT token
  // const token = Jwt.sign(value.email);

  await Session.save({ email });
  return "success";
  try {
  } catch (error) {}
};

const registerAction = async (email: string, password: string, passwordConfirm: string) => {};
