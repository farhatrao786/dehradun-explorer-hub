import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPublishedPostBySlug } from "@/lib/posts.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPostBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Blog post"} | TheDehradun.com` },
      { name: "description", content: loaderData?.excerpt ?? "A story from Dehradun, published on TheDehradun.com." },
      { property: "og:title", content: loaderData?.title ?? "Blog post | TheDehradun.com" },
      { property: "og:description", content: loaderData?.excerpt ?? "A story from Dehradun, published on TheDehradun.com." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => (
    <div className="w-full bg-background px-4 py-20 text-center">
      <p className="text-muted-foreground">This post could not be loaded right now.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="w-full bg-background px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-semibold">Post not found</h1>
      <Link to="/blog" className="mt-6 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
        Back to blog
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <article className="w-full bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/blog" className="text-sm font-semibold text-primary">← All posts</Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">{post.category ?? "Dehradun"}</span>
          <span className="text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span className="text-muted-foreground">⏳ {post.read_time ?? "3 min read"}</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{post.title}</h1>

        {post.excerpt && (
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        )}

        <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/90">
          {(post.content ?? "").split(/\n\s*\n/).filter(Boolean).map((para, i) => (
            <p key={i} className="whitespace-pre-line">{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
