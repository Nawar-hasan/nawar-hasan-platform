'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, MessageSquare, Calendar, DollarSign, TrendingUp, Plus, Eye } from 'lucide-react';

export default function EmployerDashboard() {
  const { language } = useLanguage();

  const stats = [
    { 
      icon: Briefcase, 
      label: { ar: 'الوظائف المنشورة', en: 'Posted Jobs' }, 
      value: '12',
      change: '+3',
      color: 'text-primary'
    },
    { 
      icon: Users, 
      label: { ar: 'الطلبات الواردة', en: 'Applications' }, 
      value: '156',
      change: '+24',
      color: 'text-secondary'
    },
    { 
      icon: MessageSquare, 
      label: { ar: 'المحادثات النشطة', en: 'Active Chats' }, 
      value: '8',
      change: '+2',
      color: 'text-primary'
    },
    { 
      icon: Calendar, 
      label: { ar: 'المقابلات المجدولة', en: 'Scheduled Interviews' }, 
      value: '5',
      change: '+1',
      color: 'text-secondary'
    },
  ];

  const postedJobs = [
    { 
      id: 1, 
      title: { ar: 'مهندس Backend أول', en: 'Senior Backend Engineer' },
      applications: 24,
      views: 150,
      status: 'active',
      posted: '2026-02-01'
    },
    { 
      id: 2, 
      title: { ar: 'مطور Frontend', en: 'Frontend Developer' },
      applications: 18,
      views: 120,
      status: 'active',
      posted: '2026-02-03'
    },
    { 
      id: 3, 
      title: { ar: 'مهندس DevOps', en: 'DevOps Engineer' },
      applications: 32,
      views: 200,
      status: 'closed',
      posted: '2026-01-28'
    },
  ];

  const recentApplications = [
    {
      id: 1,
      candidate: 'Ahmed Khalil',
      job: { ar: 'مهندس Backend أول', en: 'Senior Backend Engineer' },
      appliedDate: '2026-02-05',
      status: 'pending'
    },
    {
      id: 2,
      candidate: 'Layla Hassan',
      job: { ar: 'مطور Frontend', en: 'Frontend Developer' },
      appliedDate: '2026-02-04',
      status: 'reviewed'
    },
    {
      id: 3,
      candidate: 'Sara Abdullah',
      job: { ar: 'مهندس DevOps', en: 'DevOps Engineer' },
      appliedDate: '2026-02-03',
      status: 'interview'
    },
  ];

  return (
    <div className="min-h-screen plasma-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {language === 'ar' ? 'لوحة التحكم - صاحب العمل' : 'Employer Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'إدارة الوظائف والطلبات والمقابلات' : 'Manage jobs, applications and interviews'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'نشر وظيفة جديدة' : 'Post New Job'}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label[language]}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="jobs">
              {language === 'ar' ? 'الوظائف المنشورة' : 'Posted Jobs'}
            </TabsTrigger>
            <TabsTrigger value="applications">
              {language === 'ar' ? 'الطلبات' : 'Applications'}
            </TabsTrigger>
            <TabsTrigger value="interviews">
              {language === 'ar' ? 'المقابلات' : 'Interviews'}
            </TabsTrigger>
          </TabsList>

          {/* Posted Jobs */}
          <TabsContent value="jobs">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'الوظائف المنشورة' : 'Your Posted Jobs'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'إدارة ومراجعة الوظائف المنشورة' : 'Manage and review your posted jobs'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {postedJobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 rounded-lg glass-card">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{job.title[language]}</h3>
                          <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                            {job.status === 'active' 
                              ? (language === 'ar' ? 'نشط' : 'Active')
                              : (language === 'ar' ? 'مغلق' : 'Closed')
                            }
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.applications} {language === 'ar' ? 'طلب' : 'applications'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {job.views} {language === 'ar' ? 'مشاهدة' : 'views'}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        {language === 'ar' ? 'عرض' : 'View'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'الطلبات الأخيرة' : 'Recent Applications'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'راجع وأدر طلبات المرشحين' : 'Review and manage candidate applications'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map(app => (
                    <div key={app.id} className="flex items-center justify-between p-4 rounded-lg glass-card">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{app.candidate}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{app.job[language]}</p>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {app.status === 'pending' && (language === 'ar' ? 'قيد المراجعة' : 'Pending')}
                            {app.status === 'reviewed' && (language === 'ar' ? 'تمت المراجعة' : 'Reviewed')}
                            {app.status === 'interview' && (language === 'ar' ? 'مقابلة' : 'Interview')}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{app.appliedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          {language === 'ar' ? 'عرض السيرة' : 'View CV'}
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          {language === 'ar' ? 'تواصل' : 'Contact'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews */}
          <TabsContent value="interviews">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'المقابلات المجدولة' : 'Scheduled Interviews'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'إدارة مواعيد المقابلات' : 'Manage your interview schedule'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'لا توجد مقابلات مجدولة حالياً' : 'No interviews scheduled yet'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
