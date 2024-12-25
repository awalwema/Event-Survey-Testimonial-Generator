export default function SuccessMessage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold">Thank You!</h2>
      <p className="text-gray-600">
        Your feedback has been successfully submitted. We truly appreciate you
        taking the time to share your experience with us.
      </p>
    </div>
  );
}
