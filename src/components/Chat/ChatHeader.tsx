import React, { useState } from 'react';
import { Phone, Video, MoreVertical, Trash2, Image } from 'lucide-react';
import CallModal from '../Modals/CallModal';
import WallpaperModal from '../Modals/WallpaperModal';

interface ChatHeaderProps {
  avatar: string;
  name: string;
  status: string;
  onDeleteDialog: () => void;
  onChangeWallpaper: (wallpaper: string) => void;
}

export default function ChatHeader({
  avatar,
  name,
  status,
  onDeleteDialog,
  onChangeWallpaper,
}: ChatHeaderProps) {
  const [showCallModal, setShowCallModal] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-500">{status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCallModal(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setShowVideoCall(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={() => {
                    setShowWallpaperModal(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Image className="w-4 h-4" />
                  Изменить обои
                </button>
                <button
                  onClick={() => {
                    onDeleteDialog();
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4" />
                  Удалить диалог
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCallModal && (
        <CallModal
          name={name}
          avatar={avatar}
          onClose={() => setShowCallModal(false)}
        />
      )}

      {showVideoCall && (
        <CallModal
          name={name}
          avatar={avatar}
          onClose={() => setShowVideoCall(false)}
          isVideo
        />
      )}

      {showWallpaperModal && (
        <WallpaperModal
          onClose={() => setShowWallpaperModal(false)}
          onSelect={onChangeWallpaper}
        />
      )}
    </>
  );
}
