import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import UserProfile from './components/Sidebar/UserProfile';
import Navigation from './components/Sidebar/Navigation';
import SearchBar from './components/Sidebar/SearchBar';
import ContactItem from './components/ContactList/ContactItem';
import ChatHeader from './components/Chat/ChatHeader';
import Message from './components/Chat/Message';
import MessageInput from './components/Chat/MessageInput';
import CreateDialog from './components/Modals/CreateDialog';
import ThemeSelector from './components/Settings/ThemeSelector';
import ProfileSettingsModal from './components/Modals/ProfileSettingsModal';
import ContactsModal from './components/Modals/ContactsModal';
import { useTheme } from './context/ThemeContext';
import type { Contact, Message as MessageType } from './types';

const defaultContacts: Contact[] = [
  {
    id: '1',
    avatar: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7',
    name: 'Epsl',
    lastMessage: 'Привет!',
    timestamp: '12:30 PM',
    unread: 2,
    online: true,
    type: 'user',
  },
  {
    id: '2',
    avatar: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e',
    name: 'Coourage',
    lastMessage: 'Бууу',
    timestamp: '10:15 AM',
    online: true,
    type: 'user',
  },
];

function AppContent() {
  const { theme } = useTheme();
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [chatMessages, setChatMessages] = useState<
    Record<string, MessageType[]>
  >({});
  const [showCreateDialog, setShowCreateDialog] = useState<
    'channel' | 'group' | null
  >(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [wallpaper, setWallpaper] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({
    name: 'Кирюша',
    username: 'Kirusha',
    avatar: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7',
  });

  const handleSendMessage = (
    content: string,
    type: 'text' | 'image' = 'text'
  ) => {
    if (!selectedContact) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwn: true,
      type,
      isRead: false,
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));

    // Update last message in contacts list
    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedContact.id
          ? { ...c, lastMessage: content, timestamp: newMessage.timestamp }
          : c
      )
    );
  };

  const handleCreateDialog = (data: { name: string; avatar: string }) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...data,
      lastMessage: 'Создано только что',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      type: showCreateDialog === 'channel' ? 'channel' : 'group',
    };
    setContacts([newContact, ...contacts]);
    setShowCreateDialog(null);
  };

  const handleDeleteDialog = () => {
    if (selectedContact) {
      setContacts(contacts.filter((c) => c.id !== selectedContact.id));
      setChatMessages((prev) => {
        const { [selectedContact.id]: _, ...rest } = prev;
        return rest;
      });
      setSelectedContact(null);
    }
  };

  const handleSavedMessages = () => {
    const savedContact: Contact = {
      id: 'saved',
      avatar: userProfile.avatar,
      name: 'Избранное',
      lastMessage: 'Персональный заметки',
      timestamp: '',
      type: 'user',
    };
    setSelectedContact(savedContact);
  };

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
    };
    setContacts([...contacts, newContact]);
  };

  const handleUpdateContact = (id: string, data: Partial<Contact>) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setChatMessages((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  const themeClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900 text-white',
    futuristic:
      'bg-gradient-to-br from-purple-500/90 to-blue-500/90 text-white backdrop-blur-sm',
  };

  return (
    <div className={`flex h-screen ${themeClasses[theme]}`}>
      {/* Sidebar */}
      <div
        className={`w-80 flex flex-col border-r ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
        }`}
      >
        <UserProfile
          {...userProfile}
          onSettingsClick={() => setShowProfileSettings(true)}
        />
        <SearchBar />
        <Navigation
          onCreateChannel={() => setShowCreateDialog('channel')}
          onCreateGroup={() => setShowCreateDialog('group')}
          onOpenThemeSelector={() => setShowThemeSelector(true)}
          onSavedMessages={handleSavedMessages}
          onContactsClick={() => setShowContacts(true)}
        />
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              {...contact}
              onClick={() => setSelectedContact(contact)}
              isSelected={selectedContact?.id === contact.id}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          <ChatHeader
            avatar={selectedContact.avatar}
            name={selectedContact.name}
            status={selectedContact.online ? 'Онлайн' : 'Оффлайн'}
            onDeleteDialog={handleDeleteDialog}
            onChangeWallpaper={setWallpaper}
          />
          <div
            className="flex-1 overflow-y-auto p-4"
            style={
              wallpaper
                ? {
                    backgroundImage: `url(${wallpaper})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          >
            {(chatMessages[selectedContact.id] || []).map((message) => (
              <Message key={message.id} {...message} />
            ))}
          </div>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Выберите чат для начала общения
        </div>
      )}

      {/* Modals */}
      {showCreateDialog && (
        <CreateDialog
          type={showCreateDialog}
          onClose={() => setShowCreateDialog(null)}
          onSubmit={handleCreateDialog}
        />
      )}

      {showThemeSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg">
            <ThemeSelector />
            <button
              onClick={() => setShowThemeSelector(false)}
              className="w-full p-3 text-center text-blue-500 border-t"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {showProfileSettings && (
        <ProfileSettingsModal
          {...userProfile}
          onClose={() => setShowProfileSettings(false)}
          onUpdate={setUserProfile}
        />
      )}

      {showContacts && (
        <ContactsModal
          contacts={contacts}
          onClose={() => setShowContacts(false)}
          onAddContact={handleAddContact}
          onUpdateContact={handleUpdateContact}
          onDeleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
