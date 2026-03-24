import React from 'react';
import { motion } from 'framer-motion';
interface RatingScaleProps {
  value?: number;
  onChange: (value: number) => void;
}
export function RatingScale({ value, onChange }: RatingScaleProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const getColorClasses = (num: number, isSelected: boolean) => {
    if (num <= 3) {
      return isSelected ?
      'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20' :
      'border-slate-600 text-slate-400 hover:border-red-400 hover:text-red-400 hover:bg-red-500/10';
    }
    if (num <= 5) {
      return isSelected ?
      'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' :
      'border-slate-600 text-slate-400 hover:border-orange-400 hover:text-orange-400 hover:bg-orange-500/10';
    }
    if (num <= 7) {
      return isSelected ?
      'bg-yellow-500 text-white border-yellow-500 shadow-lg shadow-yellow-500/20' :
      'border-slate-600 text-slate-400 hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-500/10';
    }
    return isSelected ?
    'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20' :
    'border-slate-600 text-slate-400 hover:border-green-400 hover:text-green-400 hover:bg-green-500/10';
  };
  return (
    <div className="w-full mt-3 sm:mt-4">
      <div className="flex justify-between items-center mb-2 sm:mb-3 px-1">
        <span className="text-[10px] sm:text-xs font-medium text-slate-500">
          ضعيف جداً
        </span>
        <span className="text-[10px] sm:text-xs font-medium text-slate-500">
          ممتاز
        </span>
      </div>
      <div className="flex justify-between items-center gap-[3px] sm:gap-1.5 md:gap-2">
        {numbers.map((num) => {
          const isSelected = value === num;
          return (
            <motion.button
              key={num}
              onClick={() => onChange(num)}
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.95
              }}
              className={`
                relative flex items-center justify-center 
                w-[28px] h-[28px] sm:w-9 sm:h-9 md:w-11 md:h-11 
                rounded-full border-[1.5px] sm:border-2 text-[11px] sm:text-sm md:text-base font-bold
                transition-colors duration-200
                ${getColorClasses(num, isSelected)}
              `}
              aria-label={`تقييم ${num} من 10`}
              aria-pressed={isSelected}>
              
              {num}
            </motion.button>);

        })}
      </div>
    </div>);

}