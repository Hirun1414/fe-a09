"use client";

import styles from "./banner.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];

  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div
      className={styles.banner}
      onClick={() => setIndex((index + 1) % covers.length)}
    >
      <Image
        src={covers[index]}
        alt="cover"
        fill
        priority
        className="object-cover"
      />

      {status === "authenticated" && session?.user?.name ? (
        <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded shadow-md text-base font-semibold text-cyan-800">
          Welcome {session.user.name}
        </div>
      ) : null}

      <div className={styles.bannerText}>
        <h1 className="text-4xl font-medium">
          where every event finds its venue
        </h1>

        <h3 className="text-xl">
          Finding the perfect venue has never been easier. Whether it's a
          wedding, corporate event, or private party, we connect people to the
          perfect place.
        </h3>
      </div>

      <button
        className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded hover:bg-gray-100 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/venue");
        }}
      >
        Select Venue
      </button>
    </div>
  );
}