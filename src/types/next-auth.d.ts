import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      discordId: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    discordId: string;
    joinedMainServer: boolean;
  }
}
