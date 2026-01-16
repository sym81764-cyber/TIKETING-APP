
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_ACTIVITY } from '../constants.ts';
import { getArtistNews } from '../services/geminiService.ts';

type SortOption = 'recent' | 'popular';

const ActivityView: React.FC = () => {
  const [aiUpdate, setAiUpdate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  useEffect(() => {
    const fetchAIUpdate = async () => {
      try {
        const update = await getArtistNews('La Scène');
        setAiUpdate(update);
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAIUpdate();
  }, []);

  const sortedPosts = useMemo(() => {
    const posts = [...MOCK_ACTIVITY];
    if (sortBy === 'popular') {
      return posts.sort((a, b) => b.likes - a.likes);
    }
    // For "recent", we assume MOCK_ACTIVITY index reflects recency or we use original order
    // In this mock, we'll just return original since timestamps are strings
    return posts;
  }, [sortBy]);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Zone Fan</h1>
        <button className="w-12 h-12 bg-[#99FF00] text-black rounded-2xl flex items-center justify-center shadow-lg shadow-[#99FF00]/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      {/* Post Creator */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 mb-6 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-[#9146FF] overflow-hidden flex-shrink-0">
          <img src="https://i.pravatar.cc/100?u=user" className="w-full h-full object-cover" />
        </div>
        <input 
          type="text" 
          placeholder="PARTAGE TA VIBE..." 
          className="flex-1 bg-transparent border-none text-[10px] font-black tracking-widest focus:ring-0 placeholder-white/20 uppercase"
        />
        <div className="flex space-x-3 text-white/40">
           <svg className="w-5 h-5 hover:text-[#99FF00] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={2.5} /></svg>
        </div>
      </div>

      {/* Sorting Tabs */}
      <div className="flex space-x-2 mb-10">
        <button 
          onClick={() => setSortBy('recent')}
          className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
            sortBy === 'recent' ? 'bg-[#9146FF] text-white' : 'bg-white/5 text-white/40 border border-white/10'
          }`}
        >
          Récents
        </button>
        <button 
          onClick={() => setSortBy('popular')}
          className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
            sortBy === 'popular' ? 'bg-[#9146FF] text-white' : 'bg-white/5 text-white/40 border border-white/10'
          }`}
        >
          Populaires
        </button>
      </div>

      {/* Official Artist Pulse */}
      {!loading && (
        <div className="mb-12 p-6 bg-[#9146FF] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-2 h-2 bg-[#99FF00] rounded-full animate-pulse shadow-[0_0_10px_#99FF00]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Flash Artiste</span>
            </div>
            <p className="text-xl font-black italic tracking-tighter leading-tight">"{aiUpdate}"</p>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        </div>
      )}

      {/* Activity Feed */}
      <div className="space-y-12 pb-24">
        {sortedPosts.map((post) => (
          <article key={post.id} className="group animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-5">
              <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-[#99FF00] to-[#9146FF]">
                <img src={post.artistAvatar} className="w-12 h-12 rounded-[14px] object-cover bg-black" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-tight">{post.artistName}</h4>
                <p className="text-[9px] font-black text-white/30 uppercase mt-1 tracking-widest">{post.timestamp}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-white/70 mb-5 leading-relaxed tracking-tight">{post.content}</p>
            {post.imageUrl && (
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 mb-5 relative">
                <img src={post.imageUrl} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            )}
            <div className="flex items-center space-x-8 text-white/40">
              <button className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:text-[#FF4D94] transition-colors group/btn">
                <svg className={`w-6 h-6 group-hover/btn:scale-125 transition-transform ${post.likes > 10000 ? 'text-[#FF4D94] fill-[#FF4D94]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:text-[#99FF00] transition-colors group/btn">
                <svg className="w-6 h-6 group-hover/btn:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ActivityView;
