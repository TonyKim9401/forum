require("dotenv").config();

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/util/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_PROVIDER_CLIENT_ID,
      clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // 1. Log In form auto generating code
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 2. Execute when log in requested
      // compare ID, Password directly with DB
      // all matches -> return result or else null
      async authorize(credentials) {
        const db = (await connectDB).db("forum");
        const user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("The email doesn't exist");
          return null;
        }

        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!pwcheck) {
          console.log("Wrong password");
          return null;
        }
        return user;
      },
    }),
  ],

  // 3. jtw + jtw expiry date
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    // 4. code to generate jwt
    // user variable: includes user info from DB
    // token.user to save info into jwt
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    // 5. execute whenever user session is checked
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.SECRET,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
