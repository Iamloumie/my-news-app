"use client"; // Needs to be client for stateful interactions

import { Article, Comment } from "@/types";
import { ArrowLeft, Bookmark, ChevronRight, Heart, MessageSquare, Share2 } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "./Button";

// DATE HELPER FUNCTION
const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString('en-US', options);
};

// ------ Related Article card ------

interface RelatedArticleCardProps {
    article: Article;
    onClick: (article: Article) => void;
}

const RelatedArticleCard: FC<RelatedArticleCardProps> = ({ article, onClick }) => (
    <div
        className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => onClick(article)}
    >
        <div>
            <img
                src={article.urlToImage || 'https://placehold.co/100x100/e2e8f0/475569?text=No+Image'}
                alt={article.title}
                className="w-full h-full object-cover"
            />
        </div>

        <div>
            <div className="text-blue-600 text-xs font-bold mb-1 uppercase">
                {article.category}
            </div>
            <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 leading-tight text-sm">
                {article.title}
            </h4>
            <p className="text-xs text-gray-500">
                {formatDate(article.publishedAt)}
            </p>
        </div>
    </div>
)

// Properties for the Single post view
interface SinglePostViewProps {
    article: Article;
    goBack: () => void;
    relatedArticles: Article[];
    onRelatedArticleClick: (article: Article) => void;
}

// Detailed view of an article
export const SinglePostView: FC<SinglePostViewProps> = ({
    article,
    goBack,
    relatedArticles,
    onRelatedArticleClick
}) => {

    // ---- CLIENT-SIDE STATE FOR INTERACTIVITY ----
    const [likes, setLikes] = useState(1200); // start with 1.2k
    const [isLiked, setIsLiked] = useState(false);
    const [newCommentText, setNewCommentText] = useState("");
    
    const [comments, setComments] = useState<Comment[]>([
        {
            user: "Ethan Carter",
            date: "November, 2025",
            text: "Great coverage of the conference! It's so exciting to see the progress in AI and sustainable tech",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan"
        },
        {
            user: "Olivia Bennett",
            date: "October, 2025",
            text: "I agree! The focus on ethical considerations is also very important.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia"
        }
    ]);

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
        } else {
            setLikes(likes + 1);
            setIsLiked(true);
        }
    }

    const handlePostComment = () => {
        if (!newCommentText.trim()) return; // Don't post empty comments

        const newComment: Comment = {
            user: "Felix (You)", // Simulate the current user
            date: formatDate(new Date().toISOString()),
            text: newCommentText,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        };

        setComments([newComment, ...comments]); // Add new comments to the tap
        setNewCommentText(""); // Clear the textarea
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={goBack}
                className="mb-6 flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors group"
            >
                <ArrowLeft
                    size={16}
                    className="mr-2 group-hover:-translate-x-1 transition-transform"
                />
                Back to Feed
            </button>

            {/** MAIN ARTICLE CONTENT */}
            <article className="max-w-4xl mx-auto bg-white md:rounded-2xl overflow-hidden md:shadow-sm md:border border-gray-100 pb-12">
                {/** Breadcrumbs */}
                <div className="px-4 md:px-12 pt-8 md:pt-12 pb-6 flex items-center gap-2 text-sm text-gray-500">
                    <span>News</span>
                    <ChevronRight size={14} />
                    <span className="text-blue-600 font-medium">
                        {article.category || 'General'}
                    </span>
                </div>

                {/** Title Block */}
                <div className="px-4 md:px-12 mb-8">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author}`}
                                    alt="Author"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-gray-900">
                                    By {article.author || 'Editorial Staff'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Published on {formatDate(article.publishedAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" className="rounded-full p-2">
                                <Bookmark size={20} />
                            </Button>
                            <Button variant="ghost" className="rounded-full p-2">
                                <Share2 size={20} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/** Hero Image */}
                <div className="mb-10 w-full h-[400px] md:h-[500px] bg-gray-100">
                    <img
                        src={article.urlToImage || 'https://placehold.co/1200x600'}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/** --- Article Body --- */}
                <div className="px-4 md:px-12 max-w-3xl mx-auto">
                    {/** Article Text */}
                    <div
                        className="text-gray-700 mb-12"
                        style={{  fontSize: '1.125rem', lineHeight: 1.75 }}
                    >
                        <p className="text-xl leading-relaxed font-medium text-gray-900 mb-6">
                            {article.description || article.content}
                        </p>
                        <p>
                            {article.content ? article.content.split('[')[0] : 'Full article content would be displayed here. Since this is a demo using the free tier of NewsAPI, full content is restricted. However, in a real integration, this section would contain the complete body text parsed from the backend'}
                        </p>
                        <p className="mt-6">
                            The Annual Tech Innovators Conference wrapped up yesterday.....
                        </p>
                        <p className="mt-6">
                            The Overall sentiment was optimistic...
                        </p>
                    </div>

                    {/** -- Live Interaction bar -- */}
                    <div className="flex items-center justify-between border-t border-b border-gray-100 py-6 mb-12">
                        {/** LIKE AND COMMENTS ICON COUNTER */}
                        <div className="flex gap-6">
                            {/** LIKE Button */}
                            <button
                                className={`flex items-center gap-2 transition-colors ${
                                    isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                                }`}
                                onClick={handleLike}
                            >
                                <Heart
                                    size={20}
                                    fill={isLiked ? 'currentColor' : 'none'}
                                />
                                <span className="text-sm font-medium">
                                    {/** Format likes (e.g., 1.2k) */}
                                    {Intl.NumberFormat('en-US', {
                                        notation: 'compact',
                                        compactDisplay: 'short',
                                    }).format(likes)}
                                </span>
                            </button>

                            {/** Comments Counter Icon */}
                            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                                <MessageSquare size={20} />
                                <span className="text-sm font-medium">{comments.length}</span>
                            </button>
                        </div>

                        {/** BOOKMARK AND SHARE ICON COUNTER */}
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                                <Bookmark size={18} /> Save
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                                <Share2 size={18} /> Share
                            </button>
                        </div>
                    </div>

                    {/** ---- LIVE RELATED ARTICLES ---- */}
                    <div className="mb-12">
                        <h3 className="font-serif font-bold text-2xl mb-6">
                            Related Articles
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedArticles.slice(0, 2).map((relArticle, idx) => (
                                <RelatedArticleCard
                                    key={idx}
                                    article={relArticle}
                                    onClick={onRelatedArticleClick}
                                />
                            ))}
                        </div>
                    </div>

                    {/** --- LIVE COMMENTS SECTION --- */}
                    <div className="bg-gray-50 rounded-xl p-4 md:p-8">
                        <h3 className="font-serif font-bold text-xl mb-6">
                            Comments ({comments.length})
                        </h3>

                        {/** Post new comment */}
                        <div className="flex gap-4 items-start mb-8">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 shrink-0">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="me" />
                            </div>

                            <div className="flex-1">
                                <textarea
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-24 bg-white"
                                    placeholder="Add a comment..."
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                    <Button
                                        variant="primary"
                                        className="text-sm px-6"
                                        onClick={handlePostComment}
                                    >
                                        Post Comment
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/** Existing comments list */}
                        <div className="space-y-6">
                            {comments.map((comment, i) => (
                                <div key={i} className="flex gap-4">
                                    <img
                                        src={comment.avatar}
                                        alt={comment.user}
                                        className="w-10 h-10 rounded-full border-gray-200 bg-white"
                                    />

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-sm text-gray-900">
                                                {comment.user}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {comment.date}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </article>
        </div>
    );
};