'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/language-context';
import { Send, Paperclip, Video, Phone, MoreVertical } from 'lucide-react';
import Image from 'next/image';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: {
    name: string;
    avatar: string;
    role: string;
    online: boolean;
  };
}

export function ChatModal({ isOpen, onClose, contact }: ChatModalProps) {
  const { language } = useLanguage();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'other',
      text: language === 'ar' ? 'مرحباً! شكراً لتواصلك معي' : 'Hi! Thanks for reaching out',
      time: '10:30'
    },
    {
      id: '2',
      sender: 'me',
      text: language === 'ar' ? 'مرحباً، أود مناقشة المشروع معك' : 'Hello, I would like to discuss the project with you',
      time: '10:32'
    },
    {
      id: '3',
      sender: 'other',
      text: language === 'ar' ? 'بالتأكيد! متى يمكننا الاجتماع؟' : 'Sure! When can we meet?',
      time: '10:35'
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'me' as const,
      text: message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');

    // Mock response
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        sender: 'other' as const,
        text: language === 'ar' ? 'شكراً! سأراجع وأرد عليك قريباً' : 'Thanks! I will review and get back to you soon',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl h-[600px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={contact.avatar || "/placeholder.svg"} 
                    alt={contact.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
                )}
              </div>
              <div>
                <DialogTitle className="text-lg">{contact.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="bg-transparent">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-transparent">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-transparent">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-xl p-4 ${
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card'
                }`}
              >
                <p className="text-sm mb-1">{msg.text}</p>
                <span className={`text-xs ${
                  msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="bg-transparent">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
              className="flex-1 bg-background/50"
            />
            <Button 
              onClick={handleSend}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
