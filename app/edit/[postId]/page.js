import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const resolvedParams = await props.params;
  const postId = resolvedParams.postId;
  const db = (await connectDB).db("forum");

  const posting = await db
    .collection("post")
    .findOne({ _id: new ObjectId(postId) });

  return (
    <div className="p-20">
      <h1>Edit posting</h1>
      <form action="/api/post/edit" method="POST">
        <input
          name="title"
          placeholder="posting name"
          defaultValue={posting.title}
        />
        <input
          name="content"
          placeholder="posting content"
          defaultValue={posting.content}
        />
        <input name="_id" defaultValue={posting._id.toString()} type="hidden" />
        <button type="submit">Button</button>
      </form>
    </div>
  );
}
