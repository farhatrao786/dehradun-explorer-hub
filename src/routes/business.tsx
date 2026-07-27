import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/business")({
  component: BusinessPage,
});

function BusinessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold">List Your Business</h1>
          <p className="mt-2 text-sm opacity-80">Welcome to TheDehradun.com Business Listing</p>
        </div>

        <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-5">
          
          <input type="hidden" name="access_key" value="ede5da8f-b1ae-4c47-a3cd-5f7106d8391c" />
          
          <div>
            <label className="text-sm font-semibold opacity-90">Business ka Naam:</label>
            <input 
              type="text" 
              name="Business_Name" 
              required 
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/60 focus:bg-white/10 transition-all" 
              placeholder="Jaise: Sharma Sweets"
            />
          </div>

          <div>
            <label className="text-sm font-semibold opacity-90">Phone Number:</label>
            <input 
              type="text" 
              name="Phone_Number" 
              required 
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/60 focus:bg-white/10 transition-all" 
              placeholder="Apna 10-digit number dalein"
            />
          </div>

          {/* WhatsApp Photo Section */}
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center">
            <p className="text-xs font-medium opacity-90 mb-3">📸 Dukan ya Business ki photo bhejne ke liye:</p>
            <a 
              href="https://wa.me/919999999999?text=Hello,%20main%20apni%20business%20listing%20ke%20liye%20photo%20bhej%20raha%20hoon." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              💬 Upload Photo via WhatsApp
            </a>
          </div>
          
          <button 
            type="submit" 
            className="mt-2 w-full rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
          >
            Submit Details
          </button>

        </form>
      </div>
    </div>
  );
}
