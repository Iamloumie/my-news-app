// --- TYPE DEFINITIONS ---
// All interfaces and types used across the application

// Describes the structure of a NewsAPI article
export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string; // ISO date string
    content: string | null;
    // --- Client-side enhancements ---
    category: string; // e.g., "technology", "sports"
    isBreaking?: boolean; // Flag for breaking news
}

// The expected structure of the response from NewsAPI
export interface NewsApiResponse {
    status: string; // "ok" or "error"
    totalResults: number;
    articles: Article[];
}

// Structure for mock comments associated with articles
export interface Comment {
    user: string;
    date: string; // ISO date string
    text: string;
    avatar: string; // URL to user's avatar image
}