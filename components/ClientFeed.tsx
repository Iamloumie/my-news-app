"use client"; // This component manages client-side view state

import { useState } from 'react';
import { HeroArticle } from './HeroArticle';
import { ArticleCard } from './ArticleCard';
import { SinglePostView } from './SinglePostView';
import { FeedControls } from './FeedControls'; // <-- Import FeedControls here
import { Article } from '@/types';

interface ClientFeedProps {
  articles: Article[];
  searchQuery: string;
}

export const ClientFeed: React.FC<ClientFeedProps> = ({ articles, searchQuery }) => {
  const [view, setView] = useState<'home' | 'post'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // --- Navigation Handlers ---
  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setView('post');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setView('home');
    setSelectedArticle(null);
    window.scrollTo(0, 0);
  };

  // --- Prepare Articles for Display ---
  const breakingNews: Article | undefined = articles.find(a => a.isBreaking) || articles[0];
  const recentArticles: Article[] = articles.filter(a => a !== breakingNews);
  
  const relatedArticles = articles.filter(a => a.title !== selectedArticle?.title);

  // --- Render ---
  return (
    <>
      {/* --- FIX: Conditional Rendering --- */}
      {/* Only show FeedControls and the Home layout if view is 'home' */}
      {view === 'home' ? (
        <>
          <FeedControls />
          <div className="animate-in fade-in duration-500">
            {!searchQuery && breakingNews && (
              <HeroArticle article={breakingNews} onClick={handleArticleClick} />
            )}
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Recent Articles'}
              </h2>
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {(searchQuery ? articles : recentArticles).map((article, idx) => (
                    <ArticleCard 
                      key={article.url || `${article.title}-${idx}`} 
                      article={article} 
                      onClick={handleArticleClick} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  {searchQuery 
                    ? `No articles found for "${searchQuery}".`
                    : 'No articles found in this category.'
                  }
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        // Otherwise, just show the SinglePostView
        selectedArticle && (
          <SinglePostView 
            article={selectedArticle} 
            goBack={goHome}
            relatedArticles={relatedArticles}
            onRelatedArticleClick={handleArticleClick}
          />
        )
      )}
    </>
  );
};