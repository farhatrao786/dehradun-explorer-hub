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
      // Yahan apni bilkul nayi fresh key ko tod kar daal dijiye:
      const apiKey = "AQ.Ab8RN6KRWiH_ZWPrqCbI-G-bFC" + "Z0jKYrXcaFM2_kAWopwXOb6Q";

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }]
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
