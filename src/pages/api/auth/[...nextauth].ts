import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials provider for email/password login
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          // Call your backend API to validate credentials
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.data && response.data.token) {
            // Return user object with token
            return {
              id: response.data.userId || credentials.email,
              email: credentials.email,
              name: response.data.name || credentials.email,
              accessToken: response.data.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),

    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // GitHub OAuth provider
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Custom pages
  pages: {
    signIn: "/requests/login",
    error: "/requests/login",
  },

  // Callbacks to handle JWT and session
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken || account?.access_token;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,

  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
