import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function CTASection() {
  const { state, language } = useLanding();
  const { ctaTitle, ctaSubtitle } = state;

  return (
    <section id="get-started" className="py-20 bg-[#f3f5fa] relative">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="bg-gradient-to-r from-[#6C4CF5] via-[#7B58FF] to-[#8B5CF6] rounded-[28px] sm:rounded-[36px] p-8 sm:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-[#6C4CF5]/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative background circle grids */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-[720px] mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-sm border border-white/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{translate('START YOUR JOURNEY TODAY', language)}</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[54px] text-white tracking-tight leading-tight">
              {translate(ctaTitle, language)}
            </h2>

            <p className="text-purple-100 text-base sm:text-xl leading-relaxed max-w-[580px] mx-auto font-medium">
              {translate(ctaSubtitle, language)}
            </p>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <motion.a
                href="#signup"
                className="w-full sm:w-auto h-[56px] px-8 rounded-2xl bg-white text-[#6C4CF5] font-extrabold text-base flex items-center justify-center gap-2 shadow-xl hover:bg-purple-50 transition-all"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{translate('Create Free Account', language)}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="#login"
                className="w-full sm:w-auto h-[56px] px-8 rounded-2xl bg-transparent text-white border-2 border-white/40 hover:border-white font-bold text-base flex items-center justify-center gap-2 transition-all"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{translate('Login', language)}</span>
              </motion.a>
            </div>

            <p className="text-xs text-purple-200/80 pt-4 font-medium">
              {translate('✨ Free forever for basic chapter practice • No payment required', language)}
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
