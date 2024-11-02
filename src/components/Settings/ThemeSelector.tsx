import React from 'react';
import { useTheme, themes } from '../../context/ThemeContext';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Настройки темы</h2>
      <div className="space-y-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${
              theme === t.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <span>{t.name}</span>
            {theme === t.id && (
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
