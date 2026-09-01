import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { PostForm, type PostFormValues } from "@/components/PostForm";
import { getPostById, updatePost } from "@/lib/posts.functions";

export const Route = createFileRoute("/_authenticated/admin/$id/edit")({
  head: () => ({
    meta: [
      { title: "Edit Blog Post — TheDehradun.com Admin" },
      { name: "description", content: "Edit an existing Dehradun blog post on TheDehradun.com." },
      { property: "og:title", content: "Edit Blog Post — TheDehradun.com Admin" },
      { property: "og:description", content: "Edit an existing Dehradun blog post." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditPostPage,
});

function EditPostPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const fetchPost = useServerFn(getPostById);
  const save = useServerFn(updatePost);

  const postQuery = useQuery({
    queryKey: ["admin", "post", id],
    queryFn: () => fetchPost({ data: { id } }),
  });

  if (postQuery.isLoading) {
    return <p className="px-4 py-20 text-center text-sm text-muted-foreground">Loading…</p>;
  }

  const post = postQuery.data;
  if (!post) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">Post not found.</p>
        <Link to="/admin" className="mt-4 inline-block text-sm font-semibold text-primary">Back to admin</Link>
      </div>
    );
  }

  const initial: PostFormValues = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    category: post.category ?? "",
    read_time: post.read_time ?? "",
    published: post.published,
  };

  return (
    <div className="w-full bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/admin" className="text-sm font-semibold text-primary">← Back to admin</Link>
        <h1 className="mb-6 mt-4 font-display text-3xl font-semibold">Edit post</h1>
        <PostForm
          initial={initial}
          submitLabel="Save changes"
          onSubmit={async (values) => {
            await save({ data: { id, ...values, excerpt: values.excerpt || null, content: values.content || null, category: values.category || null, read_time: values.read_time || null } });
            navigate({ to: "/admin" });
          }}
        />
      </div>
    </div>
  );
}
