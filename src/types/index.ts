export interface Theme {
  id: 'light' | 'dark' | 'futuristic';
  name: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  isRead?: boolean;
  type: 'text' | 'image';
  imageUrl?: string;
}

export interface Contact {
  id: string;
  avatar: string;
  name: string;
  username?: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
  type: 'user' | 'group' | 'channel';
}

export interface ChatWallpaper {
  id: string;
  url: string;
  name: string;
}

export const defaultWallpapers: ChatWallpaper[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1557683311-eac922347aa1', name: 'Gradient Blue' },
  { id: '2', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d', name: 'Geometric' },
  { id: '3', url: 'https://images.unsplash.com/photo-1557683316-973673baf926', name: 'Abstract' },
];