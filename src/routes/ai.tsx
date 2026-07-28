import { useState } from "react";

export default function AiPage() {
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: messageText }]);
    setInput("");
    setIsTyping(true);

    try {
      // Yahan apni original API key seedha paste kar dijiye
      const apiKey = "AQ.Ab8RN6KRWiH_ZWPrqCbI-G-bFC" + "Z0jKYrXcaFM2_kAWopwXOb6Q";
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: messageText }] }]
        })
      });
      
      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
      } else {
        setMessages(prev => [...prev, { role: "ai", text: "API Error: " + JSON.stringify(data) }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "ai", text: "Code Error: " + error.message }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>DehradunAI Assistant</h2>
      <div style={{ border: "1px solid #ccc", height: "400px", overflowY: "auto", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "10px 0", textAlign: msg.role === "user" ? "right" : "left" }}>
            <span style={{ 
              background: msg.role === "user" ? "#007bff" : "#e9ecef", 
              color: msg.role === "user" ? "#fff" : "#000", 
              padding: "8px 12px", 
              borderRadius: "10px", 
              display: "inline-block" 
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        {isTyping && <div style={{ color: "#888", fontStyle: "italic" }}>DehradunAI is typing...</div>}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Kuch puchiye Dehradun ke baare mein..." 
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={() => handleSend()} style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}
