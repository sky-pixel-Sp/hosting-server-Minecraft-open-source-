import React from 'react';
import { ServerSettings } from '../types';
import { Settings2, Save } from 'lucide-react';

interface Props {
  settings: ServerSettings;
  onSettingsChange: (settings: ServerSettings) => void;
}

export default function WorldSettings({ settings, onSettingsChange }: Props) {
  const handleChange = (key: keyof ServerSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <header className="h-20 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-8 shrink-0">
         <div className="flex items-center gap-3">
           <Settings2 size={24} className="text-emerald-500" />
           <div className="flex flex-col">
             <span className="text-sm font-bold text-white uppercase tracking-wider">World Configuration</span>
             <span className="text-[10px] text-slate-400">Visually edit server.properties</span>
           </div>
         </div>
         <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow-lg transition-colors flex gap-2 items-center">
           <Save size={14} /> SAVE & APPLY
         </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* General Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-wider border-b border-slate-700/50 pb-2">General Setting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Level Name (World Folder)</label>
                <input 
                  type="text" 
                  value={settings.levelName} 
                  onChange={(e) => handleChange('levelName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Level Seed</label>
                <input 
                  type="text" 
                  value={settings.levelSeed} 
                  onChange={(e) => handleChange('levelSeed', e.target.value)}
                  placeholder="Leaving blank generates random seed"
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Gameplay Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
             <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-wider border-b border-slate-700/50 pb-2">Gameplay</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gamemode</label>
                <select 
                  value={settings.gamemode}
                  onChange={(e) => handleChange('gamemode', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value="survival">Survival</option>
                  <option value="creative">Creative</option>
                  <option value="adventure">Adventure</option>
                  <option value="spectator">Spectator</option>
                </select>
               </div>

               <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Difficulty</label>
                <select 
                  value={settings.difficulty}
                  onChange={(e) => handleChange('difficulty', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value="peaceful">Peaceful</option>
                  <option value="easy">Easy</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Hard</option>
                </select>
               </div>
             </div>
          </div>

          {/* Toggles */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-wider border-b border-slate-700/50 pb-2">Rules & Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'pvp', label: 'Allow Player VS Player (PVP)' },
                { id: 'hardcore', label: 'Hardcore Mode (1 Life)' },
                { id: 'enableCommandBlock', label: 'Enable Command Blocks' },
                { id: 'onlineMode', label: 'Online Mode (Premium Only)' },
              ].map(toggle => (
                <label key={toggle.id} className="flex items-center gap-3 p-3 rounded border border-slate-700 bg-slate-900 cursor-pointer hover:bg-slate-800 transition-colors">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={settings[toggle.id as keyof ServerSettings] as boolean}
                      onChange={(e) => handleChange(toggle.id as keyof ServerSettings, e.target.checked)}
                    />
                    <div className={`w-8 h-4 rounded-full transition-colors flex items-center px-0.5 ${settings[toggle.id as keyof ServerSettings] ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                      <div className={`bg-white w-3 h-3 rounded-full transition-transform ${settings[toggle.id as keyof ServerSettings] ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{toggle.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
