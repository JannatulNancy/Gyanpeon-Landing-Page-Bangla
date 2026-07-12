import { motion } from 'motion/react';
import { 
  FileText, Timer, Zap, Database, Swords, Bot, Users, 
  MessageSquare, Trophy, BarChart3, Sparkles 
} from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function FeaturesSection() {
  const { state, language } = useLanding();
  const { featuresHeading, featuresList } = state;

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Timer': return <Timer className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Database': return <Database className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Swords': return <Swords className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Bot': return <Bot className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Users': return <Users className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
      default: return <Sparkles className="w-5 h-5 text-[#6C4CF5] group-hover:text-white" />;
    }
  };

  // Filter only visible cards
  const visibleFeatures = featuresList.filter(f => f.visible);

  return (
    <section id="features" className="py-24 bg-[#f3f5fa] relative overflow-hidden">
      
      {/* Decorative ambient background lights */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-[#6C4CF5] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{translate('EVERYTHING YOU NEED', language)}</span>
          </div>
          
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight whitespace-pre-line leading-tight">
            {translate(featuresHeading, language)}
          </h2>

          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {translate('Everything you need to learn, practice, compete, and improve all in one premium platform.', language)}
          </p>
        </div>

        {/* 10 Features Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleFeatures.map((feature, idx) => (
            <motion.div
              key={feature.id}
              className={`group bg-white rounded-[20px] p-7 border border-[#E3DFFA]/60 hover:border-[#6C4CF5]/30 shadow-sm hover:shadow-[0_20px_40px_rgba(108,76,245,0.08)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.08, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Subtle glass glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C4CF5]/0 via-[#6C4CF5]/0 to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 group-hover:bg-[#6C4CF5] transition-all duration-300 flex items-center justify-center border border-purple-100/50">
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {getFeatureIcon(feature.iconName)}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-lg text-slate-200 group-hover:text-purple-300/60 transition-colors select-none">
                    {feature.number}
                  </span>
                </div>

                <h3 className="font-bold text-[18px] text-[#111111] mb-2 group-hover:text-[#6C4CF5] transition-colors font-sans">
                  {translate(feature.title, language)}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {translate(feature.description, language)}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div className="w-8 h-1 bg-purple-100 group-hover:w-full group-hover:bg-[#6C4CF5] transition-all duration-300 rounded-full mt-6" />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
