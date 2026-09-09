'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
        !
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong!</h2>
      <p className="text-slate-600 mb-6 max-w-md">{error.message || "Failed to load dashboard resources."}</p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}