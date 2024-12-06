import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import { db } from "./db";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { Adapter } from "next-auth/adapters";

export const { auth, handlers, signIn, signOut } = NextAuth({
 session: {
  strategy: "jwt",
 },
 pages: {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
 },
 adapter: PrismaAdapter(db) as Adapter,
 providers: [
  Google({
   clientId: process.env.GOOGLE_CLIENT_ID!,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  GitHub({
   clientId: process.env.FACEBOOK_CLIENT_ID!,
   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  }),
  Credentials({
   name: "Credentials",
   credentials: {
    username: {
     label: "Username",
     type: "text",
     placeholder: "Username",
    },
    email: {
     label: "Email",
     type: "text",
     placeholder: "Email",
    },
    password: {
     label: "Password",
     type: "password",
     placeholder: "Password",
    },
   },
   authorize: async (credentials) => {
    if (!credentials.email || !credentials.password) {
     throw new Error("Email and password are required");
    }

    const user = await db.user.findFirst({
     where: {
      email: credentials.email,
     },
    });

    if (!user || !user.hashedPassword) {
     throw new Error("User was not found, Please enter valid email");
    }
    if (typeof credentials.password !== "string") {
     throw new Error("Invalid password format");
    }
    const passwordMatch = await bcrypt.compareSync(
     credentials.password,
     user.hashedPassword
    );
    if (!passwordMatch) {
     throw new Error("Invalid password");
    }
    return user;
   },
  }),
 ],
 secret: process.env.NEXTAUTH_SECRET,
 callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
   return true;
  },
  async redirect({ url, baseUrl }) {
   return baseUrl;
  },
  async session({ session, user, token }) {
   return session;
  },
  async jwt({ token, user, account, profile }) {
   return token;
  },
 },
});

export const getAuthSession = () => auth();
