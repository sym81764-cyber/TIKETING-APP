
import React, { useState, useEffect } from 'react';
import { MOCK_EVENTS, PAYMENT_CONFIG } from '../constants';
import { Event } from '../types';
import { GoogleGenAI } from "@google/genai";

type PaymentMethod = 'WAVE' | 'ORANGE_MONEY' | 'CARD' | 'CRYPTO';
type CheckoutStep = 'quantity' | 'payment' | 'processing' | 'instruction' | 'success';

const HomeView: React.FC = () => {
  const [selectedPurchaseEvent, setSelectedPurchaseEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('quantity');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('WAVE');
  const [processingStatus, setProcessingStatus] = useState("Initialisation...");
  const [hypeMessage, setHypeMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState("");

  const formatPrice = (price?: number) => {
    if (!price) return 'Gratuit';
    return `${price.toLocaleString('fr-FR')} CFA`;
  };

  const handleOpenPurchase = (event: Event) => {
    setSelectedPurchaseEvent(event);
    setQuantity(1);
    setCheckoutStep('quantity');
    setPaymentMethod('WAVE');
    setHypeMessage("");
    setTxHash("");
  };

  const generateHype = async (artist: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Génère un message court (max 15 mots) et ultra-enthousiaste pour un fan qui vient d'acheter des billets pour le concert de ${artist} à Dakar. Utilise du jargon local sénégalais comme "Dakar ne dort pas", "Ça va être le feu", "Teranga vibe".`,
      });
      setHypeMessage(response.text || "Prépare-toi, ça va être historique !");
    } catch (e) {
      setHypeMessage("Dakar va trembler ! On se voit au show !");
    }
  };

  const simulateProcessing = () => {
    setCheckoutStep('processing');
    const statuses = [
      "Vérification de la session...",
      `Auth Gateway: ${PAYMENT_CONFIG.API_PUBLIC_TOKEN.slice(0, 8)}...`,
      "Signature sécurisée (Private Key)...",
      "Génération du Hash de transaction..."
    ];
    
    statuses.forEach((status, index) => {
      setTimeout(() => {
        setProcessingStatus(status);
        if (index === statuses.length - 1) {
          // Create a mock hash using a fragment of the private key
          setTxHash(`DKR-${PAYMENT_CONFIG.API_PRIVATE_KEY.slice(0, 6)}-${Math.random().toString(36).substring(7).toUpperCase()}`);
          setCheckoutStep('instruction');
        }
      }, (index + 1) * 800);
    });
  };

  const handleFinalPay = () => {
    setCheckoutStep('success');
    if (selectedPurchaseEvent) {
      generateHype(selectedPurchaseEvent.artist);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderInstructionStep = () => {
    switch (paymentMethod) {
      case 'CRYPTO':
        return (
          <div className="space-y-6 text-center animate-in zoom-in duration-300">
            <div className="bg-white p-4 rounded-3xl inline-block mx-auto mb-2 border-4 border-[#FFEF00]">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${PAYMENT_CONFIG.CRYPTO_WALLET_BTC}`} alt="BTC QR" className="w-32 h-32" />
            </div>
            <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Adresse USDT (ERC20)</p>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono break-all text-[#FFEF00] text-left pr-4">{PAYMENT_CONFIG.CRYPTO_WALLET_USDT}</p>
                <button 
                  onClick={() => handleCopy(PAYMENT_CONFIG.CRYPTO_WALLET_USDT)}
                  className={`p-2 rounded-lg transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'}`}
                >
                  {copied ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] break-all px-4">Signed with PK: {PAYMENT_CONFIG.API_PRIVATE_KEY.slice(0, 10)}...</div>
          </div>
        );
      case 'WAVE':
      case 'ORANGE_MONEY':
        return (
          <div className="space-y-8 text-center animate-in slide-in-from-bottom-10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border-2 border-[#9146FF] animate-pulse">
               <svg className="w-10 h-10 text-[#9146FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <h4 className="text-xl font-black uppercase italic">Vérifiez votre mobile</h4>
            <div className="bg-[#9146FF]/10 p-4 rounded-2xl border border-[#9146FF]/20 mb-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Marchand Authentifié</p>
              <p className="font-mono text-xs">{paymentMethod === 'WAVE' ? PAYMENT_CONFIG.WAVE_MERCHANT_ID : PAYMENT_CONFIG.ORANGE_MONEY_ID}</p>
            </div>
            <p className="text-xs text-white/60 leading-relaxed px-4 uppercase tracking-tighter">
              En attente de signature via votre application mobile.
            </p>
          </div>
        );
      case 'CARD':
        return (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-black/40 border border-white/10 p-5 rounded-2xl mb-4">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Sécurisation PK</p>
                <p className="text-[10px] font-mono break-all text-[#99FF00]">{PAYMENT_CONFIG.API_PRIVATE_KEY.slice(0, 24)}...</p>
            </div>
            <div className="space-y-4">
               <div className="bg-black/60 border border-white/5 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Carte Reconnue</p>
                    <p className="text-sm font-black tracking-widest">**** **** **** 4421</p>
                  </div>
                  <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center">
                    <span className="text-[8px] font-black">VISA</span>
                  </div>
               </div>
            </div>
            <p className="text-[10px] text-center text-[#99FF00] font-black uppercase tracking-widest animate-pulse">Signature en cours...</p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic text-[#9146FF]">VIBE</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Dakar Live</p>
        </div>
        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#9146FF]">
          <img src="https://i.pravatar.cc/100?u=fan" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Featured Card */}
      <div className="mb-12 relative group animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative shadow-2xl border-2 border-white/5">
          <img 
            src={MOCK_EVENTS[0].imageUrl} 
            alt={MOCK_EVENTS[0].artist} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
          <div className="absolute bottom-10 left-8 right-8 text-center">
            <h2 className="text-5xl font-black leading-none tracking-tighter mb-4 uppercase italic">{MOCK_EVENTS[0].artist}</h2>
            <button 
              onClick={() => handleOpenPurchase(MOCK_EVENTS[0])}
              className="w-full bg-white text-black py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-transform"
            >
              RÉSERVER ({formatPrice(MOCK_EVENTS[0].price)})
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="mb-12">
        <h3 className="text-2xl font-black tracking-tighter uppercase mb-8">PROCHAINS SHOWS</h3>
        <div className="space-y-10">
          {MOCK_EVENTS.slice(1).map((event) => (
            <div key={event.id} className="bg-zinc-900/50 border border-white/5 rounded-[3.5rem] p-6 shadow-xl">
              <div className="flex items-center space-x-6 mb-6">
                <img src={event.imageUrl} className="w-24 h-24 rounded-[2rem] object-cover border-2 border-white/5" />
                <div className="flex-1">
                  <h4 className="font-black text-xl uppercase italic leading-tight">{event.artist}</h4>
                  <p className="text-xs text-[#9146FF] font-black uppercase mt-1 tracking-widest">{event.date}</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenPurchase(event)}
                className="w-full bg-white text-black py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-lg"
              >
                ACHETER ({formatPrice(event.price)})
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedPurchaseEvent && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-md animate-in fade-in">
          <div 
            className="w-full max-w-md bg-zinc-900 rounded-t-[3.5rem] p-8 border-t border-white/10 animate-in slide-in-from-bottom-full duration-500 max-h-[95vh] overflow-y-auto no-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            {checkoutStep === 'success' ? (
              <div className="py-12 text-center">
                <div className="w-24 h-24 bg-[#99FF00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_#99FF0066]">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">VALIDÉ !</h3>
                <div className="bg-[#99FF00] text-black p-6 rounded-[2rem] mb-8 rotate-1">
                   <p className="font-black text-lg uppercase leading-tight">"{hypeMessage || 'Vibe en cours...'}"</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl mb-8 border border-white/10">
                   <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">Hash de Sécurité (Signed)</p>
                   <p className="text-[9px] font-mono text-[#99FF00] break-all">{txHash}</p>
                </div>
                <button 
                  onClick={() => setSelectedPurchaseEvent(null)}
                  className="w-full bg-white/10 border border-white/20 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs"
                >
                  TERMINER
                </button>
              </div>
            ) : checkoutStep === 'processing' ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-8">
                 <div className="relative">
                   <div className="w-24 h-24 border-4 border-[#9146FF] border-t-transparent rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#99FF00] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                   </div>
                 </div>
                 <div className="text-center">
                    <p className="text-xl font-black uppercase italic tracking-tighter mb-2">Cryptage des données</p>
                    <p className="text-[#9146FF] text-[10px] font-mono uppercase tracking-[0.2em]">{processingStatus}</p>
                 </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <h3 className="text-3xl font-black italic uppercase leading-none tracking-tighter">{selectedPurchaseEvent.artist}</h3>
                    <p className="text-[#9146FF] font-black text-[10px] uppercase tracking-widest mt-2">
                      {checkoutStep === 'quantity' ? 'Quantité souhaitée' : 'Méthode de règlement'}
                    </p>
                  </div>
                  <button onClick={() => setSelectedPurchaseEvent(null)} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {checkoutStep === 'quantity' ? (
                  <div className="animate-in slide-in-from-right-10">
                    <div className="bg-black/40 rounded-[2.5rem] p-8 mb-8 border border-white/5 shadow-inner flex items-center justify-between">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl font-black">-</button>
                        <span className="text-6xl font-black italic tracking-tighter">{quantity}</span>
                        <button onClick={() => setQuantity(q => Math.min(10, q + 1))} className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl font-black">+</button>
                    </div>
                    <div className="flex justify-between items-center mb-10 px-4">
                      <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">Net à payer</span>
                      <span className="text-4xl font-black italic text-[#99FF00]">{formatPrice((selectedPurchaseEvent.price || 0) * quantity)}</span>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      className="w-full bg-[#9146FF] text-white py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl"
                    >
                      PASSER AU PAIEMENT
                    </button>
                  </div>
                ) : checkoutStep === 'payment' ? (
                  <div className="animate-in slide-in-from-right-10">
                    <div className="grid grid-cols-1 gap-4 mb-10">
                      {[
                        { id: 'WAVE', name: 'Wave', color: '#1D9BF0', desc: 'Direct App' },
                        { id: 'ORANGE_MONEY', name: 'Orange Money', color: '#FF7900', desc: 'USDT/OM' },
                        { id: 'CRYPTO', name: 'Crypto', color: '#FFEF00', desc: 'Signed/PK' },
                        { id: 'CARD', name: 'Card', color: '#FFFFFF', desc: '3D Secure' }
                      ].map((m) => (
                        <button 
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                          className={`w-full flex items-center justify-between p-6 rounded-[2.5rem] transition-all border-2 ${
                            paymentMethod === m.id ? `bg-white/5 border-white shadow-xl` : 'bg-black/20 border-white/5 opacity-50'
                          }`}
                          style={{ borderColor: paymentMethod === m.id ? m.color : undefined }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: m.color }}>
                               <span className="font-black text-black text-[10px] uppercase">{m.id.slice(0, 4)}</span>
                            </div>
                            <div className="text-left">
                              <p className="font-black text-sm uppercase">{m.name}</p>
                              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{m.desc}</p>
                            </div>
                          </div>
                          {paymentMethod === m.id && <div className="w-4 h-4 rounded-full" style={{ backgroundColor: m.color }}></div>}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <button onClick={() => setCheckoutStep('quantity')} className="w-20 bg-white/5 border border-white/10 rounded-[1.8rem] flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button 
                        onClick={simulateProcessing}
                        className="flex-1 bg-[#99FF00] text-black py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl"
                      >
                        SÉCURISER LE PAIEMENT
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right-10">
                    <div className="bg-black/40 border border-white/5 rounded-[3rem] p-8 mb-10 shadow-xl">
                      {renderInstructionStep()}
                    </div>
                    <div className="flex space-x-3">
                      <button onClick={() => setCheckoutStep('payment')} className="w-20 bg-white/5 border border-white/10 rounded-[1.8rem] flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button 
                        onClick={handleFinalPay}
                        className="flex-1 bg-[#99FF00] text-black py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl"
                      >
                        CONFIRMER LE TRANSFERT
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
