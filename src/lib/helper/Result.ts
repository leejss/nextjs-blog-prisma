export class Fail<L> {
  readonly error: L;
  readonly _tag: "Fail" = "Fail";
  constructor(value: L) {
    this.error = value;
  }
  isFail(): this is Fail<L> {
    return true;
  }

  isSuccess(): this is Success<never> {
    return false;
  }
}

export class Success<R> {
  readonly value: R;
  readonly _tag: "Success" = "Success";
  constructor(value: R) {
    this.value = value;
  }

  isFail(): this is Fail<never> {
    return false;
  }

  isSuccess(): this is Success<R> {
    return true;
  }
}

export type Result<R, L = never> = Fail<L> | Success<R>;

// Constructors
export const fail = <L>(error: L): Result<never, L> => {
  return new Fail(error);
};
export const success = <R>(value: R): Result<R> => {
  return new Success(value);
};

// Guards
export const isFail = <R, L>(either: Result<R, L>): either is Fail<L> => {
  return either._tag === "Fail";
};
export const isSuccess = <R, L>(either: Result<R, L>): either is Success<R> => {
  return either._tag === "Success";
};
