'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ChatModal } from '@/components/chat-modal';
import { SchedulerModal } from '@/components/scheduler-modal';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function MessagesPage() {
  const { language } = useLanguage();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Ahmed Khalil',
      avatar: '/logo.png',
      role: language === 'ar' ? 'مطور موبايل' : 'Mobile Developer',
      lastMessage: language === 'ar' ? 'شكراً! سأراجع وأرد عليك قريباً' : 'Thanks! I will review and get back to you',
      time: '10:35',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Layla Hassan',
      avatar: '/logo.png',
      role: language === 'ar' ? 'مطورة Fullstack' : 'Fullstack Developer',
      lastMessage: language === 'ar' ? 'متى يمكننا مناقشة المشروع؟' : 'When can we discuss the project?',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: '3',
      name: 'Sara Abdullah',
      avatar: '/logo.png',
      role: language === 'ar' ? 'مصممة UI/UX' : 'UI/UX Designer',
      lastMessage: language === 'ar' ? 'أرسلت لك التصميمات' : 'I sent you the designs',
      time: '2 days ago',
      unread: 0,
      online: true
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen plasma-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {language === 'ar' ? 'الرسائل' : 'Messages'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? `${filteredConversations.length} محادثة`
                  : `${filteredConversations.length} conversations`
                }
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === 'ar' ? 'ابحث عن محادثة...' : 'Search conversations...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 h-12"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="grid gap-4">
          {filteredConversations.map(conv => (
            <div 
              key={conv.id}
              className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => setSelectedChat(conv)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <Image 
                        src={conv.avatar || "/placeholder.svg"} 
                        alt={conv.name}
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-background" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{conv.name}</h3>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{conv.role}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{conv.lastMessage}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {conv.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-xs font-bold text-background">{conv.unread}</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowScheduler(true);
                      setSelectedChat(conv);
                    }}
                    className="bg-transparent"
                  >
                    <Calendar className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredConversations.length === 0 && (
            <div className="glass-card rounded-xl p-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'ar' ? 'لا توجد محادثات' : 'No conversations found'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'جرب البحث بكلمات مختلفة'
                  : 'Try searching with different keywords'
                }
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Chat Modal */}
      {selectedChat && (
        <ChatModal
          isOpen={!!selectedChat && !showScheduler}
          onClose={() => setSelectedChat(null)}
          contact={selectedChat}
        />
      )}

      {/* Scheduler Modal */}
      {selectedChat && (
        <SchedulerModal
          isOpen={showScheduler}
          onClose={() => {
            setShowScheduler(false);
            setSelectedChat(null);
          }}
          candidateName={selectedChat.name}
        />
      )}
    </div>
  );
}
