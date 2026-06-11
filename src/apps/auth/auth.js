import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../../lib/prisma.js";
import { env } from "../../libraries/config/index.js";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:3001"],
  advanced: {
    disableCSRFCheck: process.env.NODE_ENV === "development",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      console.log(`[MOCK EMAIL] Password reset for ${user.email}: ${url}`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log(`[MOCK EMAIL] Verify email for ${user.email}: ${url}`);
    },
  },
});
