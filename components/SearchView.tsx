
import React, { useState } from 'react';
import { CATEGORIES, MOCK_EVENTS } from '../constants';

const SearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black italic tracking-tighter mb-8 uppercase">Explorer</h1>
      
      <div className="relative mb-10">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#99FF00]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ARTISTE, LIEU OU VILLE..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-[#99FF00] text-xs font-black uppercase tracking-widest placeholder-white/20 transition-all"
        />
      </div>

      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6">Lieux Populaires</h3>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
          {MOCK_EVENTS.map((event) => (
            <div key={`near-${event.id}`} className="flex-shrink-0 w-36">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 relative group">
                <img src={event.imageUrl} alt={event.artist} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-3 left-3">
                    <p className="text-[9px] font-black uppercase bg-[#99FF00] text-black px-2 py-1 rounded-md">{event.venue.split(' ')[0]}</p>
                </div>
              </div>
              <h4 className="font-black text-xs tracking-tight truncate uppercase">{event.artist}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6">Par Genre</h3>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <div 
              key={cat} 
              className={`h-28 rounded-3xl p-5 flex items-end justify-start relative overflow-hidden group cursor-pointer border border-white/5 shadow-2xl ${
                idx % 4 === 0 ? 'bg-[#9146FF]' : 
                idx % 4 === 1 ? 'bg-zinc-900' :
                idx % 4 === 2 ? 'bg-[#99FF00]' : 'bg-[#FF4D94]'
              }`}
            >
              <span className={`font-black text-xl italic tracking-tighter uppercase z-10 ${idx % 4 === 2 ? 'text-black' : 'text-white'}`}>{cat}</span>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 group-hover:scale-[3] transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchView;
