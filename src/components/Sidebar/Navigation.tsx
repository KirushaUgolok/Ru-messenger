import React from 'react';
import {
  BookmarkIcon,
  Users,
  Radio,
  UserCircle,
  PhoneCall,
  Settings,
} from 'lucide-react';

interface NavigationProps {
  onCreateChannel: () => void;
  onCreateGroup: () => void;
  onOpenThemeSelector: () => void;
  onSavedMessages: () => void;
  onContactsClick: () => void;
}

const navItems = [
  { icon: BookmarkIcon, label: 'Избранное', action: 'saved' },
  { icon: Users, label: 'Новая группа', action: 'group' },
  { icon: Radio, label: 'Новый канал', action: 'channel' },
  { icon: UserCircle, label: 'Контакты', action: 'contacts' },
  { icon: PhoneCall, label: 'Звонки', action: 'calls' },
  { icon: Settings, label: 'Настройки', action: 'settings' },
];

export default function Navigation({
  onCreateChannel,
  onCreateGroup,
  onOpenThemeSelector,
  onSavedMessages,
  onContactsClick,
}: NavigationProps) {
  const handleClick = (action: string) => {
    switch (action) {
      case 'channel':
        onCreateChannel();
        break;
      case 'group':
        onCreateGroup();
        break;
      case 'settings':
        onOpenThemeSelector();
        break;
      case 'saved':
        onSavedMessages();
        break;
      case 'contacts':
        onContactsClick();
        break;
    }
  };

  return (
    <nav className="py-2">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => handleClick(item.action)}
          className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          <item.icon className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
