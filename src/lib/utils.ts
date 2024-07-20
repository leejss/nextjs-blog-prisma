import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Jwt } from "./jwt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type EitherResult<A, E> =
  | {
      type: "error";
      error: E;
    }
  | {
      type: "success";
      data: A;
    };

export function checkAuth(
  req: Request,
): EitherResult<{ email: string }, { message: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return {
      type: "error",
      error: {
        message: "EMPTY_AUTH_HEADER",
      },
    };
  }
  if (!authHeader.startsWith("Bearer ")) {
    return {
      type: "error",
      error: {
        message: "INVALID_AUTH_HEADER",
      },
    };
  }
  const token = authHeader.replace("Bearer ", "");
  const email = Jwt.verify(token);

  return {
    type: "success",
    data: {
      email,
    },
  };
}

export const formatDate = (date: Date | string | number) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
