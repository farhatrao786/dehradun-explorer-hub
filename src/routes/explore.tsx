import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute('/explore')({
  component: ExplorePage,
});

const places = [
  {
    id: 1,
    name: "Robber's Cave (Guchhupani)",
    desc: "Ek natural river cave formation. Garmiyon mein thande paani ke beech chalne ka alag hi maza hai aur photos ke liye best hai.",
    icon: "🌊",
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 2,
    name: "Sahastradhara",
    desc: "'Thousand fold spring' jahan sulphur springs aur hazaron jharne hain. Yahan ka paani health ke liye bahut achha maana jata hai.",
    icon: "🏞️",
    color: "from-green-500/10 to-emerald-500/10"
  },
  {
    id: 3,
    name: "Forest Research Institute",
    desc: "British time ki behtareen architecture aur hari-bhari greenery. Yahan kai famous Bollywood movies ki shooting hui hai.",
    icon: "🏛️",
    color: "from-orange-500/10 to-amber-500/10"
  },
  {
    id: 4,
    name: "Mindrolling Monastery",
    desc: "Clement Town mein sthit, yeh India ke sabse bade Buddhist Viharas mein se ek hai. Yahan ki shanti aur bada Stupa dekhne layak hai.",
    icon: "☸️",
    color: "from-red-500/10 to-rose-500/10"
  },
  {
    id: 5,
    name: "Tapkeshwar Mahadev",
    desc: "Ek prachin aur chamaktkari Shiv mandir jo ek gufa mein sthit hai, jahan pahadon se Shivling par lagatar paani tapakta rehta hai.",
    icon: "🕉️",
    color: "from-purple-500/10 to-fuchsia-500/10"
  },
  {
    id: 6,
    name: "George Everest Peak",
    desc: "Mussoorie ke raste mein ek behtareen trekking spot. Yahan se sunset aur puri Doon valley ka view ekdum jabardast dikhta hai.",
    icon: "⛰️",
    color: "from-indigo-500/10 to-blue-500/10"
  }
];

function ExplorePage() {
  // Yeh code page khulte hi scroll ko ekdum upar set kar dega
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="w-full bg-background px-4 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Explore The Doon Valley
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Pahadon ki rani, Dehradun mein aapka swagat hai! Yahan ke behtareen tourist spots, jharne, aur khubsoorat wadiyon ko discover karein.
          </p>
        </div>

        {/* Grid for Places */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {places.map((place) => (
            <div 
              key={place.id}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${place.color} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 cursor-pointer backdrop-blur-sm`}
            >
              <div className="text-3xl mb-4 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block">
                {place.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                {place.name}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {place.desc}
              </p>
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
