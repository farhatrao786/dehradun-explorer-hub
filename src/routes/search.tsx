import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, MapPin, Star, ArrowLeft, Globe, ExternalLink, ImageOff } from "lucide-react";
import { places } from "@/data/places";
import { hotels } from "@/data/hotels";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Search Dehradun — Places, Hotels & Guides | TheDehradun.com" },
      { name: "description", content: "Search across Dehradun tourist places, hotels and guides on TheDehradun.com, with web results when nothing matches on the site." },
      { property: "og:title", content: "Search Dehradun — Places, Hotels & Guides" },
      { property: "og:description", content: "Search Dehradun places, hotels and local guides in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SearchPage,
});

// Reusable placeholder box — no image, just name on a gradient background
function HotelPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-3 text-center">
      <div className="flex flex-col items-center gap-1.5">
        <ImageOff className="h-5 w-5 text-primary/60" />
        <span className="text-xs font-semibold text-foreground/80">{name}</span>
      </div>
    </div>
  );
}

const pages = [
  { title: "Explore Dehradun", to: "/explore", desc: "Tourist places, hidden gems and weekend trips." },
  { title: "Food & Restaurants", to: "/food", desc: "Cafes, restaurants, street food and bakeries." },
  { title: "Hotels & Stay", to: "/stay", desc: "Hotels, resorts, homestays and PGs." },
  { title: "Business Directory", to: "/business", desc: "Trusted local businesses across Dehradun." },
  { title: "Blog", to: "/blog", desc: "Stories, guides and local knowledge." },
  { title: "Dehradun AI Assistant", to: "/ai", desc: "Ask anything about Dehradun and get instant answers." },
  { title: "About Us", to: "/about", desc: "About TheDehradun.com." },
  { title: "Contact", to: "/contact", desc: "Get in touch with our team." },
] as const;

type WebResult = { title: string; url: string; snippet: string };

function SearchPage() {
  const { q } = Route.useSearch();
  const [input, setInput] = useState(q);
  const term = q.trim().toLowerCase();

  useEffect(() => setInput(q), [q]);

  const placeHits = term
    ? places.filter((p) => (p.name + " " + p.desc + " " + p.loc + " " + p.about).toLowerCase().includes(term))
    : [];
  const hotelHits = term
    ? hotels.filter((h) => (h.name + " " + h.desc + " " + h.area + " " + h.price).toLowerCase().includes(term))
    : [];
  const pageHits = term
    ? pages.filter((p) => (p.title + " " + p.desc).toLowerCase().includes(term))
    : [];

  const total = placeHits.length + hotelHits.length + pageHits.length;

  const [web, setWeb] = useState<WebResult[] | null>(null);
  const [webLoading, setWebLoading] = useState(false);

  useEffect(() => {
    setWeb(null);
    if (!term || total > 0) return;
    let cancelled = false;
    setWebLoading(true);
    fetch(`/api/websearch?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setWeb(d.results ?? []); })
      .catch(() => { if (!cancelled) setWeb([]); })
      .finally(() => { if (!cancelled) setWebLoading(false); });
    return () => { cancelled = true; };
  }, [q, term, total]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">Search TheDehradun</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const params = new URLSearchParams({ q: input });
            window.location.href = `/search?${params.toString()}`;
          }}
          className="mt-5 flex items-center gap-2 rounded-2xl border border-border bg-card p-2"
        >
          <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search places, hotels, food, hospitals..."
            className="w-full min-w-0 bg-transparent py-2 text-sm focus:outline-none"
          />
          <button className="h-9 shrink-0 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground">Search</button>
        </form>

        {!term && <p className="mt-8 text-sm text-muted-foreground">Kuch bhi search karo — jagah, hotel, ya page.</p>}

        {term && (
          <p className="mt-6 text-sm text-muted-foreground">
            {total > 0 ? `${total} result${total > 1 ? "s" : ""} for "${q}" on TheDehradun.com` : `Site par "${q}" ke liye koi result nahi mila.`}
          </p>
        )}

        {placeHits.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">Places ({placeHits.length})</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {placeHits.map((p) => (
                <Link key={p.slug} to="/places/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                  <img src={p.img} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold">{p.name}</h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" /> {p.loc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {hotelHits.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Hotels ({hotelHits.length})</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hotelHits.map((h) => (
                <Link key={h.slug} to="/hotels/$slug" params={{ slug: h.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                  <HotelPlaceholder name={h.name} />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold">{h.name}</h3>
                    <p className="mt-0.5 text-[11px] font-semibold text-primary">{h.price}</p>
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Star className="h-3 w-3" /> {h.stars}-star · {h.area}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {pageHits.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Pages</h2>
            <div className="mt-4 space-y-2">
              {pageHits.map((p) => (
                <Link key={p.to} to={p.to} className="block rounded-xl border border-border bg-card p-4 hover:shadow-sm">
                  <h3 className="text-sm font-semibold text-primary">{p.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {term && total === 0 && (
          <section className="mt-8">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="inline-flex items-center gap-2 font-display text-lg font-semibold">
                <Globe className="h-4 w-4 text-primary" /> Web se results
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ye result humari site par nahi mila, isliye hum web se relevant results dikha rahe hain.
              </p>

              {webLoading && <p className="mt-4 text-sm text-muted-foreground">Web search chal raha hai…</p>}

              {web && web.length > 0 && (
                <div className="mt-4 space-y-3">
                  {web.map((r) => (
                    <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border p-4 hover:bg-secondary/60">
                      <h3 className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {r.title} <ExternalLink className="h-3.5 w-3.5" />
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">{r.snippet}</p>
                    </a>
                  ))}
                </div>
              )}

              {web && web.length === 0 && !webLoading && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Web results abhi load nahi ho paaye.{" "}
                  <a className="font-semibold text-primary underline" target="_blank" rel="noopener noreferrer"
                    href={`https://www.google.com/search?q=${encodeURIComponent(q + " Dehradun")}`}>
                    Google par search karo
                  </a>{" "}
                  ya{" "}
                  <Link to="/ai" className="font-semibold text-primary underline">Dehradun AI se poochho</Link>.
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}