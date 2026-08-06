import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, MapPin, Mountain, UtensilsCrossed, BedDouble, HeartPulse, GraduationCap,
  ShoppingBag, Car, Home as HomeIcon, Star, ArrowRight, Sparkles, Tag, Cloud, Calendar,
  Newspaper, TrafficCone, Send, ChevronRight, Menu, X, Facebook, Instagram,
  Twitter, Youtube, Phone, Mail, Camera, Heart, Plus,
} from "lucide-react";
import heroImg from "@/assets/hero-dehradun.jpg";
import { places, placeImages } from "@/data/places";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TheDehradun.com — Discover Dehradun Like Never Before" },
      { name: "description", content: "The #1 local guide to Dehradun. Explore restaurants, hotels, tourist places, hospitals, schools, businesses, deals and events across the Doon valley." },
      { property: "og:title", content: "TheDehradun.com — Discover Dehradun Like Never Before" },
      { property: "og:description", content: "The #1 local guide to Dehradun. Explore restaurants, hotels, tourist places, hospitals, schools, businesses, deals and events." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TheDehradun.com",
        url: "https://thedehradun.com/",
        description: "Complete digital guide to Dehradun city.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://thedehradun.com/search?q={query}",
          "query-input": "required name=query",
        },
      }),
    }],
  }),
  component: Home,
});

const categories = [
  { icon: Mountain, title: "Explore Dehradun", desc: "Tourist places, hidden gems, weekend trips & adventure", tags: ["Sightseeing", "Adventure"], href: "/explore" },
  { icon: UtensilsCrossed, title: "Food & Restaurants", desc: "Cafes, restaurants, street food, bakeries & reviews", tags: ["Cafes", "Street Food"], href: "/food" },
  { icon: BedDouble, title: "Hotels & Stay", desc: "Hotels, resorts, homestays, PGs and rentals", tags: ["Resorts", "PG"], href: "/stay" },
  { icon: HeartPulse, title: "Healthcare", desc: "Hospitals, doctors, clinics, pharmacies & emergency", tags: ["Doctors", "Emergency"], href: "/search?q=hospital" },
  { icon: GraduationCap, title: "Education", desc: "Schools, colleges, coaching institutes & universities", tags: ["Schools", "Coaching"], href: "/search?q=school" },
  { icon: ShoppingBag, title: "Shopping & Local", desc: "Shops, markets, services and local brands", tags: ["Markets", "Brands"], href: "/search?q=shopping" },
  { icon: Car, title: "Transport", desc: "Taxi services, rentals and parking information", tags: ["Taxi", "Rentals"], href: "/search?q=transport" },
  { icon: HomeIcon, title: "Real Estate", desc: "Properties, rentals, builders and projects", tags: ["Rentals", "Buy"], href: "/search?q=real+estate" },
];



const businesses = [
  { name: "Doon Darbar Restaurant", cat: "North Indian", area: "Rajpur Road", rating: 4.6, reviews: 1240 },
  { name: "Ellora's Bakery", cat: "Bakery & Cafe", area: "Rajpur Road", rating: 4.7, reviews: 3120 },
  { name: "Max Super Speciality", cat: "Hospital", area: "Malsi", rating: 4.4, reviews: 890 },
  { name: "Pacific Mall", cat: "Shopping Mall", area: "Jakhan", rating: 4.5, reviews: 5210 },
  { name: "Hotel Madhuban", cat: "3-Star Hotel", area: "Rajpur Road", rating: 4.3, reviews: 780 },
  { name: "The Doon School", cat: "School", area: "Chakrata Rd", rating: 4.9, reviews: 210 },
];

const updates = [
  { icon: Newspaper, tag: "News", title: "Dehradun Metro Neo project clears fresh design review", time: "2h ago" },
  { icon: Cloud, tag: "Weather", title: "Light showers expected in the valley this weekend, 18–24°C", time: "4h ago" },
  { icon: TrafficCone, tag: "Traffic", title: "Diversion on Rajpur Road near Dilaram Chowk till Sunday", time: "6h ago" },
  { icon: Calendar, tag: "Event", title: "Doon Literary Festival returns to FRI campus this November", time: "1d ago" },
];

