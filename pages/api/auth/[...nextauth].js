require("dotenv").config();

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_PROVIDER_CLIENT_ID,
      clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
