import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanding, AdmissionUpdateCard } from '../context/LandingContext';
import { translate } from '../lib/translations';
import { 
  Calendar, 
  ExternalLink, 
  Download, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Timer, 
  Award,
  BellRing
} from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
  totalMs: number;
}

// Function to calculate time left
function calculateTimeLeftAt(target: Date | null, currentTime: Date): TimeLeft {
  if (!target) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true, totalMs: 0 };
  }
  const difference = target.getTime() - currentTime.getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true, totalMs: difference };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isOver: false,
    totalMs: difference
  };
}

// Segmented Countdown Clock Grid
function SegmentedTimerGrid({ timeLeft, colorTheme, language }: { timeLeft: TimeLeft; colorTheme: 'violet' | 'indigo' | 'emerald' | 'rose'; language: 'en' | 'bn' }) {
  const themeClasses = {
    violet: {
      bg: 'bg-[#6C4CF5]',
      text: 'text-[#6C4CF5]',
      border: 'border-violet-200/60 bg-violet-50/20',
      num: 'text-[#6C4CF5]',
      glow: 'shadow-violet-500/5'
    },
    indigo: {
      bg: 'bg-indigo-600',
      text: 'text-indigo-600',
      border: 'border-indigo-200/60 bg-indigo-50/20',
      num: 'text-indigo-700',
      glow: 'shadow-indigo-500/5'
    },
    emerald: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-600',
      border: 'border-emerald-200/60 bg-emerald-50/20',
      num: 'text-emerald-700',
      glow: 'shadow-emerald-500/5'
    },
    rose: {
      bg: 'bg-rose-500',
      text: 'text-rose-600',
      border: 'border-rose-200/60 bg-rose-50/20',
      num: 'text-rose-700',
      glow: 'shadow-rose-500/5'
    }
  }[colorTheme];

  return (
    <div className="grid grid-cols-4 gap-2 text-center font-mono">
      <div className={`bg-white border ${themeClasses.border} p-2 rounded-2xl shadow-sm ${themeClasses.glow} transition-all duration-300`}>
        <span className={`block font-black text-lg sm:text-xl ${themeClasses.num} leading-none tabular-nums`}>
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">{translate('Days', language)}</span>
      </div>
      <div className={`bg-white border ${themeClasses.border} p-2 rounded-2xl shadow-sm ${themeClasses.glow} transition-all duration-300`}>
        <span className={`block font-black text-lg sm:text-xl ${themeClasses.num} leading-none tabular-nums`}>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">{translate('Hours', language)}</span>
      </div>
      <div className={`bg-white border ${themeClasses.border} p-2 rounded-2xl shadow-sm ${themeClasses.glow} transition-all duration-300`}>
        <span className={`block font-black text-lg sm:text-xl ${themeClasses.num} leading-none tabular-nums`}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">{translate('Mins', language)}</span>
      </div>
      <div className={`bg-white border ${themeClasses.border} p-2 rounded-2xl shadow-sm ${themeClasses.glow} transition-all duration-300`}>
        <span className={`block font-black text-lg sm:text-xl ${themeClasses.text} leading-none tabular-nums animate-pulse`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">{translate('Secs', language)}</span>
      </div>
    </div>
  );
}

