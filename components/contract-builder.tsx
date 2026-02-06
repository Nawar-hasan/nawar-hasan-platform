'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { Plus, Trash2, FileText, CheckCircle, Clock, DollarSign } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'in-progress' | 'completed' | 'paid';
}

export function ContractBuilder() {
  const { language } = useLanguage();
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: language === 'ar' ? 'المرحلة الأولى - التصميم' : 'Phase 1 - Design',
      description: language === 'ar' ? 'تصميم واجهات المستخدم والنماذج الأولية' : 'UI design and prototypes',
      amount: 1000,
      status: 'completed'
    },
    {
      id: '2',
      title: language === 'ar' ? 'المرحلة الثانية - التطوير' : 'Phase 2 - Development',
      description: language === 'ar' ? 'تطوير الواجهة الأمامية والخلفية' : 'Frontend and backend development',
      amount: 3000,
      status: 'in-progress'
    },
    {
      id: '3',
      title: language === 'ar' ? 'المرحلة الثالثة - الاختبار والنشر' : 'Phase 3 - Testing & Deployment',
      description: language === 'ar' ? 'اختبار شامل ونشر التطبيق' : 'Complete testing and deployment',
      amount: 1000,
      status: 'pending'
    }
  ]);

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: '',
      description: '',
      amount: 0,
      status: 'pending'
    };
    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: any) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);
  const paidAmount = milestones
    .filter(m => m.status === 'paid')
    .reduce((sum, m) => sum + m.amount, 0);

  const getStatusBadge = (status: Milestone['status']) => {
    const configs = {
      pending: { 
        variant: 'secondary' as const, 
        label: language === 'ar' ? 'معلق' : 'Pending',
        icon: Clock
      },
      'in-progress': { 
        variant: 'default' as const, 
        label: language === 'ar' ? 'قيد التنفيذ' : 'In Progress',
        icon: Clock
      },
      completed: { 
        variant: 'default' as const, 
        label: language === 'ar' ? 'مكتمل' : 'Completed',
        icon: CheckCircle
      },
      paid: { 
        variant: 'default' as const, 
        label: language === 'ar' ? 'مدفوع' : 'Paid',
        icon: DollarSign
      }
    };
    const config = configs[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="bg-secondary/20 text-secondary">
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Contract Summary */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {language === 'ar' ? 'ملخص العقد' : 'Contract Summary'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' ? 'نظرة عامة على المراحل والمدفوعات' : 'Overview of milestones and payments'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass-card rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'القيمة الإجمالية' : 'Total Value'}
              </div>
              <div className="text-2xl font-bold text-primary">${totalAmount.toLocaleString()}</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'المدفوع' : 'Paid'}
              </div>
              <div className="text-2xl font-bold text-secondary">${paidAmount.toLocaleString()}</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'المتبقي' : 'Remaining'}
              </div>
              <div className="text-2xl font-bold text-foreground">
                ${(totalAmount - paidAmount).toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{language === 'ar' ? 'المراحل المالية' : 'Project Milestones'}</CardTitle>
              <CardDescription>
                {language === 'ar' ? 'قسّم المشروع إلى مراحل قابلة للتتبع' : 'Break down the project into trackable phases'}
              </CardDescription>
            </div>
            <Button onClick={addMilestone} size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'إضافة مرحلة' : 'Add Milestone'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="glass-card rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    {getStatusBadge(milestone.status)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMilestone(milestone.id)}
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`title-${milestone.id}`} className="text-sm mb-2 block">
                      {language === 'ar' ? 'عنوان المرحلة' : 'Milestone Title'}
                    </Label>
                    <Input
                      id={`title-${milestone.id}`}
                      value={milestone.title}
                      onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: المرحلة الأولى' : 'e.g. Phase 1'}
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`desc-${milestone.id}`} className="text-sm mb-2 block">
                      {language === 'ar' ? 'الوصف' : 'Description'}
                    </Label>
                    <Textarea
                      id={`desc-${milestone.id}`}
                      value={milestone.description}
                      onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                      placeholder={language === 'ar' ? 'وصف تفصيلي للمرحلة' : 'Detailed description of the milestone'}
                      className="bg-background/50"
                      rows={2}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`amount-${milestone.id}`} className="text-sm mb-2 block">
                        {language === 'ar' ? 'المبلغ (USD)' : 'Amount (USD)'}
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id={`amount-${milestone.id}`}
                          type="number"
                          value={milestone.amount}
                          onChange={(e) => updateMilestone(milestone.id, 'amount', parseFloat(e.target.value) || 0)}
                          className="pl-10 bg-background/50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`status-${milestone.id}`} className="text-sm mb-2 block">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </Label>
                      <select
                        id={`status-${milestone.id}`}
                        value={milestone.status}
                        onChange={(e) => updateMilestone(milestone.id, 'status', e.target.value)}
                        className="w-full h-10 rounded-md border border-border bg-background/50 px-3 text-sm"
                      >
                        <option value="pending">{language === 'ar' ? 'معلق' : 'Pending'}</option>
                        <option value="in-progress">{language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
                        <option value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
                        <option value="paid">{language === 'ar' ? 'مدفوع' : 'Paid'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <Button variant="outline" className="bg-transparent">
              {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {language === 'ar' ? 'إرسال العقد' : 'Send Contract'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
