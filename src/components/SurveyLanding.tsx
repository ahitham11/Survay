import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import {
  LockIcon,
  ShieldCheckIcon,
  ClipboardListIcon,
  ChevronLeftIcon,
  UserCircleIcon } from
'lucide-react';
interface SurveyLandingProps {
  surveyorName: string;
  onNameChange: (name: string) => void;
  onStart: () => void;
}
export function SurveyLanding({
  surveyorName,
  onNameChange,
  onStart
}: SurveyLandingProps) {
  const [nameError, setNameError] = useState(false);
  const handleStart = () => {
    if (!surveyorName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    onStart();
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <motion.div
      className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0,
        y: -20
      }}>
      
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-2xl mb-4 sm:mb-6 border border-amber-500/20">
          <ClipboardListIcon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          رسالة استبيان إداري
          <span className="block text-lg sm:text-xl md:text-2xl text-amber-500 mt-2 font-medium">
            للعلم والتنفيذ
          </span>
        </h1>
        <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full mt-4 sm:mt-6"></div>
      </motion.div>

      {/* Surveyor Name Input */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-800 border border-amber-500/30 rounded-2xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-lg shadow-amber-500/5">
        
        <div className="flex items-center gap-3 mb-4">
          <UserCircleIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            بيانات المُقيّم
          </h2>
        </div>
        <p className="text-sm text-slate-400 mb-4">
          يرجى إدخال اسمك الكامل قبل البدء في الاستبيان. هذه البيانات سرية ولن
          تُستخدم إلا لأغراض التوثيق.
        </p>
        <div>
          <label
            htmlFor="surveyor-name"
            className="block text-sm font-medium text-slate-300 mb-2">
            
            الاسم الكامل <span className="text-red-400">*</span>
          </label>
          <input
            id="surveyor-name"
            type="text"
            value={surveyorName}
            onChange={(e) => {
              onNameChange(e.target.value);
              if (e.target.value.trim()) setNameError(false);
            }}
            placeholder="أدخل اسمك هنا..."
            dir="rtl"
            className={`
              w-full bg-slate-900/60 border rounded-xl px-4 py-3 sm:py-3.5 text-base sm:text-lg text-white placeholder-slate-500
              focus:outline-none focus:ring-2 transition-all
              ${nameError ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-amber-500 focus:ring-amber-500/30'}
            `} />
          
          {nameError &&
          <motion.p
            initial={{
              opacity: 0,
              y: -4
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-red-400 text-sm mt-2">
            
              يرجى إدخال اسمك قبل البدء في الاستبيان
            </motion.p>
          }
        </div>
      </motion.div>

      {/* Intro Text */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 backdrop-blur-sm">
        
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-center">
          السلام عليكم ورحمة الله وبركاته، تحية طيبة للجميع،
          <br />
          <br />
          في إطار حرص المجموعة على تطوير بيئة العمل، ورفع كفاءة الأداء الإداري
          والتنظيمي، وتحقيق أعلى معايير العدالة والاحترافية، تقرر طرح استبيان
          داخلي شامل لتقييم أداء المسؤولين والمدراء والجهات المحددة المرتبطة
          بسير العمل.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-8 sm:mb-12">
        {/* Objectives */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg shadow-black/20">
          
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
            أهداف الاستبيان
          </h2>
          <ul className="space-y-3 sm:space-y-4">
            {[
            'قياس مستوى الكفاءة الإدارية والقيادية بشكل دقيق وواقعي.',
            'تحديد نقاط القوة والعمل على تعزيزها وتطويرها.',
            'رصد التحديات والمعوقات التي قد تؤثر على بيئة العمل.',
            'كشف أي ممارسات سلبية محتملة أو سوء استخدام إداري.',
            'دعم اتخاذ قرارات تطويرية مبنية على بيانات واقعية.',
            'رصد أي حالات ابتزاز أو تحكم غير مهني داخل بيئة العمل.'].
            map((obj, i) =>
            <li
              key={i}
              className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
              
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 text-amber-500 flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{obj}</span>
              </li>
            )}
          </ul>
        </motion.div>

        {/* Rules & Confidentiality */}
        <motion.div variants={itemVariants} className="space-y-5 sm:space-y-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg shadow-black/20">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
              ضوابط المشاركة
            </h2>
            <ul className="space-y-3 sm:space-y-4">
              {[
              'يستخدم الاستبيان لأغراض التطوير والتحسين فقط.',
              'يجب الالتزام بالموضوعية والمصداقية في التقييم.',
              'يمنع استخدام الاستبيان لتصفية أي خلافات شخصية.',
              'المشاركة في الاستبيان إلزامية على جميع الموظفين دون استثناء.'].
              map((rule, i) =>
              <li
                key={i}
                className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                
                  <ShieldCheckIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Confidentiality Notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <LockIcon className="w-24 sm:w-32 h-24 sm:h-32 text-amber-500" />
            </div>
            <div className="relative z-10 flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-amber-500/20 rounded-xl flex-shrink-0">
                <LockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-amber-500 mb-1.5 sm:mb-2">
                  سرية تامة
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  جميع الردود سرية تماماً، ولن يتم الإفصاح عن هوية المشاركين تحت
                  أي ظرف. نضمن لك بيئة آمنة للتعبير عن رأيك بشفافية.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer & CTA */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="mb-6 sm:mb-8 text-slate-400">
          <p className="font-medium text-sm sm:text-base">مع خالص التقدير،</p>
          <p className="text-base sm:text-lg text-white mt-1">
            قسم السكرتارية الخاصة والتنفيذية
          </p>
          <p className="text-amber-500 text-sm sm:text-base">سعاد علي</p>
        </div>

        <motion.button
          onClick={handleStart}
          whileHover={{
            scale: 1.02
          }}
          whileTap={{
            scale: 0.98
          }}
          className={`
            inline-flex items-center justify-center gap-2 sm:gap-3 
            px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg 
            shadow-lg transition-all w-full sm:w-auto
            ${surveyorName.trim() ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-amber-500/25 hover:shadow-amber-500/40' : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-amber-500/25 hover:shadow-amber-500/40'}
          `}>
          
          ابدأ الاستبيان الآن
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </motion.div>
    </motion.div>);

}