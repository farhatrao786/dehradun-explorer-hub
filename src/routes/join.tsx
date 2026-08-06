import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Doon Community — TheDehradun.com" },
      { name: "description", content: "Create your TheDehradun.com account to save favourite places, write reviews, upload photos and get personalised Dehradun recommendations." },
      { property: "og:title", content: "Join the Doon Community — TheDehradun.com" },
      { property: "og:description", content: "Save favourite places, write reviews and get personalised Dehradun recommendations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [done, setDone] = useState(false);

  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-3xl font-semibold">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Save favourite places, review spots and get personalised Dehradun picks.
        </p>

        <div className="mt-6 flex rounded-full border border-border p-1">
          {(["signup", "signin"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setDone(false); }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {m === "signup" ? "Create account" : "Sign in"}
            </button>
          ))}
        </div>

        {done ? (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center">
            <p className="font-semibold">Thanks! You're on the list. 🎉</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Accounts are rolling out soon — we'll email you as soon as yours is ready.
            </p>
            <Link to="/" className="mt-5 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Back to home</Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
          >
            {mode === "signup" && (
              <input required placeholder="Your name" className="rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
            )}
            <input required type="email" placeholder="you@example.com" className="rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
            <input required type="password" placeholder="Password" className="rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
            <button type="submit" className="mt-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              {mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Business owner? <Link to="/business" className="font-semibold text-primary">List your business</Link>
        </p>
      </div>
    </div>
  );
}
