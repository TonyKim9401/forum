import { connectDB } from "@/util/database.js";

// caching current page for 60 sec
export const revalidate = 60;

export default async function Home() {
  // Better to use DB I/O code in server component only
  // -> Better not to contain Sensitiv info in client component
  // const db = (await connectDB).db("forum");
  // const result = await db.collection("post").find().toArray();
  // console.log(result);

  // no store cache data
  // await fetch("/list", { cache: "no-store" });

  // update caching data every 60 sec
  // await fetch("/list", { next: { revalidate: 60}" });

  // await fetch("/list", { cache: "force-cache" });

  return <div>Hi</div>;
}
