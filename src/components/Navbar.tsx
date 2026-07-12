import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, X, Sparkles, BookOpen, GraduationCap, 
  Award, Target, Briefcase, Bell, Clock, FileText, ArrowRight,
  Search, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';
import ButterflyLogo from './ButterflyLogo';

// Helper to calculate countdown time remaining
function useCountdownText(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!targetDate) return;
    
    const calculate = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft('Closed');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m left`);
      }
    };

    calculate();
    const interval = setInterval(calculate, 60000); // update every minute
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// Sub-component to render countdown inline elegantly
function CountdownBadge({ targetDate }: { targetDate: string }) {
  const text = useCountdownText(targetDate);
  const isClosed = text === 'Closed';
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
      isClosed ? 'bg-red-50 text-red-600' : 'bg-[#FAF8FF] text-[#6C4CF5] border border-purple-100'
    }`}>
      <Clock className="w-3 h-3 text-[#6C4CF5]" />
      {text}
    </span>
  );
}

export default function Navbar() {
  const { state, language, setLanguage } = useLanding();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'courses' | 'admission' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Spotlight Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery(''); // Reset query on close
    }
  }, [isSearchOpen]);

  // Command+K / Ctrl+K & Escape hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search filtering logic
  const query = searchQuery.trim().toLowerCase();

  const matchedCourses = query ? [
    ...state.coursesList.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query) ||
      (c.gradeBadge && c.gradeBadge.toLowerCase().includes(query))
    ).map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      badge: c.gradeBadge || 'Active',
      type: 'course',
      link: '#courses'
    })),
    ...(state.featuredPrograms || []).filter(f => 
      f.title.toLowerCase().includes(query) || 
      f.description.toLowerCase().includes(query)
    ).map(f => ({
      id: f.id,
      title: f.title,
      description: f.description,
      badge: 'Special Program',
      type: 'course',
      link: '#courses'
    }))
  ] : [];

  const matchedNotices = query ? [
    ...(state.admissionUpdatesList || []).filter(a => 
      a.examName.toLowerCase().includes(query) || 
      a.statusText.toLowerCase().includes(query) || 
      a.importantNotice.toLowerCase().includes(query)
    ).map(a => ({
      id: a.id,
      title: `${a.examName} Admission Notice`,
      description: a.importantNotice || a.statusText,
      badge: a.statusText,
      type: 'notice',
      link: '#admission-updates'
    })),
    ...(state.latestCirculars || []).filter(c => 
      c.title.toLowerCase().includes(query)
    ).map(c => ({
      id: c.id,
      title: c.title,
      description: `Published on ${c.date}`,
      badge: 'Circular',
      type: 'notice',
      link: '#admission-updates'
    })),
    ...(state.importantNotices || []).filter(n => 
      n.title.toLowerCase().includes(query) || 
      n.type.toLowerCase().includes(query)
    ).map(n => ({
      id: n.id,
      title: n.title,
      description: `Notice Date: ${n.date}`,
      badge: n.type.toUpperCase(),
      type: 'notice',
      link: '#admission-updates'
    }))
  ] : [];

  const matchedMaterials = query ? [
    ...(state.pricingPlans || []).filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.features.some(f => f.toLowerCase().includes(query))
    ).map(p => ({
      id: p.id,
      title: p.name,
      description: p.description || p.features.join(', '),
      badge: `${p.price}/${p.period}`,
      type: 'material',
      link: '#pricing'
    }))
  ] : [];

  const totalResults = matchedCourses.length + matchedNotices.length + matchedMaterials.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`z-50 transition-all duration-300 ${
      isScrolled 
        ? 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-gray-100 animate-fade-in' 
        : 'absolute top-0 left-0 right-0 bg-transparent py-4'
    }`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C4CF5] to-[#8B5CF6] flex items-center justify-center text-white shadow-md shadow-[#6C4CF5]/20 group-hover:scale-105 transition-transform duration-200">
              <ButterflyLogo className="w-6 h-6 text-white" />
            </div>
            <span className={`font-serif font-bold text-2xl tracking-tight transition-colors ${isScrolled ? 'text-[#111111]' : 'text-white'}`}>
              Gyan<span className={isScrolled ? 'text-[#6C4CF5]' : 'text-[#A78BFA]'}>peon</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            
            {/* 1. Plans Link */}
            <a 
              href="#pricing"
              className={`font-semibold text-[14px] lg:text-[15px] transition-colors py-2 cursor-pointer ${
                isScrolled ? 'text-gray-700 hover:text-[#6C4CF5]' : 'text-white/90 hover:text-white'
              }`}
            >
              {translate('Plans', language)}
            </a>

            {/* 2. Admission Info Link */}
            <a 
              href="#admission-updates"
              className={`font-semibold text-[14px] lg:text-[15px] transition-colors py-2 cursor-pointer ${
                isScrolled ? 'text-gray-700 hover:text-[#6C4CF5]' : 'text-white/90 hover:text-white'
              }`}
            >
              {translate('Admission Info', language)}
            </a>

            <a 
              href="#features" 
              className={`font-semibold text-[14px] lg:text-[15px] transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-[#6C4CF5]' : 'text-white/90 hover:text-white'
              }`}
            >
              {translate('Features', language)}
            </a>
          </nav>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language locked at BN */}

            {/* Spotlight Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-[14px] transition-all duration-200 text-xs font-semibold cursor-pointer ${
                isScrolled 
                  ? 'bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700' 
                  : 'bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 text-white/80 hover:text-white'
              }`}
              title="Search courses, notices, plans..."
            >
              <Search className={`w-4 h-4 ${isScrolled ? 'text-slate-400' : 'text-white/60'}`} />
              <span className="hidden lg:inline">{translate('Search...', language)}</span>
              <kbd className={`hidden lg:inline-flex h-4.5 select-none items-center gap-0.5 rounded border px-1.5 font-mono text-[9px] font-bold ${
                isScrolled 
                  ? 'border-slate-200 bg-white text-slate-400' 
                  : 'border-white/20 bg-white/5 text-white/40'
              }`}>
                <span>⌘</span>K
              </kbd>
            </button>

            <a 
              href="#login" 
              className={`font-bold text-sm px-4 py-2 rounded-[14px] transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-[#6C4CF5]' : 'text-white/90 hover:text-white'
              }`}
            >
              {translate('Log In', language)}
            </a>
            <a 
              href="#get-started" 
              className="font-bold text-sm text-white bg-[#6C4CF5] hover:bg-[#583ae0] px-5 py-2.5 rounded-[14px] shadow-lg shadow-[#6C4CF5]/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              {translate('Get Started', language)}
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button 
              className={`p-2 transition-colors cursor-pointer ${isScrolled ? 'text-gray-700 hover:text-[#6C4CF5]' : 'text-white hover:text-[#A78BFA]'}`}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search"
            >
              <Search className="w-5.5 h-5.5" />
            </button>
            <button 
              className={`p-2 transition-colors cursor-pointer ${isScrolled ? 'text-gray-700 hover:text-[#6C4CF5]' : 'text-white hover:text-[#A78BFA]'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-4 flex flex-col">
              <a 
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 font-bold text-sm hover:text-[#6C4CF5] py-2 border-b border-slate-50 block"
              >
                {translate('Plans', language)}
              </a>
              <a 
                href="#admission-updates"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 font-bold text-sm hover:text-[#6C4CF5] py-2 border-b border-slate-50 block"
              >
                {translate('Admission Info', language)}
              </a>
              <a 
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 font-bold text-sm hover:text-[#6C4CF5] py-2 border-b border-slate-50 block"
              >
                {translate('Features', language)}
              </a>

              {/* Language locked at BN */}

              <div className="flex gap-3 pt-2 pb-1">
                <a 
                  href="#login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-xl transition-all"
                >
                  {translate('Log In', language)}
                </a>
                <a 
                  href="#get-started" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center font-bold text-xs text-white bg-[#6C4CF5] hover:bg-[#583ae0] py-2.5 rounded-xl transition-all"
                >
                  {translate('Get Started', language)}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Modal Container */}
            <div className="flex min-h-full items-start justify-center p-4 pt-20 sm:pt-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col"
              >
                {/* Search Bar Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={translate("Search courses, admission notices, study materials...", language)}
                    className="w-full text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none border-none bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                    >
                      {language === 'bn' ? 'মুছুন' : 'Clear'}
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-400 shrink-0">
                    ESC
                  </kbd>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Results Area */}
                <div className="max-h-[380px] overflow-y-auto p-4 space-y-4">
                  {!searchQuery ? (
                    // Recommended Section
                    <div className="py-2">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">{translate("Popular Searches", language)}</h4>
                      <div className="flex flex-wrap gap-2 px-2">
                        {[
                          { label: 'Dhaka University (DU)', query: 'DU' },
                          { label: 'Medical Admission', query: 'Medical' },
                          { label: 'HSC Complete Prep', query: 'HSC' },
                          { label: 'Study Plans & Pricing', query: 'Plan' },
                          { label: 'BUET & Engineering', query: 'BUET' },
                          { label: 'BCS Mastery', query: 'BCS' },
                        ].map((rec, i) => (
                          <button
                            key={i}
                            onClick={() => setSearchQuery(rec.query)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FAF8FF] hover:bg-[#6C4CF5]/10 text-slate-700 hover:text-[#6C4CF5] text-xs font-semibold rounded-xl border border-slate-100 hover:border-[#6C4CF5]/20 transition-all cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                            <span>{translate(rec.label, language)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : totalResults > 0 ? (
                    <div className="space-y-4">
                      {/* 1. Courses Section */}
                      {matchedCourses.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-black text-[#6C4CF5] uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
                            <span>{translate("Courses & Programs", language)}</span>
                            <span className="bg-[#FAF8FF] px-2 py-0.5 rounded-full text-[9px] border border-purple-50">{matchedCourses.length}</span>
                          </h4>
                          <div className="space-y-1">
                            {matchedCourses.map((item) => (
                              <a
                                key={item.id}
                                href={item.link}
                                onClick={() => setIsSearchOpen(false)}
                                className="group flex items-start gap-3 p-2.5 rounded-2xl hover:bg-[#FAF8FF] transition-all border border-transparent hover:border-purple-100"
                              >
                                <div className="w-8 h-8 rounded-xl bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center text-[#6C4CF5] shrink-0 font-bold text-sm">
                                  📘
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#6C4CF5] transition-colors truncate">{item.title}</span>
                                    <span className="text-[9px] font-bold text-[#6C4CF5] bg-[#FAF8FF] px-2 py-0.5 rounded-full border border-purple-50 shrink-0">{item.badge}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Notices Section */}
                      {matchedNotices.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
                            <span>{translate("Admission Notices & Circulars", language)}</span>
                            <span className="bg-amber-50 px-2 py-0.5 rounded-full text-[9px] border border-amber-50">{matchedNotices.length}</span>
                          </h4>
                          <div className="space-y-1">
                            {matchedNotices.map((item) => (
                              <a
                                key={item.id}
                                href={item.link}
                                onClick={() => setIsSearchOpen(false)}
                                className="group flex items-start gap-3 p-2.5 rounded-2xl hover:bg-amber-50/40 transition-all border border-transparent hover:border-amber-100"
                              >
                                <div className="w-8 h-8 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 font-bold text-sm">
                                  📢
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors truncate">{item.title}</span>
                                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-50 shrink-0 uppercase">{item.badge}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Study Materials Section */}
                      {matchedMaterials.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
                            <span>{translate("Study Materials & Plans", language)}</span>
                            <span className="bg-emerald-50 px-2 py-0.5 rounded-full text-[9px] border border-emerald-50">{matchedMaterials.length}</span>
                          </h4>
                          <div className="space-y-1">
                            {matchedMaterials.map((item) => (
                              <a
                                key={item.id}
                                href={item.link}
                                onClick={() => setIsSearchOpen(false)}
                                className="group flex items-start gap-3 p-2.5 rounded-2xl hover:bg-emerald-50/40 transition-all border border-transparent hover:border-emerald-100"
                              >
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 font-bold text-sm">
                                  🎓
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">{item.title}</span>
                                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-50 shrink-0">{item.badge}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-10 px-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-3 border border-slate-100">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-slate-800 text-sm">
                        {translate('No results found for "{searchQuery}"', language).replace('{searchQuery}', searchQuery)}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        {translate('Try searching for other keywords like "Medical", "DU", "Revision", or "HSC".', language)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer hints */}
                <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-slate-200 bg-white px-1 py-0.2 text-[9px] font-bold">↑↓</kbd>
                      {translate("Navigate", language)}
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-slate-200 bg-white px-1 py-0.2 text-[9px] font-bold">Enter</kbd>
                      {translate("Select", language)}
                    </span>
                  </div>
                  <span>Gyanpeon Spotlight Search v1.0</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
