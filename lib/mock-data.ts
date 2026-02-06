export const mockJobs = [
  {
    id: 'job-1001',
    title: { en: 'Senior Backend Engineer', ar: 'مهندس Backend أول' },
    company: {
      id: 'comp-01',
      name: 'TechNova',
      logo: '/logo.png',
      location: 'Amsterdam, NL',
      remote: true
    },
    type: 'full-time',
    salary: { min: 5000, max: 7000, currency: 'EUR' },
    experienceLevel: 'senior',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    postedDate: '2026-02-01',
    description: {
      en: 'Build scalable APIs and microservices for our growing platform...',
      ar: 'بناء واجهات برمجة تطبيقات قابلة للتوسّع وخدمات مصغرة لمنصتنا المتنامية...'
    },
    applicationsCount: 12,
    saved: false
  },
  {
    id: 'job-1002',
    title: { en: 'Frontend Developer', ar: 'مطور واجهات أمامية' },
    company: {
      id: 'comp-02',
      name: 'Digital Solutions',
      logo: '/logo.png',
      location: 'Dubai, UAE',
      remote: false
    },
    type: 'full-time',
    salary: { min: 4000, max: 6000, currency: 'USD' },
    experienceLevel: 'mid',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    postedDate: '2026-02-03',
    description: {
      en: 'Create stunning user interfaces for our digital products...',
      ar: 'إنشاء واجهات مستخدم رائعة لمنتجاتنا الرقمية...'
    },
    applicationsCount: 8,
    saved: false
  },
  {
    id: 'job-1003',
    title: { en: 'DevOps Engineer', ar: 'مهندس DevOps' },
    company: {
      id: 'comp-03',
      name: 'Cloud Systems',
      logo: '/logo.png',
      location: 'Remote',
      remote: true
    },
    type: 'contract',
    salary: { min: 6000, max: 9000, currency: 'USD' },
    experienceLevel: 'senior',
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD'],
    postedDate: '2026-01-30',
    description: {
      en: 'Manage cloud infrastructure and deployment pipelines...',
      ar: 'إدارة البنية التحتية السحابية وخطوط النشر...'
    },
    applicationsCount: 15,
    saved: false
  }
];

export const mockFreelancers = [
  {
    id: 'fl-900',
    name: 'Layla Hassan',
    avatar: '/logo.png',
    title: { en: 'Fullstack Developer', ar: 'مطوّرة Fullstack' },
    hourlyRate: 40,
    skills: ['React', 'Next.js', 'Node.js', 'GraphQL'],
    rating: 4.9,
    reviewsCount: 45,
    projects: ['ecommerce-app', 'analytics-dashboard'],
    availability: 'part-time',
    location: 'Remote',
    verified: true
  },
  {
    id: 'fl-901',
    name: 'Ahmed Khalil',
    avatar: '/logo.png',
    title: { en: 'Mobile Developer', ar: 'مطور تطبيقات موبايل' },
    hourlyRate: 50,
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    rating: 4.8,
    reviewsCount: 38,
    projects: ['fitness-app', 'delivery-platform'],
    availability: 'full-time',
    location: 'Cairo, Egypt',
    verified: true
  },
  {
    id: 'fl-902',
    name: 'Sara Abdullah',
    avatar: '/logo.png',
    title: { en: 'UI/UX Designer', ar: 'مصممة واجهات مستخدم' },
    hourlyRate: 35,
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    rating: 4.7,
    reviewsCount: 52,
    projects: ['saas-dashboard', 'mobile-banking-ui'],
    availability: 'part-time',
    location: 'Riyadh, KSA',
    verified: true
  }
];

export const mockAgencies = [
  {
    id: 'agency-77',
    name: 'EliteRecruit',
    logo: '/logo.png',
    specialties: ['Software', 'Data', 'Cloud'],
    rating: 4.6,
    reviewsCount: 120,
    openRoles: 24,
    location: 'Dubai, UAE',
    contact: {
      email: 'hello@eliterecruit.example',
      phone: '+971-4-000-0000'
    },
    description: {
      en: 'Leading tech recruitment agency in the Middle East...',
      ar: 'وكالة توظيف تقنية رائدة في الشرق الأوسط...'
    }
  },
  {
    id: 'agency-78',
    name: 'TechTalent Pro',
    logo: '/logo.png',
    specialties: ['Engineering', 'Product', 'Design'],
    rating: 4.7,
    reviewsCount: 95,
    openRoles: 18,
    location: 'London, UK',
    contact: {
      email: 'info@techtalent.example',
      phone: '+44-20-0000-0000'
    },
    description: {
      en: 'Specialized in placing senior technical talent...',
      ar: 'متخصصون في توظيف المواهب التقنية الكبيرة...'
    }
  }
];
