/** Route-specific search defaults and onward guides. Unknown routes never fall back
 * to an unrelated country. BKK is the starting airport for Bangkok searches;
 * travellers can change it to DMK in the search form. */
export const FLIGHT_ROUTES: Record<string, {
  origin: string; destination: string; hasNonstop: boolean;
  visaPath: string; hotelPath: string; destinationEn: string; destinationBn: string;
  fromBn: string; toBn: string;
}> = {
  "dhaka-kathmandu": { origin: "DAC", destination: "KTM", hasNonstop: true, visaPath: "/visa/nepal-visa", hotelPath: "/hotels/kathmandu-hotels", destinationEn: "Nepal", destinationBn: "নেপাল", fromBn: "ঢাকা", toBn: "কাঠমান্ডু" },
  "ktm-dhaka": { origin: "KTM", destination: "DAC", hasNonstop: true, visaPath: "/visa", hotelPath: "/hotels", destinationEn: "Dhaka", destinationBn: "ঢাকা", fromBn: "কাঠমান্ডু", toBn: "ঢাকা" },
  "dhaka-bangkok": { origin: "DAC", destination: "BKK", hasNonstop: true, visaPath: "/visa/thailand-visa", hotelPath: "/hotels/bangkok-hotels", destinationEn: "Thailand", destinationBn: "থাইল্যান্ড", fromBn: "ঢাকা", toBn: "ব্যাংকক" },
  "dhaka-kuala-lumpur": { origin: "DAC", destination: "KUL", hasNonstop: true, visaPath: "/visa/malaysia-visa", hotelPath: "/hotels/kuala-lumpur-hotels", destinationEn: "Malaysia", destinationBn: "মালয়েশিয়া", fromBn: "ঢাকা", toBn: "কুয়ালালামপুর" },
  "dhaka-dubai": { origin: "DAC", destination: "DXB", hasNonstop: true, visaPath: "/visa/dubai-visa", hotelPath: "/hotels/dubai-hotels", destinationEn: "Dubai", destinationBn: "দুবাই", fromBn: "ঢাকা", toBn: "দুবাই" },
  "dhaka-singapore": { origin: "DAC", destination: "SIN", hasNonstop: true, visaPath: "/visa/singapore-visa", hotelPath: "/hotels/singapore-hotels", destinationEn: "Singapore", destinationBn: "সিঙ্গাপুর", fromBn: "ঢাকা", toBn: "সিঙ্গাপুর" },
  "dhaka-maldives": { origin: "DAC", destination: "MLE", hasNonstop: true, visaPath: "/visa/maldives-visa", hotelPath: "/hotels/maldives-hotels", destinationEn: "Maldives", destinationBn: "মালদ্বীপ", fromBn: "ঢাকা", toBn: "মালে" },
  "dhaka-los-angeles": { origin: "DAC", destination: "LAX", hasNonstop: false, visaPath: "/visa", hotelPath: "/hotels", destinationEn: "Los Angeles", destinationBn: "লস অ্যাঞ্জেলেস", fromBn: "ঢাকা", toBn: "লস অ্যাঞ্জেলেস" },
  "dhaka-madinah": { origin: "DAC", destination: "MED", hasNonstop: true, visaPath: "/visa/saudi-arabia-visa", hotelPath: "/blog/where-to-stay-madinah-markazia-gate-guide", destinationEn: "Madinah", destinationBn: "মদিনা", fromBn: "ঢাকা", toBn: "মদিনা" },
};
