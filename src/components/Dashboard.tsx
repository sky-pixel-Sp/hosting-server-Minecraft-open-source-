import React from 'react';
import { ServerSettings } from '../types';
import { Activity, Users, Cpu, HardDrive, ArrowRight, Play, Server, Zap } from 'lucide-react';

interface Props {
  settings: ServerSettings;
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ settings, onNavigate }: Props) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Top Stats Header */}
      <header className="h-20 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-500 font-bold">Server Status</span>
            <span className="text-emerald-400 text-sm font-semibold flex items-center gap-2">● Running <span className="text-slate-400 font-normal italic font-mono">{settings.version}</span></span>
          </div>
          <div className="flex flex-col border-l border-slate-700 pl-8">
            <span className="text-[10px] uppercase text-slate-500 font-bold">Memory Usage</span>
            <span className="text-white text-sm font-semibold">3.8 GB / 8.0 GB</span>
          </div>
          <div className="flex flex-col border-l border-slate-700 pl-8">
            <span className="text-[10px] uppercase text-slate-500 font-bold">Max Players</span>
            <span className="text-white text-sm font-semibold">{settings.maxPlayers}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded shadow-lg transition-colors">STOP</button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded shadow-lg transition-colors">RESTART</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Current Status', value: 'Ready to Pack', icon: Activity, color: 'text-emerald-400', border: 'border-emerald-500/20' },
              { label: 'Software Types', value: settings.type.toUpperCase(), icon: Server, color: 'text-blue-400', border: 'border-blue-500/20' },
              { label: 'Tunnel Link', value: 'Active', icon: Zap, color: 'text-amber-400', border: 'border-amber-500/20' },
              { label: 'PVP Mode', value: settings.pvp ? 'Enabled' : 'Disabled', icon: Users, color: 'text-rose-400', border: 'border-rose-500/20' },
            ].map((stat, i) => (
              <div key={i} className={`bg-slate-800/50 border border-slate-700 border-b-2 ${stat.border} rounded-lg p-4 shadow-sm`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">{stat.label}</p>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded border border-slate-700">
                    <stat.icon size={16} className={stat.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-5 shadow-sm">
              <h2 className="text-xs font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Play size={14} className="text-emerald-400" /> Quick Management
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => onNavigate('setup')}
                  className="w-full flex items-center justify-between p-4 rounded bg-slate-900/50 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <HardDrive size={14} className="text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs text-white uppercase font-bold">Export Server</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Build .zip package</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </button>

                <button 
                  onClick={() => onNavigate('world')}
                  className="w-full flex items-center justify-between p-4 rounded bg-slate-900/50 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Activity size={14} className="text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs text-white uppercase font-bold">Configure World</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Edit properties</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>
                
                <button 
                  onClick={() => onNavigate('ai')}
                  className="w-full flex items-center justify-between p-4 rounded bg-slate-900/50 hover:bg-slate-700 border border-slate-700 hover:border-purple-500/50 transition-all group md:col-span-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Cpu size={14} className="text-purple-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs text-white uppercase font-bold">AI Assistant Setup</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Need help configuring luckperms or setting up Cloudflare?</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            {/* Server Info Layer */}
            <div className="flex flex-col gap-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 shadow-sm">
                <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Network Topology</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400">Tunnel Port</span>
                    <span className="text-xs font-mono text-white">{settings.serverPort}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400">Proxy IP</span>
                    <span className="text-xs font-mono text-white">172.64.12.1</span>
                  </div>
                  <div className="mt-4 h-24 bg-slate-900 rounded border border-slate-700 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Domain linked</span>
                      <span className="text-xs font-mono font-bold text-blue-400">mc.skyhub.my.id</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 shadow-sm">
                 <h2 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">MOTD</h2>
                 <div className="bg-slate-900 border border-slate-700 rounded p-2.5">
                   <div className="text-emerald-400 font-mono text-[11px] leading-relaxed">
                     {settings.motd}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
