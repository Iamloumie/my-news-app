// components/HeaderWrapper.tsx
import { Suspense } from 'react';
import { Header } from './Header';

/**
 * Wrapper component that adds Suspense boundary around Header
 * This is required because Header uses useSearchParams()
 */
export function HeaderWrapper() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl font-serif">
              N
            </div>
            <span className="text-xl font-bold text-gray-900 font-serif tracking-tight">
              NewsToday
            </span>
          </div>
        </div>
      </header>
    }>
      <Header />
    </Suspense>
  );
}