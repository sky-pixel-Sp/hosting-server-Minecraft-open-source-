import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function Console() {
  const [logs, setLogs] = useState<string[]>([
    "Loading libraries, please wait...",
    "[12:00:00 INFO]: Starting minecraft server version 1.20.4",
    "[12:00:00 INFO]: Loading properties",
    "[12:00:00 INFO]: Default game type: SURVIVAL",
    "[12:00:00 INFO]: Generating keypair",
    "[12:00:01 INFO]: Starting Minecraft server on *:25565",
    "[12:00:01 INFO]: Using default channel type",
    "[12:00:03 INFO]: Preparing level \"world\"",
    "[12:00:04 INFO]: Preparing start region for dimension minecraft:overworld",
    "[12:00:05 INFO]: Time elapsed: 1459 ms",
    "[12:00:05 INFO]: Done (4.582s)! For help, type \"help\"",
    "Connected to Cloudflare HTTP tunnel: dashboard.skyhub.my.id",
  ]);
  
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Echo the command
    setLogs(prev => [...prev, `> ${input}`]);
    
    // Simulate some basic responses
    const cmd = input.toLowerCase().trim();
    setTimeout(() => {
      if (cmd === 'help') {
        setLogs(prev => [...prev, "[INFO]: Available commands: help, list, stop, say, op"]);
      } else if (cmd === 'list') {
        setLogs(prev => [...prev, "[INFO]: There are 0 of a max of 20 players online: "]);
      } else if (cmd.startsWith('say ')) {
        setLogs(prev => [...prev, `[Server] ${input.substring(4)}`]);
      } else {
        setLogs(prev => [...prev, `[INFO]: Unknown command. Type "help" for help.`]);
      }
    }, 300);

    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-black/50 p-6">
      <div className="flex flex-col h-full bg-black/50 border border-slate-700 rounded-lg overflow-hidden shrink-0 shadow-2xl">
        <div className="bg-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Terminal size={12}/> Live Terminal Output
          </span>
          <div className="flex gap-1.5 items-center">
            <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">Connected</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto font-mono text-[11px] text-emerald-300/80 space-y-1 bg-black/40">
          {logs.map((log, i) => (
             <div 
               key={i} 
               className={`leading-relaxed ${
                 log.includes('WARN') ? 'text-amber-400' : 
                 log.includes('ERROR') ? 'text-rose-400' :
                 log.startsWith('>') ? 'text-slate-400' :
                 log.includes('Connected') ? 'text-blue-400 italic' :
                 log.includes('[Server]') ? 'text-white font-bold' : ''
               }`}
             >
               {log.includes(']') && !log.startsWith('>') ? (
                 <>
                   <span className="text-slate-500 mr-2">{log.substring(0, log.indexOf(']') + 1)}</span>
                   {log.substring(log.indexOf(']') + 1)}
                 </>
               ) : log}
             </div>
          ))}
          <div ref={bottomRef} />
        </div>
        
        <form onSubmit={handleCommand} className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2 w-full">
          <span className="text-slate-500 font-mono py-1 px-2 select-none">$</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter console command..."
            className="flex-1 bg-transparent text-white text-xs font-mono outline-none py-1"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
