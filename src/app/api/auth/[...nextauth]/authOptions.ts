import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await userLogIn(credentials.email, credentials.password);

        if (!res || res.success === false) return null;

        const token = res.token || res.data?.token;
        const userData = res.data?.user || res.data || res;

        if (!token) return null;

        return {
          id: userData._id || userData.id || "1",
          name: userData.name || "",
          email: userData.email || credentials.email,
          role: userData.role || "user",
          token: token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = (user as any).token;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.token = token.token as string;
        session.user.role = token.role as string;
        session.user._id = token.sub as string;
      }
      return session;
    },
  },
};