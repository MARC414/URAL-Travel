import { DESTINATION_HERO_IMAGES } from "./destinationHeroImages";

/** Existing hotel-area guides inherit the matching generated destination scene. */
export const HOTEL_GUIDE_DESTINATIONS: Readonly<Record<string, string>> = {
  "kathmandu-hotels": "nepal-guide",
  "bangkok-hotels": "thailand-guide",
  "kuala-lumpur-hotels": "malaysia-guide",
  "dubai-hotels": "dubai-guide",
  "singapore-hotels": "singapore-guide",
  "maldives-hotels": "maldives-guide",
};

export const DESTINATION_HOTEL_GUIDES: Readonly<Record<string, string>> =
  Object.fromEntries(
    Object.entries(HOTEL_GUIDE_DESTINATIONS).map(([hotelId, destinationId]) => [destinationId, hotelId]),
  );

export function getHotelGuideDestinationImage(guideId: string) {
  // The generic Nepal destination artwork depicts Pokhara, not Kathmandu.
  // Use Kathmandu-inspired illustrative artwork for the Kathmandu guide.
  if (guideId === "kathmandu-hotels") return {
    src: "/assets/images/nepal_destination_1781544132297-1200.webp",
    altEn: "Illustration inspired by Kathmandu's Boudhanath Stupa",
    altBn: "কাঠমান্ডুর বৌদ্ধনাথ স্তূপ থেকে অনুপ্রাণিত চিত্র",
  };
  const destinationId = HOTEL_GUIDE_DESTINATIONS[guideId];
  return destinationId ? DESTINATION_HERO_IMAGES[destinationId] : undefined;
}
