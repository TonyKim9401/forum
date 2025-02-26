import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function Signup(req, res) {
  if (req.method === "POST") {
    const incryptedPassword = await bcrypt.hash(req.body.password, 10);
    const registerInfo = {
      name: req.body.name,
      email: req.body.email,
      password: incryptedPassword,
    };

    const db = (await connectDB).db("forum");
    const insertResult = await db
      .collection("user_cred")
      .insertOne(registerInfo);
    return res.status(200).json("Registered successfully!");
  }
}
