import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPublishedPosts } from "@/lib/posts.functions";

export const Route = createFileRoute('/blog')({
  head: () => ({
    meta: [
      { title: "Dehradun Diaries — Blog | TheDehradun.com" },
      { name: "description", content: "Travel tips, food trails and local stories from Dehradun. Read the latest guides and updates from TheDehradun.com editors." },
      { property: "og:title", content: "Dehradun Diaries — Blog | TheDehradun.com" },
      { property: "og:description", content: "Travel tips, food trails and local stories from Dehradun." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => getPublishedPosts(),
  errorComponent: () => (
    <div className="w-full bg-background px-4 py-20 text-center">
      <p className="text-muted-foreground">Blog posts could not be loaded right now. Please try again.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="w-full bg-background px-4 py-20 text-center">
      <p className="text-muted-foreground">Nothing here yet.</p>
    </div>
  ),
  component: BlogPage,
});

const cardColors = [
  "from-pink-500/10 to-rose-500/10",
  "from-blue-500/10 to-cyan-500/10",
  "from-orange-500/10 to-amber-500/10",
];

function BlogPage() {
  const posts = Route.useLoaderData();

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
        {posts.length === 0 ? (
          <p className="mb-12 text-center text-sm text-muted-foreground">
            No posts published yet — naye articles bahut jald aa rahe hain.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${cardColors[i % cardColors.length]} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 cursor-pointer backdrop-blur-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {post.category ?? "Dehradun"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
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
                    ⏳ {post.read_time ?? "3 min read"}
                  </span>
                  <span className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

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
