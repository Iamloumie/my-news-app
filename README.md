# News Feed Application

A modern, responsive news feed application built with Next.js 14+, featuring real-time news fetching from Google News API, category filtering, search functionality, and a polished user interface.

## 🚀 Live Demo

[View Live Application](https://mynewsapp-mocha.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Features Deep Dive](#features-deep-dive)
- [Component Architecture](#component-architecture)
- [Deployment](#deployment)

## ✨ Features

- **Latest Headlines**: Display breaking news and trending stories
- **Search Functionality**: Search for specific news articles by keywords
- **Category Filtering**: Filter news by categories (Business, Technology, Sports, Entertainment, etc.)
- **Hero Article**: Prominent display of featured news story
- **Loading States**: Skeleton loaders for better user experience
- **Error Handling**: Graceful error states with retry options
- **Responsive Design**: Fully responsive across all device sizes
- **Single Article View**: Detailed view for individual articles
- **Server-Side Rendering**: Optimized performance with Next.js SSR

## 🛠 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: Google News API
- **Deployment**: [Vercel](https://vercel.com/)
- **Package Manager**: npm

## 📁 Project Structure

```
news-feed-app/
├── app/
│   ├── layout.tsx          # Root layout with metadata and providers
│   ├── page.tsx            # Home page (main news feed)
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── ArticleCard.tsx     # Individual article card component
│   ├── Badge.tsx           # Reusable badge component for categories
│   ├── Button.tsx          # Reusable button component
│   ├── ClientFeed.tsx      # Client-side feed wrapper with interactivity
│   ├── Error.tsx           # Error state component
│   ├── FeedControls.tsx    # Search and filter controls
│   ├── FeedControlsWrapper.tsx  # Wrapper for feed controls
│   ├── Header.tsx          # Application header
│   ├── HeaderWrapper.tsx   # Header wrapper component
│   ├── HeroArticle.tsx     # Featured article display
│   ├── Loading.tsx         # Loading skeleton component
│   └── SinglePostView.tsx  # Detailed article view
├── lib/
│   └── data.ts             # API integration and mock data logic
├── types/
│   └── index.ts            # TypeScript type definitions
├── public/                 # Static assets
├── .env.local              # Environment variables (not in repo)
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- Google News API key (or alternative news API)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd news-feed-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_google_news_api_key_here
   NEXT_PUBLIC_API_BASE_URL=https://newsapi.org/v2
   ```

   **How to get your API key:**
   - Visit [NewsAPI.org](https://newsapi.org/) or Google News API
   - Sign up for a free account
   - Generate your API key from the dashboard
   - Copy the key to your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_NEWS_API_KEY` | Your News API key | Yes |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the news API | Yes |

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Features Deep Dive

### Search Functionality
- Real-time search
- Debounced API calls for performance
- Search across headlines and descriptions

### Category Filtering
Available categories:
- General
- Business
- Technology
- Politics
- Sports
- Entertainment
- Health

### Loading States
- Skeleton loaders for articles
- Progressive loading for better UX
- Shimmer effects on loading cards

### Error Handling
- Network error detection
- API rate limit handling
- Retry mechanisms
- User-friendly error messages

## 🧩 Component Architecture

### Core Components

**ArticleCard.tsx**
- Displays individual news articles
- Shows thumbnail, title, description, source, and publish date
- Click to view full article

**HeroArticle.tsx**
- Featured article with larger display
- Priority loading for above-the-fold content

**FeedControls.tsx**
- Search input field
- Category filter buttons
- Active state management

**ClientFeed.tsx**
- Client-side wrapper for interactive features
- State management for search and filters
- Handles API calls and data fetching

**Loading.tsx**
- Skeleton loading states
- Maintains layout during data fetch

**Error.tsx**
- Error boundary component
- Retry functionality
- User-friendly error messages

### Utility Components

**Button.tsx**
- Reusable button with variants (primary, secondary, outline)
- Consistent styling across the app

**Badge.tsx**
- Category badges
- Tag displays

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - In Vercel project settings
   - Add your `NEXT_PUBLIC_NEWS_API_KEY`
   - Add your `NEXT_PUBLIC_API_BASE_URL`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

### Alternative Deployment Options
- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Deploy with GitHub integration
- **Self-hosted**: Use `npm run build` and `npm run start`


## 📝 Notes for Reviewers

This project was built as part of a frontend engineering interview to demonstrate:

- **Next.js Proficiency**: App Router, Server Components, and modern Next.js patterns
- **TypeScript Usage**: Type-safe code with proper interfaces and types
- **API Integration**: Real-world API consumption with error handling
- **Component Design**: Reusable, maintainable component architecture
- **State Management**: Client-side state with React hooks
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Experience**: Loading states, error handling, and smooth interactions
- **Performance**: Optimized rendering and efficient data fetching
- **Code Organization**: Clean folder structure and separation of concerns


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

- GitHub: [@Iamloumie](https://github.com/Iamloumie)
- Portfolio Website: [Adedamola Lawal](https://iamloumie.vercel.app)

---

Built with ❤️ using Next.js and Tailwind CSS