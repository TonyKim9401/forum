import { connectDB } from "@/util/database.js";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  const postingList = await db.collection("post").find().toArray();

  return res.status(200).json(postingList);
}
