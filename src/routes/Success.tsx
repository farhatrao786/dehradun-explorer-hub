import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/Success")({
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-3xl">
          ✓
        </div>

        <h1 className="font-display text-3xl font-semibold">Thank You!</h1>
        <p className="mt-3 text-sm opacity-80 leading-relaxed">
          Aapki business details safalpurvak bhej di gayi hain. Hum jald hi aapse sampark karenge.
        </p>

        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
          >
            Go Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
