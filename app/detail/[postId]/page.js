import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const resolvedParams = await props.params;
  const postId = resolvedParams.postId;
  const db = (await connectDB).db("forum");
  const posting = await db
    .collection("post")
    .findOne({ _id: new ObjectId(postId) });

  return (
    <div>
      <h4>Detail Page</h4>
      <h4>{posting.title}</h4>
      <p>{posting.content}</p>
    </div>
  );
}
