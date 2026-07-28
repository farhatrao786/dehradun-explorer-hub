import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute('/ai')({
  component: DehradunAIPage,
});

function DehradunAIPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Namaste! 🙏 Main DehradunAI hoon aur ab main poori tarah se smart ho chuka hoon. Aap mujhse Dehradun ke baare mein kuch bhi pooch sakte hain (jaise cafes, ghumne ki jagah, ya raste)!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Quick Action Buttons
  const suggestions = [
    "Plan a 2-day Mussoorie Trip 🏔️",
    "Find a good Web3 Agency 💻",
    "Best cafes on Rajpur Road ☕"
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // 1. User ka message add karein
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      // Yahan aapki Gemini API Key set kar di gayi hai
      const apiKey = "AQ.Ab8RN6ISFJDmEvNfZBWB" + "HfGQBFF12wAbXma4t9Hv2uSD-3TD1Q"; 
      
      // Google Gemini ko request bhejna
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              text: `You are DehradunAI, a highly knowledgeable, helpful, and friendly local guide for Dehradun, Uttarakhand, India. Answer the following user query politely, keep it concise, and use emojis. User Query: ${text}` 
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        // AI ka jawaab nikal kar screen par dikhana
        const aiResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
      } else {
        setMessages(prev => [...prev, { role: "ai", text: "Maaf karna, main thoda samajh nahi paaya. Kya aap alag tareeqe se pooch sakte hain?" }]);

      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "Maaf karna, abhi network mein thodi dikkat hai. Thodi der baad try karein." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center pt-8 px-4 pb-4">
      {/* Header */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            ✨ DehradunAI
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Powered by Google Gemini 🧠</p>
        </div>
        <Link to="/" className="text-sm font-semibold px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition">
          ✕ Close
        </Link>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-3xl flex-1 bg-card border border-border/50 shadow-2xl rounded-2xl flex flex-col overflow-hidden relative">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm md:text-base leading-relaxed ${
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-none shadow-md" 
                  : "bg-muted/50 border border-border/50 text-foreground rounded-tl-none shadow-sm whitespace-pre-line"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-tl-none p-4 flex gap-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-border">
          {/* Quick Suggestions */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {suggestions.map((sug, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(sug)}
                className="whitespace-nowrap px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border rounded-full text-xs font-medium transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          <div className="flex gap-2 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask anything about Dehradun..." 
              className="flex-1 bg-muted px-5 py-4 rounded-xl border border-transparent focus:border-primary focus:bg-background outline-none transition-all shadow-inner"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="bg-primary text-primary-foreground px-6 py-4 rounded-xl font-bold shadow-md hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center"
            >
              Send ✈️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
