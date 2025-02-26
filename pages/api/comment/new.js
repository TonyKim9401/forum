import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function New(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    console.log(req.body);
    const db = (await connectDB).db("forum");

    const parsedBody = JSON.parse(req.body);

    const newComment = {
      content: parsedBody.comment,
      parent: new ObjectId(parsedBody._id),
      author: session.user.email,
    };

    const commentResult = await db.collection("comment").insertOne(newComment);

    return res.status(200).json(commentResult);
  }
}
