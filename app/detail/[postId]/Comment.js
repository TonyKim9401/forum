"use client";

import { useEffect, useState } from "react";

export default function Comment({ parent }) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  // Execute when html is load / re-rendering
  const fetchComment = async () => {
    const res = await fetch(`/api/comment/list?id=${parent}`);
    const result = await res.json();
    setData(result);
  };
  useEffect(() => {
    fetchComment();
  }, []); // by adding ,[] -> execute only once

  return (
    <div>
      <div>Comments</div>
      {data.map((comment, i) => {
        return <p key={i}>{comment.content}</p>;
      })}
      <input
        onChange={(e) => {
          const inputValue = e.target.value;
          setComment(inputValue);
        }}
        value={comment}
      />
      <button
        onClick={async () => {
          const res = await fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({
              comment: comment,
              _id: parent,
            }),
          });

          if (res.ok) {
            await fetchComment();
            setComment("");
          }
        }}
      >
        Comment submit
      </button>
    </div>
  );
}
