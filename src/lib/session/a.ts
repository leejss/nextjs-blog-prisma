import { type User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type UserData = Omit<User, "password">;
type SessionPayload = UserData & {
  iat: number;
  exp: number;
};

export const UserDataSession = {
  cookieName: "session",
  get key() {
    return new TextEncoder().encode("secret");
  },

  sign(payload: UserData) {
    const jwt = new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30sec")
      .sign(this.key);
    return jwt;
  },

  async verify(token: string) {
    const { payload } = await jwtVerify(token, this.key, {
      algorithms: ["HS256"],
    });

    return payload as SessionPayload;
  },

  save(token: string) {
    // save method is for saving the session to the cookie
    cookies().set(this.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  async getSession() {
    try {
      // access cookie and then decrypt it, return the user data
      const token = cookies().get(this.cookieName);
      if (!token) return null;
      const payload = await this.verify(token.value);
      return payload;
    } catch (error) {
      return null;
    }
  },
};
