'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { websocketService } from '../../../lib/websocket';

export default function SupplierMessages() {
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      vendorId: 'VEN-001',
      vendorName: 'Street Food Corner',
      vendorLocation: 'Delhi',
      lastMessage: 'Thank you for the quick delivery!',
      timestamp: '2024-01-15T10:30:00Z',
      unreadCount: 1,
      isOnline: true
    },
    {
      id: 'conv-2',
      vendorId: 'VEN-002',
      vendorName: 'Spicy Delights',
      vendorLocation: 'Mumbai',
      lastMessage: 'I need some spices for my street food stall.',
      timestamp: '2024-01-15T09:15:00Z',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 'conv-3',
      vendorId: 'VEN-003',
      vendorName: 'Chaat Master',
      vendorLocation: 'Delhi',
      lastMessage: 'Can you deliver 30 minutes earlier today?',
      timestamp: '2024-01-15T08:45:00Z',
      unreadCount: 2,
      isOnline: true
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const conversationMessages = {
    'conv-1': [
      { id: 1, sender: 'vendor', text: 'Hello! I received your order for vegetables.', timestamp: '2024-01-15T09:00:00Z' },
      { id: 2, sender: 'supplier', text: 'Great! Can you confirm the delivery time?', timestamp: '2024-01-15T09:05:00Z' },
      { id: 3, sender: 'vendor', text: 'Sure! We can deliver between 8-10 AM tomorrow.', timestamp: '2024-01-15T09:10:00Z' },
      { id: 4, sender: 'supplier', text: 'Perfect! That works for me.', timestamp: '2024-01-15T09:15:00Z' },
      { id: 5, sender: 'vendor', text: 'Thank you for the quick delivery!', timestamp: '2024-01-15T10:30:00Z' }
    ],
    'conv-2': [
      { id: 1, sender: 'vendor', text: 'Hi, I need some spices for my street food stall.', timestamp: '2024-01-15T08:30:00Z' },
      { id: 2, sender: 'supplier', text: 'Hello! What specific spices do you need?', timestamp: '2024-01-15T08:45:00Z' },
      { id: 3, sender: 'vendor', text: 'I need garam masala, turmeric, and red chili powder.', timestamp: '2024-01-15T09:00:00Z' },
      { id: 4, sender: 'supplier', text: 'Thank you for your inquiry. We have the spices you need.', timestamp: '2024-01-15T09:15:00Z' }
    ],
    'conv-3': [
      { id: 1, sender: 'supplier', text: 'Good morning! Your regular milk order is ready.', timestamp: '2024-01-15T08:00:00Z' },
      { id: 2, sender: 'vendor', text: 'Thanks! Same time as usual?', timestamp: '2024-01-15T08:15:00Z' },
      { id: 3, sender: 'supplier', text: 'Actually, we need to deliver 30 minutes earlier today.', timestamp: '2024-01-15T08:30:00Z' },
      { id: 4, sender: 'vendor', text: 'Can you deliver 30 minutes earlier today?', timestamp: '2024-01-15T08:45:00Z' }
    ]
  };

  useEffect(() => {
    websocketService.connect();
    websocketService.on('newMessage', (data) => {
      setMessages(prev => [...prev, data]);
      setConversations(prev => prev.map(conv => 
        conv.id === data.conversationId 
          ? { ...conv, lastMessage: data.text, timestamp: data.timestamp, unreadCount: conv.unreadCount + 1 }
          : conv
      ));
    });

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation);
    setMessages(conversationMessages[conversation.id as keyof typeof conversationMessages] || []);
    
    setConversations(prev => prev.map(conv => 
      conv.id === conversation.id 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      sender: 'supplier',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: newMessage, timestamp: message.timestamp }
        : conv
    ));

    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <DashboardLayout userType="supplier">
      <div className="h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm flex">
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => handleConversationSelect(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? 'bg-orange-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-store-2-line text-blue-600"></i>
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{conversation.vendorName}</h3>
                      <p className="text-xs text-gray-500">{conversation.vendorLocation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">{formatTime(conversation.timestamp)}</p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-store-2-line text-blue-600"></i>
                    </div>
                    {selectedConversation.isOnline && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedConversation.vendorName}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.isOnline ? 'Online' : 'Offline'} • {selectedConversation.vendorLocation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'supplier' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'supplier'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'supplier' ? 'text-orange-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-send-plane-line"></i>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-message-3-line text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-gray-500">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}