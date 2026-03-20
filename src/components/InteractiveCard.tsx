"use client";

import { ReactNode, useState } from "react";

export default function InteractiveCard({ children }: { children: ReactNode }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`w-1/5 h-[300px] rounded-lg ${
        hover ? "shadow-2xl bg-neutral-200" : "shadow-lg bg-white"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </div>
  );
}


