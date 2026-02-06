'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/language-context';
import { Search, Bell, Globe } from 'lucide-react';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 gold-glow rounded-full overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="NAWAR HASAN" 
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-bold text-primary">NAWAR HASAN</div>
              <div className="text-xs text-muted-foreground">PRO</div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                type="search"
                placeholder={language === 'ar' ? 'ابحث عن وظائف أو مهندسين...' : 'Search for jobs or engineers...'}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden xl:flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <Link href="/jobs" className="text-sm hover:text-primary transition-colors">
              {t('jobs')}
            </Link>
            <Link href="/freelancers" className="text-sm hover:text-primary transition-colors">
              {t('freelancers')}
            </Link>
            <Link href="/agencies" className="text-sm hover:text-primary transition-colors">
              {t('agencies')}
            </Link>
            <Link href="/employer" className="text-sm hover:text-primary transition-colors">
              {t('employer')}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleLanguage}
              className="relative"
            >
              <Globe className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 text-[10px] font-bold text-primary">
                {language.toUpperCase()}
              </span>
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
            </Button>

            <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground">
              {t('postJob')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
