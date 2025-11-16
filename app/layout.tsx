import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css'; // Your global styles (tailwind)
import { HeaderWrapper } from '@/components/HeaderWrapper';

// Setup fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NewsToday - Your Daily Feed',
  description: 'Interview task for a frontend engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen bg-white font-sans text-slate-900 pb-20">
        
        {/* Header is part of the layout, so it persists on all pages */}
        <HeaderWrapper />
        {/* 'children' will be the 'page.tsx' file */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {children}
        </main>

        {/* Simple Footer */}
        <footer className="border-t border-gray-100 mt-20 py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 text-sm text-gray-500 mb-8">
              <a href="#" className="hover:text-blue-600">About Us</a>
              <a href="#" className="hover:text-blue-600">Contact</a>
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
            </div>
            <p className="text-gray-400 text-sm">© 2025 NewsToday. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}