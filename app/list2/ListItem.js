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
              onClick={(e) => {
                /*fetch("/api/post/delete", {
                  method: "DELETE",
                  body: JSON.stringify({ _id: posting._id }),
                })
                */
                fetch(`/api/post/getDelete?_id=${posting._id}`)
                  .then((r) => {
                    if (r.status == 200) {
                      return r.json();
                    } else {
                      // server error result
                    }
                  })
                  .then((result) => {
                    // success code
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  })
                  .catch((error) => {
                    // internet issues etc
                    console.log(error);
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
