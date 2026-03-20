import { VenueJson } from "../../interface";

export default async function getVenues(): Promise<VenueJson> {
  const res = await fetch(
    "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch venues");
  }

  return res.json();
}

