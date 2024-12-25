"use client";

import { useState } from "react";
import SuccessMessage from "../success-message/index";

interface TestimonialReviewProps {
  originalData: any;
  testimonial: string;
  onEdit: () => void;
  onApprove: (testimonial: string) => void;
  onRegenerate: () => void;
  onCancel: () => void;
}

export default function TestimonialReview({
  originalData,
  testimonial,
  onEdit,
  onApprove,
  onRegenerate,
  onCancel,
}: TestimonialReviewProps) {
  const [editedTestimonial, setEditedTestimonial] = useState(testimonial);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      await onRegenerate();
      setEditedTestimonial(testimonial);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleApprove = async (testimonial: string) => {
    const payload = {
      ...originalData,
      finalTestimonial: testimonial,
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit survey");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit survey. Please try again.");
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Review Your Testimonial</h2>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editedTestimonial}
            onChange={(e) => setEditedTestimonial(e.target.value)}
            className="w-full p-4 border rounded min-h-[300px]"
          />
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsEditing(false);
                onApprove(editedTestimonial);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTestimonial(testimonial);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="p-4 bg-gray-50 rounded-lg">
              {isRegenerating && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-600">
                      Regenerating...
                    </span>
                  </div>
                </div>
              )}
              <p className="text-lg">{editedTestimonial}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <span>Edit Text</span>
            </button>
            <button
              onClick={() => handleApprove(editedTestimonial)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
            >
              <span>Submit Testimonial</span>
            </button>
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-yellow-300 flex items-center gap-2"
            >
              {isRegenerating ? (
                <span>Regenerating...</span>
              ) : (
                <span>Generate New Version</span>
              )}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
            >
              <span>Back to Survey</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
