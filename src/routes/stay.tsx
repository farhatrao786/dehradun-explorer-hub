import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { MapPin, Star, ChevronRight } from "lucide-react";
import { hotels } from "@/data/hotels";

export const Route = createFileRoute('/stay')({
  head: () => ({
    meta: [
      { title: "Hotels & Stay in Dehradun — 50+ Hotels, Resorts & Budget Stays" },
      { name: "description", content: "Browse 50+ hotels in Dehradun with star ratings, price ranges, areas and amenities — from luxury resorts on Rajpur Road to budget stays near ISBT." },
      { property: "og:title", content: "Hotels & Stay in Dehradun — TheDehradun.com" },
      { property: "og:description", content: "50+ Dehradun hotels with prices, ratings, locations and full details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StayPage,
});

function StayPage() {
  // Page khulte hi scroll ko top par rakhne ke liye
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Best Places To Stay in Dehradun
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Chahe luxury resort chahiye ya comfortable budget hotel, Dehradun mein aapke stay ko yaadgar banane ke liye {hotels.length}+ options yahan hain.
          </p>
        </div>

        {/* Grid for Hotels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {hotels.map((h) => (
            <article
              key={h.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={h.img}
                  alt={h.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-foreground backdrop-blur">
                  <Star className="h-3 w-3 fill-current text-amber-500" /> {h.stars}-star
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-base font-semibold leading-tight">{h.name}</h3>
                <p className="mt-1 text-xs font-semibold text-primary">{h.price} / night</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {h.area}, Dehradun
                </span>
                <Link
                  to="/hotels/$slug"
                  params={{ slug: h.slug }}
                  className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1 rounded-xl bg-primary text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Details <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center pb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
