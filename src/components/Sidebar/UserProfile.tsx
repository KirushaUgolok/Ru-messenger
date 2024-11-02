import React from 'react';
import { Settings } from 'lucide-react';

interface UserProfileProps {
  avatar: string;
  name: string;
  username: string;
  onSettingsClick: () => void;
}

export default function UserProfile({
  avatar,
  name,
  username,
  onSettingsClick,
}: UserProfileProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">@{username}</p>
        </div>
      </div>
      <button
        onClick={onSettingsClick}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}