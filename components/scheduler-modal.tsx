'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/language-context';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export function SchedulerModal({ isOpen, onClose, candidateName }: SchedulerModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '60',
    type: 'video',
    location: '',
    notes: ''
  });

  const handleSubmit = () => {
    // Mock scheduling
    console.log('Scheduling interview:', formData);
    alert(language === 'ar' 
      ? 'تم جدولة المقابلة بنجاح! سيتم إرسال دعوة إلى المرشح.'
      : 'Interview scheduled successfully! An invitation will be sent to the candidate.'
    );
    onClose();
  };

  const interviewTypes = [
    { value: 'video', label: { ar: 'مقابلة فيديو', en: 'Video Call' }, icon: Video },
    { value: 'phone', label: { ar: 'مكالمة هاتفية', en: 'Phone Call' }, icon: Clock },
    { value: 'onsite', label: { ar: 'في الموقع', en: 'On-site' }, icon: MapPin }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {language === 'ar' ? 'جدولة مقابلة' : 'Schedule Interview'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? `تحديد موعد مقابلة مع ${candidateName}`
              : `Set up an interview with ${candidateName}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Date */}
          <div>
            <Label htmlFor="date" className="text-sm mb-2 block">
              {language === 'ar' ? 'التاريخ' : 'Date'}
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-background/50"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time" className="text-sm mb-2 block">
                {language === 'ar' ? 'الوقت' : 'Time'}
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="duration" className="text-sm mb-2 block">
                {language === 'ar' ? 'المدة (دقائق)' : 'Duration (min)'}
              </Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Interview Type */}
          <div>
            <Label className="text-sm mb-3 block">
              {language === 'ar' ? 'نوع المقابلة' : 'Interview Type'}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {interviewTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-3 rounded-lg border transition-colors ${
                      formData.type === type.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border glass-card hover:border-primary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs">{type.label[language]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location (for onsite) */}
          {formData.type === 'onsite' && (
            <div>
              <Label htmlFor="location" className="text-sm mb-2 block">
                {language === 'ar' ? 'الموقع' : 'Location'}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={language === 'ar' ? 'عنوان المقابلة' : 'Interview address'}
                className="bg-background/50"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm mb-2 block">
              {language === 'ar' ? 'ملاحظات' : 'Notes'}
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={language === 'ar' ? 'ملاحظات إضافية للمرشح' : 'Additional notes for the candidate'}
              className="bg-background/50"
              rows={3}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="bg-transparent">
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {language === 'ar' ? 'تأكيد الجدولة' : 'Confirm Schedule'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
