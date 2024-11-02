import React, { useState } from 'react';
import { X, Plus, User, AtSign, Pencil, Trash2 } from 'lucide-react';
import type { Contact } from '../../types';

interface ContactsModalProps {
  contacts: Contact[];
  onClose: () => void;
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onUpdateContact: (id: string, data: Partial<Contact>) => void;
  onDeleteContact: (id: string) => void;
}

export default function ContactsModal({
  contacts,
  onClose,
  onAddContact,
  onUpdateContact,
  onDeleteContact,
}: ContactsModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    username: '',
    avatar: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7',
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.username) {
      onAddContact({
        ...newContact,
        lastMessage: '',
        timestamp: '',
        type: 'user',
        online: false,
      });
      setNewContact({
        name: '',
        username: '',
        avatar: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7',
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Контакты</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-gray-500">@{contact.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingId(contact.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Pencil className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-4 flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500">Добавить новый контакт</span>
          </button>
        )}

        {showAddForm && (
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-medium mb-4">Добавить новый контакт</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4" />
                  Имя
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <AtSign className="w-4 h-4" />
                  Username
                </label>
                <input
                  type="text"
                  value={newContact.username}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      username: e.target.value.replace(/\s+/g, ''),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAddContact}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Добавить контакт
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
