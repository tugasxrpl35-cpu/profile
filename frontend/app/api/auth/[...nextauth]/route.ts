import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const whitelist: string[] = process.env.WHITELIST ? process.env.WHITELIST.split(',').map(email => email.trim().toLowerCase()) : [];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // whitelist validation (case-insensitive)
      return whitelist.includes(user.email.toLowerCase());
    },
  },

  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };