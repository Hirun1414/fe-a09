import Image from "next/image";
import getVenue from "@/libs/getVenue";

export default async function Page({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;

  const res = await getVenue(vid);
  const venue = res.data;

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex items-start gap-16 w-[700px]">
        <div className="relative w-[260px] h-[260px]">
          <Image
            src={venue.picture}
            alt={venue.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-medium">{venue.name}</h1>
          <p>{venue.address}</p>
          <p>{venue.district}</p>
          <p>{venue.province}</p>
          <p>{venue.postalcode}</p>
          <p>{venue.tel}</p>
          <p>{venue.dailyrate} THB/day</p>
        </div>
      </div>
    </main>
  );
}