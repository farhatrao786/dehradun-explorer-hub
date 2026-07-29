import { createFileRoute } from "@tanstack/react-router";

type WebResult = { title: string; url: string; snippet: string };

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function pick(xml: string, tag: string) {
  const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : "";
}

function parseRss(xml: string): WebResult[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .map((it) => ({
      title: pick(it, "title"),
      url: pick(it, "link"),
      snippet: pick(it, "description"),
    }))
    .filter((r) => r.title && r.url)
    .slice(0, 8);
}

export const Route = createFileRoute("/api/websearch")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
        if (!q) return Response.json({ results: [] as WebResult[] });

        const query = /dehradun/i.test(q) ? q : `${q} Dehradun`;
        try {
          const res = await fetch(
            `https://www.bing.com/search?q=${encodeURIComponent(query)}&format=rss&mkt=en-IN`,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
                "Accept-Language": "en-IN,en;q=0.9",
              },
            },
          );
          if (!res.ok) return Response.json({ results: [], error: `Web search failed (${res.status})` });
          return Response.json({ results: parseRss(await res.text()), query });
        } catch (e) {
          console.error("websearch failed", e);
          return Response.json({ results: [], error: "Web search unavailable" });
        }
      },
    },
  },
});
