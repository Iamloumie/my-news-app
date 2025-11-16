"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, FormEvent, useState } from "react";

/**
 * The component for the large search bar and category bills on the homepage
 */

export const FeedControls: FC = () => {
    const categories = ['All', 'Top Stories', 'World', 'Politics', 'Business', 'Technology', 'Sports', 'Health', 'Entertainment'];

    const router = useRouter();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get('category') || 'All';
    const currentSearch = searchParams.get('q') || '';

    const [searchTerm, setSearchTerm] = useState(currentSearch);


    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('category', category);
        params.delete('q'); // Reset search when category changes
        router.push(`?${params.toString()}`, { scroll: false }); // Don't scroll to the top

        setSearchTerm('');
    }

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);

        if (searchTerm.trim()) {
            params.set('q', searchTerm);
            router.push(`?${params.toString()}`, { scroll: false });
            setSearchTerm('');
        } else {
            // If search is empty, clear the query
            params.delete('q');
            router.push(`?${params.toString()}`, { scroll: false }); 
        }
    }

    return (
        <div className="mb-8">
            {/** Large search bar */}
            <form
                onSubmit={handleSearchSubmit}
                className="relative w-full mb-6"
            >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for news, topics...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
            </form>

            {/** Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-5 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${
                            activeCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    )
}