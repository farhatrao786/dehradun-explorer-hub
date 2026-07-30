import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Star, IndianRupee, Check, ImageOff } from "lucide-react";
import { getHotel, hotels } from "@/data/hotels";

export const Route = createFileRoute("/hotels/$slug")({
  loader: ({ params }) => {
    const hotel = getHotel(params.slug);
    if (!hotel) throw notFound();
    return { hotel };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Hotel not found — TheDehradun.com" }, { name: "robots", content: "noindex" }] };
    }
    const { hotel } = loaderData;
    const title = `${hotel.name} — Price, Amenities & Address | TheDehradun.com`;
    const description = `${hotel.desc} Price range ${hotel.price} in ${hotel.area}, Dehradun.`;
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
  notFoundComponent: HotelNotFound,
  component: HotelDetail,
});

function HotelNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Hotel not found</h1>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Back to home</Link>
    </div>
  );
}

// Reusable placeholder box — no image, just hotel name on a gradient background
function HotelPlaceholder({ name, className = "" }: { name: string; className?: string }) {
  return (
    <div
      className={`flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/20 to-primary/5 p-4 text-center ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <ImageOff className="h-6 w-6 text-primary/60" />
        <span className="text-sm font-semibold text-foreground/80">{name}</span>
      </div>
    </div>
  );
}

function HotelDetail() {
  const { hotel } = Route.useLoaderData();
  const others = hotels.filter((h) => h.slug !== hotel.slug && h.area === hotel.area).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/" hash="hotels" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to hotels
        </Link>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{hotel.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
            <Star className="h-3.5 w-3.5 fill-current" /> {hotel.stars}-star
          </span>
          <span className="inline-flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> {hotel.price} / night</span>
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {hotel.area}</span>
        </div>

        {/* Gallery replaced with a single placeholder box */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <HotelPlaceholder name={hotel.name} className="sm:col-span-3" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold">About this hotel</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{hotel.desc}</p>

            <h2 className="mt-6 font-display text-xl font-semibold">Amenities</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {hotel.amenities.map((a: string) => (
                <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> {a}
                </li>
              ))}
            </ul>

            
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + " Dehradun")}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              📍 Map par dekho
            </a>
          </div>

          <aside className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Address</div>
              <p className="mt-1 text-sm">{hotel.address}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Price range</div>
              <p className="mt-1 text-sm">{hotel.price} per night</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rating</div>
              <p className="mt-1 text-sm">{hotel.stars}-star category</p>
            </div>
          </aside>
        </div>

        {others.length > 0 && (
          <>
            <h2 className="mt-12 font-display text-xl font-semibold">Other hotels in {hotel.area}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {others.map((h) => (
                <Link key={h.slug} to="/hotels/$slug" params={{ slug: h.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card">
                  <HotelPlaceholder name={h.name} />
                  <div className="p-3 text-sm font-semibold">{h.name}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
