import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// const PUBLIC_ENV_KEY = "___ENV";

// function isBrowser() {
//   return typeof window !== "undefined";
// }

const COERCED_BOOLEAN = z
  .string()
  // transform to boolean using preferred coercion logic
  .transform((s) => s !== "false" && s !== "0");

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),

    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),

    UPLOADTHING_TOKEN: z.string(),
    UPLOADTHING_SECRET: z.string(),

    ASTRA_DB_API_ENDPOINT: z.string(),
    ASTRA_DB_APPLICATION_TOKEN: z.string(),
    OPENAI_API_KEY: z.string().optional(),

    EMAIL_SERVER: z.string().optional(),
    EMAIL_FROM: z.string(),

    /// smtp
    EMAIL_SERVER_HOST: z.string(),
    EMAIL_SERVER_PORT: z.coerce.number(),
    EMAIL_SERVER_SECURE: COERCED_BOOLEAN,
    EMAIL_SERVER_USERNAME: z.string().optional(),
    EMAIL_SERVER_PASSWORD: z.string().optional(),

    COLLECTION_NAME: z.string(),
    COLLECTION_NAME_2: z.string(),
    DB_NAME: z.string(),
    VECTOR_INDEX: z.string(),
    SEARCH_INDEX: z.string(),
    EMBEDDING_TEXT: z.string(),
    EMBEDDING_KEY: z.string(),
    PUSHER_APP_ID: z.string(),

    PUSHER_APP_SECRET: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_PUSHER_CLUSTER: z.string(),
    NEXT_PUBLIC_PUSHER_APP_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SK,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    ASTRA_DB_API_ENDPOINT: process.env.ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN: process.env.ASTRA_DB_APPLICATION_TOKEN,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY,

    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_FROM: process.env.EMAIL_FROM,

    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_SECURE: process.env.EMAIL_SERVER_SECURE,
    EMAIL_SERVER_USERNAME: process.env.EMAIL_SERVER_USERNAME,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,

    COLLECTION_NAME: process.env.COLLECTION_NAME,
    COLLECTION_NAME_2: process.env.COLLECTION_NAME_2,
    DB_NAME: process.env.DB_NAME,
    VECTOR_INDEX: process.env.VECTOR_INDEX,
    EMBEDDING_TEXT: process.env.EMBEDDING_TEXT,
    EMBEDDING_KEY: process.env.EMBEDDING_KEY,

    SEARCH_INDEX: process.env.SEARCH_INDEX,

    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
