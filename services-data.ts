import type { ServiceInfo } from "@/types";

export const SERVICES: ServiceInfo[] = [
  {
    slug: "aadhaar-card",
    name: "Aadhaar Card",
    icon: "Fingerprint",
    description: "Update mobile number, address, name, DOB, biometrics and more.",
    documents: ["Original Aadhaar Card", "Address Proof (if applicable)", "Passport size photo"],
    subServices: [
      { name: "Aadhaar Mobile Number Only Update", charge: "₹300" },
      { name: "Aadhaar Mobile Number Update", charge: "₹500" },
      { name: "Address Update", charge: "₹500" },
      { name: "Name Correction", charge: "₹500" },
      { name: "Date of Birth Correction", charge: "₹500" },
      { name: "Biometric Update", charge: "₹500" },
      { name: "Husband Name Update", charge: "₹300" },
      { name: "Father Name Update", charge: "₹300" },
    ],
  },
  {
    slug: "pan-card",
    name: "PAN Card",
    icon: "CreditCard",
    description: "New PAN, corrections, reprint and Aadhaar-PAN linking.",
    documents: ["Aadhaar Card", "Passport size photo", "Signature"],
    subServices: [
      { name: "New PAN", charge: "₹250" },
      { name: "PAN Correction", charge: "₹250" },
      { name: "PAN Reprint", charge: "₹100" },
      { name: "PAN Aadhaar Link", charge: "Contact for pricing" },
    ],
  },
  {
    slug: "passport",
    name: "Passport",
    icon: "BookOpenCheck",
    description: "New passport, renewal and re-issue assistance.",
    documents: ["Aadhaar Card", "Address Proof", "Birth Certificate", "Passport size photo"],
    subServices: [
      { name: "New Passport", charge: "₹3000" },
      { name: "Passport Renewal", charge: "₹3000" },
      { name: "Passport Re-Issue", charge: "₹3000" },
    ],
  },
  {
    slug: "voter-id",
    name: "Voter ID",
    icon: "Vote",
    description: "New registration, correction, address change and EPIC download.",
    documents: ["Aadhaar Card", "Address Proof", "Passport size photo"],
    subServices: [
      { name: "New Voter Registration", charge: "₹200" },
      { name: "Correction", charge: "₹100" },
      { name: "Address Change", charge: "₹100" },
      { name: "EPIC Download", charge: "₹50" },
    ],
  },
  {
    slug: "ration-card",
    name: "Ration Card",
    icon: "Wheat",
    description: "New application, add/delete member, correction and transfer.",
    documents: ["Aadhaar Card of all members", "Address Proof", "Passport size photo"],
    subServices: [
      { name: "New Application", charge: "₹150" },
      { name: "Add Member", charge: "₹150" },
      { name: "Delete Member", charge: "₹200" },
      { name: "Address Correction", charge: "₹100" },
      { name: "Mobile Number Update", charge: "₹100" },
      { name: "Card Transfer", charge: "₹200" },
    ],
  },
  {
    slug: "trade-license",
    name: "Trade License",
    icon: "Store",
    description: "New trade license, renewal and modification for your business.",
    documents: ["Aadhaar Card", "Address Proof of Shop", "Passport size photo"],
    subServices: [
      { name: "New Trade License", charge: "Contact for pricing" },
      { name: "Renewal", charge: "Contact for pricing" },
      { name: "Modification", charge: "Contact for pricing" },
    ],
  },
  {
    slug: "udyam-msme",
    name: "UDYAM (MSME)",
    icon: "Factory",
    description: "MSME registration and certificate updates for entrepreneurs.",
    documents: ["Aadhaar Card", "PAN Card", "Business Address Proof"],
    subServices: [
      { name: "New Registration", charge: "₹1000" },
      { name: "Update Certificate", charge: "₹100" },
    ],
  },
  {
    slug: "annapurna-bhandar",
    name: "Annapurna Bhandar",
    icon: "ShoppingBasket",
    description: "New application for Annapurna Bhandar (maximum 2 family members).",
    documents: ["Aadhaar Card", "Address Proof", "Passport size photo"],
    subServices: [{ name: "New Application (Maximum 2 Family Members)", charge: "₹200" }],
  },
  {
    slug: "yubasakti",
    name: "Yubasakti",
    icon: "Users",
    description: "New Yubasakti registration for eligible youth.",
    documents: ["Aadhaar Card", "Passport size photo", "Educational Certificate"],
    subServices: [{ name: "New Registration", charge: "₹200" }],
  },
  {
    slug: "other-services",
    name: "Other Online Services",
    icon: "LayoutGrid",
    description: "Any other government or online service — tell us what you need.",
    documents: ["Aadhaar Card (if applicable)", "Relevant supporting documents"],
    subServices: [{ name: "Custom Request", charge: "Contact for pricing" }],
  },
];

export function getServiceBySlug(slug: string | undefined) {
  return SERVICES.find((s) => s.slug === slug);
}
