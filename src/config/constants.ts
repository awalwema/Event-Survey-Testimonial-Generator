export const EVENT_TYPES = [
  "Conference",
  "Exhibition",
  "Corporate Event",
  "Social Gathering",
  "Workshop",
  "Product Launch",
  "Other",
] as const;

export const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME || "Company Name";
export const WEBHOOK_URL = process.env.WEBHOOK_URL || "";
