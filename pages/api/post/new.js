import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function New(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "POST") {
      console.log(req.body);
      if (req.body.title === "") {
        return res.status(500).json("no title");
      }
    }

    try {
      const db = (await connectDB).db("forum");

      const newPost = {
        title: req.body.title,
        content: req.body.content,
        author: session.user.email,
      };
      const result = await db.collection("post").insertOne(newPost);
      // return res.redirect(302, "/list");
      return res.status(200).redirect("/list");
    } catch (error) {
      console.log(error);
    }
  }
}
