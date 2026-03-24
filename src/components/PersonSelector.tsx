import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, CheckCircleIcon, ChevronLeftIcon } from 'lucide-react';
import { Person, Evaluation } from '../types';
interface PersonSelectorProps {
  people: Person[];
  evaluations: Record<number, Evaluation>;
  surveyorName: string;
  onSelect: (personId: number) => void;
}
export function PersonSelector({
  people,
  evaluations,
  surveyorName,
  onSelect
}: PersonSelectorProps) {
  const completedCount = Object.values(evaluations).filter(
    (e) => e.isComplete
  ).length;
  const totalCount = people.length;
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    }
  };
  return (
    <motion.div
      className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0,
        y: -20
      }}
      variants={containerVariants}>
      
      {/* Surveyor greeting */}
      {surveyorName &&
      <motion.div variants={cardVariants} className="text-center mb-4">
          <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-2 rounded-full text-sm font-medium">
            مرحباً، {surveyorName}
          </span>
        </motion.div>
      }

      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
          نطاق التقييم
        </h2>
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
          يرجى اختيار كل شخص من القائمة أدناه لإتمام تقييمه. يجب تقييم جميع
          المذكورين.
        </p>

        <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-800 border border-slate-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full">
          <span className="text-slate-300 text-sm sm:text-base">
            معدل الإنجاز:
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl font-bold text-amber-500">
              {completedCount}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-lg sm:text-xl font-medium text-slate-400">
              {totalCount}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {people.map((person) => {
          const isComplete = evaluations[person.id]?.isComplete;
          return (
            <motion.button
              key={person.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -4
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={() => onSelect(person.id)}
              className={`
                relative flex flex-col items-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border text-center transition-all duration-300
                ${isComplete ? 'bg-slate-800/80 border-green-500/30 hover:border-green-500/50' : 'bg-slate-800 border-slate-700 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10'}
              `}>
              
              {isComplete &&
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                  <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
              }

              <div
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4
                  ${isComplete ? 'bg-green-500/10 text-green-500' : 'bg-slate-700 text-slate-400'}
                `}>
                
                <UserIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5 sm:mb-1 leading-tight">
                {person.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-500 font-medium mb-3 sm:mb-4">
                {person.role}
              </p>

              <div
                className={`
                  w-full py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 transition-colors
                  ${isComplete ? 'bg-green-500/10 text-green-500' : 'bg-slate-700/50 text-slate-300'}
                `}>
                
                {isComplete ? 'تم التقييم' : 'ابدأ التقييم'}
                {!isComplete &&
                <ChevronLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                }
              </div>
            </motion.button>);

        })}
      </div>
    </motion.div>);

}