'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { Briefcase, Users, Building2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const { t } = useLanguage();

  const stats = [
    { icon: Briefcase, value: '2,500+', label: { ar: 'فرصة وظيفية', en: 'Job Opportunities' } },
    { icon: Users, value: '10,000+', label: { ar: 'مهندس محترف', en: 'Professional Engineers' } },
    { icon: Building2, value: '500+', label: { ar: 'شركة رائدة', en: 'Leading Companies' } },
    { icon: TrendingUp, value: '95%', label: { ar: 'نسبة نجاح', en: 'Success Rate' } },
  ];

  return (
    <section className="relative overflow-hidden plasma-bg min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
              {t('heroTitle')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 text-balance max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/jobs">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 gold-glow">
                <Briefcase className="w-5 h-5 mr-2" />
                {t('postJob')}
              </Button>
            </Link>
            <Link href="/freelancers">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 blue-glow bg-transparent">
                <Users className="w-5 h-5 mr-2" />
                {t('findEngineer')}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl p-6 hover:scale-105 transition-transform"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label.ar}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
}
