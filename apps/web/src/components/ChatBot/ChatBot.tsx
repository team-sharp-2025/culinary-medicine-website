'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { ChatMessage } from '@/types/chat';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m Dr. Sunitha\'s virtual assistant. How can I help you with your culinary medicine questions today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    // Add user message to chat history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for your question! Dr. Sunitha recommends focusing on whole foods that are minimally processed.",
        "That's a great question about nutrition. I'd suggest scheduling a consultation for personalized advice.",
        "Many patients find success with plant-forward meals. Would you like some recipe suggestions?",
        "Culinary medicine is all about using food as a tool for better health. Is there a specific health concern you'd like to address?",
        "Dr. Sunitha has written about this topic on our blog. Would you like me to share a link?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botReply: ChatMessage = {
        id: (Date.now() + 100).toString(),
        message: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, botReply]);
    }, 1000);
  };
  
  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleChat}
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-40 overflow-hidden max-h-[calc(100vh-150px)]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-teal-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <MessageSquare size={16} className="text-teal-600" />
                </div>
                <h3 className="font-medium">Culinary Medicine Assistant</h3>
              </div>
              <button onClick={toggleChat} className="text-white hover:text-teal-100">
                <X size={20} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="p-4 h-80 overflow-y-auto bg-gray-50">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`mb-3 ${
                    chat.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                      chat.sender === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;