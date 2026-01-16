
import React, { useState, useEffect, useRef } from 'react';
import { Event } from '../types';

interface CreateEventViewProps {
  onCreated: () => void;
  initialData?: Event;
}

const CreateEventView: React.FC<CreateEventViewProps> = ({ onCreated, initialData }) => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({
    title: '',
    location: '',
    date: '',
    price: '',
    capacity: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.artist,
        location: initialData.venue,
        date: '', 
        price: initialData.price?.toString() || '',
        capacity: initialData.totalCapacity?.toString() || '1000',
        imageUrl: initialData.imageUrl || ''
      });
    }
  }, [initialData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isEditing = !!initialData;
  const placeholderImage = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop";

  return (
    <div className="p-6 bg-black min-h-screen text-white flex flex-col">
      <header className="mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          {isEditing ? 'Modifier Event' : 'Nouvel Event'}
        </h1>
        <p className="text-[#99FF00] text-[10px] font-black uppercase tracking-widest mt-2">Étape {step} sur 2</p>
      </header>

      <div className="flex-1 space-y-8">
        {step === 1 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            {/* Image Upload Zone */}
            <div 
              onClick={triggerFileInput}
              className="relative group cursor-pointer aspect-video rounded-[2.5rem] overflow-hidden border-2 border-dashed border-white/10 hover:border-[#99FF00] transition-all bg-zinc-900 flex flex-col items-center justify-center"
            >
              {form.imageUrl ? (
                <>
                  <img src={form.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest">CHANGER L'IMAGE</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#99FF00]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">AJOUTER UNE AFFICHE</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Nom de l'artiste / Événement</label>
              <input 
                type="text" 
                placeholder="EX: WALLY SECK LIVE"
                className="w-full bg-zinc-900 border-2 border-white/5 rounded-[2rem] py-6 px-8 text-xl font-black uppercase placeholder-white/10 outline-none focus:border-[#99FF00] transition-all"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Lieu à Dakar</label>
              <input 
                type="text" 
                placeholder="EX: GRAND THÉÂTRE"
                className="w-full bg-zinc-900 border-2 border-white/5 rounded-[2rem] py-6 px-8 text-xl font-black uppercase placeholder-white/10 outline-none focus:border-[#99FF00] transition-all"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
              />
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-[#99FF00] text-black py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-transform mt-8"
            >
              CONTINUER
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Prix (CFA)</label>
                <input 
                  type="number" 
                  placeholder="5000"
                  className="w-full bg-zinc-900 border-2 border-white/5 rounded-[2rem] py-6 px-8 text-xl font-black uppercase placeholder-white/10 outline-none focus:border-[#99FF00] transition-all"
                  value={form.price}
                  onChange={e => setForm({...form, price: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Tickets</label>
                <input 
                  type="number" 
                  placeholder="1000"
                  className="w-full bg-zinc-900 border-2 border-white/5 rounded-[2rem] py-6 px-8 text-xl font-black uppercase placeholder-white/10 outline-none focus:border-[#99FF00] transition-all"
                  value={form.capacity}
                  onChange={e => setForm({...form, capacity: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Date de l'événement</label>
              <input 
                type="date" 
                className="w-full bg-zinc-900 border-2 border-white/5 rounded-[2rem] py-6 px-8 text-xl font-black uppercase outline-none focus:border-[#99FF00] transition-all"
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
              />
            </div>
            <div className="pt-8 space-y-4">
              <button 
                onClick={onCreated}
                className="w-full bg-[#99FF00] text-black py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-transform"
              >
                {isEditing ? 'ENREGISTRER LES MODIFICATIONS' : "PUBLIER L'ÉVÉNEMENT"}
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full bg-white/5 border border-white/10 text-white/40 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest"
              >
                RETOUR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEventView;
