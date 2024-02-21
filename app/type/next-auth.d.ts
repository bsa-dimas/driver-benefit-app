import { JWT, Session, User } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    key: string;
    user: {
      id: string;
      accessToken: string;
    } & Session["user"];
  }
  interface User {
    access_token: string;
    key: string;
  }
  interface JWT {
    access_token: string;
  }
}
