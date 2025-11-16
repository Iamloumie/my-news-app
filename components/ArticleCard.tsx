import { Article } from "@/types";
import { FC } from "react";

// DATE HELPER FUNCTION
const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Properties for the ArticleCard component
interface ArticleCardProps {
    article: Article;
    onClick: (article: Article) => void;
}

// ---- REUSABLE ARTICLE CARD COMPONENT FOR ARTICLE FEEDS ----

export const ArticleCard: FC<ArticleCardProps> = ({ article, onClick }) => {
    return (
        <article
            className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-100"
            onClick={() => onClick(article)}
        >
            <div className="relative overflow-hidden h-48">
                <img
                    src={article.urlToImage || 'https://placehold.co/600x400/e2e8f0/475569?text=No+Image'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    {article.category && (
                        <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">
                            {article.category}
                        </span>
                    )}
                    <span className="text-gray-400 text-xs">
                        •
                    </span>
                    <span className="text-gray-400 text-xs">
                        {formatDate(article.publishedAt)}
                    </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {article.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-auto">
                    <span>By {article.author || article.source.name || 'News Desk'}</span>
                </div>
            </div>
        </article>
    )
}