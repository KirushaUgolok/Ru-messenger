import React from 'react';
import { Check } from 'lucide-react';

interface MessageProps {
  content: string;
  timestamp: string;
  isOwn?: boolean;
  isRead?: boolean;
}

export default function Message({ content, timestamp, isOwn = false, isRead = false }: MessageProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{content}</p>
        <div className={`flex items-center gap-1 text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          <span>{timestamp}</span>
          {isOwn && (
            <Check className={`w-4 h-4 ${isRead ? 'text-blue-100' : 'text-blue-300'}`} />
          )}
        </div>
      </div>
    </div>
  );
}