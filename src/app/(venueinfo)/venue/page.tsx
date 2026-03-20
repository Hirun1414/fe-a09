import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";

export default function VenuePage() {
  const venues = getVenues();

  return (
    <main>
      <VenueCatalog venuesJson={venues} />
    </main>
  );
}

