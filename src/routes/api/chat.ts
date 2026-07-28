import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Tum "Dehradun AI" ho — TheDehradun.com ka local guide assistant.
Tum Dehradun (Uttarakhand, India) ke baare mein sab jaante ho: cafes, restaurants, hospitals,
schools, ghumne ki jagah, hotels, shopping, transport, weather aur local tips.
Jawab friendly, short aur practical do (Hinglish me, jaise user poochhe waise hi bhasha me).
Jahan ho sake specific naam, area (jaise Rajpur Road, Paltan Bazaar, Clement Town) aur ek chhota tip do.
Agar sawaal Dehradun se related na ho to politely Dehradun par wapas le aao.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) {
          return new Response(JSON.stringify({ error: "Messages are required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "AI is not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)],
          }),
        });

        if (!upstream.ok) {
          const text = await upstream.text();
          const status = upstream.status === 429 || upstream.status === 402 ? upstream.status : 500;
          const error =
            upstream.status === 429
              ? "Bahut zyada requests aa gayi hain. Thodi der baad try karein."
              : upstream.status === 402
                ? "AI credits khatam ho gaye hain."
                : `AI error: ${text.slice(0, 200)}`;
          return new Response(JSON.stringify({ error }), {
            status,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = (await upstream.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content ?? "Sorry, jawab nahi mil paaya.";

        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
