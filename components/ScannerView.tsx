
import React, { useState } from 'react';

const ScannerView: React.FC = () => {
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR' | 'SCANNING'>('IDLE');
  const [entryCount, setEntryCount] = useState(142);

  const handleSimulateScan = (isValid: boolean) => {
    setScanStatus('SCANNING');
    setTimeout(() => {
      if (isValid) {
        setScanStatus('SUCCESS');
        setEntryCount(prev => prev + 1);
      } else {
        setScanStatus('ERROR');
      }
      setTimeout(() => setScanStatus('IDLE'), 2000);
    }, 800);
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white flex flex-col">
      <header className="mb-8">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Contrôle</h1>
        <p className="text-[#99FF00] text-[10px] font-black uppercase tracking-widest mt-1">Scanner d'entrée</p>
      </header>

      {/* Stats Live */}
      <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/5 mb-8 flex justify-between items-center shadow-2xl">
        <div>
          <p className="text-[9px] font-black text-white/40 uppercase mb-1 tracking-widest">Entrées enregistrées</p>
          <p className="text-4xl font-black">{entryCount}</p>
        </div>
        <div className="w-14 h-14 bg-[#99FF00]/10 rounded-2xl flex items-center justify-center text-[#99FF00]">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
      </div>

      {/* Main Scanner Visual */}
      <div className={`flex-1 rounded-[3.5rem] border-4 relative overflow-hidden transition-all duration-500 flex flex-col items-center justify-center ${
        scanStatus === 'SUCCESS' ? 'bg-green-600 border-green-400' :
        scanStatus === 'ERROR' ? 'bg-red-600 border-red-400' :
        'bg-zinc-900 border-white/10'
      }`}>
        {scanStatus === 'IDLE' && (
          <div className="text-center animate-pulse">
            <div className="w-48 h-48 border-2 border-[#99FF00]/50 rounded-3xl mx-auto flex items-center justify-center mb-6">
               <div className="w-40 h-1 bg-[#99FF00] shadow-[0_0_15px_#99FF00] animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-sm font-black uppercase tracking-widest opacity-60">En attente d'un QR code...</p>
          </div>
        )}

        {scanStatus === 'SUCCESS' && (
          <div className="text-center animate-in zoom-in duration-300">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
             </div>
             <p className="text-2xl font-black uppercase italic tracking-tighter">Billet Valide</p>
             <p className="text-sm font-bold opacity-80 mt-2">ENTRÉE AUTORISÉE</p>
          </div>
        )}

        {scanStatus === 'ERROR' && (
          <div className="text-center animate-in shake duration-300">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
             </div>
             <p className="text-2xl font-black uppercase italic tracking-tighter">Déjà Utilisé</p>
             <p className="text-sm font-bold opacity-80 mt-2">ACCÈS REFUSÉ</p>
          </div>
        )}

        {scanStatus === 'SCANNING' && (
           <p className="text-xl font-black uppercase italic tracking-tighter">Analyse...</p>
        )}
      </div>

      {/* Simulation Controls XXL */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <button 
          onClick={() => handleSimulateScan(true)}
          className="bg-zinc-800 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 active:scale-95 transition-transform"
        >
          SIMULER VALIDE
        </button>
        <button 
          onClick={() => handleSimulateScan(false)}
          className="bg-zinc-800 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 active:scale-95 transition-transform"
        >
          SIMULER FRAUDE
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-70px); }
          50% { transform: translateY(70px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-scan { animation: scan 2s ease-in-out infinite; }
        .shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ScannerView;
