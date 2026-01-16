
export type UserRole = 'FAN' | 'ORGANIZER' | null;

export interface Event {
  id: string;
  artist: string;
  date: string;
  venue: string;
  imageUrl: string;
  category: string;
  price?: number;
  ticketsSold?: number;
  totalCapacity?: number;
}

export interface Ticket extends Event {
  orderId: string;
  seat?: string;
}

export interface ActivityPost {
  id: string;
  artistName: string;
  artistAvatar: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  topGenres: string[];
  attendingEventIds: string[];
  bio: string;
}

export type Screen = 'home' | 'search' | 'tickets' | 'profile' | 'dashboard' | 'create' | 'scanner' | 'payout' | 'edit';
