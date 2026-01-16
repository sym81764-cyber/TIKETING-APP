
import React from 'react';
import { MOCK_EVENTS } from '../constants';
import { Event } from '../types';

interface ManagerDashboardProps {
  onEditEvent: (event: Event) => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onEditEvent }) => {
  const formatPrice = (price: number) => `${price.toLocaleString('fr-FR')} CFA`;

  const stats = {
    totalRevenue: 2450000,
    ticketsSold: 412,
    activeEvents: 3
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Dashboard</h1>
          <p className="text-[#99FF00] text-[10px] font-black uppercase tracking-widest mt-1">Sénégal Production</p>
        </div>
        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <p className="text-[9px] font-black text-white/40 uppercase mb-2 tracking-widest">Revenus</p>
          <p className="text-xl font-black text-[#99FF00]">{formatPrice(stats.totalRevenue)}</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <p className="text-[9px] font-black text-white/40 uppercase mb-2 tracking-widest">Billets Vendus</p>
          <p className="text-xl font-black">{stats.ticketsSold}</p>
        </div>
      </div>

      {/* Main Campaign List */}
      <section className="mb-12">
        <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.4em] mb-6">Mes Campagnes</h3>
        <div className="space-y-4">
          {MOCK_EVENTS.slice(0, 2).map((event) => (
            <div key={event.id} className="bg-zinc-900 p-6 rounded-[3rem] border border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <img src={event.imageUrl} className="w-16 h-16 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-black text-lg uppercase leading-tight">{event.artist}</h4>
                    <span className="inline-block px-3 py-1 bg-[#99FF00]/10 text-[#99FF00] text-[9px] font-black rounded-full mt-1">ACTIF</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <button 
                     onClick={() => onEditEvent(event)}
                     className="p-2 bg-white/5 rounded-xl mb-2 text-white/40 hover:text-white"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                     </svg>
                   </button>
                   <div className="text-right">
                      <p className="text-[9px] font-black text-white/30 uppercase">Revenue</p>
                      <p className="font-black text-sm">{formatPrice(1200000)}</p>
                   </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                  <span>Progression</span>
                  <span className="text-white/40">75%</span>
                </div>
                <div className="h-3 bg-black border border-white/5 rounded-full overflow-hidden p-0.5">
                   <div className="h-full bg-[#99FF00] rounded-full w-[75%]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions XXL */}
      <div className="grid grid-cols-1 gap-4 pb-24">
        <button className="w-full bg-[#99FF00] text-black py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter shadow-2xl shadow-[#99FF00]/10 flex items-center justify-center space-x-4 active:scale-95 transition-transform">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
           <span>NOUVEL ÉVÉNEMENT</span>
        </button>
        <button className="w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter flex items-center justify-center space-x-4 active:scale-95 transition-transform">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <span>SCANNER ENTRÉE</span>
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;
