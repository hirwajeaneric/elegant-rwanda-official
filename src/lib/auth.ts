import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn:false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    }
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  advanced:{
    database: {
      generateId: false,
    }
  },
  plugins: [nextCookies()],
});