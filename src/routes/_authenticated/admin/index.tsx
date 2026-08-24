import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { amIAdmin, claimFirstAdmin, deletePost, listAllPosts } from "@/lib/posts.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Blog Admin — TheDehradun.com" },
      { name: "description", content: "Manage, publish and edit TheDehradun.com blog posts from the editor dashboard." },
      { property: "og:title", content: "Blog Admin — TheDehradun.com" },
      { property: "og:description", content: "Manage and publish blog posts for TheDehradun.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPosts,
});

function AdminPosts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchAdmin = useServerFn(amIAdmin);
  const fetchPosts = useServerFn(listAllPosts);
  const claim = useServerFn(claimFirstAdmin);
  const remove = useServerFn(deletePost);

  const adminQuery = useQuery({ queryKey: ["me", "admin"], queryFn: () => fetchAdmin({}) });
  const postsQuery = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: () => fetchPosts({}),
    enabled: adminQuery.data?.isAdmin === true,
  });

  const claimMutation = useMutation({
    mutationFn: () => claim({}),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "posts"] }),
  });

  if (adminQuery.isLoading) {
    return <p className="px-4 py-20 text-center text-sm text-muted-foreground">Loading…</p>;
  }

  if (!adminQuery.data?.isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold">Admin access needed</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Aapke account ke paas admin role nahi hai. Agar ye site ka pehla admin account hai, neeche click kijiye.
        </p>
        <button
          onClick={() => claimMutation.mutate()}
          disabled={claimMutation.isPending}
          className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {claimMutation.isPending ? "Checking…" : "Claim admin access"}
        </button>
        {claimMutation.data?.granted === false && (
          <p className="mt-4 text-sm text-destructive">An admin already exists — ask them to grant you access.</p>
        )}
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
          className="mt-6 block w-full text-sm text-muted-foreground underline"
        >
          Sign out
        </button>
      </div>
    );
  }

  const posts = postsQuery.data ?? [];

  return (
    <div className="w-full bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-semibold">Blog admin</h1>
          <div className="flex items-center gap-2">
            <Link to="/admin/new" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              + New post
            </Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
            >
              Sign out
            </button>
          </div>
        </div>

        {postsQuery.isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading posts…</p>
        ) : posts.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">No posts yet. Create your first one.</p>
        ) : (
          <ul className="mt-8 flex flex-col gap-3">
            {posts.map((post) => (
              <li key={post.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`rounded-full px-3 py-1 font-semibold ${post.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  {post.category && <span className="text-muted-foreground">{post.category}</span>}
                  <span className="text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold">{post.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">/blog/{post.slug}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                  <Link to="/admin/$id/edit" params={{ id: post.id }} className="text-primary">Edit</Link>
                  {post.published && (
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="text-muted-foreground">View</Link>
                  )}
                  <button
                    onClick={() => { if (confirm("Delete this post?")) deleteMutation.mutate(post.id); }}
                    className="text-destructive"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
