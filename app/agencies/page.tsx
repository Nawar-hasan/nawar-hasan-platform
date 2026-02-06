'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AgencyCard } from '@/components/agency-card';
import { useLanguage } from '@/contexts/language-context';
import { mockAgencies } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Building2, Search } from 'lucide-react';

export default function AgenciesPage() {
  const { language } = useLanguage();
  const [agencies] = useState(mockAgencies);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
    agency.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen plasma-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {language === 'ar' ? 'وكالات التوظيف' : 'Recruitment Agencies'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? `${filteredAgencies.length} وكالة متخصصة`
                  : `${filteredAgencies.length} specialized agencies`
                }
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === 'ar' ? 'ابحث عن وكالة أو تخصص...' : 'Search for agency or specialty...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 h-12"
            />
          </div>
        </div>

        {/* Agencies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.length > 0 ? (
            filteredAgencies.map(agency => (
              <AgencyCard key={agency.id} agency={agency} />
            ))
          ) : (
            <div className="col-span-full glass-card rounded-xl p-12 text-center">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
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
    </div>
  );
}
