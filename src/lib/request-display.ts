/**
 * Request display config: human-readable labels and section grouping per request type.
 * Used by admin booking detail view and emails to show structured data instead of raw JSON.
 */

export type RequestType =
  | "TOUR_BOOKING"
  | "CAR_RENTAL"
  | "EVENT_REGISTRATION"
  | "AIR_TRAVEL"
  | "CAB_BOOKING"
  | "CONTACT"
  | "INQUIRY"
  | "EVENTS_NEWSLETTER";

export interface FieldConfig {
  key: string;
  label: string;
  format?: "date" | "time" | "datetime" | "paragraph";
}

export interface RequestDisplayConfig {
  title: string;
  sections: { title: string; fields: FieldConfig[] }[];
}

const cabBookingFields: FieldConfig[] = [
  { key: "serviceType", label: "Service type" },
  { key: "vehicleType", label: "Vehicle type" },
  { key: "pickupLocation", label: "Pickup location" },
  { key: "dropoffLocation", label: "Drop-off location" },
  { key: "pickupDate", label: "Pickup date" },
  { key: "pickupTime", label: "Pickup time" },
  { key: "passengers", label: "Passengers" },
  { key: "luggage", label: "Luggage" },
  { key: "specialRequests", label: "Special requests", format: "paragraph" },
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "preferredContact", label: "Preferred contact" },
];

const tourBookingFields: FieldConfig[] = [
  { key: "tourId", label: "Tour" },
  { key: "numberOfPeople", label: "Number of people" },
  { key: "preferredDates", label: "Preferred dates" },
  { key: "specialRequests", label: "Special requests", format: "paragraph" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "country", label: "Country" },
];

const contactFields: FieldConfig[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "subject", label: "Subject" },
  { key: "message", label: "Message", format: "paragraph" },
  { key: "serviceType", label: "Service interest" },
];

const carRentalFields: FieldConfig[] = [
  { key: "vehicleId", label: "Vehicle" },
  { key: "startDate", label: "Start date" },
  { key: "endDate", label: "End date" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "specialRequests", label: "Notes", format: "paragraph" },
];

const eventRegistrationFields: FieldConfig[] = [
  { key: "eventId", label: "Event" },
  { key: "numberOfParticipants", label: "Participants" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "organization", label: "Organization" },
  { key: "specialRequests", label: "Special requests", format: "paragraph" },
];

const airTravelFields: FieldConfig[] = [
  { key: "tripType", label: "Trip type" },
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "departureDate", label: "Departure date" },
  { key: "departureTime", label: "Departure time" },
  { key: "returnDate", label: "Return date" },
  { key: "returnTime", label: "Return time" },
  { key: "travelClass", label: "Travel class" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "preferences", label: "Preferences", format: "paragraph" },
];

const inquiryFields: FieldConfig[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "service", label: "Service" },
  { key: "message", label: "Message", format: "paragraph" },
];

const configs: Record<string, RequestDisplayConfig> = {
  CAB_BOOKING: {
    title: "Cab booking details",
    sections: [
      { title: "Trip", fields: cabBookingFields.filter((f) => ["serviceType", "vehicleType", "pickupLocation", "dropoffLocation", "pickupDate", "pickupTime", "passengers", "luggage"].includes(f.key)) },
      { title: "Special requests", fields: cabBookingFields.filter((f) => f.key === "specialRequests") },
      { title: "Contact", fields: cabBookingFields.filter((f) => ["name", "phone", "email", "preferredContact"].includes(f.key)) },
    ].filter((s) => s.fields.length > 0),
  },
  TOUR_BOOKING: {
    title: "Tour booking details",
    sections: [{ title: "Booking", fields: tourBookingFields }],
  },
  CAR_RENTAL: {
    title: "Car rental details",
    sections: [{ title: "Rental", fields: carRentalFields }],
  },
  EVENT_REGISTRATION: {
    title: "Event registration details",
    sections: [{ title: "Registration", fields: eventRegistrationFields }],
  },
  AIR_TRAVEL: {
    title: "Air travel assistance details",
    sections: [{ title: "Request", fields: airTravelFields }],
  },
  CONTACT: {
    title: "Contact form details",
    sections: [{ title: "Message", fields: contactFields }],
  },
  INQUIRY: {
    title: "Inquiry details",
    sections: [{ title: "Inquiry", fields: inquiryFields }],
  },
  EVENTS_NEWSLETTER: {
    title: "Events newsletter signup",
    sections: [{ title: "Signup", fields: [{ key: "email", label: "Email" }, { key: "firstName", label: "First name" }, { key: "interests", label: "Interests" }] }],
  },
};

function formatFieldValue(value: unknown, format?: string): string {
  if (value === null || value === undefined) return "—";
  if (format === "paragraph" && typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(String).join(", ");
  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "—";
    return entries.map(([k, v]) => `${k}: ${formatFieldValue(v)}`).join("; ");
  }
  return String(value);
}

export function getRequestDisplayConfig(type: string): RequestDisplayConfig | null {
  return configs[type] ?? null;
}

export function getRequestDisplayRows(
  type: string,
  data: Record<string, unknown>
): { section: string; rows: { label: string; value: string }[] }[] {
  const config = getRequestDisplayConfig(type);
  if (!config) return [];

  return config.sections.map((section) => ({
    section: section.title,
    rows: section.fields.map((f) => {
      const raw = data[f.key];
      const value = formatFieldValue(raw, f.format);
      return { label: f.label, value };
    }),
  }));
}

/** All keys we know about for a type (for fallback “other fields” when config exists but has extra keys in data) */
export function getKnownKeys(type: string): Set<string> {
  const config = configs[type];
  if (!config) return new Set();
  const keys = new Set<string>();
  config.sections.forEach((s) => s.fields.forEach((f) => keys.add(f.key)));
  return keys;
}
