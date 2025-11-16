import { Article, NewsApiResponse } from "@/types";

// ---- CONFIGURATION FILE - DO NOT EDIT ----
const API_KEY = process.env.NEWS_API_KEY;
const USE_MOCK_DATA_ON_ERROR = true;
// -------------------------------------------

// --- MOCK DATA FOR TESTING PURPOSES ---
const MOCK_ARTICLES: Article[] = [
    {
        source: { id: 'nima', name: 'Nima News' },
        author: 'Editorial Team',
        title: 'Breaking: Major Political Event Unfolds',
        description: 'A significant political event has taken place, impacting global relations and sparking widespread discussions. Our team provides in-depth analysis and coverage of the unfolding situation.',
        url: '#',
        urlToImage: 'public/breakingNews.jpg',
        publishedAt: '2025-11-07T10:00:00Z',
        content: 'In a surprising turn of events, a major political development has occurred that is set to change the landscape of international relations. Experts weigh in on the potential implications and future outcomes of this event...',
        category: 'Politics',
        isBreaking: true,
    },
    {
        source: { id: 'tech', name: 'Tech Daily' },
        author: 'Amelia Harper',
        title: 'Tech Giants Release Groundbreaking Technology',
        description: ' In a collaborative effort, leading technology companies have unveiled a new innovation that promises to revolutionize the industry. This breakthrough is expected to enhance user experiences and drive future advancements.',
        url: '#',
        urlToImage: 'public/tech.jpg',
        publishedAt: '2025-10-07T10:00:00Z',
        content: 'The technology sector is abuzz with excitement as major players come together to introduce a cutting-edge solution that could redefine how we interact with digital platforms. Industry experts are optimistic about the potential applications and benefits of this new technology...',
        category: 'Technology',
    },
    {
        source: { id: 'economy', name: 'Global Econ' },
        author: 'John Smith',
        title: 'Global Economic Outlook: A mixed Bag',
        description: 'The global economy is showing signs of both recovery and challenges as markets respond to various geopolitical and financial factors. Analysts provide insights into the trends shaping the economic landscape and what to expect in the coming months.',
        url: '#',
        urlToImage: 'public/economy.jpg',
        publishedAt: '2025-09-08T10:00:00Z',
        content: 'As nations navigate through a complex web of economic indicators, the outlook remains cautiously optimistic. While certain sectors are experiencing growth, others face hurdles that could impact overall stability. Experts recommend strategies for businesses and investors to adapt to these evolving conditions...',
        category: 'Business',
    },
    {
        source: { id: 'local', name: 'City Ledger' },
        author: 'Sarah Jenkins',
        title: 'Local Elections See Record Voter Turnout',
        description: 'In an unprecedented display of civic engagement, local elections across the country have witnessed a record number of voters participating. This surge in turnout reflects a growing interest in community issues and governance.',
        url: '#',
        urlToImage: 'public/election.jpg',
        publishedAt: '2025-08-10T10:00:00Z',
        content: 'The recent local elections have set new benchmarks for voter participation, with communities rallying to make their voices heard. Election officials report that the increased turnout is a testament to the public\'s desire for change and involvement in shaping local policies. Analysts discuss the implications of this trend for future elections and political engagement...',
        category: 'Politics',
    },
    {
        source: { id: 'entertainment', name: 'BBC Radio' },
        author: 'Emily Davis',
        title: 'Cultural Festival Celebrates Diversity and Unity',
        description: 'A vibrant cultural festival is taking place this weekend, showcasing the rich traditions and artistic expressions of various communities. Our team provides in-depth analysis and coverage of the unfolding situation.',
        url: '#',
        urlToImage: 'public/entertainment.jpg',
        publishedAt: '2025-07-04T10:00:00Z',
        content: 'The annual cultural festival has returned, bringing together people from all walks of life to celebrate diversity and unity through art, music, and cuisine. Attendees can look forward to a variety of performances and exhibitions that highlight the unique contributions of different entertainments. Organizers emphasize the importance of such events in fostering understanding and appreciation among communities...',
        category: 'Entertainment',
    },
    {
        source: { id: 'health', name: 'Health Ledger' },
        author: 'Laura Mitchell',
        title: 'New Health Guidelines Released Amid Rising Concerns',
        description: 'In response to emerging health concerns, new guidelines have been issued by leading health organizations. These recommendations aim to address current challenges and promote well-being among the population.',
        url: '#',
        urlToImage: 'public/health.jpg',
        publishedAt: '2025-06-09T10:00:00Z',
        content: 'Health authorities have released updated guidelines to help individuals navigate the evolving landscape of health and wellness. The recommendations focus on preventive measures, lifestyle adjustments, and community support to enhance overall health outcomes. Experts stress the importance of staying informed and adhering to these guidelines to mitigate risks associated with emerging health issues...',
        category: 'Health',
    },
    {
        source: { id: 'sports', name: 'Manchester News' },
        author: 'Fabrizio Romano',
        title: 'Championship Finals: A Thrilling Conclusion',
        description: 'The championship finals have delivered an exhilarating conclusion to the season, with teams showcasing exceptional skill and determination. Fans are treated to unforgettable moments as the best in the sport compete for the coveted title.',
        url: '#',
        urlToImage: 'public/sport.jpg',
        publishedAt: '2025-05-08T10:00:00Z',
        content: 'The finals of the championship have lived up to the hype, providing spectators with edge-of-the-seat action and memorable performances. Key players have risen to the occasion, demonstrating their prowess and contributing to a series of thrilling matches. Analysts break down the strategies and highlights that defined this year\'s championship, celebrating the spirit of competition and sportsmanship...',
        category: 'Sports',
    },
];

