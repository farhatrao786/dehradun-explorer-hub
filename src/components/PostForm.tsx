import { useState } from "react";

export type PostFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  published: boolean;
};

export const emptyPost: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  read_time: "",
  published: false,
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const field = "rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";

export function PostForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: PostFormValues;
  submitLabel: string;
  onSubmit: (values: PostFormValues) => Promise<void>;
}) {
  const [values, setValues] = useState<PostFormValues>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  return (
    <form
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
          await onSubmit(values);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not save this post");
        } finally {
          setBusy(false);
        }
      }}
    >
      <label className="text-xs font-semibold text-muted-foreground">Title</label>
      <input
        required className={field} value={values.title}
        onChange={(e) => {
          const title = e.target.value;
          setValues((v) => ({
            ...v,
            title,
            slug: v.slug === slugify(v.title) || v.slug === "" ? slugify(title) : v.slug,
          }));
        }}
      />

      <label className="text-xs font-semibold text-muted-foreground">Slug (URL)</label>
      <input required className={field} value={values.slug} onChange={(e) => set("slug", slugify(e.target.value))} />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold text-muted-foreground">Category</label>
          <input className={field} placeholder="Travel / Food / Guides" value={values.category} onChange={(e) => set("category", e.target.value)} />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold text-muted-foreground">Read time</label>
          <input className={field} placeholder="5 min read" value={values.read_time} onChange={(e) => set("read_time", e.target.value)} />
        </div>
      </div>

      <label className="text-xs font-semibold text-muted-foreground">Excerpt</label>
      <textarea className={field} rows={3} value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)} />

      <label className="text-xs font-semibold text-muted-foreground">Content</label>
      <textarea className={field} rows={12} value={values.content} onChange={(e) => set("content", e.target.value)} />

      <label className="mt-2 inline-flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={values.published} onChange={(e) => set("published", e.target.checked)} />
        Published (visible on the public blog)
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button type="submit" disabled={busy} className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
        {busy ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
