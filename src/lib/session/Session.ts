import { SignJWT, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const cookieName = "session";
const secret = new TextEncoder().encode("secret");
const expirationTime = "30sec";
const alg = "HS256";

const sign = (userData: { email: string }) => {
  // Sign is the process of creating a JWT token of the user data
  const jti = crypto.randomUUID();
  const jwt = new SignJWT({
    ...userData,
    jti,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(secret);

  return jwt;
};
const verify = async (token: string) => {
  // Verify is the process of verifying the JWT token
  const { payload } = await jwtVerify(token, secret, {
    algorithms: [alg],
  });

  // TODO: Validate the payload

  return payload as { email: string };
};

export const getSession = async () => {
  // Get session from the cookie
  // read cookie and verifyit
  const token = cookies().get(cookieName);
  if (!token) return null;
  const userData = await verify(token.value);
  return userData;
};
export const save = async (userData: { email: string }) => {
  const jwt = await sign(userData);
  cookies().set(cookieName, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  revalidatePath("/");
};
