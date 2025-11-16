/**
 * The main Page
 * It's a SERVER COMPONENT by default
 * It fetches data and handle search/category as inputted by user by filtering the server
 */

// Force the page to be dynamic (not statically generated)
export const dynamic = 'force-dynamic';


import { ClientFeed } from "@/components/ClientFeed";
import { getTopHeadlines, searchEverything } from "@/lib/data";
import { Article } from "@/types";

// Page properties that defines the search params received from the URL
interface PageProps {
    searchParams?: {
        category?: string;
        q?: string;
    };
}

export default async function Home({ searchParams }: PageProps) {
    // 1. Get category and search query from URL
    const category = searchParams?.category || 'All';
    const searchQuery = searchParams?.q || '';

    let articles: Article[] = [];

    // 2. ---  THE FETCHING LOGIC ---
    // If there's a search query, use the search endpoint. 
    // Otherwise, use the top-headlines endpoint
    if (searchQuery) {
        // User is searching
        articles = await searchEverything(searchQuery);
    } else {
        // User is browsing by category
        articles = await getTopHeadlines(category)
    }

    // 3. Pass the server-prepared data to a Client Component
    return (
        <>
            {/** The large search bar and categories */}
            <ClientFeed
                articles={articles}
                searchQuery={searchQuery}
            />
        </>
    );
}