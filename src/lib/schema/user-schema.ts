import { z } from "zod";

export const UserCreateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserCreateType = z.infer<typeof UserCreateSchema>;

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;
