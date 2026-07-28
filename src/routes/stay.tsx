import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute('/stay')({
  component: StayPage,
});

const hotels = [
  {
    id: 1,
    name: "Hyatt Regency Dehradun Resort and Spa",
    desc: "Malsi forest ke paas sthit ek luxury 5-star resort. Yahan se mountain views aur world-class spa facilities milti hain.",
    price: "₹10,000+ / night",
    icon: "🏨",
    color: "from-blue-500/10 to-indigo-500/10"
  },
  {
    id: 2,
    name: "Fairfield by Marriott Dehradun",
    desc: "Modern amenities, shandar rooms aur behtareen hospitality ke liye jana jane wala top-rated business & leisure hotel.",
    price: "₹7,500+ / night",
    icon: "⭐",
    color: "from-amber-500/10 to-orange-500/10"
  },
  {
    id: 3,
    name: "Four Points by Sheraton Dehradun",
    desc: "City center ke kareeb ek premium hotel, jahan comfortable stay ke sath-sath rooftop dining aur pool ka maza milta hai.",
    price: "₹6,000+ / night",
    icon: "🏢",
    color: "from-green-500/10 to-emerald-500/10"
  },
  {
    id: 4,
    name: "Ramada by Wyndham Dehradun",
    desc: "Families aur couples ke liye ekdum peaceful aur luxurious jagah. Shandar food aur spacious rooms available hain.",
    price: "₹5,000+ / night",
    icon: "🛏️",
    color: "from-purple-500/10 to-fuchsia-500/10"
  },
  {
    id: 5,
    name: "Lemon Tree Hotel, Dehradun",
    desc: "Vibrant interiors, cheerful staff aur affordable luxury ke sath ek accha option jo city mein easily accessible hai.",
    price: "₹3,500+ / night",
    icon: "🍋",
    color: "from-yellow-500/10 to-amber-500/10"
  },
  {
    id: 6,
    name: "Seyfert Sarovar Portico",
    desc: "Rajpur Road ke paas sthit, badhiya dining options aur modern rooms ke sath ek behtareen comfortable stay.",
    price: "₹4,000+ / night",
    icon: "🏔️",
    color: "from-cyan-500/10 to-blue-500/10"
  },
  {
    id: 7,
    name: "Hotel Madhuban",
    desc: "Dehradun ke purane aur sabse trusted classic hotels mein se ek. Traditional hospitality aur great food ke liye famous.",
    price: "₹3,000+ / night",
    icon: "🏛️",
    color: "from-rose-500/10 to-red-500/10"
  },
  {
    id: 8,
    name: "Red Fox by Lemon Tree Hotels",
    desc: "Budget-friendly aur smart stay jo travelers ke liye ekdum pocket-friendly aur comfortable padav hai.",
    price: "₹2,800+ / night",
    icon: "🛋️",
    color: "from-emerald-500/10 to-teal-500/10"
  },
  {
    id: 9,
    name: "Rio Resort Dehradun",
    desc: "Nature ke beech bana hua ek khoobsurat resort, jahan greenery aur shanti ka anubhav hota hai.",
    price: "₹4,500+ / night",
    icon: "🌴",
    color: "from-violet-500/10 to-purple-500/10"
  }
];

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
            Chahe luxury resort chahiye ya comfortable budget hotel, Dehradun mein aapke stay ko yaadgar banane ke liye best options yahan hain.
          </p>
        </div>

        {/* Grid for Hotels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {hotels.map((hotel) => (
            <div 
              key={hotel.id}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${hotel.color} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 cursor-pointer backdrop-blur-sm flex flex-col justify-between`}
            >
              <div>
                <div className="text-3xl mb-4 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block">
                  {hotel.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {hotel.name}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {hotel.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {hotel.price}
                </span>
                <span className="text-xs text-muted-foreground group-hover:translate-x-1 transition-transform">
                  View Details →
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
