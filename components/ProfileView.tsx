
import React from 'react';
import { UserRole } from '../types';

interface ProfileViewProps {
  role: UserRole;
  onRoleSwitch: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ role, onRoleSwitch }) => {
  const isFan = role === 'FAN';
  const color = isFan ? 'text-[#9146FF]' : 'text-[#99FF00]';
  const bg = isFan ? 'bg-[#9146FF]' : 'bg-[#99FF00]';

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <header className="mb-12">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Compte</h1>
        <p className={`${color} text-[10px] font-black uppercase tracking-widest mt-1`}>
          {isFan ? 'Fan Officiel' : 'Manager Événementiel'}
        </p>
      </header>

      <div className="flex flex-col items-center mb-12">
        <div className={`w-32 h-32 rounded-[3rem] p-1.5 ${bg} mb-6 shadow-2xl rotate-3`}>
          <img src={`https://i.pravatar.cc/300?u=${role}`} alt="User" className="w-full h-full rounded-[2.5rem] border-4 border-black object-cover" />
        </div>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">{isFan ? 'Moussa Diop' : 'Sénégal Prod.'}</h2>
        <p className="text-[10px] font-bold text-white/40 uppercase mt-4 text-center px-8 leading-loose tracking-widest">
          {isFan ? 'Passionné par le Rap Galsen et le Mbalax.' : 'Organisateur de concerts depuis 2015 à Dakar.'}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/5">
           <p className="text-[9px] font-black text-white/40 uppercase mb-2 tracking-widest">Mon Numéro</p>
           <p className="font-black text-lg">+221 77 123 45 67</p>
        </div>

        {/* Role Switcher XXL */}
        <button 
          onClick={onRoleSwitch}
          className="w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-lg uppercase tracking-tighter shadow-2xl flex items-center justify-center space-x-4 active:scale-95 transition-transform"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          <span>PASSER EN MODE {isFan ? 'ORGANISATEUR' : 'FAN'}</span>
        </button>

        <button 
          className="w-full bg-red-600/10 border-2 border-red-600/20 text-red-600 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest mt-8"
        >
          SE DÉCONNECTER
        </button>
      </div>
      
      <div className="mt-12 text-center">
         <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Version 2.1.0 • Dakar, SN</p>
      </div>
    </div>
  );
};

export default ProfileView;
