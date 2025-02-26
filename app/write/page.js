"use client";
import { useState } from "react";

export default function Write() {
  let [src, setSrc] = useState("");
  return (
    <div className="p-20">
      <h1>Upload posting</h1>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="posting name" />
        <input name="content" placeholder="posting content" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            const encodedFileName = encodeURIComponent(file.name);
            let res = await fetch(`/api/post/image?file=${encodedFileName}`);
            res = await res.json();

            //S3 upload
            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            let uploadResult = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            console.log(uploadResult);

            if (uploadResult.ok) {
              setSrc(uploadResult.url + "/" + encodedFileName);
            } else {
              console.log("failure");
            }
          }}
        />
        <img src={src} />
        <button type="submit">Button</button>
      </form>
    </div>
  );
}
