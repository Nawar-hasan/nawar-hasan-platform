'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { JobCard } from '@/components/job-card';
import { JobFilters } from '@/components/job-filters';
import { useLanguage } from '@/contexts/language-context';
import { mockJobs } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';

export default function JobsPage() {
  const { language } = useLanguage();
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [sortBy, setSortBy] = useState('latest');

  const handleFilterChange = (filters: any) => {
    let filtered = [...jobs];

    // Keyword filter
    if (filters.keyword) {
      filtered = filtered.filter(job => 
        job.title.en.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        job.title.ar.includes(filters.keyword) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.keyword.toLowerCase()))
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.company.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType.length > 0) {
      filtered = filtered.filter(job => filters.jobType.includes(job.type));
    }

    // Experience level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    // Remote filter
    if (filters.remote) {
      filtered = filtered.filter(job => job.company.remote);
    }

    // Salary filter
    if (filters.salaryMin) {
      filtered = filtered.filter(job => job.salary.max >= parseInt(filters.salaryMin));
    }
    if (filters.salaryMax) {
      filtered = filtered.filter(job => job.salary.min <= parseInt(filters.salaryMax));
    }

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    let sorted = [...filteredJobs];
    
    switch (sortBy) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'salary-high':
        sorted.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'salary-low':
        sorted.sort((a, b) => a.salary.min - b.salary.min);
        break;
    }
    
    setFilteredJobs(sorted);
  }, [sortBy]);

  return (
    <div className="min-h-screen plasma-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {language === 'ar' ? 'فرص التوظيف' : 'Job Opportunities'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? `${filteredJobs.length} فرصة وظيفية متاحة`
                  : `${filteredJobs.length} opportunities available`
                }
              </p>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {language === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">
                  {language === 'ar' ? 'الأحدث' : 'Latest'}
                </SelectItem>
                <SelectItem value="salary-high">
                  {language === 'ar' ? 'الراتب (الأعلى)' : 'Salary (High to Low)'}
                </SelectItem>
                <SelectItem value="salary-low">
                  {language === 'ar' ? 'الراتب (الأدنى)' : 'Salary (Low to High)'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside>
            <JobFilters onFilterChange={handleFilterChange} />
          </aside>

          {/* Jobs Grid */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="glass-card rounded-xl p-12 text-center">
                <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {language === 'ar' ? 'لا توجد وظائف' : 'No jobs found'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'ar' 
                    ? 'جرب تعديل الفلاتر للعثور على المزيد من النتائج'
                    : 'Try adjusting your filters to find more results'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
