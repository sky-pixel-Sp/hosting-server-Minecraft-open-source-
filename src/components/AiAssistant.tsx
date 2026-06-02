import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles } from 'lucide-react';
import { ChatMessage, ServerSettings } from '../types';

interface Props {
  settings: ServerSettings;
}

export default function AiAssistant({ settings }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: "Hello! I'm your SkyHub Minecraft Assistant. I can help you configure your server on yupra.net, set up Cloudflare tunnels (dashboard.skyhub.my.id), or recommend plugins. How can I help?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          systemInstruction: `You are a helpful IT and Minecraft server AI assistant for the SkyHub dashboard. 
The user is building a server hosted on yupra.net. 
They are using Cloudflare Tunnels (dashboard.skyhub.my.id) to expose it.
Current setup: ${settings.type} version ${settings.version}, difficulty ${settings.difficulty}.
Keep answers concise, technical, bold commands, and use emojis.`
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I had trouble connecting to my neural net. Please try again." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Looks like the connection dropped. 🔌" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900 border-l border-slate-700">
      <header className="h-20 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between px-8 shrink-0">
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-blue-600/20 border border-blue-500 rounded flex items-center justify-center text-blue-400 text-xs shadow-lg">
             <Bot size={16} />
           </div>
           <div className="flex flex-col">
             <span className="text-sm font-bold text-white uppercase tracking-wider">AI Assistant</span>
             <span className="text-[10px] text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Bot Active & Listening
             </span>
           </div>
         </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                msg.role === 'ai' ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}>
                {msg.role === 'ai' ? <Sparkles size={14} /> : <User size={14} />}
              </div>
              <div className={`max-w-[75%] rounded-lg px-4 py-3 border ${
                msg.role === 'user' ? 'bg-slate-700 border-slate-600 text-white rounded-tr-sm' : 'bg-slate-800/50 border-slate-700/50 text-slate-200 rounded-tl-sm'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed text-xs">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm bg-blue-600/20 border-blue-500/50 text-blue-400">
                <Sparkles size={14} />
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 rounded-tl-sm flex items-center justify-center w-16">
                 <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-150"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-300"></div>
                 </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-700">
          <form onSubmit={handleSend} className="relative flex items-center bg-black/30 border border-slate-700 rounded overflow-hidden">
            <span className="pl-3 text-slate-500">
              <Bot size={14} />
            </span>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for configuration help..."
              className="w-full bg-transparent pl-3 pr-10 py-2.5 text-xs text-white focus:outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1 top-1 bottom-1 px-3 flex items-center justify-center bg-slate-800 hover:bg-slate-700 disabled:bg-transparent disabled:text-slate-600 text-white rounded text-xs transition-colors"
            >
              <Send size={12} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
