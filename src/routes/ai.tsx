import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "Dehradun AI — Ask Anything About Dehradun | TheDehradun.com" },
      {
        name: "description",
        content:
          "Dehradun AI se poochhein best cafes, hospitals, schools, hotels aur ghumne ki jagah — turant local answers from TheDehradun.com.",
      },
      { property: "og:title", content: "Dehradun AI — Ask Anything About Dehradun" },
      {
        property: "og:description",
        content:
          "Ask Dehradun AI about cafes, hospitals, tourist places, hotels and more. Instant local answers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiPage,
});

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Dehradun ke best cafes kaunse hain?",
  "Achhe hospitals kahan hain?",
  "Weekend pe ghumne ki jagah batao",
  "Budget hotels near Rajpur Road",
];

function AiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || data.error) throw new Error(data.error || "Kuch galat ho gaya.");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "" }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kuch galat ho gaya.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-foreground">
              🏔️
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight text-foreground">Dehradun AI</h1>
              <p className="text-xs text-muted-foreground">Aapka local guide assistant</p>
            </div>
          </div>
          <Link
            to="/"
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-5">
        {messages.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
              🌄
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Dehradun ke baare mein kuch bhi poochhein
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Cafes, hospitals, schools, hotels, ghumne ki jagah — sab kuch, turant.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-border bg-card p-3 text-left text-sm text-foreground transition-colors hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                {m.role === "user" ? (
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {m.content}
                  </div>
                ) : (
                  <div className="max-w-[95%] whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {m.content}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <p className="animate-pulse text-sm text-muted-foreground">Dehradun AI soch raha hai…</p>
            )}
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="sticky bottom-0 border-t border-border/60 bg-background/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Kuch poochhiye Dehradun ke baare mein…"
            className="flex-1 rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
