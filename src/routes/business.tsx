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

        <form action="https://api.web3forms.com/submit" method="POST" encType="multipart/form-data" className="flex flex-col gap-5">
          
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

          <div>
            <label className="text-sm font-semibold opacity-90">Dukan ya Business ki Photo upload karein:</label>
            <input 
              type="file" 
              name="Business_Image" 
              accept="image/png, image/jpeg, image/jpg" 
              className="mt-2 w-full cursor-pointer rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm opacity-80 outline-none transition-all file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-xs file:font-bold file:text-black hover:file:bg-gray-200" 
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 w-full rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
          >
            Submit Details
          </button>

        </form>
      </div>
    </div>
  );
}
