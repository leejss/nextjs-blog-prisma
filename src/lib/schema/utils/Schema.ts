import { type AnyZodObject } from "zod";

type ValidationSuccess<A> = {
  success: true;
  data: A;
};
type ValidationFailure<E> = {
  success: false;
  error: E;
};
type ValidationResult<A, E> = ValidationSuccess<A> | ValidationFailure<E>;
export const create = <S extends AnyZodObject>(schema: S) => {
  return {
    _schema: schema,
    validate(value: unknown): ValidationResult<S["_output"], Error> {
      const result = this._schema.safeParse(value);
      if (result.success) {
        return { success: true, data: result.data as S["_output"] };
      }
      return { success: false, error: result.error };
    },
  };
};
