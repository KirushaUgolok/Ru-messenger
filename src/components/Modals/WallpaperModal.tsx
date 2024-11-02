import React, { useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { defaultWallpapers } from '../../types';

interface WallpaperModalProps {
  onClose: () => void;
  onSelect: (wallpaper: string) => void;
}

export default function WallpaperModal({
  onClose,
  onSelect,
}: WallpaperModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSelect(reader.result as string);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Изменить обои чата</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {defaultWallpapers.map((wallpaper) => (
            <button
              key={wallpaper.id}
              onClick={() => {
                onSelect(wallpaper.url);
                onClose();
              }}
              className="relative aspect-square rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all"
            >
              <img
                src={wallpaper.url}
                alt={wallpaper.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                <span className="text-white text-sm">{wallpaper.name}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Upload className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600">Загрузить свои обои</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
