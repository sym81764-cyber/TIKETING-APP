
import React from 'react';
import { UserRole } from '../types';

interface RoleSelectorProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="h-screen w-full bg-black flex flex-col p-8 justify-center items-center text-white">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-black italic tracking-tighter text-[#99FF00] mb-2">VIBE DKR</h1>
        <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Comment souhaitez-vous utiliser l'app ?</p>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
        {/* Organisateur */}
        <button 
          onClick={() => onSelect('ORGANIZER')}
          className="group relative bg-zinc-900 border-2 border-white/5 p-8 rounded-[3rem] text-left transition-all hover:border-white/20 active:scale-95"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
            </div>
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Organisateur</h2>
          <p className="text-xs text-white/40 font-bold leading-relaxed">Je crée des événements et je gère mes ventes de billets.</p>
          <div className="absolute top-8 right-8 text-white/10 group-hover:text-white/30 transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
          </div>
        </button>

        {/* Fan */}
        <button 
          onClick={() => onSelect('FAN')}
          className="group relative bg-[#9146FF] p-8 rounded-[3rem] text-left transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#9146FF]/20"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-[#99FF00] rounded-2xl flex items-center justify-center text-black shadow-xl">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
               </svg>
            </div>
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Fan</h2>
          <p className="text-white/80 text-xs font-bold leading-relaxed">J'achète des billets et je profite des meilleurs concerts.</p>
          <div className="absolute top-8 right-8 text-white/20 group-hover:text-white/40 transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
          </div>
        </button>
      </div>

      <p className="mt-12 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Propulsé par Vibe Sénégal</p>
    </div>
  );
};

export default RoleSelector;
