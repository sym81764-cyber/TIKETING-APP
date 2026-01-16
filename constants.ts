
import { Event, Ticket, ActivityPost, Friend } from './types.ts';

export const CATEGORIES = [
  'Mbalax', 'Rap Galsen', 'Afro-Pop', 'Jazz', 'Électro', 'Religieux', 'Acoustique'
];

// Configuration des clés de paiement
export const PAYMENT_CONFIG = {
  WAVE_MERCHANT_ID: "**************************",
  ORANGE_MONEY_ID: "**************************",
  CRYPTO_WALLET_BTC: "**************************",
  CRYPTO_WALLET_USDT: "**************************",
  GATEWAY_PUBLIC_KEY: "**************************",
  API_PUBLIC_TOKEN: "**************************",
  API_PRIVATE_KEY: "**************************"
};

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    artist: 'Wally Seck',
    date: 'Sam, 15 Mai',
    venue: 'Esplanade du Grand Théâtre',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=400&fit=crop',
    category: 'Mbalax',
    price: 15000
  },
  {
    id: '2',
    artist: 'Dip Doundou Guiss',
    date: 'Ven, 21 Mai',
    venue: 'Monument de la Renaissance',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&h=400&fit=crop',
    category: 'Rap Galsen',
    price: 5000
  },
  {
    id: '3',
    artist: 'Viviane Chidid',
    date: 'Dim, 23 Mai',
    venue: 'Place du Souvenir',
    imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8d48700df?w=800&h=400&fit=crop',
    category: 'Mbalax',
    price: 10000
  },
  {
    id: '4',
    artist: 'Baaba Maal',
    date: 'Sam, 29 Mai',
    venue: 'Théâtre National Daniel Sorano',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=400&fit=crop',
    category: 'Acoustique',
    price: 25000
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    ...MOCK_EVENTS[0],
    orderId: 'SN-7781',
    seat: 'ZONE-A'
  },
  {
    ...MOCK_EVENTS[1],
    orderId: 'SN-7782',
    seat: 'PASS-SIMPLE'
  }
];

export const MOCK_RSVPS: Event[] = [
  {
    id: 'r1',
    artist: 'Youssou NDour',
    date: '04 Avr',
    venue: 'CICES',
    imageUrl: 'https://picsum.photos/seed/sn1/200/200',
    category: 'Mbalax'
  }
];

export const MOCK_ACTIVITY: ActivityPost[] = [
  {
    id: 'a1',
    artistName: 'Wally Seck',
    artistAvatar: 'https://i.pravatar.cc/100?u=wally',
    content: 'Dakar ! On se voit samedi à l\'Esplanade. Préparez vos tenues, ça va être du lourd ! 🇸🇳✨',
    timestamp: 'Il y a 1h',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
    likes: 5400,
    comments: 230
  },
  {
    id: 'a2',
    artistName: 'Dip Doundou Guiss',
    artistAvatar: 'https://i.pravatar.cc/100?u=dip',
    content: 'Nouveau clip disponible demain à 18h. Le Rap Galsen ne dort jamais. 🦅',
    timestamp: 'Il y a 5 min',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&h=400&fit=crop',
    likes: 12500,
    comments: 890
  },
  {
    id: 'a3',
    artistName: 'Viviane Chidid',
    artistAvatar: 'https://i.pravatar.cc/100?u=viviane',
    content: 'Merci pour l\'accueil à Mbour hier soir ! Vous étiez incroyables. ❤️',
    timestamp: 'Il y a 3h',
    likes: 3200,
    comments: 112
  }
];

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Moussa Diop',
    avatar: 'https://i.pravatar.cc/150?u=moussa',
    topGenres: ['Rap Galsen', 'Mbalax'],
    attendingEventIds: ['2'],
    bio: 'Dakarois pur sang.'
  }
];
