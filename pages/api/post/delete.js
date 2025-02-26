import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Delete(req, res) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    const parsedReqBody = JSON.parse(req.body);

    const db = (await connectDB).db("forum");
    const userInfo = await db
      .collection("post")
      .findOne({ _id: new ObjectId(parsedReqBody._id) });

    if (session && userInfo.author !== session.user.email) {
      return res.status(500).json("Author not match");
    }
    const deleteResult = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(parsedReqBody._id) });
    return res.status(200).json("Deleted Successfully");
  }
}
