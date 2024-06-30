import { z } from "zod";

export const PostCreateSchema = {
  _schema: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),

  validate(value: unknown) {
    return this._schema.safeParse(value);
  },
};
