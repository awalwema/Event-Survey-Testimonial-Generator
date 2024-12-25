// src/components/survey-form/index.tsx
"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import TestimonialReview from "../testimonial-review";

import {
  SurveyData,
  SatisfactionRating,
  YesNoResponse,
  basicInfoSchema,
  type BasicInfoErrors,
  EventType,
  EVENT_TYPE_OPTIONS,
} from "@/lib/types";
import {
  SATISFACTION_OPTIONS,
  YES_NO_OPTIONS,
  PRE_EVENT_FIELDS,
  EVENT_DAY_FIELDS,
  OVERALL_SATISFACTION_FIELDS,
  TEXT_FIELDS,
  FUTURE_BOOKING_FIELD,
  TESTIMONIAL_CONSENT_FIELD,
} from "./survey-fields";

export default function SurveyForm() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<SurveyData>({
    firstName: "",
    lastName: "",
    company: "",
    eventDate: "",
    inquiryResponseTime: "",
    phoneExperience: "",
    quoteTime: "",
    arrivedOnTime: "",
    setupOnTime: "",
    startedOnTime: "",
    staffAppearance: "",
    staffProfessionalism: "",
    personalizationQuality: "",
    swagQuality: "",
    eventFlow: "",
    organization: "",
    attendeeReaction: "",
    guestComments: "",
    overallEventSatisfaction: "",
    overallCommunicationSatisfaction: "",
    overallProfessionalismSatisfaction: "",
    overallQualitySatisfaction: "",
    wouldBookAgain: "",
    improvementSuggestions: "",
    additionalComments: "",
    testimonial: "",
    testimonialConsent: "Yes",
    eventType: "",
    swagItem: "",
  });
  const [step, setStep] = useState<"form" | "review">("form");
  const [generatedTestimonial, setGeneratedTestimonial] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<BasicInfoErrors>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const validateBasicInfo = () => {
    try {
      basicInfoSchema.parse({
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: BasicInfoErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof BasicInfoErrors;
          fieldErrors[field] = [err.message];
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (!validateBasicInfo()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate testimonial");
      }

      const data = await response.json();
      setGeneratedTestimonial(data.testimonial);
      setStep("review");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate testimonial. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (testimonial: string) => {
    // Here we'll later add the Zapier webhook integration
    console.log("Approved testimonial:", testimonial);
  };

  if (step === "review") {
    return (
      <TestimonialReview
        originalData={formData}
        testimonial={generatedTestimonial}
        onEdit={() => setStep("form")}
        onApprove={handleApprove}
        onRegenerate={() => handleSubmit({ preventDefault: () => {} } as any)}
        onCancel={() => setStep("form")}
      />
    );
  }

  const handleRatingChange = (
    fieldId: keyof SurveyData,
    value: SatisfactionRating
  ) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleYesNoChange = (
    fieldId: keyof SurveyData,
    value: YesNoResponse
  ) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const RatingGroup = ({
    id,
    label,
    subtext,
  }: {
    id: keyof SurveyData;
    label: string;
    subtext?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-4">
        {subtext && (
          <span className="text-sm text-gray-600 italic min-w-[120px]">
            {subtext}
          </span>
        )}
        <div className="flex gap-4">
          {SATISFACTION_OPTIONS.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name={id}
                value={option}
                checked={formData[id] === option}
                onChange={() => handleRatingChange(id, option)}
                className="form-radio"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const YesNoGroup = ({
    id,
    label,
  }: {
    id: keyof SurveyData;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex gap-4">
        {YES_NO_OPTIONS.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="radio"
              name={id}
              value={option}
              checked={formData[id] === option}
              onChange={() => handleYesNoChange(id, option)}
              className="form-radio"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Post Event Feedback Survey</h2>

      {/* Basic Info */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              First Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className={`w-full p-2 border rounded ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName?.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {error}
              </p>
            ))}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Last Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className={`w-full p-2 border rounded ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName?.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            What company are you with? Or, which client did we represent?
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className={`w-full p-2 border rounded ${
              errors.company ? "border-red-500" : ""
            }`}
          />
          {errors.company?.map((error, index) => (
            <p key={index} className="text-red-500 text-sm mt-1">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Event Start Date
          </label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) =>
              setFormData({ ...formData, eventDate: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            What type of event?
          </label>
          <select
            value={formData.eventType}
            onChange={(e) =>
              setFormData({
                ...formData,
                eventType: e.target.value as EventType,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select event type</option>
            {EVENT_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pre-Event Communication */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Pre-Event Communication</h3>
        {PRE_EVENT_FIELDS.map((field) => (
          <RatingGroup
            key={field.id}
            id={field.id as keyof SurveyData}
            label={field.label}
            subtext={field.subtext}
          />
        ))}
      </div>

      {/* Event Day */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Event Day</h3>
        {EVENT_DAY_FIELDS.map((field) => (
          <RatingGroup
            key={field.id}
            id={field.id as keyof SurveyData}
            label={field.label}
            subtext={field.subtext}
          />
        ))}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Did your guests have any comments or feedback about our services?
            (Please elaborate)
          </label>
          <textarea
            value={formData.guestComments}
            onChange={(e) =>
              setFormData({ ...formData, guestComments: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            What was your swag item?
          </label>
          <input
            type="text"
            value={formData.swagItem}
            onChange={(e) =>
              setFormData({ ...formData, swagItem: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Overall Expectations */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Overall Expectations</h3>
        {OVERALL_SATISFACTION_FIELDS.map((field) => (
          <RatingGroup
            key={field.id}
            id={field.id as keyof SurveyData}
            label={field.label}
            subtext={field.subtext}
          />
        ))}
      </div>

      {/* Future Collaboration */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Future Collaboration</h3>
        <YesNoGroup
          id={FUTURE_BOOKING_FIELD.id as keyof SurveyData}
          label={FUTURE_BOOKING_FIELD.label}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            If no, do you have any suggestions on how we could improve our
            services?
          </label>
          <textarea
            value={formData.improvementSuggestions}
            onChange={(e) =>
              setFormData({
                ...formData,
                improvementSuggestions: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
      </div>

      {/* Final Comments */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Final Comments</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Is there anything else you would like to share about your experience
            with us?
          </label>
          <textarea
            value={formData.additionalComments}
            onChange={(e) =>
              setFormData({ ...formData, additionalComments: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
      </div>

      {/* Written Testimonial */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Written Testimonial</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Please consider leaving a written testimonial if you had a positive
            experience with us. Thank you!
          </label>
          <textarea
            value={formData.testimonial}
            onChange={(e) =>
              setFormData({ ...formData, testimonial: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <YesNoGroup
          id={TESTIMONIAL_CONSENT_FIELD.id as keyof SurveyData}
          label={TESTIMONIAL_CONSENT_FIELD.label}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {isLoading ? "Generating..." : "Next"}
      </button>
    </form>
  );
}
