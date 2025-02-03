/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  // type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { env } from "@/env";
import { db } from "@/server/db";
import { getUserByEmail, getUserById } from "./user";
import { cache } from "react";
import { redirect } from "next/navigation";
import { OnboardingStatus } from "@prisma/client";


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const JWT_SECRET = new TextEncoder().encode(env.NEXTAUTH_SECRET);

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      await getUserById(user.id);
      // const existingUser = await getUserById(user.id);
      // if (!existingUser?.emailVerified) return false;

      return true;
    },
    session({ session, token }) {
      if (token?.role && session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.onboardingStatus = token?.onboardingStatus as OnboardingStatus;
        session.user.emailVerified = token?.emailVerified;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const dbUser = await getUserByEmail(token?.email as string)
      if (!dbUser) {
        return token;
      }

      return {
        ...token,
        id: dbUser.id,
        role: dbUser.role,
        onboardingStatus: dbUser.onboardingStatus,
        emailVerified: dbUser.emailVerified,
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: env.NEXTAUTH_SECRET ?? "secret",
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const { email, password } = credentials;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export const getServerComponentAuthSession = cache(() =>
  getServerAuthSession(),
);

export const withServerSession = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  return session;
};

export const withServerComponentSession = cache(async () => {
  const session = await getServerComponentAuthSession();

  if (!session) {
    redirect("/login");
  }

  return session;
});


/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
