import { connectDB } from "@/util/database.js";

export default async function Home() {
  // Better to use DB I/O code in server component only
  // -> Better not to contain Sensitiv info in client component
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  console.log(result);

  return <div>Hi</div>;
}
