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

          // Check for successful login response
          if (response.data && response.data.status === 200 && response.data.data) {
            const userData = response.data.data;
            return {
              id: userData.user?.id || userData.userId || credentials.email,
              email: userData.user?.email || credentials.email,
              name: userData.user?.name || userData.name || credentials.email,
              accessToken: userData.accessToken || userData.token,
              role: userData.user?.role || "member",
              onboardingCompleted: userData.user?.onboardingCompleted || false,
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
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // GitHub OAuth provider
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  // Custom pages
  pages: {
    signIn: "/requests/login",
    error: "/requests/login",
  },

  // Callbacks to handle JWT and session
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers (Google, GitHub), register/login the user in backend
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Send OAuth user data to backend to register/login
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/oauth-login`,
            {
              email: user.email,
              name: user.name,
              provider: account.provider,
              providerId: account.providerAccountId,
              image: user.image,
            }
          );

          if (response.data && response.data.status === 200 && response.data.data) {
            // Store the backend token in the user object
            user.accessToken = response.data.data.accessToken || response.data.data.token;
            user.id = response.data.data.user?.id || response.data.data.userId || user.id;
            user.role = response.data.data.user?.role || "member";
            user.onboardingCompleted = response.data.data.user?.onboardingCompleted || false;
            return true;
          }
          
          // If backend doesn't have oauth-login endpoint, allow sign-in anyway
          // The app will work with NextAuth session but without backend integration
          console.warn("Backend OAuth endpoint not available, using NextAuth session only");
          return true;
        } catch (error) {
          console.error("OAuth backend registration error:", error);
          // Allow sign-in even if backend registration fails
          // User will be authenticated via NextAuth but may need to register separately
          return true;
        }
      }
      
      // For credentials provider, authorization already handled
      return true;
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken || account?.access_token;
        token.id = user.id;
        token.email = user.email;
        token.provider = account?.provider;
        token.role = user.role;
        token.onboardingCompleted = user.onboardingCompleted;
      }
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
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
