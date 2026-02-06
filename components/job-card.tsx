'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { Bookmark, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface JobCardProps {
  job: {
    id: string;
    title: { en: string; ar: string };
    company: {
      name: string;
      logo: string;
      location: string;
      remote: boolean;
    };
    type: string;
    salary: { min: number; max: number; currency: string };
    experienceLevel: string;
    skills: string[];
    postedDate: string;
    applicationsCount: number;
    saved?: boolean;
  };
}

export function JobCard({ job }: JobCardProps) {
  const { language, t } = useLanguage();
  const [saved, setSaved] = useState(job.saved || false);

  const handleSave = () => {
    setSaved(!saved);
    // Store in localStorage
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (!saved) {
      savedJobs.push(job.id);
    } else {
      const index = savedJobs.indexOf(job.id);
      if (index > -1) savedJobs.splice(index, 1);
    }
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  };

  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden glass-card">
            <Image 
              src={job.company.logo || "/placeholder.svg"} 
              alt={job.company.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {job.title[language]}
            </h3>
            <p className="text-sm text-muted-foreground">{job.company.name}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className={saved ? 'text-primary' : ''}
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {job.company.location}
        </div>
        {job.company.remote && (
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
            {t('remote')}
          </Badge>
        )}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Briefcase className="w-4 h-4" />
          {t(job.type as any)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {daysAgo === 0 ? (language === 'ar' ? 'اليوم' : 'Today') : 
           daysAgo === 1 ? (language === 'ar' ? 'أمس' : 'Yesterday') :
           `${daysAgo} ${language === 'ar' ? 'أيام' : 'days ago'}`}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm">
        <DollarSign className="w-4 h-4 text-primary" />
        <span className="font-semibold text-foreground">
          {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
        </span>
        <span className="text-muted-foreground">/ {language === 'ar' ? 'شهرياً' : 'monthly'}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill, i) => (
          <Badge key={i} variant="outline" className="bg-background/50">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 4 && (
          <Badge variant="outline" className="bg-background/50">
            +{job.skills.length - 4}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-sm text-muted-foreground">
          {job.applicationsCount} {language === 'ar' ? 'متقدم' : 'applicants'}
        </span>
        <div className="flex items-center gap-2">
          <Link href={`/jobs/${job.id}`}>
            <Button variant="outline" size="sm" className="bg-transparent">
              {language === 'ar' ? 'التفاصيل' : 'Details'}
            </Button>
          </Link>
          <Link href={`/jobs/${job.id}/apply`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t('applyNow')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
