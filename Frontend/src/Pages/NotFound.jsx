import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <h1 className="text-9xl font-extrabold mb-4">404</h1>
      <h2 className="text-4xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-8 text-lg text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.
      </p>
      <span className="text-6xl mb-8">🚧</span>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-100 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
