import { motion } from 'motion/react';
import { Users, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function StatsSection() {
  const { state, language } = useLanding();
  const { stats } = state;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      default: return <Sparkles className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
    }
  };

  const statItems = [
    { value: stats.studentsCount, label: 'Learning Students', iconName: 'Users' },
    { value: stats.questionsCount, label: 'Questions', iconName: 'CheckCircle2' },
    { value: stats.studyMaterialsCount, label: 'Study Materials', iconName: 'BookOpen' },
    { value: stats.aiTutorAvailability, label: 'AI Tutor Support', iconName: 'Sparkles' }
  ];

  return (
    <section className="py-16 bg-[#f3f5fa] border-y border-purple-100/50 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white/90 backdrop-blur-md p-6 rounded-[20px] shadow-[0_4px_20px_rgba(108,76,245,0.02)] border border-purple-100/60 text-center flex flex-col items-center justify-center group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <div className="w-11 h-11 rounded-xl bg-purple-50 group-hover:bg-[#6C4CF5] transition-colors duration-300 flex items-center justify-center mb-4">
                {getIcon(stat.iconName)}
              </div>
              
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-[#111111] via-[#6C4CF5] to-[#8B5CF6] bg-clip-text text-transparent mb-1 leading-tight">
                {translate(stat.value, language)}
              </h3>
              
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                {translate(stat.label, language)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
