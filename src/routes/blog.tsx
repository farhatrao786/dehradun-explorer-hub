import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute('/blog')({
  component: BlogPage,
});

const articles = [
  {
    id: 1,
    title: "Top 5 Aesthetic Spots for Perfect Reels in Dehradun",
    excerpt: "Janiye Dehradun ki un hidden locations ke baare mein jo aapke videos aur photos ko next level par le jayengi.",
    date: "28 July 2026",
    category: "Lifestyle",
    readTime: "5 min read",
    color: "from-pink-500/10 to-rose-500/10"
  },
  {
    id: 2,
    title: "Mussoorie vs Dhanaulti: Weekend kahan bitayein?",
    excerpt: "Agar aap weekend trip plan kar rahe hain, toh yeh comparison guide aapko sahi decision lene mein madad karegi.",
    date: "20 July 2026",
    category: "Travel",
    readTime: "7 min read",
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 3,
    title: "Dehradun's Hidden Street Food Gems",
    excerpt: "Momos se lekar bun tikki tak, explore kijiye wo local street food thikane jo tourists aksar miss kar dete hain.",
    date: "12 July 2026",
    category: "Food",
    readTime: "4 min read",
    color: "from-orange-500/10 to-amber-500/10"
  }
];

function BlogPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background px-4 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Dehradun Diaries
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Latest updates, travel tips, aur Dehradun ki ankahee kahaniyan. Padiye hamare latest blog posts.
          </p>
        </div>

        {/* Grid for Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((post) => (
            <div 
              key={post.id}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${post.color} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 cursor-pointer backdrop-blur-sm flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto">
                <span className="text-xs text-muted-foreground font-medium">
                  ⏳ {post.readTime}
                </span>
                <span className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center pb-8">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
