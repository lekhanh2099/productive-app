import type { User } from "next-auth";

declare module "next-auth" {
 interface JWT {
  id: string;
  username?: string | null;
  surname?: string | null;
  completedOnboarding?: boolean;
 }
}

declare module "next-auth" {
 interface Session {
  user: User & {
   id?: string | null;
   username?: string | null;
   completedOnboarding: boolean;
   surname?: string | null;
  };
 }
}
