'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { Star, MapPin, Briefcase, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AgencyCardProps {
  agency: {
    id: string;
    name: string;
    logo: string;
    specialties: string[];
    rating: number;
    reviewsCount: number;
    openRoles: number;
    location: string;
    contact: {
      email: string;
      phone: string;
    };
    description: { en: string; ar: string };
  };
}

export function AgencyCard({ agency }: AgencyCardProps) {
  const { language, t } = useLanguage();

  return (
    <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all group">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden glass-card ring-2 ring-primary/10">
          <Image 
            src={agency.logo || "/placeholder.svg"} 
            alt={agency.name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {agency.name}
          </h3>
          <div className="flex items-center gap-3 text-sm mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{agency.rating}</span>
              <span className="text-muted-foreground">({agency.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              {agency.location}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {agency.description[language]}
      </p>

      <div className="mb-4">
        <div className="text-xs text-muted-foreground mb-2">
          {language === 'ar' ? 'التخصصات:' : 'Specialties:'}
        </div>
        <div className="flex flex-wrap gap-2">
          {agency.specialties.map((specialty, i) => (
            <Badge key={i} variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">{agency.openRoles}</span>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'وظيفة مفتوحة' : 'open roles'}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          {agency.contact.email}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          {agency.contact.phone}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/agencies/${agency.id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            {t('viewAgency')}
          </Button>
        </Link>
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          {language === 'ar' ? 'تواصل' : 'Contact'}
        </Button>
      </div>
    </div>
  );
}
