import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PostForm, emptyPost, type PostFormValues } from "@/components/PostForm";
import { createPost } from "@/lib/posts.functions";

export const Route = createFileRoute("/_authenticated/admin/new")({
  head: () => ({
    meta: [
      { title: "New Blog Post — TheDehradun.com Admin" },
      { name: "description", content: "Write and publish a new Dehradun blog post on TheDehradun.com." },
      { property: "og:title", content: "New Blog Post — TheDehradun.com Admin" },
      { property: "og:description", content: "Write and publish a new Dehradun blog post." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewPostPage,
});

function NewPostPage() {
  const navigate = useNavigate();
  const save = useServerFn(createPost);

  return (
    <div className="w-full bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/admin" className="text-sm font-semibold text-primary">← Back to admin</Link>
        <h1 className="mb-6 mt-4 font-display text-3xl font-semibold">New post</h1>
        <PostForm
          initial={emptyPost}
          submitLabel="Create post"
          onSubmit={async (values: PostFormValues) => {
            await save({ data: { ...values, excerpt: values.excerpt || null, content: values.content || null, category: values.category || null, read_time: values.read_time || null } });
            navigate({ to: "/admin" });
          }}
        />
      </div>
    </div>
  );
}
