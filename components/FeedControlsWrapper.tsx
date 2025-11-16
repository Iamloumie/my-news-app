// components/FeedControlsWrapper.tsx
import { Suspense } from 'react';
import { FeedControls } from './FeedControls';

/**
 * Wrapper component that adds Suspense boundary around FeedControls
 * This is required because FeedControls uses useSearchParams()
 */
export function FeedControlsWrapper() {
  return (
    <Suspense fallback={
      <div className="mb-8">
        <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse mb-6" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-20 h-9 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <FeedControls />
    </Suspense>
  );
}