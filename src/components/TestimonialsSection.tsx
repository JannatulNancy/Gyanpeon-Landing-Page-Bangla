import { motion } from 'motion/react';
import { Quote, Star, GraduationCap, Sparkles } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function TestimonialsSection() {
  const { state, language } = useLanding();
  const { testimonialsList } = state;

  // Filter only visible reviews
  const visibleTestimonials = testimonialsList.filter(t => t.visible);

  return (
    <section id="testimonials" className="py-24 bg-[#f3f5fa] relative overflow-hidden">
      
      {/* Ambient purple background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-[#6C4CF5] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{translate('STUDENT SUCCESS STORIES', language)}</span>
          </div>
          
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight">
            {translate('Loved by Students Across Bangladesh', language)}
          </h2>

          <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
            {translate('Hear what learners from School, SSC, HSC, Admission, and BCS have to say about their experience with GyanPeon.', language)}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between relative group hover:-translate-y-2 hover:shadow-xl hover:border-purple-200 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
            >
              {/* Quote icon accent */}
              <div className="absolute top-6 right-6 text-purple-100 group-hover:text-purple-200 transition-colors">
                <Quote className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-[15px] sm:text-base leading-[1.7] mb-8 font-medium italic">
                  "{translate(item.quote, language)}"
                </p>
              </div>

              {/* Student Profile Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FAF8FF] border border-purple-100 group-hover:border-[#6C4CF5] group-hover:bg-[#6C4CF5]/5 flex items-center justify-center text-[#6C4CF5] font-extrabold text-sm uppercase shrink-0 transition-all duration-300">
                  {item.name ? item.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'SP'}
                </div>
                <div>
                  <h4 className="font-bold text-[#111111] text-base group-hover:text-[#6C4CF5] transition-colors">
                    {translate(item.name, language)}
                  </h4>
                  <p className="text-xs font-bold text-[#6C4CF5] mt-0.5 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {translate(item.examCategory, language)}
                  </p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    {translate(item.institution, language)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FAF8FF] border border-purple-100 text-sm font-semibold text-slate-600 shadow-2xs">
            <span className="text-xl">🎓</span>
            <span>{translate('Over 4.9/5 Average Rating from 15,000+ verified student reviews nationwide.', language)}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
