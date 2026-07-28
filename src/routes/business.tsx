import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute('/business')({
  component: BusinessPage,
});

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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background px-4 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div 
          className={`text-center mb-10 transform transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Local Business Directory
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Dehradun ki top services, agencies, aur dukaano ko yahan explore karein. Kya aapka business yahan nahi hai? Aaj hi add karein!
          </p>
          
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-primary/30 ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
          >
            {showForm ? "✕ Close Form" : "+ List Your Business"}
          </button>
        </div>

        {/* Form & WhatsApp Button Section */}
        {showForm && (
          <div className="max-w-lg mx-auto bg-card border border-border/50 shadow-2xl rounded-2xl p-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-foreground text-center">Add Your Business</h2>
            
            <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-4">
              
              {/* APNI NAYI ACCESS KEY YAHAN DAALEIN */}
              <input type="hidden" name="access_key" value="ede5da8f-b1ae-4c47-a3cd-5f7106d8391c"/>
              
              {/* Professional Email Look Ke Liye */}
              <input type="hidden" name="subject" value="New Business Listing Request - Dehradun Hub" />
              <input type="hidden" name="from_name" value="Dehradun Explorer Hub" />
              
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Business Name</label>
                <input type="text" name="Business Name" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Enter business name..." />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                <input type="text" name="Category" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="e.g. Cafe, Tech, Real Estate..." />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
                <input type="tel" name="Phone Number" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="+91..." />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                {/* Submit Details Button */}
                <button type="submit" className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90">
                  Submit Details
                </button>
                
                {/* Divider */}
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase my-1">
                  <div className="h-px w-full bg-border"></div>
                  <span>AND</span>
                  <div className="h-px w-full bg-border"></div>
                </div>

                {/* WhatsApp Button */}
                <a 
                  href="https://wa.me/919068616888?text=Hi!%20I%20have%20submitted%20my%20business%20details%20on%20the%20website.%20Here%20are%20the%20photos%20for%20my%20listing:" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1ebd5c] hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Upload Photos on WhatsApp
                </a>
              </div>
            </form>
          </div>
        )}

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
