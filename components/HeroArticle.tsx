import { Article } from "@/types";
import { FC } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";

// Properties for the Hero Article
interface HeroArticleProps {
    article: Article;
    onClick: (article: Article) => void;
}

// REUSABLE HERO ARTICLE COMPONENT

export const HeroArticle: FC<HeroArticleProps> = ({ article, onClick }) => {
    return (
        <section
            className="mb-12 relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
            onClick={() => onClick(article)}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <img
                src={article.urlToImage || 'https://placehold.co/1200x600/1a2b3c/FFF?text=News'}
                alt={article.title}
                className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 text-white max-w-4xl">
                <Badge className="bg-blue-600 text-white mb-4">
                    Breaking News
                </Badge>

                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                    {article.title}
                </h1>

                <p className="text-lg text-gray-200 mb-6 line-clamp-2 md:line-clamp-none max-w-2xl">
                    {article.description}
                </p>

                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(article);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                >
                    Read More
                </Button>

                <div className="absolute bottom-4 right-8 opacity-10 font-black text-9xl hidden lg:block pointer-events-none select-none">
                    NEWS
                </div>
            </div>

        </section>
    )
}