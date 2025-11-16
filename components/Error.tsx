"use client"; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from './Button';

/**
 * error.tsx
 * Next.js automatically shows this component if an error is thrown in 'page.tsx'.
 * This replaces the 'error' state logic.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-20">
      <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block mb-4">
        <h2>Oopss!!! Something went wrong!</h2>
        <p className="text-sm">{error.message}</p>
      </div>
      <p className="mb-4">Failed to load news articles. Please try again.</p>
      <Button
        onClick={
          // Attempt to re-render the page
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}