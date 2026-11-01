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
  const destinationId = HOTEL_GUIDE_DESTINATIONS[guideId];
  return destinationId ? DESTINATION_HERO_IMAGES[destinationId] : undefined;
}
