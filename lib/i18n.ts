export const languages = ['ar', 'en'] as const;
export type Language = typeof languages[number];

export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    jobs: 'فرص التوظيف',
    agencies: 'وكالات التوظيف',
    freelancers: 'مهندسون فريلانس',
    employer: 'أصحاب العمل',
    candidate: 'الباحثين عن عمل',
    contact: 'تواصل',
    
    // Hero
    heroTitle: 'اعثر على أفضل المواهب التقنية أو اعرض مهارتك',
    heroSubtitle: 'منصة احترافية تربط المهندسين بأفضل الفرص',
    postJob: 'نشر وظيفة',
    findEngineer: 'ابحث عن مهندس',
    
    // Jobs
    searchJobs: 'ابحث عن وظائف',
    applyNow: 'قدّم الآن',
    saveJob: 'حفظ الوظيفة',
    jobDetails: 'تفاصيل الوظيفة',
    fullTime: 'دوام كامل',
    partTime: 'دوام جزئي',
    contract: 'عقد',
    remote: 'عن بعد',
    onsite: 'في الموقع',
    hybrid: 'مختلط',
    
    // Freelancers
    hireFreelancer: 'توظيف مهندس',
    hourlyRate: 'السعر بالساعة',
    sendProposal: 'أرسل عرضًا',
    viewProfile: 'عرض الملف',
    
    // Agencies
    agencyServices: 'خدمات الوكالات',
    viewAgency: 'عرض الوكالة',
    hireAgency: 'توظيف وكالة',
    
    // Common
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    location: 'الموقع',
    skills: 'المهارات',
    experience: 'الخبرة',
    salary: 'الراتب',
    rating: 'التقييم',
    reviews: 'المراجعات',
    apply: 'تقديم',
    send: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    loading: 'جارٍ التحميل...',
  },
  en: {
    // Navigation
    home: 'Home',
    jobs: 'Jobs',
    agencies: 'Agencies',
    freelancers: 'Freelancers',
    employer: 'Employer',
    candidate: 'Candidate',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Find Top Tech Talent or Showcase Your Skills',
    heroSubtitle: 'Professional platform connecting engineers with the best opportunities',
    postJob: 'Post a Job',
    findEngineer: 'Find Engineer',
    
    // Jobs
    searchJobs: 'Search Jobs',
    applyNow: 'Apply Now',
    saveJob: 'Save Job',
    jobDetails: 'Job Details',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    contract: 'Contract',
    remote: 'Remote',
    onsite: 'Onsite',
    hybrid: 'Hybrid',
    
    // Freelancers
    hireFreelancer: 'Hire Freelancer',
    hourlyRate: 'Hourly Rate',
    sendProposal: 'Send Proposal',
    viewProfile: 'View Profile',
    
    // Agencies
    agencyServices: 'Agency Services',
    viewAgency: 'View Agency',
    hireAgency: 'Hire Agency',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    location: 'Location',
    skills: 'Skills',
    experience: 'Experience',
    salary: 'Salary',
    rating: 'Rating',
    reviews: 'Reviews',
    apply: 'Apply',
    send: 'Send',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
  }
};

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key] || key;
}
