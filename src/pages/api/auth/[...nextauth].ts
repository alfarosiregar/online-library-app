import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle, signIn } from "@/services/auth/services";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, role } = credentials as {
          email: string;
          password: string;
          role: string;
        };
        const user: any = await signIn(email);

        if (!user) return null;

        const passwordConfirm = await compare(password, user.password);
        if (!passwordConfirm) return null;

        if (role !== user.role) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.sub = user.id || user.sub; // Pastikan ID user tersimpan di token
        token.email = user.email;
        token.fullname = user.fullname;
        token.phone = user.phone;
        token.gender = user.gender;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const data = {
          email: user.email,
          fullname: user.name,
          phone: "",
          type: "google",
          role: "member",
        };

        await loginWithGoogle(data, (data: any) => {
          token.email = data.email;
          token.fullname = data.fullname;
          token.phone = data.phone;
          token.type = data.type;
          token.role = data.role;
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("sub" in token || "id" in token) {
        session.user.sub = token.sub;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token || "name" in token) {
        session.user.fullname = token.fullname || token.name;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("gender" in token) {
        session.user.gender = token.gender;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("type" in token) {
        session.user.type = token.type;
      }

      session.accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
