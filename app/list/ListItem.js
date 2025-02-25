"use client";

import Link from "next/link";

export default function ListItem({ postingList }) {
  return (
    <div>
      {postingList.map((posting, i) => {
        return (
          <div className="list-item">
            <Link href={`/detail/${posting._id}`}>
              <h4>{posting.title}</h4>
            </Link>
            <Link href={`/edit/${posting._id}`}>✏️</Link>
            <span
              onClick={() => {
                fetch("/api/test", {
                  method: "POST",
                  body: JSON.stringify([1, 2, 3]),
                }).then(() => {
                  console.log("test");
                });
              }}
            >
              🗑️
            </span>
            <p>{posting.content}</p>
          </div>
        );
      })}
    </div>
  );
}
