import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute('/business')({
  component: BusinessPage,
});

// Aapka Supabase URL aur Key yahan set ho gaya hai 🚀
const SUPABASE_URL = "https://wixyklziushvegjhmkes.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TjJS7e8qwjCNMGtmeUOZKA_dS9mbE3R";

function BusinessPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Database se data laane ka Direct API function
  const fetchShops = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/shops?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      
      if (!response.ok) throw new Error('Data fetch failed');
      
      const data = await response.json();
      setShops(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = setTimeout(() => setIsLoaded(true), 100);
    fetchShops();
    return () => clearTimeout(timer);
  }, []);

  // Form submit karke Direct API se data save karna
  const handleSubmitBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/shops`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          shop_name: shopName,
          category: category,
          phone: phone,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error saving business: ' + errorData.message);
      } else {
        alert('Business successfully listed!');
        setShopName("");
        setCategory("");
        setPhone("");
        setShowForm(false);
        fetchShops(); // Refresh list instantly
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Network Error!');
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Database Connected Form */}
        {showForm && (
          <div className="max-w-lg mx-auto bg-card border border-border/50 shadow-2xl rounded-2xl p-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-foreground text-center">Add Your Business</h2>
            
            <form onSubmit={handleSubmitBusiness} className="flex flex-col gap-4">
              
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Business Name</label>
                <input 
                  type="text" 
                  value={shopName} 
                  onChange={(e) => setShopName(e.target.value)} 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="Enter business name..." 
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="e.g. Cafe, Tech, Real Estate..." 
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="+91..." 
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {submitting ? "Saving to Database..." : "Submit & Save to Database"}
                </button>

                <a 
                  href="https://wa.me/919068616888?text=Hi!%20I%20have%20submitted%20my%20business%20details%20on%20the%20website.%20Here%20are%20my%20photos:" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1ebd5c] hover:scale-[1.02]"
                >
                  Upload Photos on WhatsApp
                </a>
              </div>
            </form>
          </div>
        )}

        {/* Display Live Shops */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            <p className="text-center col-span-full text-muted-foreground">Loading businesses from database...</p>
          ) : shops.length === 0 ? (
            <p className="text-center col-span-full text-muted-foreground">No businesses found in database yet. Add one!</p>
          ) : (
            shops.map((business, index) => (
              <div 
                key={business.id || index}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-blue-500/5 p-6 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 backdrop-blur-sm flex flex-col justify-between ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                      🏢
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {business.category || "Dehradun Hub"}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {business.shop_name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-border/40 mt-auto">
                  <p className="text-sm font-medium text-foreground bg-background/50 inline-block px-3 py-1.5 rounded-lg border border-border">
                    📞 {business.phone || "Contact Available"}
                  </p>
                </div>
              </div>
            ))
          )}
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
