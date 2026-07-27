import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-20">
      <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-md text-center md:p-12">
        
        <h1 className="font-display text-4xl font-semibold mb-4">About TheDehradun.com</h1>
        
        <p className="text-sm opacity-80 leading-relaxed mb-6">
          TheDehradun.com Dehradun ki sabse behtareen digital directory aur platform hai, jiska maksad local businesses, shops, aur services ko ek nayi digital pehchan dena hai. 
        </p>

        <p className="text-sm opacity-80 leading-relaxed mb-8">
          Humara yeh prayaas hai ki Dehradun ke har chote-bade vyapar (business) ko yahan ke sthaniya logon tak aasani se pahunchaya ja sake, taaki local economy ko badhava mile aur logon ko unki zaroorat ki saari cheezein ek hi jagah par mil sakein.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/business" 
            className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
          >
            List Your Business
          </Link>
          <Link 
            to="/contact" 
            className="rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}
