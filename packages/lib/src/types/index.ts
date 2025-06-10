export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
}

export interface Reel {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: number;
  duration: string;
  date: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}