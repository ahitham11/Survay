import React, { useEffect, Children } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon, UserIcon } from 'lucide-react';
import { Person, Evaluation } from '../types';
import { RATING_QUESTIONS } from '../data/surveyData';
import { RatingScale } from './RatingScale';
interface RatingSectionProps {
  person: Person;
  evaluation: Evaluation;
  onUpdate: (questionId: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}
export function RatingSection({
  person,
  evaluation,
  onUpdate,
  onNext,
  onBack
}: RatingSectionProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [person.id]);
  const allAnswered = RATING_QUESTIONS.every(
    (q) => evaluation.ratings[q.id] !== undefined
  );
  const answeredCount = RATING_QUESTIONS.filter(
    (q) => evaluation.ratings[q.id] !== undefined
  ).length;
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return (
    <motion.div
      className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0,
        x: 20
      }}
      variants={containerVariants}>
      
      {/* Sticky Header */}
      <div className="bg-slate-800/95 border border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 sticky top-2 sm:top-4 z-10 shadow-xl shadow-black/40 backdrop-blur-md">
        <button
          onClick={onBack}
          className="p-1.5 sm:p-2 hover:bg-slate-700 rounded-lg sm:rounded-xl transition-colors text-slate-400 hover:text-white flex-shrink-0"
          aria-label="العودة">
          
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 flex-shrink-0">
          <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-xl font-bold text-white truncate">
            {person.name}
          </h2>
          <p className="text-amber-500 text-xs sm:text-sm">{person.role}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-700/50 px-3 py-1.5 rounded-full flex-shrink-0">
          <span className="text-amber-500 font-bold">{answeredCount}</span>
          <span>/</span>
          <span>{RATING_QUESTIONS.length}</span>
        </div>
      </div>

      <div className="mb-5 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">
          التقييم الرقمي
        </h3>
        <p className="text-slate-400 text-sm sm:text-base">
          يرجى تقييم كل بند من 1 إلى 10 بكل شفافية وموضوعية.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
        {RATING_QUESTIONS.map((question, index) =>
        <motion.div
          key={question.id}
          variants={itemVariants}
          className="bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/10">
          
            <div className="flex gap-3 sm:gap-4 mb-2 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <h4 className="text-sm sm:text-lg font-medium text-slate-200 mt-0.5 sm:mt-1 leading-relaxed">
                {question.text}
              </h4>
            </div>

            <RatingScale
            value={evaluation.ratings[question.id]}
            onChange={(val) => onUpdate(question.id, val)} />
          
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-700">
        <button
          onClick={onBack}
          className="px-4 sm:px-6 py-2.5 sm:py-3 text-slate-300 hover:text-white font-medium transition-colors text-sm sm:text-base text-center">
          
          تخطي أو العودة
        </button>

        <motion.button
          onClick={onNext}
          disabled={!allAnswered}
          whileHover={
          allAnswered ?
          {
            scale: 1.02
          } :
          {}
          }
          whileTap={
          allAnswered ?
          {
            scale: 0.98
          } :
          {}
          }
          className={`
            flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-lg transition-all
            ${allAnswered ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/25 hover:bg-amber-400' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
          `}>
          
          <span className="sm:hidden">التالي</span>
          <span className="hidden sm:inline">التالي: الأسئلة المفتوحة</span>
          <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>
    </motion.div>);

}