// Single Elegant Card displaying real-time dual trackers & visual timeline
const AdmissionTrackerCard: React.FC<{ card: AdmissionUpdateCard; idx: number }> = ({ card, idx }) => {
  const { language } = useLanding();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Safe Date parsing
  const examTarget = card.examDate ? new Date(card.examDate) : (card.countdownDate ? new Date(card.countdownDate) : null);
  const applyTarget = card.lastApplyDate ? new Date(card.lastApplyDate) : null;

  const isExamValid = examTarget && !isNaN(examTarget.getTime());
  const isApplyValid = applyTarget && !isNaN(applyTarget.getTime());

  // Real-time durations calculated instantly against dynamic ticks
  const applyTime = calculateTimeLeftAt(applyTarget, now);
  const examTime = calculateTimeLeftAt(examTarget, now);

  const isHighlight = card.isHighlighted;

  // Determine Lifecycle Stage
  // Stage 1: Registration is active/open (apply date is in the future)
  // Stage 2: Registration has passed, but exam date is upcoming (apply is closed, exam is future)
  // Stage 3: Exam has also concluded (exam date is in the past)
  let currentStage: 'apply_open' | 'exam_prep' | 'exam_ended' = 'apply_open';

  if (!isApplyValid || applyTime.isOver) {
    currentStage = 'exam_prep';
  }
  if (!isExamValid || examTime.isOver) {
    currentStage = 'exam_ended';
  }

  // Warning thresholds
  const isApplyUrgent = isApplyValid && !applyTime.isOver && applyTime.totalMs < 24 * 60 * 60 * 1000; // < 24 hours left to apply
  const isExamUrgent = isExamValid && !examTime.isOver && examTime.totalMs < 48 * 60 * 60 * 1000; // < 48 hours left to exam

  return (
    <motion.div
      className={`relative rounded-[26px] border p-6 flex flex-col justify-between transition-all duration-300 ${
        isHighlight 
          ? 'border-[#6C4CF5] bg-gradient-to-br from-violet-50/10 via-white to-indigo-50/15 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-400/20' 
          : 'border-slate-200 bg-gradient-to-br from-[#FAF9FF] to-[#F1EEFF]/70 shadow-sm hover:shadow-xl hover:border-[#6C4CF5]/40'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      {/* Top badges and meta */}
      <div className="flex justify-between items-start gap-2 mb-4.5">
        <div className="flex flex-wrap gap-1.5">
          {card.isPinned && (
            <span className="text-[10px] bg-[#6C4CF5]/10 text-[#6C4CF5] font-extrabold px-2.5 py-0.5 rounded-full border border-[#6C4CF5]/20 flex items-center gap-1 shadow-sm animate-pulse">
              📌 {translate('📌 PINNED', language)}
            </span>
          )}
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${
            isHighlight ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-[#EAE6FF] text-[#553ACF] border border-indigo-100'
          }`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighlight ? 'bg-indigo-500' : 'bg-indigo-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isHighlight ? 'bg-indigo-600' : 'bg-indigo-600'}`}></span>
            </span>
            {translate(card.statusText, language)}
          </span>
        </div>
        {isHighlight && (
          <span className="text-base bg-indigo-500/10 p-1 rounded-lg" title="Urgent Campaign Target">✨</span>
        )}
      </div>

      {/* Body Information */}
      <div className="flex-1 mb-5">
        <h3 className="font-serif font-extrabold text-2xl text-slate-900 mb-2.5 tracking-tight">
          {translate(card.examName, language)}
        </h3>

        {/* Dynamic Static Calendar Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4.5 font-sans text-xs">
          <div className="bg-white/90 border border-indigo-100/60 p-2.5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-[#6C4CF5]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-[9px] text-slate-400 font-black uppercase tracking-wide">{translate('Exam Date', language)}</span>
              <span className="font-bold text-slate-800">
                {isExamValid ? (
                  language === 'bn' 
                    ? `${examTarget.getDate()} ${translate(examTarget.toLocaleDateString('en-US', {month: 'short'}), language)}, ${examTarget.getFullYear()}`
                    : examTarget.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})
                ) : translate('To Be Declared', language)}
              </span>
            </div>
          </div>
          <div className="bg-white/90 border border-violet-100/60 p-2.5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-50 text-[#6C4CF5]">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-[9px] text-slate-400 font-black uppercase tracking-wide">{translate('Last Apply', language)}</span>
              <span className="font-bold text-slate-800">
                {isApplyValid ? (
                  language === 'bn' 
                    ? `${applyTarget.getDate()} ${translate(applyTarget.toLocaleDateString('en-US', {month: 'short'}), language)}, ${applyTarget.getFullYear()}`
                    : applyTarget.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})
                ) : translate('To Be Declared', language)}
              </span>
            </div>
          </div>
        </div>

        {/* Custom Visual Journey Timeline */}
        <div className="relative flex items-center justify-between mt-4 mb-5.5 px-2">
          {/* Timeline background track */}
          <div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[3px] bg-slate-200 rounded-full" />
          
          {/* Active segments filled in according to progress */}
          <div 
            className={`absolute left-1 top-1/2 -translate-y-1/2 h-[3px] rounded-full transition-all duration-700 ${
              currentStage === 'exam_ended' 
                ? 'w-[98%] bg-emerald-500' 
                : currentStage === 'exam_prep' 
                  ? 'w-[50%] bg-[#6C4CF5]' 
                  : 'w-[15%] bg-[#6C4CF5]'
            }`} 
          />

          {/* Step 1: Announcement (Always active) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-black shadow-sm transition-all duration-300 ${
              currentStage === 'apply_open'
                ? 'bg-[#6C4CF5] border-[#6C4CF5] text-white scale-110'
                : 'bg-emerald-500 border-emerald-400 text-white'
            }`}>
              {currentStage === 'apply_open' ? '📢' : '✓'}
            </div>
            <span className="text-[9px] font-black mt-1.5 text-slate-500 uppercase tracking-tight">{translate('Circular', language)}</span>
          </div>

          {/* Step 2: Apply Deadline */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-black shadow-sm transition-all duration-300 ${
              currentStage === 'apply_open'
                ? 'bg-white border-violet-400 text-[#6C4CF5]'
                : currentStage === 'exam_prep'
                  ? 'bg-[#6C4CF5] border-[#5c3ce0] text-white scale-110'
                  : 'bg-emerald-500 border-emerald-400 text-white'
            }`}>
              {currentStage === 'apply_open' ? '⏰' : '✓'}
            </div>
            <span className="text-[9px] font-black mt-1.5 text-slate-500 uppercase tracking-tight">{translate('Apply Closes', language)}</span>
          </div>

          {/* Step 3: Exam Day */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-black shadow-sm transition-all duration-300 ${
              currentStage === 'exam_ended'
                ? 'bg-emerald-500 border-emerald-400 text-white scale-110'
                : 'bg-white border-slate-300 text-slate-400'
            }`}>
              {currentStage === 'exam_ended' ? '🏁' : '📖'}
            </div>
            <span className="text-[9px] font-black mt-1.5 text-slate-500 uppercase tracking-tight">{translate('Exam Day', language)}</span>
          </div>
        </div>

        {/* Notice Board Ticker Row */}
        <div className="bg-gradient-to-r from-red-50 to-amber-50 p-3.5 rounded-2xl border border-red-100/60 text-[11px] text-slate-700 mb-5 font-sans leading-relaxed flex items-start gap-2.5 shadow-[0_4px_12px_rgba(239,68,68,0.03)] hover:border-red-200 transition-colors">
          <span className="shrink-0 bg-red-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-wider animate-pulse flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 animate-bounce" />
            {translate('UPDATE', language)}
          </span>
          <span className="font-semibold text-red-950 leading-relaxed">
            {translate(card.importantNotice, language)}
          </span>
        </div>

        {/* Real-time Dynamic Countdown Segment */}
        <div className="space-y-2">
          {currentStage === 'apply_open' && isApplyValid && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#6C4CF5] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 animate-spin-slow text-[#6C4CF5]" />
                  {translate('Time Left to Apply', language)}
                </span>
                {isApplyUrgent && (
                  <span className="text-[9px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full animate-bounce">
                    🚨 {translate('🚨 CLOSING SOON', language)}
                  </span>
                )}
              </div>
              <SegmentedTimerGrid timeLeft={applyTime} colorTheme="violet" language={language} />
              <div className="flex items-center gap-1.5 pt-1.5 text-[10px] text-slate-400 justify-center font-bold font-mono">
                <span>
                  • {translate('Exam Scheduled', language)}: {examTarget ? (language === 'bn' ? `${examTarget.getDate()} ${translate(examTarget.toLocaleDateString('en-US', {month: 'short'}), language)}` : examTarget.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})) : ''} ({language === 'bn' ? `${examTime.days}দিন ${examTime.hours}ঘণ্টা বাকি` : `${examTime.days}d ${examTime.hours}h left`})
                </span>
              </div>
            </>
          )}

          {currentStage === 'exam_prep' && isExamValid && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#6C4CF5] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 animate-spin-slow text-[#6C4CF5]" />
                  {translate('Countdown to Exam Day', language)}
                </span>
                {isExamUrgent && (
                  <span className="text-[9px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full animate-pulse">
                    ⚠️ {translate('⚠️ EXAM TOMORROW', language)}
                  </span>
                )}
              </div>
              <SegmentedTimerGrid timeLeft={examTime} colorTheme="indigo" language={language} />
              <div className="flex items-center gap-1 pt-1.5 text-[10px] text-indigo-600 justify-center font-extrabold">
                <AlertCircle className="w-3 h-3" />
                <span>{translate('Registration has closed. Preparation phase active.', language)}</span>
              </div>
            </>
          )}

          {currentStage === 'exam_ended' && (
            <div className="bg-emerald-50/60 border border-emerald-100 text-emerald-800 p-4 rounded-2xl text-center shadow-inner space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 font-extrabold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>{translate('EXAM CONCLUDED', language)}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                {translate('The official exam was held on {date}. Live answers, cut-off calculators, and results can be accessed below.', language).replace('{date}', examTarget ? (language === 'bn' ? `${examTarget.getDate()} ${translate(examTarget.toLocaleDateString('en-US', {month: 'long'}), language)}, ${examTarget.getFullYear()}` : examTarget.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})) : '')}
              </p>
            </div>
          )}

          {!isExamValid && !isApplyValid && (
            <div className="bg-slate-50 border border-slate-200 text-slate-600 p-4 rounded-2xl text-center space-y-1">
              <div className="font-extrabold text-xs">{translate('TBD (Dates to be announced)', language)}</div>
              <p className="text-[10px] text-slate-400 font-medium">
                {translate('The circular for this exam session has not been released yet. Pin this page or subscribe to newsletters to receive immediate updates.', language)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer operations */}
      <div className="pt-4.5 mt-auto border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <a 
          href={card.circularUrl}
          className="flex items-center gap-1.5 font-black text-slate-500 hover:text-[#6C4CF5] transition-colors py-1 px-2 rounded-lg hover:bg-slate-100/60"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{translate('Circular', language)}</span>
        </a>

        {currentStage !== 'exam_ended' ? (
          <a 
            href={card.applyUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-[#6C4CF5] hover:bg-[#5b3ee0] hover:shadow-lg hover:shadow-[#6C4CF5]/20 text-white font-black px-4.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer transform active:scale-95"
          >
            <span>{translate('Apply Now', language)}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <a 
            href="#pricing"
            className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 text-white font-black px-4.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{translate('Next Batch', language)}</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function AdmissionUpdatesSection() {
  const { state, language } = useLanding();
  const { admissionUpdatesTitle, admissionUpdatesSubtitle, admissionUpdatesList } = state;

  // Filter visible cards, and sort pinned ones first
  const displayCards = admissionUpdatesList
    .filter(c => c.visible)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  return (
    <section id="admission-updates" className="py-24 bg-gradient-to-b from-[#FAF8FF] to-[#f3f5fa] scroll-mt-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-[#6C4CF5] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-indigo-100">
            <BellRing className="w-3.5 h-3.5 text-[#6C4CF5] animate-bounce" />
            <span>{translate('LIVE EXAM TRACKER', language)}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#111111] tracking-tight">
            {translate(admissionUpdatesTitle, language)}
          </h2>
          <p className="mt-3 text-slate-500 font-medium text-[15px] sm:text-base leading-relaxed">
            {translate(admissionUpdatesSubtitle, language)}
          </p>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCards.map((card, idx) => (
            <AdmissionTrackerCard key={card.id} card={card} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
