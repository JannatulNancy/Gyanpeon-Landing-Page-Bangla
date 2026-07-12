import { motion } from 'motion/react';
import { Check, Sparkles, Bot, BarChart2, BookOpen, Trophy } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function WhyChooseSection() {
  const { state, language } = useLanding();
  const { whyChooseHeading, whyChooseDescription, whyChooseBullets } = state;

  return (
    <section id="why-choose" className="py-24 bg-[#f3f5fa] relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-[#6C4CF5] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{translate('WHY CHOOSE GYANPEON?', language)}</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight whitespace-pre-line leading-tight">
              {translate(whyChooseHeading, language)}
            </h2>

            <p className="mt-5 text-slate-500 text-base sm:text-lg leading-relaxed max-w-[560px]">
              {translate(whyChooseDescription, language)}
            </p>

            {/* Bullet Points */}
            <div className="mt-8 space-y-3.5">
              {whyChooseBullets.map((bullet, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E3DFFA]/50 hover:border-[#6C4CF5]/30 shadow-sm hover:shadow-md transition-all duration-300 group"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="w-7 h-7 rounded-full bg-[#6C4CF5] text-white flex items-center justify-center shadow-md shadow-[#6C4CF5]/20 shrink-0 group-hover:scale-105 transition-transform">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm sm:text-base group-hover:text-[#6C4CF5] transition-colors">
                    {translate(bullet, language)}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA action */}
            <div className="mt-10">
              <a 
                href="#get-started" 
                className="inline-flex items-center gap-2 font-bold text-sm text-white bg-[#111111] hover:bg-[#6C4CF5] px-8 py-4 rounded-2xl shadow-lg transition-all duration-200"
              >
                <span>{translate('Experience Gyanpeon Free', language)}</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>


          {/* Right Visual Graphic Column */}
          <motion.div 
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mx-auto max-w-[540px]">
              
              {/* Main Glowing Canvas Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C4CF5]/10 via-purple-300/10 to-indigo-300/5 rounded-[36px] blur-2xl transform rotate-3" />
              
              {/* Premium Dashboard UI Stack Mockup */}
              <div className="relative bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-purple-100/60 space-y-6">
                
                {/* Header widget */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#6C4CF5] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-lg shadow-md">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 text-[16px]">{translate('Daily Exam Battle', language)}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">{translate('Nationwide Admission League', language)}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-xs rounded-full border border-emerald-100 animate-pulse">
                    ● {translate('Live 3,420', language)}
                  </span>
                </div>

                {/* Performance progress graph simulation */}
                <div className="bg-[#FAF8FF] p-5 rounded-2xl border border-purple-100/50 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-[#6C4CF5]" />
                      {translate('Accuracy Progression', language)}
                    </span>
                    <span className="text-[#6C4CF5]">{translate('+24% This Month', language)}</span>
                  </div>
                  
                  {/* Mock bars */}
                  <div className="h-28 flex items-end justify-between gap-3 pt-4 px-2">
                    {[40, 55, 45, 70, 65, 85, 95].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <motion.div 
                          className="w-full bg-gradient-to-t from-[#6C4CF5] to-[#8B5CF6] rounded-t-lg shadow-xs"
                          style={{ height: `${val}%` }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.08 }}
                        />
                        <span className="text-[10px] font-bold text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Tutor Assistant preview card */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-xl flex items-start gap-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="w-9 h-9 rounded-xl bg-[#6C4CF5] flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-purple-300">{translate('AI Tutor Instant Solve', language)}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{translate('Just now', language)}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      "{translate("Here is the high-yield shortcut formula for Medical Botany cells. Let's practice 3 past year solutions!", language)}"
                    </p>
                  </div>
                </div>

                {/* Mini trust stats footer */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-xl border border-slate-100 flex items-center gap-3 bg-white">
                    <BookOpen className="w-5 h-5 text-[#6C4CF5]" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{translate('Resources', language)}</p>
                      <p className="text-sm font-extrabold text-slate-800">{translate('25,000+ Notes', language)}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100 flex items-center gap-3 bg-white">
                    <Trophy className="w-5 h-5 text-[#F59E0B]" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{translate('Model Tests', language)}</p>
                      <p className="text-sm font-extrabold text-slate-800">{translate('NCTB & Board', language)}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
