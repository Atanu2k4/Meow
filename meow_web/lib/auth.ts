import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // ─── NO adapter ─────────────────────────────────────────────────────────────
  // We handle user creation/linking manually in the callbacks below.
  // This gives us full control over account linking (one email = one account).

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[Auth] Credentials authorize called:", credentials?.email);
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials?.email?.toLowerCase() });

          if (user && user.password && credentials?.password) {
            const match = await bcrypt.compare(credentials.password, user.password);
            if (match) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                image: user.image,
              };
            }
          }
          console.log("[Auth] Invalid credentials");
          return null;
        } catch (err) {
          console.error("[Auth] Error in authorize:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // ─── Sign In ──────────────────────────────────────────────────────────────
    // Called when a user signs in. Handles account linking for Google OAuth.
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();

          const email = user.email?.toLowerCase();
          if (!email) return false;

          // Check if a user with this email already exists
          let existingUser = await User.findOne({ email });

          if (existingUser) {
            // Account exists — link Google ID if not already linked
            if (!existingUser.googleId) {
              await User.findByIdAndUpdate(existingUser._id, {
                googleId: profile?.sub,
                image: existingUser.image || user.image, // keep existing avatar if set
                // Keep provider as 'local' if they have a password; otherwise upgrade to google
                ...(existingUser.password ? {} : { provider: "google" }),
              });
            }
            // Allow sign in — set the DB user's id on the token
            user.id = existingUser._id.toString();
          } else {
            // New user — create account
            const newUser = await User.create({
              name: user.name,
              email,
              image: user.image,
              googleId: profile?.sub,
              provider: "google",
              emailVerified: new Date(),
            });
            user.id = newUser._id.toString();
          }
          return true;
        } catch (err) {
          console.error("[Auth] Google signIn error:", err);
          return false;
        }
      }
      return true;
    },

    // ─── JWT ─────────────────────────────────────────────────────────────────
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider ?? "local";
      }
      return token;
    },

    // ─── Session ──────────────────────────────────────────────────────────────
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // Redirect auth errors back to login with ?error= param
  },

  secret: process.env.NEXTAUTH_SECRET,
};
