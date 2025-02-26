import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function Delete(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session && req.body.author === session.user.email) {
    const db = (await connectDB).db("forum");
    const parsedQueryParams = req.query;
    const deleteResult = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(parsedQueryParams._id) });
    return res.status(200).json("Deleted Successfully");
  }
}
