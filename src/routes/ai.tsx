import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute('/ai')({
  component: DehradunAIPage,
});

function DehradunAIPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Namaste! 🙏 Main DehradunAI hoon. Main aapki 3 tarah se madad kar sakta hoon:\n\n🗺️ 1. Local Guide: Best cafes aur ghumne ki jagah.\n📅 2. Trip Planner: 2-3 din ka poora tour plan.\n🔍 3. Business Finder: Aapke aas-paas best services aur dukanein.\n\nAapko aaj kya janna hai?"
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

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    // 2. Simulate AI Processing & Response (Dummy Logic for now)
    setTimeout(() => {
      let aiResponse = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes("trip") || lowerText.includes("plan")) {
        aiResponse = "Toh chaliye, 2 din ka plan banate hain! 📅\n\nDay 1: Subah Sahastradhara nahane jayein, dopahar mein Robber's Cave (Guchhupani) explore karein, aur shaam ko Rajpur Road par kisi badhiya cafe mein dinner karein.\n\nDay 2: Mussoorie nikal jayein. Kempty Fall aur Mall Road ghum kar shaam tak wapas aa jayein. Kaisa laga yeh plan?";
      } else if (lowerText.includes("business") || lowerText.includes("agency") || lowerText.includes("marketing")) {
        aiResponse = "Agar aap business aur services dhoond rahe hain, toh 'Viral Reach Media' digital marketing ke liye aur 'Elite Modular Interiors' architecture ke liye Dehradun mein sabse best hain! 🔍 Humari Business Directory mein inki details hain.";
      } else if (lowerText.includes("cafe") || lowerText.includes("food")) {
        aiResponse = "Rajpur Road par aapko 'Cafe De Piccolo' aur 'Orchard' jaise best cafes milenge. Wahan ka momos aur pasta zaroor try karein! ☕🍝";
      } else {
        aiResponse = "Yeh ek bahut accha sawal hai! Main abhi naya hoon aur seekh raha hoon. Par aap Local Business ya Dehradun ghumne se judi koi bhi baat pooch sakte hain! ✨";
      }

      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1500); // 1.5 second ka delay taaki asali typing jaisa lage
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center pt-8 px-4 pb-4">
      {/* Header */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            ✨ DehradunAI
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Aapka Smart Local Assistant</p>
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
              disabled={!input.trim()}
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
