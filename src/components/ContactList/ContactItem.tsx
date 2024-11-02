import React from 'react';

interface ContactItemProps {
  avatar: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function ContactItem({
  avatar,
  name,
  lastMessage,
  timestamp,
  unread,
  online,
  onClick,
  isSelected,
}: ContactItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
      {unread && (
        <div className="min-w-[20px] h-5 flex items-center justify-center bg-blue-500 rounded-full">
          <span className="text-xs text-white font-medium">{unread}</span>
        </div>
      )}
    </button>
  );
}