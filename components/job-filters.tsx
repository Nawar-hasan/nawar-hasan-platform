'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/language-context';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: [],
    experienceLevel: '',
    remote: false,
    salaryMin: '',
    salaryMax: '',
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      keyword: '',
      location: '',
      jobType: [],
      experienceLevel: '',
      remote: false,
      salaryMin: '',
      salaryMax: '',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const jobTypes = [
    { value: 'full-time', label: { ar: 'دوام كامل', en: 'Full-time' } },
    { value: 'part-time', label: { ar: 'دوام جزئي', en: 'Part-time' } },
    { value: 'contract', label: { ar: 'عقد', en: 'Contract' } },
  ];

  const experienceLevels = [
    { value: 'junior', label: { ar: 'مبتدئ', en: 'Junior' } },
    { value: 'mid', label: { ar: 'متوسط', en: 'Mid-level' } },
    { value: 'senior', label: { ar: 'أول', en: 'Senior' } },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">
            {language === 'ar' ? 'فلاتر البحث' : 'Search Filters'}
          </h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="bg-transparent">
          <X className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'مسح' : 'Clear'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Keyword */}
        <div>
          <Label htmlFor="keyword" className="text-sm font-medium mb-2 block">
            {language === 'ar' ? 'كلمات البحث' : 'Keywords'}
          </Label>
          <Input
            id="keyword"
            placeholder={language === 'ar' ? 'مثال: React, Node.js' : 'e.g. React, Node.js'}
            value={filters.keyword}
            onChange={(e) => handleFilterChange('keyword', e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-medium mb-2 block">
            {language === 'ar' ? 'الموقع' : 'Location'}
          </Label>
          <Input
            id="location"
            placeholder={language === 'ar' ? 'مثال: دبي، الرياض' : 'e.g. Dubai, Riyadh'}
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* Remote Work */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox
            id="remote"
            checked={filters.remote}
            onCheckedChange={(checked) => handleFilterChange('remote', checked)}
          />
          <Label htmlFor="remote" className="text-sm cursor-pointer">
            {language === 'ar' ? 'عمل عن بعد فقط' : 'Remote only'}
          </Label>
        </div>

        {/* Job Type */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            {language === 'ar' ? 'نوع الوظيفة' : 'Job Type'}
          </Label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={type.value}
                  checked={filters.jobType.includes(type.value)}
                  onCheckedChange={(checked) => {
                    const newTypes = checked
                      ? [...filters.jobType, type.value]
                      : filters.jobType.filter((t: string) => t !== type.value);
                    handleFilterChange('jobType', newTypes);
                  }}
                />
                <Label htmlFor={type.value} className="text-sm cursor-pointer">
                  {type.label[language]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <Label htmlFor="experience" className="text-sm font-medium mb-2 block">
            {language === 'ar' ? 'مستوى الخبرة' : 'Experience Level'}
          </Label>
          <Select value={filters.experienceLevel} onValueChange={(value) => handleFilterChange('experienceLevel', value)}>
            <SelectTrigger id="experience" className="bg-background/50">
              <SelectValue placeholder={language === 'ar' ? 'اختر المستوى' : 'Select level'} />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            {language === 'ar' ? 'نطاق الراتب (USD)' : 'Salary Range (USD)'}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder={language === 'ar' ? 'الأدنى' : 'Min'}
              value={filters.salaryMin}
              onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
              className="bg-background/50"
            />
            <Input
              type="number"
              placeholder={language === 'ar' ? 'الأقصى' : 'Max'}
              value={filters.salaryMax}
              onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
