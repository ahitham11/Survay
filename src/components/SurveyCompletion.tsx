import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  UsersIcon,
  ShieldCheckIcon,
  FileDownIcon,
  LoaderIcon } from
'lucide-react';
import { Evaluation } from '../types';
import { PEOPLE } from '../data/surveyData';
import { generateSurveyPdf } from '../utils/generatePdf';
interface SurveyCompletionProps {
  evaluations: Record<number, Evaluation>;
  surveyorName: string;
  onBackToSelector: () => void;
}
export function SurveyCompletion({
  evaluations,
  surveyorName,
  onBackToSelector
}: SurveyCompletionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const completedCount = Object.values(evaluations).filter(
    (e) => e.isComplete
  ).length;
  const totalCount = PEOPLE.length;
  const allComplete = completedCount === totalCount;
  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    setPdfGenerated(false);
    try {
      await generateSurveyPdf(PEOPLE, evaluations, surveyorName);
      setPdfGenerated(true);
      setTimeout(() => setPdfGenerated(false), 3000);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <motion.div
      className="max-w-2xl mx-auto px-3 sm:px-4 py-10 sm:py-16 text-center"
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.5
      }}>
      
      <motion.div
        initial={{
          scale: 0
        }}
        animate={{
          scale: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay: 0.2
        }}
        className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
        
        <CheckCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
      </motion.div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
        {allComplete ? 'اكتمل التقييم بنجاح' : 'تم حفظ التقييم'}
      </h2>

      <p className="text-base sm:text-xl text-slate-400 mb-8 sm:mb-12 leading-relaxed px-2">
        شكراً لمشاركتك الفعالة{surveyorName ? ` يا ${surveyorName}` : ''}. رأيك
        يساهم في بناء بيئة عمل أكثر كفاءة وعدالة.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 shadow-xl">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
          <span className="text-xl sm:text-2xl font-bold text-white">
            معدل الإنجاز
          </span>
        </div>

        <div className="flex items-end justify-center gap-2 mb-4">
          <span className="text-4xl sm:text-5xl font-bold text-amber-500">
            {completedCount}
          </span>
          <span className="text-xl sm:text-2xl text-slate-500 mb-1">من</span>
          <span className="text-3xl sm:text-4xl font-bold text-slate-300">
            {totalCount}
          </span>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-2.5 sm:h-3 mb-4 overflow-hidden">
          <motion.div
            className="bg-gradient-to-l from-amber-400 to-amber-600 h-full rounded-full"
            initial={{
              width: 0
            }}
            animate={{
              width: `${completedCount / totalCount * 100}%`
            }}
            transition={{
              duration: 1,
              delay: 0.5
            }} />
          
        </div>

        {!allComplete &&
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
            يتبقى لديك {totalCount - completedCount} تقييمات لإكمال الاستبيان
            بالكامل.
          </p>
        }
      </div>

      {/* PDF Download Section */}
      {completedCount > 0 &&
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.6
        }}
        className="bg-slate-800/60 border border-slate-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8">
        
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <FileDownIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              تحميل التقرير
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-5">
            يمكنك تحميل نتائج التقييم كملف PDF لمشاركته أو حفظه كمرجع.
          </p>

          <motion.button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          whileHover={
          !isGenerating ?
          {
            scale: 1.02
          } :
          {}
          }
          whileTap={
          !isGenerating ?
          {
            scale: 0.98
          } :
          {}
          }
          className={`
              inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all w-full sm:w-auto
              ${pdfGenerated ? 'bg-green-600 text-white shadow-lg shadow-green-600/25' : isGenerating ? 'bg-slate-700 text-slate-400 cursor-wait' : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40'}
            `}>
          
            {isGenerating ?
          <>
                <LoaderIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                جاري إنشاء التقرير...
              </> :
          pdfGenerated ?
          <>
                <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                تم التحميل بنجاح
              </> :

          <>
                <FileDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                تحميل التقرير PDF
              </>
          }
          </motion.button>
        </motion.div>
      }

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        {!allComplete ?
        <motion.button
          onClick={onBackToSelector}
          whileHover={{
            scale: 1.02
          }}
          whileTap={{
            scale: 0.98
          }}
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors shadow-lg shadow-amber-500/25">
          
            متابعة التقييمات المتبقية
          </motion.button> :

        <div className="flex items-center gap-2 sm:gap-3 text-green-500 bg-green-500/10 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-green-500/20">
            <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">
              حمّل ملف الـ PDF وأرسله إلى السكرتارية
            </span>
          </div>
        }
      </div>
    </motion.div>);

}