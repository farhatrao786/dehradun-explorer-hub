import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute('/business')({
  component: BusinessPage,
});

// Yeh wo businesses hain jo "List Your Business" se add honge
const localBusinesses = [
  {
    id: 1,
    name: "Viral Reach Media",
    category: "Digital Marketing",
    description: "Instagram reels ki reach badhane, video engagement badhane aur local brands ko grow karne ki top agency.",
    contact: "Contact: +91 98765 43210",
    color: "from-blue-500/10 to-indigo-500/10",
    icon: "📈"
  },
  {
    id: 2,
    name: "Elite Modular Interiors",
    category: "Architecture & Design",
    description: "Ghar ke aadhunik floor plans aur space-saving modular kitchen designs ke experts.",
    contact: "Contact: +91 98765 43211",
    color: "from-emerald-500/10 to-teal-500/10",
    icon: "🏠"
  },
  {
    id: 3,
    name: "Doon Auto & Tech Hub",
    category: "Automobile & Electronics",
    description: "Premium second-hand smartphones aur TVS scooters ki best deals aur financing options.",
    contact: "Contact: +91 98765 43212",
    color: "from-orange-500/10 to-red-500/10",
    icon: "🛵"
  }
];

function BusinessPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background px-4 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header aur "List Your Business" Button */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Local Business Directory
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Dehradun ki top services, agencies, aur dukaano ko yahan explore karein. Kya aapka business yahan nahi hai? Aaj hi add karein!
          </p>
          
          {/* List Your Business CTA Button */}
          <button className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-primary/30 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
            + List Your Business
          </button>
        </div>

        {/* Display Submitted Businesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {localBusinesses.map((business, index) => (
            <div 
              key={business.id}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${business.color} p-6 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 backdrop-blur-sm flex flex-col justify-between ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                    {business.icon}
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {business.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {business.name}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {business.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 mt-auto">
                <p className="text-sm font-medium text-foreground bg-background/50 inline-block px-3 py-1.5 rounded-lg border border-border">
                  📞 {business.contact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div 
          className={`text-center pb-8 transform transition-all duration-1000 delay-500 ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground px-8 py-3 text-sm font-bold shadow-sm transition-all hover:scale-105 hover:bg-secondary/80"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
