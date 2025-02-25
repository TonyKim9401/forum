"use client";

import { useParams, useRouter } from "next/navigation";

export default function DetailLink() {
  const router = useRouter();
  const path = usePathname();
  const params = useParams();
  return (
    <button
      onClick={() => {
        router.push("/list");
      }}
    ></button>
  );
}