// --- API FETCHING FUNCTION ---

/**
 * This first function will run on the server side in Next.js
 * It gets Top headlines by category
 * Used when a user clicks a category pill
 */

export async function getTopHeadlines(category: string = 'All'): Promise<Article[]> {
    // Map UI categories to NewsAPI categories
    const categoryMap: { [key: string]: string } = {
        'All': 'general',
        'Top Stories': 'general',
        'World': 'general',
        'Politics': 'politics',
        'Business': 'business',
        'Tech': 'technology',
        'Sports': 'sports',
        'Health': 'health',
        'Entertainment': 'entertainment',
    };

    const apiCategory = categoryMap[category] || 'general';
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${apiCategory}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url, {
            // Use cache for 15 minutes to avoid hitting API rate limits
            next: { revalidate: 900 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }

        const data = await response.json() as NewsApiResponse;

        // Filter the news articles

        return data.articles.map((art: Article) => ({
            ...art,
            category: category === 'All' ? 'General' : category
        }));
    } catch (err) {
        console.warn(`API Fetch Failed for getTopHeadlines (${(err as Error).message}). Switching to mock data.`);
        

        if (USE_MOCK_DATA_ON_ERROR) {
            // Filter Mock data locally
            if (category !== 'All' && category !== 'Top Stories') {
                return MOCK_ARTICLES.filter(a => a.category === category);
            }
            return MOCK_ARTICLES;
        } else {
            throw err;
        }
    }
};

/**
 * Function 2: Searches all articles
 * Used when a user types in the search bar
 */
export async function searchEverything(query: string): Promise<Article[]> {
    const url =`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=popularity&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url, { next: { revalidate: 900 } }); // 15 min cache
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        const data = await response.json() as NewsApiResponse;

        // Assign a category based on the source name for consistency
        return  data.articles.map((art: Article) => ({
                ...art,
                category: art.source.name || 'Search'
            }));
        
    } catch (err) {
        console.warn(`API Fetch failed for searchEverything (${(err as Error).message}). Switching to Mock Data`);

        if (USE_MOCK_DATA_ON_ERROR) {
            // Simulate search by filtering mock data
            const q = query.toLowerCase();
            return MOCK_ARTICLES.filter(
                a =>
                    a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q)
            );
        } else {
            throw err;
        }
    }
}