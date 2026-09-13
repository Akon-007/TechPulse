import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import Footer from './components/Footer';
import { POSTS_DATA } from './data/posts';

const CATEGORIES = [
  "All",
  "Design",
  "Product",
  "Software Engineering",
  "Management",
  "Customer Success"
] as const;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter posts by search query and category
  const filteredPosts = useMemo(() => {
    return POSTS_DATA.filter((post) => {
      const matchesCategory = 
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredPosts.length));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-purple-100 selection:text-purple-900">
      
      {/* Navigation Bar */}
      <Nav />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          id="hero-section"
          aria-labelledby="hero-title"
          className="relative overflow-hidden bg-violet-50/70 border-b border-violet-100/60"
        >
          {/* Subtle decorative background gradients */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,243,255,0.9) 0%, rgba(245,243,255,0.5) 60%, rgba(255,255,255,1) 100%)",
            }}
          />
          {/* Decorative geometric angled bands */}
          <div className="pointer-events-none absolute -left-20 bottom-0 h-28 w-80 -rotate-6 bg-violet-200/40 rounded-3xl blur-sm" />
          <div className="pointer-events-none absolute -right-24 top-16 h-20 w-96 -rotate-3 bg-purple-200/30 rounded-3xl blur-sm" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pb-20 pt-14 sm:pt-20 text-center">
            <span 
              id="hero-badge"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs sm:text-sm font-semibold text-purple-700 shadow-sm border border-purple-100 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              TechPulse Insights
            </span>

            <h1 
              id="hero-title"
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Resources and insights
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The latest engineering breakthroughs, product methodologies, architectural design systems, and tech culture.
            </p>

            {/* Search Box */}
            <div className="mx-auto mt-8 max-w-md">
              <label htmlFor="search-input" className="relative block">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(6); // reset pagination on search
                  }}
                  placeholder="Search articles, topics, or authors..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                />
                {searchQuery && (
                  <button
                    id="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </label>
            </div>

            {/* Category Filter Pills */}
            <div id="category-filters" className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    id={`category-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisibleCount(6);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-purple-600 text-white shadow-sm shadow-purple-300"
                        : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* Posts Grid Section */}
        <section 
          id="posts" 
          aria-label="Blog posts"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          {/* Header row with results count */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              <span>
                Showing <strong className="font-semibold text-slate-900">{displayedPosts.length}</strong> of{' '}
                <strong className="font-semibold text-slate-900">{filteredPosts.length}</strong> articles
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </span>
            </div>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                id="reset-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Posts Grid */}
          {displayedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((post, idx) => (
                <PostCard key={`${post.title}-${idx}`} post={post} index={idx} />
              ))}
            </div>
          ) : (
            <div id="no-results-view" className="py-20 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No articles found</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
                No matching results for "{searchQuery}". Try adjusting your keywords or clearing the category filter.
              </p>
              <button
                id="empty-reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                View all articles
              </button>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-14 flex justify-center">
              <button 
                id="load-more-posts-btn"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-6 py-3 text-sm font-semibold text-purple-700 transition-all hover:bg-purple-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>Load more articles</span>
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
