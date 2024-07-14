// import jwt from "jsonwebtoken";

// export const Jwt = {
//   get config() {
//     return {
//       secret: "secret",
//       expiresIn: "1h",
//     };
//   },
//   sign(email: string): string {
//     const { expiresIn, secret } = this.config;
//     return jwt.sign({ sub: email }, secret, { expiresIn });
//   },

//   verify(token: string): string {
//     const { secret } = this.config;
//     return jwt.verify(token, secret) as string;
//   },
// };
