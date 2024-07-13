import { z } from "zod";
import { Schema } from "./utils";

export const UserCreateSchema = Schema.create(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
);

export type UserCreateType = z.infer<typeof UserCreateSchema._schema>;

export const UserLoginSchema = Schema.create(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
);

export type UserLoginType = z.infer<typeof UserLoginSchema._schema>;
