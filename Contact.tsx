import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold">Contact Us</h1>
          <p className="mt-2 text-sm opacity-80">TheDehradun.com se jude kisi bhi sawal ke liye sampark karein</p>
        </div>

        <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-5">
          
          <input type="hidden" name="access_key" value="ede5da8f-b1ae-4c47-a3cd-5f7106d8391c" />
          <input type="hidden" name="redirect" value="https://thedehradun.com/success" />
          
          <div>
            <label className="text-sm font-semibold opacity-90">Aapka Naam:</label>
            <input 
              type="text" 
              name="Name" 
              required 
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/60 focus:bg-white/10 transition-all" 
              placeholder="Apna poora naam likhein"
            />
          </div>

          <div>
            <label className="text-sm font-semibold opacity-90">Phone Number / Email:</label>
            <input 
              type="text" 
              name="Contact_Info" 
              required 
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/60 focus:bg-white/10 transition-all" 
              placeholder="Mobile number ya email dalein"
            />
          </div>

          <div>
            <label className="text-sm font-semibold opacity-90">Aapka Message:</label>
            <textarea 
              name="Message" 
              rows={4}
              required 
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/60 focus:bg-white/10 transition-all" 
              placeholder="Apni baat yahan likhein..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="mt-2 w-full rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
}
