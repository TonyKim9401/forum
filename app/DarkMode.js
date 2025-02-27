"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode() {
  const router = useRouter();

  useEffect(() => {
    const cookies = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];
    if (cookies === "") {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);

  return (
    <span
      onClick={() => {
        const modeCookie = ("; " + document.cookie)
          .split(`; mode=`)
          .pop()
          .split(";")[0];
        modeCookie === "light"
          ? (document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400)
          : (document.cookie = "mode=light; max-age=" + 3600 * 24 * 400);
        router.refresh();
      }}
    >
      🌙
    </span>
  );
}
