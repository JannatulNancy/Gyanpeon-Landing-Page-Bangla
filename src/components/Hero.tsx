import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, Star, Shield, Flame } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function Hero() {
  const { state, language } = useLanding();
  const { heroBadge, heroHeadline, heroGradientText, heroSlogan, heroDescription, heroImage, heroCampaign } = state;

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-10 pb-16 overflow-hidden bg-hero-gradient">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6C4CF5]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editable Copy */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-start pt-4 lg:pt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            
            {/* Small Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-50 border border-indigo-100 text-[#6C4CF5] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6C4CF5] fill-[#6C4CF5]/20 animate-pulse" />
              <span>{translate(heroBadge, language)}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-[26px] sm:text-[44px] xl:text-[54px] leading-[1.3] sm:leading-[1.1] text-[#111111] tracking-tight whitespace-pre-line">
              {translate(heroHeadline, language)}
            </h1>

            {/* Highlight Text with Orange Underline */}
            <div className="mt-3 sm:mt-4 relative inline-block overflow-visible">
              <span className="font-serif font-semibold text-[22px] sm:text-[34px] xl:text-[42px] bg-gradient-to-r from-[#6C4CF5] via-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent leading-[1.4] sm:leading-[1.5] py-4 px-1.5 inline-block overflow-visible align-middle">
                {translate(heroGradientText, language)}
              </span>
              {/* Orange Underline SVG Stroke */}
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3 text-[#F59E0B]" 
                viewBox="0 0 240 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path 
                  d="M4 12C58.3333 4.66667 141.6 -3.6 236 10" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.7, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* Description */}
            <p className="mt-6 text-[#555] text-sm sm:text-base md:text-[17px] leading-[1.65] max-w-[500px]">
              {translate(heroDescription, language)}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <motion.a
                href="#get-started"
                className="h-[52px] sm:h-[54px] px-8 rounded-2xl bg-[#6C4CF5] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#6C4CF5]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{translate('Start Learning Free', language)}</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </motion.a>

              <motion.a
                href="#login"
                className="h-[52px] sm:h-[54px] px-8 rounded-2xl bg-white text-[#111111] border border-slate-200 font-bold text-base flex items-center justify-center gap-2 shadow-sm hover:bg-[#FAF8FF] hover:border-purple-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto text-center cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{translate('Log In', language)}</span>
              </motion.a>
            </div>

            {/* Quick Mini Trust Bar */}
            <div className="mt-10 pt-6 border-t border-slate-100 hidden sm:flex items-center gap-5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{translate('No Credit Card', language)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                <span>{translate('Admission Focus', language)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                <span>{translate('24/7 Support', language)}</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Floating Student Photo */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-4">
            
            {/* Soft Glow Ambient Backdrops */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-[#6C4CF5]/20 to-[#8B5CF6]/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl -z-10" />

            <div className="relative w-full max-w-[500px]">
              
              {/* Main Photo Card Container with bobbing/floating effect */}
              <motion.div 
                className="relative bg-white p-4 rounded-[28px] shadow-2xl border border-slate-100 overflow-hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Image representing academic/student focus */}
                <div className="relative h-[340px] sm:h-[400px] w-full rounded-[22px] overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt="University Admission Success"
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
