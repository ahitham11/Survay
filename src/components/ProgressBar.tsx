import React from 'react';
import { motion } from 'framer-motion';
import { Step } from '../types';
interface ProgressBarProps {
  currentStep: Step;
}
export function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps: {
    id: Step;
    label: string;
    shortLabel: string;
  }[] = [
  {
    id: 'landing',
    label: 'المقدمة',
    shortLabel: 'المقدمة'
  },
  {
    id: 'selector',
    label: 'اختيار الموظف',
    shortLabel: 'الاختيار'
  },
  {
    id: 'rating',
    label: 'التقييم الرقمي',
    shortLabel: 'التقييم'
  },
  {
    id: 'open',
    label: 'الأسئلة المفتوحة',
    shortLabel: 'المفتوحة'
  },
  {
    id: 'completion',
    label: 'النتيجة',
    shortLabel: 'النتيجة'
  }];

  const currentIndex = steps.findIndex((s) => s.id === currentStep);
  const progressPercentage = currentIndex / (steps.length - 1) * 100;
  if (currentStep === 'landing') return null;
  return (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-8 px-3 sm:px-4">
      <div className="flex justify-between mb-2 gap-1">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isPast = index < currentIndex;
          return (
            <div
              key={step.id}
              className={`
                text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-300 text-center
                ${isActive ? 'text-amber-500' : isPast ? 'text-slate-300' : 'text-slate-600'}
                ${index === 0 ? 'hidden' : 'block'}
              `}>
              
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.shortLabel}</span>
            </div>);

        })}
      </div>
      <div className="h-1.5 sm:h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-l from-amber-400 to-amber-600 rounded-full"
          initial={{
            width: 0
          }}
          animate={{
            width: `${progressPercentage}%`
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }} />
        
      </div>
    </div>);

}