import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(req, res) {
  if (req.method === "POST") {
    if (req.body.title === "") {
      return res.status(500).json("no title");
    }
  }

  try {
    const db = (await connectDB).db("forum");
    const editPost = {
      title: req.body.title,
      content: req.body.content,
    };
    console.log(req.body);
    const result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: editPost }); // $inc = number increase by 1
    console.log(result);
    return res.status(200).redirect("/list");
  } catch (error) {
    console.log(error);
  }
}
