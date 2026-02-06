'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FreelancerCard } from '@/components/freelancer-card';
import { useLanguage } from '@/contexts/language-context';
import { mockFreelancers } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FreelancersPage() {
  const { language } = useLanguage();
  const [freelancers, setFreelancers] = useState(mockFreelancers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredFreelancers = freelancers
    .filter(freelancer => 
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.ar.includes(searchQuery) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'rate-low':
          return a.hourlyRate - b.hourlyRate;
        case 'rate-high':
          return b.hourlyRate - a.hourlyRate;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen plasma-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {language === 'ar' ? 'مهندسون فريلانس' : 'Freelance Engineers'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? `${filteredFreelancers.length} مهندس محترف متاح`
                  : `${filteredFreelancers.length} professional engineers available`
                }
              </p>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={language === 'ar' ? 'ابحث عن مهندس أو مهارة...' : 'Search for engineer or skill...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 h-12"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {language === 'ar' ? 'ترتيب:' : 'Sort by:'}
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">
                    {language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}
                  </SelectItem>
                  <SelectItem value="rate-low">
                    {language === 'ar' ? 'السعر (الأقل)' : 'Rate (Low to High)'}
                  </SelectItem>
                  <SelectItem value="rate-high">
                    {language === 'ar' ? 'السعر (الأعلى)' : 'Rate (High to Low)'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Freelancers Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFreelancers.length > 0 ? (
            filteredFreelancers.map(freelancer => (
              <FreelancerCard key={freelancer.id} freelancer={freelancer} />
            ))
          ) : (
            <div className="col-span-full glass-card rounded-xl p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
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
