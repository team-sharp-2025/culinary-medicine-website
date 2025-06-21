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
      message: "Hi there! I'm Dr. Sunitha's assistant. You can ask about consultation timings, services, or location.",
      sender: 'bot',
      timestamp: new Date(),
    },
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

const getBotResponse = (userMsg: string): string => {
  const lowerMsg = userMsg.toLowerCase();

  const includesAny = (text: string, keywords: string[]) =>
    keywords.some((keyword) => text.includes(keyword));

  if (includesAny(lowerMsg, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
    return "Hello! 😊 I'm here to help you with anything related to Dr. Sunitha's practice. Feel free to ask about timings, services, or how to get in touch!";
  }
  if (includesAny(lowerMsg, ['timing', 'available', 'working hours', 'hours', 'availability', 'appointment', 'schedule', 'slots', 'slot'])){
    return "Dr. Sunitha is available for consultations from 🕙 10:00 AM to 5:00 PM, Monday through Friday. Would you like help booking a slot?";
  }
  if (includesAny(lowerMsg, ['services', 'offer', 'treatments', 'specialities'])) {
    return "We offer personalized nutrition consultations, therapeutic meal planning, and culinary medicine guidance tailored to your health goals. 🍲✨";
  }
  if (includesAny(lowerMsg, ['location', 'where are you', 'address', 'clinic'])) {
    return "Our clinic is located at 123 Wellness Street, Coimbatore 📍. Need directions or parking info?";
  }
  if (includesAny(lowerMsg, ['consultation charges', 'fees', 'price'])) {
    return "A standard consultation with Dr. Sunitha costs ₹800. Follow-up sessions are ₹500. Let us know if you need help booking!";
  }
  if (includesAny(lowerMsg, ['online consultation', 'video call'])) {
    return "Yes! Dr. Sunitha offers online consultations via video call. You can schedule it just like a regular appointment.";
  }
  if (includesAny(lowerMsg, ['culinary', 'culinary medicine', 'science of medicine'])) {
    return "Culinary medicine combines the art of cooking with the science of medicine to help patients heal and thrive using food. 🍎👩‍⚕️";
  }
  if (includesAny(lowerMsg, ['qualifications', 'who is dr. sunitha'])) {
    return "Dr. Sunitha is a certified clinical nutritionist and culinary medicine expert with over 10 years of experience helping patients use food as a form of therapy.";
  }
  if (includesAny(lowerMsg, ['thank you', 'thanks', 'thankyou', 'thx'])) {
    return "You're most welcome! 😊 Feel free to reach out anytime if you have more questions.";
  }
  if (includesAny(lowerMsg, ['bye', 'goodbye', 'see you', 'talk to you later'])) {
    return "Take care! 👋 Wishing you good health. I'm here whenever you need assistance.";
  }

  return "For detailed or medical-related queries, it's best to connect directly with Dr. Sunitha. You can reach us at 📧 dr.sunitha@example.com or 📞 98765 43210.";
};

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === '') return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');

    setTimeout(() => {
      const botReply: ChatMessage = {
        id: (Date.now() + 100).toString(),
        message: getBotResponse(userMessage.message),
        sender: 'bot',
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleChat}
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

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

            <div className="p-4 h-80 overflow-y-auto bg-gray-50">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`mb-3 ${chat.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${chat.sender === 'user'
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