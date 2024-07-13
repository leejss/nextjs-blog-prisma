import { z } from "zod";
import { Schema } from "./utils";

export const PostCreateSchema = Schema.create(
  z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),
);

export type PostCreateType = z.infer<typeof PostCreateSchema._schema>;
