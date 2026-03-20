import Card from "./Card";
import { VenueJson } from "../../interface";

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson>;
}) {
  const venueJson = await venuesJson;

  return (
    <div className="flex flex-row gap-6 justify-center flex-wrap">
      {venueJson.data.slice(0, 3).map((v) => (
        <Card key={v._id} vid={v._id} venueName={v.name} imgSrc={v.picture} />
      ))}
    </div>
  );
}


