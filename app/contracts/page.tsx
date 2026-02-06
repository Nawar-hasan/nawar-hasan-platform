'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ContractBuilder } from '@/components/contract-builder';
import { useLanguage } from '@/contexts/language-context';
import { FileText } from 'lucide-react';

export default function ContractsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen plasma-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {language === 'ar' ? 'إدارة العقود' : 'Contract Management'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'إنشاء وإدارة العقود والمراحل المالية'
                  : 'Create and manage contracts with milestone payments'
                }
              </p>
            </div>
          </div>
        </div>

        <ContractBuilder />
      </main>

      <Footer />
    </div>
  );
}
