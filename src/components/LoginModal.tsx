import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, Lock, User, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';

export default function LoginModal() {
  const { language } = useLanding();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  // Form states
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setMode('login');
        setIsOpen(true);
        setError('');
        setIsSuccess(false);
      } else if (hash === '#signup' || hash === '#get-started') {
        setMode('signup');
        setIsOpen(true);
        setError('');
        setIsSuccess(false);
      } else {
        setIsOpen(false);
      }
    };

    // Run once on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const close = () => {
    setIsOpen(false);
    // Clear hash without triggering scroll jump
    if (window.location.hash === '#login' || window.location.hash === '#signup' || window.location.hash === '#get-started') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      setError(language === 'bn' ? 'দয়া করে সবগুলো ঘর পূরণ করুন।' : 'Please fill in all fields.');
      return;
    }
    if (mode === 'signup' && !name) {
      setError(language === 'bn' ? 'দয়া করে আপনার নাম লিখুন।' : 'Please enter your name.');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate login / signup latency
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        close();
        // Clear input fields
        setName('');
        setEmailOrPhone('');
        setPassword('');
        setIsSuccess(false);
      }, 1800);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-[440px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10"
          >
            {/* Top decorative banner */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6C4CF5] via-[#8B5CF6] to-[#F59E0B]" />

            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content body */}
            <div className="p-6 sm:p-8 pt-8">
              {isSuccess ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5 border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {mode === 'login'
                      ? (language === 'bn' ? 'লগইন সফল হয়েছে!' : 'Login Successful!')
                      : (language === 'bn' ? 'রেজিস্ট্রেশন সফল হয়েছে!' : 'Registration Successful!')}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
                    {mode === 'login'
                      ? (language === 'bn' ? 'জ্ঞানপিওন অ্যাকাউন্টে আপনাকে স্বাগতম। আপনার লার্নিং প্যানেল প্রস্তুত হচ্ছে...' : 'Welcome back to GyanPeon. Loading your customized learning panel...')
                      : (language === 'bn' ? 'জ্ঞানপিওনে সফলভাবে আপনার ফ্রি অ্যাকাউন্ট তৈরি হয়েছে!' : 'Your free trial account has been created successfully!')}
                  </p>
                </motion.div>
              ) : (
                /* Normal Form State */
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#6C4CF5] fill-[#6C4CF5]/20 animate-pulse" />
                    <span className="text-[11px] font-bold text-[#6C4CF5] uppercase tracking-wider">
                      {language === 'bn' ? 'জ্ঞানপিওন ভর্তি প্রস্তুতি ২০২৬' : 'GyanPeon Admission Prep 2026'}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                    {mode === 'login'
                      ? (language === 'bn' ? 'অ্যাকাউন্টে লগইন করুন' : 'Log In to Account')
                      : (language === 'bn' ? 'ফ্রি অ্যাকাউন্ট খুলুন' : 'Create Free Account')}
                  </h2>

                  {/* Mode Toggles */}
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                    <button
                      onClick={() => { setMode('login'); setError(''); }}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                        mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {language === 'bn' ? 'লগইন করুন' : 'Log In'}
                    </button>
                    <button
                      onClick={() => { setMode('signup'); setError(''); }}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                        mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {language === 'bn' ? 'নিবন্ধন করুন' : 'Sign Up'}
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold">
                        {error}
                      </div>
                    )}

                    {/* Full Name field only for signup */}
                    {mode === 'signup' && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          {language === 'bn' ? 'আপনার নাম' : 'Your Name'}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={language === 'bn' ? 'যেমন: ন্যান্সি রহমান' : 'e.g. Nancy Rahman'}
                            className="w-full h-11 pl-10.5 pr-4 bg-slate-50 border border-slate-200 focus:border-[#6C4CF5] focus:bg-white rounded-xl text-sm font-medium transition-all outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email or Phone field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        {language === 'bn' ? 'মোবাইল নম্বর বা ইমেল' : 'Mobile Number or Email'}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          type="text"
                          value={emailOrPhone}
                          onChange={(e) => setEmailOrPhone(e.target.value)}
                          placeholder={language === 'bn' ? 'যেমন: ০১৭XXXXXXXX বা nancy@mail.com' : 'e.g. 017XXXXXXXX or nancy@mail.com'}
                          className="w-full h-11 pl-10.5 pr-4 bg-slate-50 border border-slate-200 focus:border-[#6C4CF5] focus:bg-white rounded-xl text-sm font-medium transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Password field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                        </label>
                        {mode === 'login' && (
                          <a
                            href="#forgot"
                            onClick={(e) => { e.preventDefault(); alert(language === 'bn' ? 'পাসওয়ার্ড পুনরুদ্ধারের লিঙ্ক পাঠানো হয়েছে!' : 'Password reset link sent!'); }}
                            className="text-xs font-bold text-[#6C4CF5] hover:underline"
                          >
                            {language === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot Password?'}
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-11 pl-10.5 pr-4 bg-slate-50 border border-slate-200 focus:border-[#6C4CF5] focus:bg-white rounded-xl text-sm font-medium transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 mt-6 rounded-xl bg-[#6C4CF5] hover:bg-[#583ae0] disabled:bg-purple-300 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#6C4CF5]/20 hover:shadow-xl hover:shadow-[#6C4CF5]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>
                            {mode === 'login'
                              ? (language === 'bn' ? 'লগইন করুন' : 'Log In Now')
                              : (language === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration')}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Switch Mode Footer Text */}
                  <div className="mt-6 text-center text-xs text-slate-500 font-semibold">
                    {mode === 'login' ? (
                      <p>
                        {language === 'bn' ? 'নতুন ইউজার?' : "Don't have an account?"}{' '}
                        <button
                          onClick={() => { setMode('signup'); setError(''); }}
                          className="text-[#6C4CF5] font-bold hover:underline cursor-pointer ml-1"
                        >
                          {language === 'bn' ? 'ফ্রি অ্যাকাউন্ট খুলুন' : 'Create Free Account'}
                        </button>
                      </p>
                    ) : (
                      <p>
                        {language === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
                        <button
                          onClick={() => { setMode('login'); setError(''); }}
                          className="text-[#6C4CF5] font-bold hover:underline cursor-pointer ml-1"
                        >
                          {language === 'bn' ? 'লগইন করুন' : 'Log In'}
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
