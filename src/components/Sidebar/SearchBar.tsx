import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="px-4 py-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Найти сообщение..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
