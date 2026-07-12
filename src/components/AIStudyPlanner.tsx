import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Check, Brain, Loader2, Calendar, BookOpen, 
  Target, BarChart3, RotateCcw, HelpCircle, ArrowRight 
} from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

interface QuizData {
  targetExam: string;
  studyHours: number;
  confidence: string;
  weakSubject: string;
}

export default function AIStudyPlanner() {
  const { language } = useLanding();
  const [step, setStep] = useState<'intro' | 'quiz' | 'analyzing' | 'routine'>('intro');
  const [quiz, setQuiz] = useState<QuizData>({
    targetExam: 'Medical Admission',
    studyHours: 6,
    confidence: 'Intermediate (50-70% prepared)',
    weakSubject: 'Organic Chemistry / Physics'
  });
  
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Simulation of analysis loader
  useEffect(() => {
    if (step === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('routine'), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Tasks based on selected target exam
  const getTasksByExam = () => {
    switch (quiz.targetExam) {
      case 'Medical Admission':
        return [
          { id: 't1', title: translate('Biology: Solve 30 High-Yield Botany MCQ Shortcuts', language), type: 'practice' },
          { id: 't2', title: translate('Chemistry: Memorize Organic Compounds reactions sheet', language), type: 'note' },
          { id: 't3', title: translate('Daily Exam: Take Medical Biology chapter mock paper', language), type: 'exam' },
          { id: 't4', title: translate('GK & English: Review Bangladesh constitution dates', language), type: 'revision' }
        ];
      case 'BUET & Engineering':
        return [
          { id: 't1', title: translate('Physics: Solve 15 Circular Motion derivation questions', language), type: 'practice' },
          { id: 't2', title: translate('Mathematics: Review integration and area limits cards', language), type: 'note' },
          { id: 't3', title: translate('Daily Exam: Participate in BUET Physics prelim live arena', language), type: 'exam' },
          { id: 't4', title: translate('Chemistry: Revise kinetics rate calculation formulas', language), type: 'revision' }
        ];
      case 'Dhaka University (DU)':
        return [
          { id: 't1', title: translate('DU KA Unit: Complete past 10-year Math question bank', language), type: 'practice' },
          { id: 't2', title: translate('English: Revise subject-verb agreement DU core structures', language), type: 'note' },
          { id: 't3', title: translate('Daily Exam: Try DU mock paper under real timer limits', language), type: 'exam' },
          { id: 't4', title: translate('Physics: Solve electromagnetism conceptual shortcuts', language), type: 'revision' }
        ];
      case 'BCS Preliminary':
        return [
          { id: 't1', title: translate('BCS Preliminary: Complete 50 Bangladesh Affairs MCQs', language), type: 'practice' },
          { id: 't2', title: translate('Bengali Literature: Note down Nobel-era chronological guides', language), type: 'note' },
          { id: 't3', title: translate('Daily Exam: Attempt general science daily cadre mock test', language), type: 'exam' },
          { id: 't4', title: translate('Mental Ability: Solve 15 logic pattern & coding puzzles', language), type: 'revision' }
        ];
      default:
        return [
          { id: 't1', title: translate('Solve 20 chapter-wise foundation practice quizzes', language), type: 'practice' },
          { id: 't2', title: translate('Review core definitions and cheat sheets', language), type: 'note' },
          { id: 't3', title: translate('Take chapter review model test in battle arena', language), type: 'exam' },
          { id: 't4', title: translate('Review wrong answers with AI Tutor feedback', language), type: 'revision' }
        ];
    }
  };

  const tasks = getTasksByExam();
  const progressPercent = Math.round((completedTasks.length / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCompletedTasks([]);
    setStep('intro');
    setAnalysisProgress(0);
  };

  return (
    <section id="ai-planner" className="py-24 bg-[#f3f5fa]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Background Decorative */}
        <div className="bg-white rounded-[32px] border border-purple-100 shadow-xl overflow-hidden p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#6C4CF5]/5 to-transparent rounded-bl-full -z-10 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left side: Premium Title block */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6C4CF5]/10 text-[#6C4CF5] text-xs font-bold uppercase tracking-wider">
                <Brain className="w-4 h-4 text-[#6C4CF5]" />
                <span>{translate('AI STUDY PLANNER', language)}</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                {language === 'bn' ? (
                  <>কথা বলুন এআই <br />স্টাডি প্ল্যানারের সাথে</>
                ) : (
                  <>Talk to an AI <br />Study Planner</>
                )}
              </h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {translate('Not sure where to begin your admission prep? Let our AI Study Planner create a personalized study plan based on your target exam, available study time, strengths, and weak subjects.', language)}
              </p>

              {/* Progress Flow indicators */}
              <div className="hidden sm:block space-y-2.5 pt-4">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step !== 'intro' ? 'bg-[#6C4CF5] text-white border-transparent' : 'border-slate-200 text-slate-500'}`}>1</span>
                  <span className={step !== 'intro' ? 'text-slate-700' : ''}>{translate('Diagnostic Questionnaire', language)}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 'analyzing' || step === 'routine' ? 'bg-[#6C4CF5] text-white border-transparent' : 'border-slate-200 text-slate-500'}`}>2</span>
                  <span className={step === 'analyzing' || step === 'routine' ? 'text-slate-700' : ''}>{translate('AI Pattern Analysis', language)}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 'routine' ? 'bg-emerald-500 text-white border-transparent' : 'border-slate-200 text-slate-500'}`}>3</span>
                  <span className={step === 'routine' ? 'text-slate-700' : ''}>{translate('Personalized Study Routine', language)}</span>
                </div>
              </div>
            </div>

            {/* Right side: Interactive Container */}
            <div className="lg:col-span-7 bg-[#FAF8FF] border border-slate-100 rounded-[24px] p-6 sm:p-8 min-h-[440px] flex flex-col justify-between relative shadow-inner">
              
              <AnimatePresence mode="wait">
                {/* 1. INTRO STEP */}
                {step === 'intro' && (
                  <motion.div 
                    key="intro-panel"
                    className="flex flex-col justify-between h-full space-y-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <div className="space-y-4">
                      <div className="p-4 bg-white border border-purple-100/60 rounded-2xl flex items-start gap-3">
                        <span className="text-xl">📊</span>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{translate('Dynamic Adaptive Engine', language)}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            {translate('Analyzes your daily study hours and weak topics to balance conceptual review with mock exams.', language)}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-white border border-purple-100/60 rounded-2xl flex items-start gap-3">
                        <span className="text-xl">🛡️</span>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{translate('Continuous Calibration', language)}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            {translate('Tracks daily checklist completions and updates recommended high-yield questions dynamically.', language)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep('quiz')}
                      className="w-full bg-[#6C4CF5] hover:bg-[#583ae0] text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-[#6C4CF5]/10 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
                    >
                      <span>{translate('Create My Study Plan', language)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* 2. QUIZ QUESTIONS FORM STEP */}
                {step === 'quiz' && (
                  <motion.div
                    key="quiz-panel"
                    className="space-y-5"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5 border-b border-slate-200/50 pb-2.5">
                      <span>📝</span> {translate('Diagnostic Questionnaire', language)}
                    </h3>

                    <div className="space-y-4">
                      {/* Target Exam Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">{translate('1. What is your Target Exam?', language)}</label>
                        <select 
                          value={quiz.targetExam}
                          onChange={(e) => setQuiz({ ...quiz, targetExam: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20"
                        >
                          <option value="Medical Admission">{translate('Medical Admission', language)}</option>
                          <option value="BUET & Engineering">{translate('BUET & Engineering', language)}</option>
                          <option value="Dhaka University (DU)">{translate('Dhaka University (DU)', language)}</option>
                          <option value="BCS Preliminary">{translate('BCS Preliminary', language)}</option>
                        </select>
                      </div>

                      {/* Daily Study Hours */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">{translate('2. Daily study time budget', language)}</label>
                          <span className="text-xs font-extrabold text-[#6C4CF5] bg-purple-50 px-2 py-0.5 rounded-full">
                            {translate(`${quiz.studyHours} Hours/day`, language)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="14"
                          step="1"
                          value={quiz.studyHours}
                          onChange={(e) => setQuiz({ ...quiz, studyHours: parseInt(e.target.value) })}
                          className="w-full accent-[#6C4CF5]"
                        />
                      </div>

                      {/* Weak Topics */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">{translate('3. What is your weakest focus area?', language)}</label>
                        <input
                          type="text"
                          value={quiz.weakSubject}
                          onChange={(e) => setQuiz({ ...quiz, weakSubject: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 font-medium"
                          placeholder={translate('e.g. Organic Chem, Algebra, General Science', language)}
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button 
                        onClick={() => setStep('intro')}
                        className="px-4 py-3 border border-slate-200 rounded-xl text-slate-500 font-bold text-xs hover:bg-slate-100"
                      >
                        {translate('Back', language)}
                      </button>
                      <button
                        onClick={() => setStep('analyzing')}
                        className="flex-1 bg-[#6C4CF5] hover:bg-[#583ae0] text-white font-extrabold py-3 rounded-xl shadow-md text-xs flex items-center justify-center gap-1.5"
                      >
                        <span>{translate('Analyze & Generate Schedule', language)}</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. SIMULATED ANALYZING LOADER STEP */}
                {step === 'analyzing' && (
                  <motion.div
                    key="analyzing-panel"
                    className="flex flex-col items-center justify-center py-10 text-center space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="w-12 h-12 text-[#6C4CF5] animate-spin" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">{translate('Gyanpeon AI is Processing...', language)}</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">
                        {translate('Calculating target preparation weights, mapping subject-wise schedules, and querying past board archives...', language)}
                      </p>
                    </div>
                    
                    <div className="w-full max-w-xs bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#6C4CF5] to-[#8B5CF6] h-2 rounded-full transition-all duration-200" 
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#6C4CF5]">{translate(`${analysisProgress}% Complete`, language)}</span>
                  </motion.div>
                )}

                {/* 4. DYNAMIC STUDY ROUTINE DASHBOARD VIEW */}
                {step === 'routine' && (
                  <motion.div
                    key="routine-panel"
                    className="space-y-4"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header score card */}
                    <div className="bg-gradient-to-r from-purple-950 via-[#6C4CF5] to-[#8B5CF6] text-white p-4 rounded-2xl shadow flex items-center justify-between">
                      <div>
                        <span className="text-[10px] bg-white/20 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider block mb-0.5 w-max">{translate('Active Plan', language)}</span>
                        <h4 className="font-bold text-sm truncate">{translate(quiz.targetExam, language)} {translate('Routine', language)}</h4>
                        <p className="text-[10px] text-purple-100">
                          {translate('Optimized for', language)} {translate(`${quiz.studyHours} Hours/day`, language)} • {translate('Weak topic boost on:', language)} {translate(quiz.weakSubject, language)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono font-black text-xl leading-none text-emerald-400">{translate(`${progressPercent}%`, language)}</span>
                        <span className="text-[9px] font-bold text-white/80">{translate('Completed', language)}</span>
                      </div>
                    </div>

                    {/* Interactive Checklist */}
                    <div>
                      <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wide block mb-2">{translate("Today's Study Checklist", language)}</span>
                      
                      <div className="space-y-2">
                        {tasks.map(task => {
                          const isDone = completedTasks.includes(task.id);
                          return (
                            <div 
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                                isDone 
                                  ? 'bg-emerald-50/50 border-emerald-100 text-slate-400' 
                                  : 'bg-white border-slate-100 hover:border-[#6C4CF5]/20 text-slate-700'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                isDone ? 'bg-emerald-500 border-transparent text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-bold leading-tight ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                  {task.title}
                                </p>
                              </div>
                              <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                task.type === 'exam' ? 'bg-red-50 text-red-600 border border-red-100' :
                                task.type === 'practice' ? 'bg-indigo-50 text-[#6C4CF5] border border-indigo-100' :
                                'bg-amber-50 text-[#D97706] border border-amber-100'
                              }`}>
                                {translate(task.type, language)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Progress tracking feedback and resetting */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>{translate(`${completedTasks.length} of ${tasks.length} tasks marked done`, language)}</span>
                      <button 
                        onClick={handleReset}
                        className="flex items-center gap-1 hover:text-[#6C4CF5] font-bold text-[11px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{translate('Re-plan / Clear', language)}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
