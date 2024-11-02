import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface CreateDialogProps {
  type: 'channel' | 'group';
  onClose: () => void;
  onSubmit: (data: { name: string; avatar: string }) => void;
}

export default function CreateDialog({
  type,
  onClose,
  onSubmit,
}: CreateDialogProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Создать новый {type === 'channel' ? 'Канал' : 'Группа'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <img
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="flex items-center gap-2 text-sm text-blue-500">
              <Upload className="w-4 h-4" />
              Загрузить фото
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'channel' ? 'Канал' : 'Группа'} Имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Введите ${type} имя...`}
            />
          </div>

          <button
            onClick={() => onSubmit({ name, avatar })}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Создать {type === 'channel' ? 'Канал' : 'Группа'}
          </button>
        </div>
      </div>
    </div>
  );
}
