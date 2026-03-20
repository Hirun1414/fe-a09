"use client";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function Card({
  venueName,
  imgSrc,
  vid,
  onRate,
}: {
  venueName: string;
  imgSrc: string;
  vid: string;
  onRate?: (rating: number) => void;
}) {
  const [rating, setRating] = useState<number | null>(0);

  return (
    <InteractiveCard>
      <a href={`/venue/${vid}`} className="block w-full h-full no-underline">
        <div className="w-full h-[70%] relative rounded-t-lg">
          <Image
            src={imgSrc}
            alt="Card Picture"
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        <div className="w-full h-[30%] p-[10px] flex flex-col justify-between">
          <div>{venueName}</div>

          {}
          {onRate && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Rating
                id={`${venueName} Rating`}
                name={`${venueName} Rating`}
                data-testid={`${venueName} Rating`}
                value={rating}
                onChange={(_event, newValue) => {
                  setRating(newValue);
                  onRate(newValue ?? 0);
                }}
              />
            </div>
          )}
        </div>
      </a>
    </InteractiveCard>
  );
}

