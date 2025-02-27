"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DarkMode() {
  let [darkMode, setDarkMode] = useState("light");
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
        modeCookie === "light" ? setDarkMode("light") : setDarkMode("dark");
        router.refresh();
      }}
    >
      {darkMode === "dark" ? "🌙" : "☀️"}
    </span>
  );
}
