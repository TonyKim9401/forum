import { connectDB } from "@/util/database";

export default async function New(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    if (req.body.title === "") {
      return res.status(500).json("no title");
    }
  }

  try {
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").insertOne(req.body);
    // return res.redirect(302, "/list");
    return res.status(200).redirect("/list");
  } catch (error) {
    console.log(error);
  }
}
