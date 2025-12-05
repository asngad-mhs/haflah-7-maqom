export interface PlaylistItem {
  id: string;
  surah: string;
  ayah: string;
  surahNumber: number;
  url: string;
  reciter: string;
}

export interface Maqam {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  emotion: string;
  icon: string; // Emoji character or svg path
  audioUrl?: string; // Short sample, kept for potential future use
  playlist?: PlaylistItem[];
}

export interface EventSchedule {
  id: number;
  time: string;
  title: string;
  reciter: string;
  maqamFocus: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
