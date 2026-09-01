import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Editor Sign In — TheDehradun.com" },
      { name: "description", content: "Sign in to the TheDehradun.com editor area to write and publish blog posts about Dehradun." },
      { property: "og:title", content: "Editor Sign In — TheDehradun.com" },
      { property: "og:description", content: "Sign in to manage TheDehradun.com blog content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/admin" });
        } else {
          setMessage("Account created. Ab sign in kijiye.");
          setMode("signin");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-3xl font-semibold">
          {mode === "signin" ? "Editor sign in" : "Create editor account"}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Blog posts likhne aur publish karne ke liye sign in kijiye.
        </p>

        <div className="mt-6 flex rounded-full border border-border p-1">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(null); setMessage(null); }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
          <input
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
          <input
            required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          {message && <p className="text-sm text-primary">{message}</p>}
          <button
            type="submit" disabled={busy}
            className="mt-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/" className="font-semibold text-primary">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
