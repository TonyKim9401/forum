import { connectDB } from "@/util/database.js";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("forum");
  const postingList = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {postingList.map((posting, i) => {
        return <Post posting={posting} key={i} />;
      })}
    </div>
  );
}

function Post(props) {
  const posting = props.posting;
  return (
    <div className="list-item">
      <Link prefetch={false} href={`/detail/${posting._id}`}>
        <h4>{posting.title}</h4>
      </Link>
      <Link href={`/edit/${posting._id}`}>✏️</Link>
      <p>{posting.content}</p>
    </div>
  );
}
