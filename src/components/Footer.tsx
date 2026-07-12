import React, { useState } from 'react';
import { Send, CheckCircle2, Facebook, Youtube, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { translate } from '../lib/translations';
import ButterflyLogo from './ButterflyLogo';

export default function Footer() {
  const { state, language } = useLanding();
  const { footer } = state;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (!footer) return null;

  // Social icon mapper
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer id="about" className="bg-[#0F1117] text-[#A1A1AA] pt-24 pb-12 border-t border-white/[0.04] relative overflow-hidden">
      {/* Subtle ambient lighting inside dark footer */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#6C4CF5]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Left Column: Logo, Description, Download App (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C4CF5] to-[#8B5CF6] flex items-center justify-center text-white shadow-md">
                <ButterflyLogo className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                {language === 'bn' ? 'জ্ঞানপিয়ন' : (
                  footer.logoText.includes('Gyan') ? (
                    <>Gyan<span className="text-[#6C4CF5]">{footer.logoText.replace('Gyan', '')}</span></>
                  ) : (
                    footer.logoText
                  )
                )}
              </span>
            </a>

            <p className="text-[#A1A1AA] text-sm leading-relaxed pr-6 font-medium">
              {translate(footer.description, language)}
            </p>

            {/* Download App badges */}
            {(footer.storeLinks.showGooglePlay || footer.storeLinks.showAppStore) && (
              <div className="pt-2 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{translate('Download App', language)}</p>
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Google Play Button */}
                  {footer.storeLinks.showGooglePlay && (
                    <a 
                      href={footer.storeLinks.googlePlayUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-[50px] px-5 flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-white rounded-[14px] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      {/* Multicolor Google Play Triangle SVG */}
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.25 1.75c-.15.15-.25.39-.25.68v19.14c0 .29.1.53.25.68l.06.06L14.2 12.1v-.2L3.31 1.69l-.06.06z" fill="#4285F4"/>
                        <path d="M17.84 15.75l-3.64-3.65v-.2l3.64-3.65.08.05 4.3 2.45c1.23.7 1.23 1.85 0 2.55l-4.3 2.45-.08.0z" fill="#FBBC05"/>
                        <path d="M17.92 15.7-14.2 12l-9.52 9.53c.4.42 1.07.47 1.82.05l11.42-6.5" fill="#EA4335"/>
                        <path d="M17.92 8.3L6.5 1.8c-.75-.42-1.42-.37-1.82.05l9.52 9.53 3.72-3.7" fill="#34A853"/>
                      </svg>
                      <div className="text-left">
                        <p className="text-[9px] text-[#A1A1AA] uppercase font-bold tracking-wider leading-none">{translate('Get it on', language)}</p>
                        <p className="text-xs font-semibold leading-none mt-1">Google Play</p>
                      </div>
                    </a>
                  )}

                  {/* App Store Button */}
                  {footer.storeLinks.showAppStore && (
                    <a 
                      href={footer.storeLinks.appStoreUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-[50px] px-5 flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-white rounded-[14px] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      {/* Apple Logo SVG */}
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.08.08 2.15-.52 2.81-1.33z" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[9px] text-[#A1A1AA] uppercase font-bold tracking-wider leading-none">{translate('Download on the', language)}</p>
                        <p className="text-xs font-semibold leading-none mt-1">App Store</p>
                      </div>
                    </a>
                  )}

                </div>
              </div>
            )}
          </div>

          {/* Column 1: Admission Programs (2 Columns) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">{translate('Admission Programs', language)}</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footer.admissionPrograms
                .filter(link => link.visible)
                .map(link => (
                  <li key={link.id}>
                    <a href={link.url} className="hover:text-[#6C4CF5] transition-colors duration-200">
                      {translate(link.label, language)}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* Column 2: Platform (2 Columns) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">{translate('Platform', language)}</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footer.platformLinks
                .filter(link => link.visible)
                .map(link => (
                  <li key={link.id}>
                    <a href={link.url} className="hover:text-[#6C4CF5] transition-colors duration-200">
                      {translate(link.label, language)}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* Column 3: Company (2 Columns) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">{translate('Company', language)}</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footer.companyLinks
                .filter(link => link.visible)
                .map(link => (
                  <li key={link.id}>
                    <a href={link.url} className="hover:text-[#6C4CF5] transition-colors duration-200">
                      {translate(link.label, language)}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* Column 4: Stay Updated / Newsletter (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">{translate(footer.newsletterHeading, language)}</h4>
            <p className="text-xs leading-relaxed font-semibold text-slate-400">
              {translate(footer.newsletterDescription, language)}
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{translate('Subscribed successfully!', language)}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={translate(footer.newsletterPlaceholder, language)} 
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6C4CF5] focus:bg-white/[0.06] transition-all pr-10"
                    required
                  />
                  <button 
                    type="submit" 
                    aria-label="Subscribe" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  type="submit"
                  className="w-full py-2 px-4 bg-[#6C4CF5] hover:bg-[#583ae0] text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-md shadow-[#6C4CF5]/10"
                >
                  {translate(footer.newsletterButtonText, language)}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-semibold">
          <p>{translate(footer.copyrightText, language)}</p>
          
          {/* Social Media Links with outline style and consistent transition */}
          <div className="flex items-center gap-4">
            {footer.socialLinks
              .filter(link => link.visible)
              .map(link => (
                <a 
                  key={link.id} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white hover:border-[#6C4CF5]/40 hover:bg-[#6C4CF5]/10 hover:shadow-[0_0_15px_rgba(108,76,245,0.25)] hover:-translate-y-1 transition-all duration-300"
                  title={link.platform}
                >
                  {renderSocialIcon(link.platform)}
                </a>
              ))
            }
          </div>
        </div>

      </div>
    </footer>
  );
}
