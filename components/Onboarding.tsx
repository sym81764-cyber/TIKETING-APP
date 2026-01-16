
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const next = () => setStep(s => s + 1);

  const screens = [
    (
      <div className="h-full w-full bg-[#99FF00] flex flex-col p-10 text-black">
        <div className="flex justify-center mt-20 mb-12">
           <span className="font-black italic text-4xl tracking-tighter">VIBE DKR</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-black text-center leading-[0.9] mb-8 tracking-tighter italic uppercase">LES MEILLEURS CONCERTS AU SÉNÉGAL</h1>
          <p className="text-center text-lg font-bold opacity-70 px-4">Tes billets pour Wally Seck, Dip et tous tes artistes préférés en un clic.</p>
        </div>
        <div className="mb-12">
          <button onClick={next} className="w-full bg-black text-white py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-transform">COMMENCER</button>
        </div>
      </div>
    ),
    (
      <div className="h-full w-full bg-black flex flex-col p-10 text-white">
        <div className="flex justify-center mt-20 mb-12">
           <span className="font-black italic text-4xl tracking-tighter text-[#99FF00]">VIBE DKR</span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-6xl font-black leading-[0.9] mb-8 tracking-tighter uppercase">PAS DE FRAUDE, QUE DU LIVE.</h1>
          <div className="bg-zinc-900 p-8 rounded-[3rem] border-2 border-[#99FF00] rotate-2 shadow-2xl">
             <p className="font-black text-2xl text-[#99FF00]">PASS SÉCURISÉ ✅</p>
             <p className="font-medium opacity-60 mt-2 italic text-sm">Chaque ticket est unique et vérifié à l'entrée par scan.</p>
          </div>
        </div>
        <div className="mb-12">
          <button onClick={next} className="w-full bg-[#99FF00] text-black py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-transform">SE CONNECTER</button>
        </div>
      </div>
    ),
    (
      <div className="h-full w-full bg-[#FFEF00] flex flex-col text-black p-10">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-10 leading-[0.9]">REJOINS LE CREW</h2>
          <div className="space-y-6">
            <input type="text" placeholder="TON PRÉNOM" className="w-full bg-black/10 border-2 border-black rounded-[2rem] py-6 px-8 text-lg font-black uppercase placeholder-black/30 outline-none" />
            <input type="tel" placeholder="NUMÉRO TÉLÉPHONE" className="w-full bg-black/10 border-2 border-black rounded-[2rem] py-6 px-8 text-lg font-black uppercase placeholder-black/30 outline-none" />
          </div>
        </div>
        <div className="mb-12">
          <button onClick={onComplete} className="w-full bg-black text-white py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-transform">C'EST PARTI !</button>
        </div>
      </div>
    )
  ];

  return (
    <div className="h-screen w-full max-w-md mx-auto overflow-hidden">
      {screens[step]}
    </div>
  );
};

export default Onboarding;
