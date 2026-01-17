import { z } from "zod"

// General Inquiry Form Schema
export const generalInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.enum(["Tours", "Cab Booking", "Car Rental", "Air Travel Assistance", "Air Ticket Booking", "Events", "General"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
})

// Tour Booking Form Schema
export const tourBookingSchema = z.object({
  tourId: z.string().min(1, "Please select a tour"),
  numberOfPeople: z.number().min(1, "At least 1 person required").max(20, "Maximum 20 people per booking"),
  preferredDates: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  specialRequests: z.string().optional(),
  contactInfo: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    country: z.string().min(2, "Please enter your country"),
  }),
})

// Cab Booking Form Schema
export const cabBookingSchema = z.object({
  pickupLocation: z.string().min(5, "Please provide detailed pickup location"),
  dropoffLocation: z.string().min(5, "Please provide detailed dropoff location"),
  date: z.date(),
  time: z.string().min(1, "Please select a time"),
  numberOfPassengers: z.number().min(1, "At least 1 passenger required").max(8, "Maximum 8 passengers"),
  vehicleType: z.enum(["Sedan", "SUV", "Unique", "Minibus"]),
  additionalNotes: z.string().optional(),
  contactInfo: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
  }),
})

// Car Rental Form Schema
export const carRentalSchema = z.object({
  carModel: z.string().min(1, "Please select a car model"),
  rentalPeriod: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  rentalType: z.enum(["Self-Drive", "Driven"]),
  driverDetails: z.object({
    name: z.string().min(2, "Driver name must be at least 2 characters"),
    licenseNumber: z.string().min(5, "Please enter valid license number"),
    licenseCountry: z.string().min(2, "Please enter license country"),
    experience: z.number().min(1, "Please enter years of driving experience"),
  }).optional(),
  contactInfo: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    address: z.string().min(10, "Please provide your address"),
  }),
})

// Air Travel Assistance Form Schema (detailed)
export const airTravelSchema = z.object({
  tripType: z.enum(["One-way", "Round-trip", "Multi-city"]),
  services: z.array(z.enum(["Visa Assistance", "Airport Pickup", "Hotel Booking", "Transportation", "Other", "Ticket Booking"])).min(1, "Please select at least one service"),
  origin: z.string().min(2, "Please enter your departure city/airport"),
  destination: z.string().min(2, "Please enter your arrival city/airport"),
  departureDate: z.date(),
  departureTime: z.string().min(1, "Please select a departure time"),
  returnDate: z.date().optional(),
  returnTime: z.string().optional(),
  travelClass: z.enum(["Economy", "Premium Economy", "Business", "First"]),
  passengers: z.object({
    adults: z.number().min(1, "At least one adult is required"),
    children: z.number().min(0),
    infants: z.number().min(0),
  }),
  travelerDetails: z.object({
    primaryTravelerName: z.string().min(2, "Please enter primary traveler name"),
    nationality: z.string().min(2, "Please enter nationality"),
    passportNumber: z.string().optional(),
    passportExpiry: z.string().optional(),
  }),
  luggage: z.object({
    checkedBags: z.number().min(0),
    cabinBags: z.number().min(0),
    specialItems: z.string().optional(),
  }),
  seatPreference: z.string().optional(),
  loyaltyProgram: z.string().optional(),
  budgetRange: z.string().optional(),
  preferences: z.string().optional(),
  contactInfo: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    country: z.string().min(2, "Please enter your country"),
  }),
})

// Event Registration Form Schema
export const eventRegistrationSchema = z.object({
  eventId: z.string().min(1, "Please select an event"),
  numberOfParticipants: z.number().min(1, "At least 1 participant required").max(20, "Maximum 20 participants"),
  contactInfo: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    organization: z.string().optional(),
  }),
  specialRequests: z.string().optional(),
  dietaryRestrictions: z.array(z.enum(["None", "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "Other"])).optional(),
})

// Contact Form Schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  serviceType: z.enum(["Tours", "Cab Booking", "Car Rental", "Air Travel Assistance", "Air Ticket Booking", "Events", "General", "Other"]).optional(),
})

// Newsletter Signup Schema
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  interests: z.array(z.enum(["Tours", "Cab Booking", "Car Rental", "Air Travel Assistance", "Air Ticket Booking", "Events", "General", "Other"])).optional(),
})

// Search Form Schema
export const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term"),
  category: z.enum(["All", "Tours", "Cab Booking", "Car Rental", "Air Travel Assistance", "Air Ticket Booking", "Events", "General", "Other"]).optional(),
  date: z.date().optional(),
  location: z.string().optional(),
})

export type GeneralInquiryForm = z.infer<typeof generalInquirySchema>
export type TourBookingForm = z.infer<typeof tourBookingSchema>
export type CabBookingForm = z.infer<typeof cabBookingSchema>
export type CarRentalForm = z.infer<typeof carRentalSchema>
export type AirTravelForm = z.infer<typeof airTravelSchema>
export type EventRegistrationForm = z.infer<typeof eventRegistrationSchema>
export type ContactForm = z.infer<typeof contactSchema>
export type NewsletterForm = z.infer<typeof newsletterSchema>
export type SearchForm = z.infer<typeof searchSchema>
