import React, { useState } from 'react';
import { Package, Upload, Trash2, ShieldPlus } from 'lucide-react';

export default function ModManager() {
  const [mods, setMods] = useState([
    { name: 'LuckPerms', version: '5.4.131', type: 'Plugin', status: 'Active' },
    { name: 'ViaVersion', version: '4.9.2', type: 'Plugin', status: 'Active' },
    { name: 'WorldEdit', version: '7.3.0', type: 'Plugin', status: 'Warning' }
  ]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <header className="h-20 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-8 shrink-0">
         <div className="flex items-center gap-3">
           <ShieldPlus size={24} className="text-rose-500" />
           <div className="flex flex-col">
             <span className="text-sm font-bold text-white uppercase tracking-wider">Mods & Plugins</span>
             <span className="text-[10px] text-slate-400">Manage packages and JARs</span>
           </div>
         </div>
         <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-xs rounded shadow-lg font-bold transition-colors">
           <Upload size={14} /> UPLOAD .JAR
         </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden shadow-sm">
             <table className="w-full text-left">
               <thead className="bg-slate-900 border-b border-slate-700">
                 <tr>
                   <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                   <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                   <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Version</th>
                   <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                   <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-700/50 bg-transparent text-[11px]">
                 {mods.map((mod, i) => (
                   <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                     <td className="px-5 py-3 text-white font-bold flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
                          <Package size={12} />
                        </div>
                        {mod.name}
                     </td>
                     <td className="px-5 py-3 text-slate-400">{mod.type}</td>
                     <td className="px-5 py-3 text-slate-400 font-mono">{mod.version}</td>
                     <td className="px-5 py-3">
                       <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                         mod.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                       }`}>
                         {mod.status}
                       </span>
                     </td>
                     <td className="px-5 py-3 text-right">
                       <button className="text-slate-500 hover:text-rose-400 transition-colors" title="Remove Package">
                         <Trash2 size={14} />
                       </button>
                     </td>
                   </tr>
                 ))}
                 {mods.length === 0 && (
                   <tr>
                     <td colSpan={5} className="px-5 py-8 text-center text-slate-500 text-xs">
                       No packages loaded. Upload a .JAR to begin.
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
