import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute('/food')({
  component: FoodPage,
});

const restaurants = [
  {
    id: 1,
    name: "Kalsang Friends Corner",
    desc: "Dehradun ka sabse famous Tibetan aur Chinese food destination. Inke momos aur thukpa zaroor try karein.",
    cuisine: "Tibetan & Chinese",
    icon: "🍜",
    color: "from-red-500/10 to-orange-500/10"
  },
  {
    id: 2,
    name: "The Orchard",
    desc: "Rajpur ke paas ek khoobsurat view ke sath authentic Thai, Tibetan aur Chinese cuisine ka maza.",
    cuisine: "Thai & Multi-cuisine",
    icon: "🥘",
    color: "from-green-500/10 to-emerald-500/10"
  },
  {
    id: 3,
    name: "Doon Darbar",
    desc: "Agar aapko authentic Mughlai aur non-veg khana pasand hai, toh Dehradun mein isse behtar jagah nahi.",
    cuisine: "Mughlai & Indian",
    icon: "🍗",
    color: "from-amber-500/10 to-yellow-500/10"
  },
  {
    id: 4,
    name: "Black Pepper",
    desc: "Family dinners ke liye ek classic premium restaurant. Inka North Indian aur Mughlai khana bahut swadisht hai.",
    cuisine: "North Indian",
    icon: "🍛",
    color: "from-stone-500/10 to-zinc-500/10"
  },
  {
    id: 5,
    name: "Cafe De Piccolo",
    desc: "Rajpur Road par ek cozy aur aesthetic Italian cafe. Coffee, pasta aur romantic dates ke liye perfect.",
    cuisine: "Italian & Cafe",
    icon: "☕",
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 6,
    name: "Town Table",
    desc: "City ke beech mein ek elegant multi-cuisine restaurant, jahan ka ambience aur food quality top-notch hai.",
    cuisine: "Multi-cuisine",
    icon: "🍽️",
    color: "from-purple-500/10 to-violet-500/10"
  },
  {
    id: 7,
    name: "Y Cafe & Restaurant",
    desc: "Youth aur book lovers ke liye ek purn sukoon wali jagah. Live music aur continental food ke liye best.",
    cuisine: "Continental",
    icon: "🍕",
    color: "from-rose-500/10 to-pink-500/10"
  },
  {
    id: 8,
    name: "Mussoorie Lights",
    desc: "Rooftop dining ka behtareen anubhav. Sham ke waqt Dehradun ka nazara aur badhiya khana yahan milta hai.",
    cuisine: "Indian & Continental",
    icon: "🌃",
    color: "from-indigo-500/10 to-blue-500/10"
  },
  {
    id: 9,
    name: "Kumar Vegetarian",
    desc: "Pure veg khane ke shaukeen logon ke liye Dehradun ka sabse purana aur bharosemand naam.",
    cuisine: "Pure Vegetarian",
    icon: "🥗",
    color: "from-teal-500/10 to-green-500/10"
  }
];

function FoodPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
            Best Food & Restaurants in Dehradun
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tibetan momos se lekar authentic Mughlai aur cozy cafes tak, Dehradun ke sabse swadisht thikane yahan hain.
          </p>
        </div>

        {/* Grid for Restaurants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {restaurants.map((place) => (
            <div 
              key={place.id}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${place.color} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 cursor-pointer backdrop-blur-sm flex flex-col justify-between`}
            >
              <div>
                <div className="text-3xl mb-4 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block">
                  {place.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {place.name}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {place.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {place.cuisine}
                </span>
                <span className="text-xs text-muted-foreground group-hover:translate-x-1 transition-transform">
                  View Menu →
                </span>
              </div>
            </div>
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
