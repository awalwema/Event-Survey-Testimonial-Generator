import {
  SatisfactionRating,
  YesNoResponse,
  EVENT_TYPE_OPTIONS,
} from "@/lib/types";

export const SATISFACTION_OPTIONS: SatisfactionRating[] = [
  "Satisfied",
  "Neutral",
  "Dissatisfied",
];

export const YES_NO_OPTIONS: YesNoResponse[] = ["Yes", "No"];

export const PRE_EVENT_FIELDS = [
  {
    id: "inquiryResponseTime",
    label: "Time it took to reply to your inquiry",
    subtext: "Very quick",
  },
  {
    id: "phoneExperience",
    label: "How was your experience on the phone with a colleague?",
    subtext: "Very attentive",
  },
  {
    id: "quoteTime",
    label: "Time it took to get your quote",
    subtext: "Within 24 hours",
  },
];

export const EVENT_DAY_FIELDS = [
  {
    id: "arrivedOnTime",
    label: "Arrived on time",
    subtext: "Team arrived early",
  },
  {
    id: "setupOnTime",
    label: "Setup on time",
    subtext: "Team completed setup early",
  },
  { id: "startedOnTime", label: "Started on time", subtext: "Absolutely" },
  {
    id: "staffAppearance",
    label: "Appearance of staff",
    subtext: "Professional",
  },
  {
    id: "staffProfessionalism",
    label: "Staff professionalism",
    subtext: "Very professional",
  },
  {
    id: "personalizationQuality",
    label: "Quality of personalization",
    subtext: "Looked amazing",
  },
  {
    id: "swagQuality",
    label: "Quality of Swag product",
    subtext: "High quality",
  },
  { id: "eventFlow", label: "Flow of event", subtext: "Very efficient" },
  { id: "organization", label: "Organization", subtext: "Very organized" },
  {
    id: "attendeeReaction",
    label: "Reaction of attendees",
    subtext: "Guests loved it",
  },
];

export const OVERALL_SATISFACTION_FIELDS = [
  {
    id: "overallEventSatisfaction",
    label: "Overall, how satisfied were you with our services at your event?",
    subtext: "Your team was amazing",
  },
  {
    id: "overallCommunicationSatisfaction",
    label:
      "Overall, how satisfied were you with our communication and planning process leading up to the event?",
    subtext: "Your team was amazing",
  },
  {
    id: "overallProfessionalismSatisfaction",
    label:
      "Overall, how satisfied were you with our team's professionalism and performance on the day of the event?",
    subtext: "Your team was amazing",
  },
  {
    id: "overallQualitySatisfaction",
    label:
      "Overall, how satisfied were you with the quality of the services provided (e.g., booth set-up, product customization, customer engagement)?",
    subtext: "Very",
  },
];

export const TEXT_FIELDS = [
  {
    id: "guestComments",
    label:
      "Did your guests have any comments or feedback about our services? (Please elaborate)",
    section: "Event Day",
  },
  {
    id: "improvementSuggestions",
    label:
      "If no, do you have any suggestions on how we could improve our services?",
    section: "Future Collaboration",
  },
  {
    id: "additionalComments",
    label:
      "Is there anything else you would like to share about your experience with us?",
    section: "Final Comments",
  },
  {
    id: "testimonial",
    label:
      "Please consider leaving a written testimonial if you had a positive experience with us. Thank you!",
    section: "Written Testimonial",
  },
];

export const FUTURE_BOOKING_FIELD = {
  id: "wouldBookAgain",
  label: "Would you consider booking us again for future events?",
};

export const TESTIMONIAL_CONSENT_FIELD = {
  id: "testimonialConsent",
  label: "I agree to having my testimonial shared on promotional materials.",
};
