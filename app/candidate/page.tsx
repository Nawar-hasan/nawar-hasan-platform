'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Send, MessageSquare, Calendar, Bookmark, TrendingUp, Edit } from 'lucide-react';

export default function CandidateDashboard() {
  const { language } = useLanguage();

  const stats = [
    { 
      icon: Send, 
      label: { ar: 'الطلبات المقدمة', en: 'Applications Sent' }, 
      value: '18',
      change: '+5',
      color: 'text-primary'
    },
    { 
      icon: MessageSquare, 
      label: { ar: 'الردود', en: 'Responses' }, 
      value: '7',
      change: '+2',
      color: 'text-secondary'
    },
    { 
      icon: Calendar, 
      label: { ar: 'المقابلات', en: 'Interviews' }, 
      value: '3',
      change: '+1',
      color: 'text-primary'
    },
    { 
      icon: Bookmark, 
      label: { ar: 'الوظائف المحفوظة', en: 'Saved Jobs' }, 
      value: '12',
      change: '+3',
      color: 'text-secondary'
    },
  ];

  const applications = [
    {
      id: 1,
      company: 'TechNova',
      position: { ar: 'مهندس Backend أول', en: 'Senior Backend Engineer' },
      appliedDate: '2026-02-01',
      status: 'pending'
    },
    {
      id: 2,
      company: 'Digital Solutions',
      position: { ar: 'مطور Frontend', en: 'Frontend Developer' },
      appliedDate: '2026-02-03',
      status: 'interview'
    },
    {
      id: 3,
      company: 'Cloud Systems',
      position: { ar: 'مهندس DevOps', en: 'DevOps Engineer' },
      appliedDate: '2026-01-30',
      status: 'rejected'
    },
  ];

  const savedJobs = [
    {
      id: 1,
      company: 'StartupHub',
      position: { ar: 'مهندس Fullstack', en: 'Fullstack Engineer' },
      location: 'Dubai, UAE',
      type: 'full-time'
    },
    {
      id: 2,
      company: 'AI Corp',
      position: { ar: 'مهندس Machine Learning', en: 'ML Engineer' },
      location: 'Remote',
      type: 'contract'
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
              {language === 'ar' ? 'لوحة التحكم - الباحث عن عمل' : 'Candidate Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'تتبع طلباتك ومقابلاتك' : 'Track your applications and interviews'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Edit className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'تحديث الملف' : 'Update Profile'}
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
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="applications">
              {language === 'ar' ? 'الطلبات' : 'Applications'}
            </TabsTrigger>
            <TabsTrigger value="saved">
              {language === 'ar' ? 'الوظائف المحفوظة' : 'Saved Jobs'}
            </TabsTrigger>
            <TabsTrigger value="interviews">
              {language === 'ar' ? 'المقابلات' : 'Interviews'}
            </TabsTrigger>
          </TabsList>

          {/* Applications */}
          <TabsContent value="applications">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'الطلبات المقدمة' : 'Your Applications'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'تتبع حالة طلباتك' : 'Track the status of your applications'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map(app => (
                    <div key={app.id} className="flex items-center justify-between p-4 rounded-lg glass-card">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{app.position[language]}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{app.company}</p>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={
                              app.status === 'interview' ? 'default' : 
                              app.status === 'rejected' ? 'destructive' : 
                              'secondary'
                            }
                          >
                            {app.status === 'pending' && (language === 'ar' ? 'قيد المراجعة' : 'Under Review')}
                            {app.status === 'interview' && (language === 'ar' ? 'مقابلة' : 'Interview Stage')}
                            {app.status === 'rejected' && (language === 'ar' ? 'مرفوض' : 'Not Selected')}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {language === 'ar' ? 'تم التقديم:' : 'Applied:'} {app.appliedDate}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        {language === 'ar' ? 'التفاصيل' : 'Details'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Jobs */}
          <TabsContent value="saved">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'الوظائف المحفوظة' : 'Saved Jobs'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'الوظائف التي قمت بحفظها' : 'Jobs you have bookmarked'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedJobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 rounded-lg glass-card">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{job.position[language]}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          {language === 'ar' ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          {language === 'ar' ? 'تقدم الآن' : 'Apply Now'}
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
                  {language === 'ar' ? 'مواعيد المقابلات القادمة' : 'Your upcoming interview schedule'}
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
