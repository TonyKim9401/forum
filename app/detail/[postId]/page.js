import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { notFound } from "next/navigation";

export default async function Detail(props) {
  const resolvedParams = await props.params;
  const postId = resolvedParams.postId;
  const db = (await connectDB).db("forum");
  const posting = await db
    .collection("post")
    .findOne({ _id: new ObjectId(postId) });

  if (posting === null) return notFound();

  return (
    <div>
      <h4>Detail Page</h4>
      <h4>{posting.title}</h4>
      <p>{posting.content}</p>
      <Comment parent={posting._id.toString()} />
    </div>
  );
}
