import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, CreditCard, Sparkles, AlertCircle, Sparkle } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function PricingSection() {
  const { state, language } = useLanding();
  const visiblePlans = state.pricingPlans?.filter(plan => plan.visible) || [];
  const [toast, setToast] = useState<string | null>(null);

  const triggerPurchaseToast = (planName: string) => {
    const localizedMessage = translate('Redirecting to purchase portal for', language) + ` ${translate(planName, language)}...`;
    setToast(localizedMessage);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <section id="pricing" className="py-24 bg-[#f3f5fa] relative overflow-hidden">
      {/* Visual background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10" />

      {/* Floating custom premium Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#6C4CF5]/20 flex items-center justify-center">
              <Sparkle className="w-4 h-4 text-[#6C4CF5] animate-spin" />
            </div>
            <div className="text-xs font-bold font-sans tracking-wide">
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <motion.div 
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-[#6C4CF5] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6C4CF5]" />
            <span>{translate('Premium Prep Plans', language)}</span>
          </motion.div>
          
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            {translate('Choose your plan', language)}
          </h2>

          <p className="mt-4 text-slate-500 text-base leading-relaxed">
            {translate('Unlock complete study materials, unlimited MCQ practice, dynamic AI teachers, and precise analytical mock test centers.', language)}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {visiblePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              id={`plan-${plan.id}`}
              className={`group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border transition-all duration-300 flex flex-col justify-between relative scroll-mt-24 ${
                plan.isActive 
                  ? 'border-[#6C4CF5] ring-2 ring-[#6C4CF5]/10 shadow-[#6C4CF5]/5' 
                  : 'border-slate-100'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div>
                {/* Header Graphic / Image overlay */}
                <div className="h-40 w-full overflow-hidden relative bg-slate-100 flex items-center justify-center">
                  {plan.image ? (
                    <>
                      <img 
                        src={plan.image} 
                        alt={translate(plan.name, language)} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-slate-900/40" />
                      
                      {/* Overlay Title styled like image */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <span className="font-serif font-black text-white text-lg tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {translate(plan.name, language)}
                        </span>
                        <span className="text-[10px] text-yellow-300 font-extrabold uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">
                          {translate('PREPARATION PACKAGE', language)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-purple-100 to-indigo-100 flex items-center justify-center relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-md flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-[#6C4CF5]" />
                      </div>
                      <div className="absolute bottom-4 text-center">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{translate(plan.name, language)}</span>
                      </div>
                    </div>
                  )}

                  {/* Active Now / Recommended Badge */}
                  {plan.isActive && (
                    <span className="absolute top-4 left-4 text-[10px] bg-emerald-500 text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {translate('Active Now', language)}
                    </span>
                  )}
                </div>

                {/* Plan Price & Subtitle */}
                <div className="p-6 pb-0">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl font-serif font-black text-slate-900">{translate(plan.price, language)}</span>
                    {plan.period && (
                      <span className="text-xs text-slate-400 font-bold uppercase">/ {translate(plan.period, language)}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-6 min-h-[32px]">
                    {translate(plan.description, language)}
                  </p>
                  
                  <div className="border-t border-slate-100 my-4" />

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                        <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                          <Check className="w-3 h-3 text-[#6C4CF5] stroke-[3]" />
                        </div>
                        <span className="leading-tight">{translate(feat, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => triggerPurchaseToast(plan.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                    plan.isActive
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10'
                      : 'bg-[#6C4CF5] hover:bg-[#583ae0] text-white shadow-md shadow-[#6C4CF5]/20 hover:-translate-y-0.5'
                  }`}
                >
                  {plan.isActive ? translate('Access Active Course', language) : translate(plan.buttonText, language)}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Security / FAQ notice block */}
        <div className="mt-12 bg-white rounded-2xl p-4 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[900px] mx-auto shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              {translate('Have you already purchased a batch on our platform? Make sure you are logged in to access the study planners and unlimited smart exams instantly.', language)}
            </p>
          </div>
          <a href="#login" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors shrink-0">
            {translate('Log In Now', language)}
          </a>
        </div>

      </div>
    </section>
  );
}
