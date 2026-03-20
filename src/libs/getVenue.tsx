import { VenueItem } from "../../interface";

export default async function getVenue(
  vid: string
): Promise<{ success: boolean; data: VenueItem }> {
  const res = await fetch(
    `https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${vid}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch venue");
  }

  return res.json();
}

