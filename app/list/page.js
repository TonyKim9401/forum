import { connectDB } from "@/util/database.js";
import ListItem from "./ListItem.js";

export default async function List() {
  const db = (await connectDB).db("forum");
  const postingList = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      <ListItem postingList={postingList}></ListItem>
    </div>
  );
}
