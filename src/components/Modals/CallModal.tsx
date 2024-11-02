import React, { useState } from 'react';
import { X, Mic, MicOff, Phone } from 'lucide-react';

interface CallModalProps {
  name: string;
  avatar: string;
  onClose: () => void;
  isVideo?: boolean;
}

export default function CallModal({ name, avatar, onClose, isVideo = false }: CallModalProps) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-white flex flex-col items-center gap-6">
        {isVideo ? (
          <img
            src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9"
            alt="Monkey"
            className="w-96 h-96 object-cover rounded-lg"
          />
        ) : (
          <img
            src={avatar}
            alt={name}
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
        
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-gray-400">{isVideo ? 'Video calling...' : 'Calling...'}</p>
        
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-gray-600'
            } hover:opacity-90 transition-opacity`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>
          
          <button
            onClick={onClose}
            className="p-4 bg-red-500 rounded-full hover:opacity-90 transition-opacity"
          >
            <Phone className="w-6 h-6 rotate-135" />
          </button>
        </div>
      </div>
    </div>
  );
}