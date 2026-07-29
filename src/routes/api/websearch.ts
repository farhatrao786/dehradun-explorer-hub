import { createFileRoute } from "@tanstack/react-router";

type WebResult = { title: string; url: string; snippet: string };

function decode(s: string) {
  return s
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function parseDuckDuckGo(html: string): WebResult[] {
  const out: WebResult[] = [];
  const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && out.length < 8) {
    let url = m[1];
    const uddg = url.match(/uddg=([^&]+)/);
    if (uddg) url = decodeURIComponent(uddg[1]);
    if (url.startsWith("//")) url = "https:" + url;
    out.push({ url, title: decode(m[2]), snippet: decode(m[3]) });
  }
  return out;
}

export const Route = createFileRoute("/api/websearch")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
        if (!q) {
          return Response.json({ results: [] as WebResult[] });
        }
        const query = /dehradun/i.test(q) ? q : `${q} Dehradun`;
        try {
          const res = await fetch("https://html.duckduckgo.com/html/?q=" + encodeURIComponent(query), {
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; TheDehradunBot/1.0)",
              Accept: "text/html",
            },
          });
          if (!res.ok) {
            return Response.json({ results: [], error: `Web search failed (${res.status})` }, { status: 200 });
          }
          const html = await res.text();
          return Response.json({ results: parseDuckDuckGo(html), query });
        } catch (e) {
          console.error("websearch failed", e);
          return Response.json({ results: [], error: "Web search unavailable" }, { status: 200 });
        }
      },
    },
  },
});
