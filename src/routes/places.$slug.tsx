import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, IndianRupee, CalendarRange, MapPin } from "lucide-react";
import { getPlace, places } from "@/data/places";

export const Route = createFileRoute("/places/$slug")({
  loader: ({ params }) => {
    const place = getPlace(params.slug);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Place not found — TheDehradun.com" }, { name: "robots", content: "noindex" }] };
    }
    const { place } = loaderData;
    const title = `${place.name} — Timings, Entry Fee & Guide | TheDehradun.com`;
    const description = `${place.desc} Best time to visit, entry fee, timings and photos of ${place.name}, Dehradun.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PlaceNotFound,
  component: PlaceDetail,
});

function PlaceNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Place not found</h1>
      <p className="mt-2 text-muted-foreground">Ye jagah humare guide me abhi nahi hai.</p>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Back to home</Link>
    </div>
  );
}

function PlaceDetail() {
  const { place } = Route.useLoaderData();
  const others = places.filter((p) => p.slug !== place.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/" hash="places" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to places
        </Link>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{place.name}</h1>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" /> {place.loc}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {place.gallery.map((g: string, i: number) => (
            <img key={i} src={g} alt={`${place.name} photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} width={1024} height={768}
              className="aspect-[4/3] w-full rounded-2xl border border-border object-cover" />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold">About</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{place.about}</p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " Dehradun")}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              📍 Map par dekho
            </a>
          </div>

          <aside className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <Fact icon={<CalendarRange className="h-4 w-4" />} label="Best time to visit" value={place.bestTime} />
            <Fact icon={<IndianRupee className="h-4 w-4" />} label="Entry fee" value={place.entryFee} />
            <Fact icon={<Clock className="h-4 w-4" />} label="Timings" value={place.timings} />
          </aside>
        </div>

        <h2 className="mt-12 font-display text-xl font-semibold">More places nearby</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} to="/places/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <img src={p.img} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-3 text-sm font-semibold">{p.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{icon} {label}</div>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
