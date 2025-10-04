import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the built-in session type
   */
  interface Session {
    user: {
      id: string;
      role?: string;
      onboardingCompleted?: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  /**
   * Extend the built-in user type
   */
  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken?: string;
    role?: string;
    onboardingCompleted?: boolean;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT type
   */
  interface JWT {
    id?: string;
    accessToken?: string;
    role?: string;
    onboardingCompleted?: boolean;
  }
}
