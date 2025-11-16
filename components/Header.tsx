"use client";
import { Bell, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState } from "react";

 // This component uses state and hooks, so it must be a client component


/**
 * HEADER
 * Navigation, Search, and Branding
 * This component now uses Next.js hooks for navigation
 */

export const Header: FC = () => {
    const categories = ['All', 'Top Stories', 'World', 'Politics', 'Business', 'Technology', 'Sports', 'Health', 'Entertainment'];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Next.js hooks for managin URL state
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get current state from URL
    const activeCategory = searchParams.get('category') || 'All';
    const currentSearch = searchParams.get('q') || '';

    // Local state for the search input
    const [searchTerm, setSearchTerm] = useState(currentSearch);

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('category', category);

        // Reset search when changing category
        params.delete('q');
        router.push(`?${params.toString()}`);
        setSearchTerm('');
        setIsMenuOpen(false); // Close Mobile Menu on selection
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.set('q', searchTerm);
        router.push(`?${params.toString()}`);
        setSearchTerm('');
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl font-serif">
                            N
                        </div>
                        <span className="text-xl font-bold text-gray-900 font-serif tracking-tight">
                            NewsToday
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`hover:text-blue-600 transition-colors ${activeCategory === cat ? 'text-blue-600 font-bold' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="hidden sm:block relative group"
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all w-48 focus:w-64"
                        />
                    </form>

                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>

                    <div className="w-8 h-8 rounded-full bg-orange-100 overflow-hidden border border-gray-200">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="User Avatar"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg animate-in slide-in-from-top-5">
                    <div className="p-4 space-y-2">
                        <form onSubmit={handleSearchSubmit} className="mb-4">
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4"
                            />
                        </form>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`block w-full text-left px-4 py-2 rounded-lg ${activeCategory === cat ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}