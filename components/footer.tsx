'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();

  const links = {
    company: [
      { label: { ar: 'عن المنصة', en: 'About Us' }, href: '/about' },
      { label: { ar: 'فريق العمل', en: 'Our Team' }, href: '/team' },
      { label: { ar: 'الوظائف', en: 'Careers' }, href: '/careers' },
      { label: { ar: 'تواصل معنا', en: 'Contact' }, href: '/contact' },
    ],
    services: [
      { label: { ar: 'فرص التوظيف', en: 'Job Listings' }, href: '/jobs' },
      { label: { ar: 'مهندسون فريلانس', en: 'Freelancers' }, href: '/freelancers' },
      { label: { ar: 'وكالات التوظيف', en: 'Agencies' }, href: '/agencies' },
      { label: { ar: 'أصحاب العمل', en: 'Employers' }, href: '/employer' },
    ],
    legal: [
      { label: { ar: 'الشروط والأحكام', en: 'Terms of Service' }, href: '/terms' },
      { label: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' }, href: '/privacy' },
      { label: { ar: 'سياسة الأمان', en: 'Security Policy' }, href: '/security' },
      { label: { ar: 'سياسة عدم التمييز', en: 'Non-Discrimination Policy' }, href: '/non-discrimination' },
    ],
  };

  return (
    <footer className="glass-card border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 gold-glow rounded-full overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="NAWAR HASAN" 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-lg font-bold text-primary">NAWAR HASAN</div>
                <div className="text-xs text-muted-foreground">PRO</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              {language === 'ar' 
                ? 'منصة احترافية تربط المهندسين والمواهب التقنية بأفضل الفرص الوظيفية في المنطقة'
                : 'Professional platform connecting engineers and tech talents with the best job opportunities in the region'
              }
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-secondary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'الشركة' : 'Company'}
            </h3>
            <ul className="space-y-2">
              {links.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'الخدمات' : 'Services'}
            </h3>
            <ul className="space-y-2">
              {links.services.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'قانوني' : 'Legal'}
            </h3>
            <ul className="space-y-2">
              {links.legal.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 NAWAR HASAN PRO. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="mailto:info@nawarhasan.pro" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                info@nawarhasan.pro
              </a>
              <a href="tel:+971000000000" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +971 00 000 0000
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
