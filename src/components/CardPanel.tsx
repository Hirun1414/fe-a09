"use client";

import { useReducer } from "react";
import Card from "./Card";

type Venue = {
  vid: string;
  name: string;
  image: string;
};

const venues: Venue[] = [
  { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
  { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
  { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" },
];

type Action =
  | { type: "set"; venue: string; rating: number }
  | { type: "remove"; venue: string };

function reducer(state: Map<string, number>, action: Action) {
  const newMap = new Map(state);

  if (action.type === "set") {
    newMap.set(action.venue, action.rating);
  }

  if (action.type === "remove") {
    newMap.delete(action.venue);
  }

  return newMap;
}

export default function CardPanel() {
  const [ratings, dispatch] = useReducer(
    reducer,
    new Map([
      ["The Bloom Pavilion", 0],
      ["Spark Space", 0],
      ["The Grand Table", 0],
    ])
  );

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {venues.map((v) => (
          <Card
            key={v.vid}
            venueName={v.name}
            imgSrc={v.image}
            vid={v.vid}
            onRate={(r) =>
              dispatch({ type: "set", venue: v.name, rating: r })
            }
          />
        ))}
      </div>

      <div>
        {[...ratings.entries()].map(([venue, rating]) => (
          <div
            key={venue}
            data-testid={venue}
            onClick={() => dispatch({ type: "remove", venue })}
          >
            {venue} Rating : {rating}
          </div>
        ))}
      </div>
    </div>
  );
}

