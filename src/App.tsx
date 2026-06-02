import React, { useState } from 'react';
import { Settings, Terminal, Box, MessageSquare, Download, Server, Cloud, Menu, X, Cpu, ShieldPlus } from 'lucide-react';
import { cn } from './lib/utils';
import { ServerSettings } from './types';
import Dashboard from './components/Dashboard';
import ServerSetup from './components/ServerSetup';
import Console from './components/Console';
import AiAssistant from './components/AiAssistant';
import WorldSettings from './components/WorldSettings';
import ModManager from './components/ModManager';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Default initial server settings matching the user's needs
  const [settings, setSettings] = useState<ServerSettings>({
    version: "1.20.4",
    type: "paper",
    motd: "A SkyHub Minecraft Server",
    maxPlayers: 20,
    serverPort: 25565,
    difficulty: "normal",
    gamemode: "survival",
    onlineMode: true,
    pvp: true,
    hardcore: false,
    enableCommandBlock: false,
    levelName: "world",
    levelSeed: ""
  });

  const getActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard settings={settings} onNavigate={setActiveTab} />;
      case 'setup': return <ServerSetup settings={settings} onSettingsChange={setSettings} />;
      case 'world': return <WorldSettings settings={settings} onSettingsChange={setSettings} />;
      case 'mods': return <ModManager />;
      case 'console': return <Console />;
      case 'ai': return <AiAssistant settings={settings} />;
      default: return <Dashboard settings={settings} onNavigate={setActiveTab} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Server },
    { id: 'setup', label: 'Server & Export', icon: Download },
    { id: 'world', label: 'World Settings', icon: Settings },
    { id: 'mods', label: 'Mods & Plugins', icon: ShieldPlus },
    { id: 'console', label: 'Terminal', icon: Terminal },
    { id: 'ai', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-slate-800 border border-slate-700 rounded-md text-white">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20">
              SH
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight uppercase tracking-wider">SKYHUB</h1>
              <p className="text-[10px] text-slate-400 tracking-wider">dashboard.skyhub.my.id</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors cursor-pointer",
                  active 
                    ? "bg-slate-700/50 text-white" 
                    : "text-slate-400 hover:bg-slate-700/30 hover:text-white"
                )}
              >
                {active ? (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                ) : (
                  <item.icon size={14} className="shrink-0" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-800">
           <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
             <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 flex items-center justify-between">
               <span>Hosted On</span>
               <span className="flex items-center gap-1"><Cpu size={10}/> yupra.net</span>
             </p>
             <p className="text-xs text-emerald-400 font-mono">yupra-node-04</p>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {getActiveComponent()}
      </main>
    </div>
  );
}
