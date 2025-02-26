import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function List(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const db = (await connectDB).db("forum");
    const commentList = await db
      .collection("comment")
      .find({
        parent: new ObjectId(id),
      })
      .toArray();
    return res.status(200).json(commentList);
  }
}
