import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Delete(req, res) {
  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    const parsedReqBody = JSON.parse(req.body);
    const deleteResult = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(parsedReqBody._id) });
    return res.status(200).json("Deleted Successfully");
  }
}