const deals = [
  { brand: "Ellora's Bakery", offer: "20% off on all pastries", code: "DOON20", color: "gradient-sun" },
  { brand: "Hotel Madhuban", offer: "Weekend stay from ₹2,999", code: "STAYDOON", color: "gradient-forest" },
  { brand: "Pacific Mall", offer: "Flat ₹500 off on ₹2000+", code: "PACIFIC500", color: "gradient-sun" },
];

const blogPosts = [
  { cat: "Places", title: "10 hidden waterfalls near Dehradun worth the drive", read: "6 min" },
  { cat: "Food", title: "The definitive Doon cafe crawl — from Rajpur to Clement Town", read: "8 min" },
  { cat: "Guides", title: "Moving to Dehradun? A local's checklist for your first month", read: "5 min" },
];

function Home() {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-forest text-primary-foreground">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              The<span className="text-primary">Dehradun</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {["Explore", "Food", "Stay", "Business", "Blog"].map((l) => (
  <Link
    key={l}
    to={["Explore", "Food", "Stay", "Business", "Blog"].includes(l) ? `/${l.toLowerCase()}` : `#${l.toLowerCase()}`}

    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
  >
    {l}
  </Link>
))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">Sign in</button>
            <Link to="/business" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.05]">List Business</Link>
          </div>
          <button aria-label="Menu" onClick={() => setMenu(!menu)} className="grid h-10 w-10 place-items-center rounded-lg md:hidden">
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menu && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="flex flex-col p-4">
              {["Explore", "Food", "Stay", "Business", "Blog"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenu(false)} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary">{l}</a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                <button className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium">Sign in</button>
                <a href="#list" className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">List Business</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center min-h-screen pt-16">
        <img
          src={heroImg}
          alt="Dehradun valley at golden hour with mountains and forest"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920} height={1280} fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> The complete guide to the Doon valley
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
              Discover Dehradun <span className="italic text-accent">like never before</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg text-balance">
              Your complete guide for food, places, services, businesses and experiences across the Doon valley — curated by locals, loved by travellers.
            </p>

            {/* Search */}
            <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigate({ to: "/search", search: { q: query.trim() } }); }} className="mt-8 flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full min-w-0 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  placeholder="Search restaurants, hotels, hospitals, schools, places..."
                />
              </div>
              <div className="flex items-center gap-2">
                <button type="submit" className="flex-1 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02] sm:flex-none">
                  Search
                </button>
                <Link to="/ai" className="inline-flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-transform hover:scale-[1.02] sm:flex-none">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" /> Ask Dehradun AI
                </Link>
              </div>

            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              {["Cafes near me", "Best schools", "Weekend trips", "Hospitals 24/7"].map((s) => (
                <button key={s} onClick={() => setQuery(s)} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur hover:bg-white/20">{s}</button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]">
  Explore Dehradun <ArrowRight className="h-4 w-4" />
</Link>
              <a href="/business" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
                List Your Business
              </a>
            </div>
          </div>

          {/* stat strip */}
          <div className="mt-16 grid max-w-2xl grid-cols-3 gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur sm:p-6">
            {[["12k+", "Places"], ["4.8★", "Avg rating"], ["500k+", "Monthly readers"]].map(([n, l]) => (
              <div key={l as string} className="text-center">
                <div className="font-display text-2xl font-semibold sm:text-3xl">{n}</div>
                <div className="text-xs text-white/70 sm:text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Section id="explore" eyebrow="Browse the city" title="Everything Dehradun, in one place">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, desc, tags, href }) => (
            <a key={title} href={href} className="group relative rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl gradient-forest text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">

                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">{t}</span>
                ))}
              </div>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </Section>

      {/* FEATURED PLACES */}
      <Section id="places" eyebrow="Featured places" title="Postcard-worthy spots to visit" cta={{ label: "See all places", href: "#" }} tone="muted">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p) => (
            <article key={p.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <button aria-label="Save" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-foreground backdrop-blur hover:bg-white">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-base font-semibold leading-tight">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.desc}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {p.loc}
                </span>
                <Link
                  to="/places/$slug"
                  params={{ slug: p.slug }}
                  className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1 rounded-xl bg-primary text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Details <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}

        </div>
      </Section>






      {/* BUSINESS DIRECTORY */}
      <Section id="business" eyebrow="Local business directory" title="Find trusted businesses across Dehradun">
        <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search businesses by name or category" className="w-full min-w-0 bg-transparent py-2.5 text-sm focus:outline-none" />
          </div>
          <select className="rounded-xl bg-secondary px-3 py-2.5 text-sm">
            <option>All areas</option><option>Rajpur Road</option><option>Clement Town</option><option>Sahastradhara Rd</option>
          </select>
          <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Search</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <div key={b.name} className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-lg font-semibold">{b.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{b.cat} · {b.area}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Star className="h-3.5 w-3.5 fill-current" /> {b.rating}
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{b.reviews.toLocaleString()} reviews</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg bg-secondary py-2 text-xs font-medium hover:bg-secondary/80"><Phone className="mr-1 inline h-3 w-3" />Call</button>
                <button className="flex-1 rounded-lg bg-secondary py-2 text-xs font-medium hover:bg-secondary/80"><MapPin className="mr-1 inline h-3 w-3" />Map</button>
                <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground">View</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* AI ASSISTANT */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl min-h-screen rounded-3xl gradient-forest text-primary-foreground">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> New · Beta
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-5xl">
                Ask <span className="italic text-accent">Dehradun AI</span>
              </h2>
              <p className="mt-4 max-w-lg text-white/80">
                Ask anything about the city — from picnic spots to specialist doctors — and get instant, local recommendations.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-2 rounded-xl bg-white/95 p-2 text-foreground">
                <Sparkles className="ml-2 h-4 w-4 text-primary" />
                <Link to="/ai" className="flex items-center gap-2 rounded-xl bg-white/95 p-2 text-left hover:scale-[1.02] transition-all cursor-pointer shadow-sm">
  <Sparkles className="ml-2 h-4 w-4 text-primary" />
  <span className="w-full min-w-0 text-muted-foreground text-sm pl-1 py-1.5 opacity-80">Ask anything about Dehradun...</span>
  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  </div>
</Link>

              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Best cafe near me", "Places in one day", "Best hospital", "Family picnic"].map((s) => (
                  <Link key={s} to="/ai" className="rounded-full bg-white/15 px-3 py-1 text-sm text-white hover:bg-white/30 transition-all">
  {s}
</Link>

                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEALS */}
      <Section id="deals" eyebrow="Deals & offers" title="Save more across Dehradun" tone="muted">
        <div className="grid gap-4 md:grid-cols-3">
          {deals.map((d) => (
            <div key={d.brand} className={`min-h-screen rounded-2xl p-6 text-primary-foreground ${d.color}`}>
              <Tag className="h-6 w-6 opacity-80" />
              <h3 className="mt-4 font-display text-xl font-semibold">{d.offer}</h3>
              <p className="mt-1 text-sm opacity-90">{d.brand}</p>
              <div className="mt-6 flex items-center justify-between rounded-xl border border-dashed border-white/40 px-3 py-2">
                <span className="font-mono text-sm font-semibold">{d.code}</span>
                <button className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground">Copy</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* UPDATES */}
      <Section id="updates" eyebrow="Latest updates" title="What's happening in the Doon valley">
        <div className="grid gap-4 md:grid-cols-2">
          {updates.map(({ icon: Icon, tag, title, time }) => (
            <a key={title} href="#" className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">{tag}</span>
                  <span className="text-[11px] text-muted-foreground">{time}</span>
                </div>
                <h3 className="mt-1.5 font-medium leading-snug">{title}</h3>
              </div>
              <ChevronRight className="mt-3 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </Section>

      {/* USER + BUSINESS OWNER FEATURES */}
      <section className="bg-secondary/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">For explorers</span>
            <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Join the Doon community</h3>
            <p className="mt-3 text-muted-foreground">Save favourite places, review, upload photos and suggest new spots.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Save favourite places", "Submit reviews & photos", "Suggest a new place", "Personalised recommendations"].map((f) => (
                <li key={f} className="flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> {f}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Create account</button>
              <button className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Sign in</button>
            </div>
          </div>

          <div id="list" className="relative min-h-screen rounded-3xl gradient-forest p-8 text-primary-foreground sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-widest opacity-80">For businesses</span>
            <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">List your business on TheDehradun.com</h3>
            <p className="mt-3 max-w-md text-white/80">Reach thousands of locals and tourists every week. Free listing available. Upgrade anytime.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
                <div className="text-sm opacity-80">Free</div>
                <div className="mt-1 font-display text-2xl font-semibold">₹0</div>
                <p className="mt-2 text-xs opacity-80">Basic listing with contact and map</p>
              </div>
              <div className="rounded-2xl border border-accent/60 bg-accent/20 p-4">
                <div className="flex items-center gap-2 text-sm"><Sparkles className="h-3.5 w-3.5" /> Premium</div>
                <div className="mt-1 font-display text-2xl font-semibold">₹999<span className="text-sm opacity-70">/mo</span></div>
                <p className="mt-2 text-xs opacity-90">Featured placement, photos, analytics</p>
              </div>
            </div>
            <a href="/business" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground hover:scale-[1.02]">
  <Plus className="h-4 w-4" /> List your business
</a>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <Section id="blog" eyebrow="From the blog" title="Stories, guides & local knowledge" cta={{ label: "Read all posts", href: "#" }}>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((p, i) => (
            <a key={p.title} href="/blog" className="group block min-h-screen rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] min-h-screen gradient-forest">
                <img src={placeImages[i]} alt="" loading="lazy" width={1024} height={640} className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{p.cat}</span>
                  <span className="text-muted-foreground">{p.read} read</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <Camera className="h-8 w-8 text-primary" />
          <h3 className="font-display text-2xl font-semibold sm:text-3xl text-balance">Get the Doon weekly — 5 great picks, every Friday</h3>
          <p className="max-w-xl text-sm text-muted-foreground">The best places, food, events and stories from Dehradun, curated by our editors.</p>
          <NewsletterForm />

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl gradient-forest text-primary-foreground"><Mountain className="h-5 w-5" /></span>
                <span className="font-display text-xl font-semibold">The<span className="text-primary">Dehradun</span></span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">The complete digital platform for Dehradun city — discover, connect, and explore the Doon valley.</p>
              <div className="mt-5 flex gap-3">
                {[
                  { I: Facebook, href: "https://www.facebook.com/" },
                  { I: Instagram, href: "https://www.instagram.com/" },
                  { I: Twitter, href: "https://twitter.com/" },
                  { I: Youtube, href: "https://www.youtube.com/" },
                ].map(({ I, href }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer noopener" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground"><I className="h-4 w-4" /></a>
                ))}
              </div>
            </div>
            <FooterCol title="Explore" links={[
              { label: "Tourist places", href: "/explore" },
              { label: "Food & Restaurants", href: "/food" },
              { label: "Hotels & Stay", href: "/stay" },
              { label: "Healthcare", href: "/search?q=hospital" },
              { label: "Education", href: "/search?q=school" },
            ]} />
            <FooterCol title="Business" links={[
              { label: "List your business", href: "/business" },
              { label: "Advertise", href: "/contact" },
              { label: "Premium listing", href: "/business" },
              { label: "Business login", href: "/join" },
              { label: "Contact sales", href: "/contact" },
            ]} />

            <div className="flex flex-col gap-2">
  <span className="font-semibold text-white">Company</span>
  <Link to="/about" className="text-sm opacity-80 hover:opacity-100">About us</Link>
<Link to="/contact" className="text-sm opacity-80 hover:opacity-100">Contact Us</Link>
</div>
</div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} TheDehradun.com · Made with ♥ in the Doon valley</p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@thedehradun.com" className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> hello@thedehradun.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id, eyebrow, title, children, cta, tone,
}: {
  id?: string; eyebrow: string; title: string; children: React.ReactNode;
  cta?: { label: string; href: string }; tone?: "muted";
}) {
  return (
    <section id={id} className={`${tone === "muted" ? "bg-secondary/40" : ""} px-4 py-16 sm:px-6 sm:py-24 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">{title}</h2>
          </div>
          {cta && (
            <a href={cta.href} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
              {cta.label} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}><a href={l.href} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
}

