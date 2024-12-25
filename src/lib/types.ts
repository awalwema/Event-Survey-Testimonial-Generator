import { z } from "zod";
// import { EVENT_TYPE_OPTIONS } from "@/components/survey-form/survey-fields";

export const basicInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().min(1, "Company name is required"),
});

export type BasicInfoErrors = {
  firstName?: string[];
  lastName?: string[];
  company?: string[];
};

export type SatisfactionRating = "Satisfied" | "Neutral" | "Dissatisfied";
export type YesNoResponse = "Yes" | "No";

export type EventType = (typeof EVENT_TYPE_OPTIONS)[number];

export const EVENT_TYPE_OPTIONS = [
  "Tradeshow",
  "Conference",
  "In-Store Retail",
  "Tournament",
  "Festival",
  "Promotional Tour",
  "Corporate Event",
] as const;

export interface SurveyData {
  // Basic Info
  firstName: string;
  lastName: string;
  company: string;
  eventDate: string;
  eventType: EventType | "";

  // Pre-Event Communication
  inquiryResponseTime: SatisfactionRating | "";
  phoneExperience: SatisfactionRating | "";
  quoteTime: SatisfactionRating | "";

  // Event Day
  arrivedOnTime: SatisfactionRating | "";
  setupOnTime: SatisfactionRating | "";
  startedOnTime: SatisfactionRating | "";
  staffAppearance: SatisfactionRating | "";
  staffProfessionalism: SatisfactionRating | "";
  personalizationQuality: SatisfactionRating | "";
  swagQuality: SatisfactionRating | "";
  eventFlow: SatisfactionRating | "";
  organization: SatisfactionRating | "";
  attendeeReaction: SatisfactionRating | "";
  swagItem: string;

  // Guest Comments
  guestComments: string;

  // Overall Expectations
  overallEventSatisfaction: SatisfactionRating | "";
  overallCommunicationSatisfaction: SatisfactionRating | "";
  overallProfessionalismSatisfaction: SatisfactionRating | "";
  overallQualitySatisfaction: SatisfactionRating | "";

  // Future Collaboration
  wouldBookAgain: YesNoResponse | "";
  improvementSuggestions: string;

  // Final Comments
  additionalComments: string;

  // Written Testimonial
  testimonial: string;
  testimonialConsent: YesNoResponse | "";
}
