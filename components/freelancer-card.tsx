'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { Star, MapPin, Clock, Shield, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FreelancerCardProps {
  freelancer: {
    id: string;
    name: string;
    avatar: string;
    title: { en: string; ar: string };
    hourlyRate: number;
    skills: string[];
    rating: number;
    reviewsCount: number;
    projects: string[];
    availability: string;
    location: string;
    verified: boolean;
  };
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const { language, t } = useLanguage();

  return (
    <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all group">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/20">
            <Image 
              src={freelancer.avatar || "/placeholder.svg"} 
              alt={freelancer.name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          {freelancer.verified && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-secondary rounded-full flex items-center justify-center ring-4 ring-background">
              <Shield className="w-4 h-4 text-background" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {freelancer.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {freelancer.title[language]}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{freelancer.rating}</span>
              <span className="text-muted-foreground">({freelancer.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {freelancer.location}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-border/50">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">${freelancer.hourlyRate}</span>
          <span className="text-sm text-muted-foreground">/ {language === 'ar' ? 'ساعة' : 'hour'}</span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {freelancer.availability === 'full-time' 
              ? (language === 'ar' ? 'متاح بدوام كامل' : 'Available full-time')
              : (language === 'ar' ? 'متاح جزئياً' : 'Available part-time')
            }
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.slice(0, 5).map((skill, i) => (
          <Badge key={i} variant="outline" className="bg-background/50">
            {skill}
          </Badge>
        ))}
        {freelancer.skills.length > 5 && (
          <Badge variant="outline" className="bg-background/50">
            +{freelancer.skills.length - 5}
          </Badge>
        )}
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        {freelancer.projects.length} {language === 'ar' ? 'مشروع منجز' : 'completed projects'}
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/freelancers/${freelancer.id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            {t('viewProfile')}
          </Button>
        </Link>
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          <MessageSquare className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'توظيف' : 'Hire'}
        </Button>
      </div>
    </div>
  );
}
