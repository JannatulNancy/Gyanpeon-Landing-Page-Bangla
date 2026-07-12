import React, { useState } from 'react';
import { useLanding, HeroCampaign, FeaturedProgram, AdmissionUpdateCard, TestimonialItem } from '../context/LandingContext';
import { 
  X, Settings, RotateCcw, Save, Sparkles, LayoutGrid, 
  BookOpen, Clock, Megaphone, HelpCircle, Eye, EyeOff, Plus, Trash2, ArrowUpDown,
  Lock, Unlock, ShieldAlert, Key
} from 'lucide-react';

export default function AdminPanel() {
  const { state, updateState, resetToDefaults } = useLanding();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'campaigns' | 'updates' | 'courses' | 'features' | 'testimonials' | 'video-slider' | 'pricing' | 'footer'>('hero');

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('gyanpeon_admin_auth') === 'true';
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Local input states for adding elements dynamically
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeType, setNewNoticeType] = useState<'new' | 'announcement' | 'update' | 'seat-plan'>('new');
  
  const [newCircularTitle, setNewCircularTitle] = useState('');
  
  const [newUpdateName, setNewUpdateName] = useState('');
  const [newUpdateStatus, setNewUpdateStatus] = useState('Application Closing Soon');
  const [newUpdateCountdown, setNewUpdateCountdown] = useState('');

  // Local states for footer additions
  const [newApLabel, setNewApLabel] = useState('');
  const [newApUrl, setNewApUrl] = useState('#courses');
  const [newPlLabel, setNewPlLabel] = useState('');
  const [newPlUrl, setNewPlUrl] = useState('#');
  const [newClLabel, setNewClLabel] = useState('');
  const [newClUrl, setNewClUrl] = useState('#');

  // Footer helper functions
  const updateFooterField = (field: string, value: any) => {
    updateState(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        [field]: value
      }
    }));
  };

  const updateFooterStoreLink = (field: string, value: any) => {
    updateState(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        storeLinks: {
          ...prev.footer.storeLinks,
          [field]: value
        }
      }
    }));
  };

  const updateFooterListItem = (
    listName: 'admissionPrograms' | 'platformLinks' | 'companyLinks' | 'socialLinks',
    id: string,
    updates: any
  ) => {
    updateState(prev => {
      const list = prev.footer[listName] as any[];
      const updatedList = list.map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      });
      return {
        ...prev,
        footer: {
          ...prev.footer,
          [listName]: updatedList
        }
      };
    });
  };

  const deleteFooterListItem = (
    listName: 'admissionPrograms' | 'platformLinks' | 'companyLinks' | 'socialLinks',
    id: string
  ) => {
    updateState(prev => {
      const updatedList = (prev.footer[listName] as any[]).filter(item => item.id !== id);
      return {
        ...prev,
        footer: {
          ...prev.footer,
          [listName]: updatedList
        }
      };
    });
  };

  const addFooterListItem = (
    listName: 'admissionPrograms' | 'platformLinks' | 'companyLinks',
    label: string,
    url: string
  ) => {
    if (!label.trim()) return;
    const newItem = {
      id: `${listName}-${Date.now()}`,
      label,
      url: url || '#',
      visible: true
    };
    updateState(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        [listName]: [...prev.footer[listName], newItem]
      }
    }));
  };

  const moveFooterListItem = (
    listName: 'admissionPrograms' | 'platformLinks' | 'companyLinks',
    index: number,
    direction: 'up' | 'down'
  ) => {
    updateState(prev => {
      const list = [...prev.footer[listName]];
      if (direction === 'up' && index > 0) {
        const temp = list[index];
        list[index] = list[index - 1];
        list[index - 1] = temp;
      } else if (direction === 'down' && index < list.length - 1) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
      }
      return {
        ...prev,
        footer: {
          ...prev.footer,
          [listName]: list
        }
      };
    });
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'admin' || pinInput.trim() === 'admin2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('gyanpeon_admin_auth', 'true');
      setShowAuthModal(false);
      setIsOpen(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect Access Key. Please try again!');
    }
  };

  if (!isOpen) {
    return (
      <>
        {/* Floating Open Button */}
        <button
          id="admin-open-btn"
          onClick={() => {
            if (isAuthenticated) {
              setIsOpen(true);
            } else {
              setShowAuthModal(true);
              setPinError('');
              setPinInput('');
            }
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-[#6C4CF5] to-[#8B5CF6] text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 font-medium group"
        >
          <Settings className="w-5 h-5 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
          <span>Open Admin Panel</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
        </button>

        {/* Security Authentication Gate Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-[24px] border border-slate-100 shadow-2xl overflow-hidden p-8 relative animate-scale-up">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center space-y-4 mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-[#6C4CF5] rounded-2xl flex items-center justify-center border border-indigo-100 shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">Restricted Access</h3>
                  <p className="text-xs text-slate-500 max-w-xs mt-1">
                    This control panel is strictly for platform administrators only. Students cannot edit content.
                  </p>
                </div>
              </div>

              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mb-1.5">
                    Enter Admin Access Key
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] font-mono"
                      autoFocus
                    />
                  </div>
                </div>

                {pinError && (
                  <div className="flex items-center gap-1.5 p-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100 animate-shake">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 font-bold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#6C4CF5] to-[#8B5CF6] text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-[#6C4CF5]/10 hover:shadow-xl transition-all"
                  >
                    Verify Access
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Access Code hint: <span className="font-mono lowercase select-all text-[#6C4CF5] font-extrabold">admin</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Handle standard input updates
  const handleTextChange = (field: keyof typeof state, value: any) => {
    updateState({ [field]: value });
  };

  // Helper to update specific object in a state list
  const updateListItem = (
    listName: 'featuredPrograms' | 'coursesList' | 'admissionUpdatesList' | 'featuresList' | 'testimonialsList' | 'videoSlides' | 'pricingPlans',
    id: string,
    updates: any
  ) => {
    updateState(prev => {
      const list = prev[listName] as any[];
      const updatedList = list.map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      });
      return { ...prev, [listName]: updatedList };
    });
  };

  // Helper to remove an item from lists
  const deleteListItem = (
    listName: 'featuredPrograms' | 'admissionUpdatesList' | 'testimonialsList' | 'latestCirculars' | 'importantNotices' | 'videoSlides' | 'pricingPlans',
    id: string
  ) => {
    updateState(prev => {
      const updatedList = (prev[listName] as any[]).filter((item: any) => item.id !== id);
      return { ...prev, [listName]: updatedList };
    });
  };

  // Helper to add a new notice
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    const newNotice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle,
      type: newNoticeType,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    updateState(prev => ({
      ...prev,
      importantNotices: [newNotice, ...prev.importantNotices]
    }));
    setNewNoticeTitle('');
  };

  // Helper to add a new circular
  const handleAddCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCircularTitle.trim()) return;
    const newCircular = {
      id: `circ-${Date.now()}`,
      title: newCircularTitle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      downloadUrl: '#'
    };
    updateState(prev => ({
      ...prev,
      latestCirculars: [newCircular, ...prev.latestCirculars]
    }));
    setNewCircularTitle('');
  };

  // Helper to add an Admission Update card
  const handleAddAdmissionUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateName.trim()) return;
    const daysInFuture = 20; // Default countdown value
    const targetDate = new Date(Date.now() + daysInFuture * 24 * 60 * 60 * 1000).toISOString();
    const newUpdate: AdmissionUpdateCard = {
      id: `up-${Date.now()}`,
      examName: newUpdateName,
      statusText: newUpdateStatus,
      countdownDate: newUpdateCountdown ? new Date(newUpdateCountdown).toISOString() : targetDate,
      examDate: newUpdateCountdown ? new Date(newUpdateCountdown).toISOString() : targetDate,
      lastApplyDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now default
      applyUrl: '#',
      circularUrl: '#',
      importantNotice: 'Admission instructions live on university domain.',
      isPinned: false,
      isHighlighted: false,
      visible: true
    };
    updateState(prev => ({
      ...prev,
      admissionUpdatesList: [...prev.admissionUpdatesList, newUpdate]
    }));
    setNewUpdateName('');
    setNewUpdateCountdown('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
      {/* Sidebar container */}
      <div className="w-full max-w-2xl bg-white h-screen shadow-2xl flex flex-col animate-slide-left overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6C4CF5] to-[#8B5CF6] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 animate-spin-slow" />
            <div>
              <h2 className="font-serif text-xl font-bold">Marketing Control Panel</h2>
              <p className="text-xs text-white/80 font-sans">Update Gyanpeon seasonal campaigns instantly</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation vertical tabs */}
          <div className="w-44 bg-slate-50 border-r border-slate-100 p-2 flex flex-col gap-1 text-sm font-sans">
            <button
              onClick={() => setActiveTab('hero')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'hero' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Hero Content
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'campaigns' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Hero Campaign
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'updates' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Admission Updates
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'courses' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Courses List
            </button>
            <button
              onClick={() => setActiveTab('video-slider')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'video-slider' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Video Streams
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'pricing' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Pricing Packages
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'features' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Features & Stats
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'testimonials' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Testimonials
            </button>
            <button
              onClick={() => setActiveTab('footer')}
              className={`p-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'footer' ? 'bg-white text-[#6C4CF5] font-semibold shadow-sm border-l-4 border-[#6C4CF5]' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Footer Settings
            </button>

            <div className="mt-auto pt-4 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={resetToDefaults}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>
          </div>

          {/* Tab content wrapper */}
          <div className="flex-1 p-6 overflow-y-auto font-sans text-sm">
            {/* TAB 1: HERO */}
            {activeTab === 'hero' && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Hero Layout Headline & Badges</h3>
                  <p className="text-xs text-slate-500">Edit the primary introductory text of the home page</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Top Mini-Badge</label>
                  <input
                    type="text"
                    value={state.heroBadge}
                    onChange={(e) => handleTextChange('heroBadge', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Main Title Line (Double-line text)</label>
                  <textarea
                    rows={2}
                    value={state.heroHeadline}
                    onChange={(e) => handleTextChange('heroHeadline', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] font-serif"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Gradient Accent Heading (Ace Every Exam.)</label>
                  <input
                    type="text"
                    value={state.heroGradientText}
                    onChange={(e) => handleTextChange('heroGradientText', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] font-serif font-bold text-[#6C4CF5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Slogan Line (Learn. Practice...)</label>
                  <input
                    type="text"
                    value={state.heroSlogan}
                    onChange={(e) => handleTextChange('heroSlogan', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">General Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={state.heroDescription}
                    onChange={(e) => handleTextChange('heroDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Floating Hero Image (URL)</label>
                  <input
                    type="text"
                    value={state.heroImage}
                    onChange={(e) => handleTextChange('heroImage', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] text-xs font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Provide any valid Unsplash or hosted image URL to customize the floating student illustration</p>
                </div>
              </div>
            )}

            {/* TAB 2: HERO CAMPAIGN BANNER */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-800">Dynamic Season Campaigns</h3>
                      <p className="text-xs text-slate-500">Edit the large interactive campaign display to match the admission season</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={state.heroCampaign.visible} 
                        onChange={(e) => updateState({ heroCampaign: { ...state.heroCampaign, visible: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#6C4CF5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C4CF5]"></div>
                      <span className="ml-2 text-xs font-semibold text-slate-600 uppercase">Visible</span>
                    </label>
                  </div>
                </div>

                <div className="bg-[#FAF8FF] border border-slate-100 rounded-xl p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Campaign Badge Text</label>
                    <input
                      type="text"
                      value={state.heroCampaign.badge}
                      onChange={(e) => updateState({ heroCampaign: { ...state.heroCampaign, badge: e.target.value } })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Campaign Title</label>
                    <input
                      type="text"
                      value={state.heroCampaign.title}
                      onChange={(e) => updateState({ heroCampaign: { ...state.heroCampaign, title: e.target.value } })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Campaign Short Subtitle</label>
                    <textarea
                      rows={2}
                      value={state.heroCampaign.subtitle}
                      onChange={(e) => updateState({ heroCampaign: { ...state.heroCampaign, subtitle: e.target.value } })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Call-To-Action (CTA) Button Text</label>
                    <input
                      type="text"
                      value={state.heroCampaign.ctaText}
                      onChange={(e) => updateState({ heroCampaign: { ...state.heroCampaign, ctaText: e.target.value } })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Campaign Cover Image URL</label>
                    <input
                      type="text"
                      value={state.heroCampaign.image}
                      onChange={(e) => updateState({ heroCampaign: { ...state.heroCampaign, image: e.target.value } })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 focus:border-[#6C4CF5] text-xs font-mono"
                    />
                    <div className="flex gap-2 mt-2">
                      <button 
                        type="button" 
                        onClick={() => updateState({ heroCampaign: { ...state.heroCampaign, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80' } })}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[10px] text-slate-600"
                      >
                        Medical Template
                      </button>
                      <button 
                        type="button" 
                        onClick={() => updateState({ heroCampaign: { ...state.heroCampaign, image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80' } })}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[10px] text-slate-600"
                      >
                        DU Engineering Template
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-section: Featured Programs list */}
                <div className="border-t border-slate-100 pt-5">
                  <h4 className="text-sm font-bold text-slate-800 mb-3">Below-Hero Featured Campaigns / Programs</h4>
                  <div className="space-y-3">
                    {state.featuredPrograms.map(prog => (
                      <div key={prog.id} className="border border-slate-200 rounded-xl p-3 flex flex-col gap-2 bg-white">
                        <div className="flex justify-between items-start">
                          <input
                            type="text"
                            value={prog.title}
                            onChange={(e) => updateListItem('featuredPrograms', prog.id, { title: e.target.value })}
                            className="font-bold text-slate-800 border-b border-dashed border-slate-200 focus:outline-none focus:border-[#6C4CF5] text-sm py-0.5"
                          />
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateListItem('featuredPrograms', prog.id, { visible: !prog.visible })}
                              className={`p-1 rounded hover:bg-slate-100 ${prog.visible ? 'text-[#6C4CF5]' : 'text-slate-400'}`}
                              title="Toggle Visibility"
                            >
                              {prog.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => deleteListItem('featuredPrograms', prog.id)}
                              className="p-1 rounded hover:bg-red-50 text-red-500"
                              title="Delete Campaign"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <textarea
                          rows={2}
                          value={prog.description}
                          onChange={(e) => updateListItem('featuredPrograms', prog.id, { description: e.target.value })}
                          className="text-xs text-slate-600 border border-slate-100 rounded p-1"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newProg: FeaturedProgram = {
                          id: `fp-${Date.now()}`,
                          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
                          title: "New Admission Course",
                          description: "Syllabus, dynamic quiz guidelines, and live analytics editable here.",
                          ctaText: "Enroll Now",
                          visible: true
                        };
                        updateState(prev => ({ ...prev, featuredPrograms: [...prev.featuredPrograms, newProg] }));
                      }}
                      className="w-full border border-dashed border-[#6C4CF5] text-[#6C4CF5] hover:bg-[#6C4CF5]/5 rounded-xl py-2 flex items-center justify-center gap-2 text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      Add Featured Program Card
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ADMISSION UPDATES */}
            {activeTab === 'updates' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Admission Dates & Updates Section</h3>
                  <p className="text-xs text-slate-500">Edit the key university application countdown timers and circular documents</p>
                </div>

                {/* Sub-section: Countdown items */}
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Manage Countdowns & Application Timers</h4>
                  <div className="space-y-4">
                    {state.admissionUpdatesList.map(card => (
                      <div key={card.id} className="border border-slate-100 bg-[#FAF8FF] p-3 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={card.examName}
                            onChange={(e) => updateListItem('admissionUpdatesList', card.id, { examName: e.target.value })}
                            className="font-bold text-slate-800 border-b border-dashed border-slate-200 focus:outline-none focus:border-[#6C4CF5] text-sm"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateListItem('admissionUpdatesList', card.id, { isPinned: !card.isPinned })}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${card.isPinned ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}
                            >
                              {card.isPinned ? '📌 Pinned' : 'Pin'}
                            </button>
                            <button
                              onClick={() => updateListItem('admissionUpdatesList', card.id, { isHighlighted: !card.isHighlighted })}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${card.isHighlighted ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}
                            >
                              {card.isHighlighted ? '⭐ Highlighted' : 'Highlight'}
                            </button>
                            <button
                              onClick={() => deleteListItem('admissionUpdatesList', card.id)}
                              className="p-1 rounded text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[10px] text-slate-500 font-semibold uppercase">Status Pill text</label>
                            <input
                              type="text"
                              value={card.statusText}
                              onChange={(e) => updateListItem('admissionUpdatesList', card.id, { statusText: e.target.value })}
                              className="w-full px-2 py-1 border border-slate-200 rounded mt-0.5"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 font-semibold uppercase">Exam Date (Countdown Target)</label>
                            <input
                              type="datetime-local"
                              value={card.examDate ? new Date(new Date(card.examDate).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                              onChange={(e) => updateListItem('admissionUpdatesList', card.id, { examDate: new Date(e.target.value).toISOString(), countdownDate: new Date(e.target.value).toISOString() })}
                              className="w-full px-2 py-1 border border-slate-200 rounded mt-0.5 font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 font-semibold uppercase">Last Apply Date</label>
                            <input
                              type="datetime-local"
                              value={card.lastApplyDate ? new Date(new Date(card.lastApplyDate).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                              onChange={(e) => updateListItem('admissionUpdatesList', card.id, { lastApplyDate: new Date(e.target.value).toISOString() })}
                              className="w-full px-2 py-1 border border-slate-200 rounded mt-0.5 font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 font-semibold uppercase">Apply Portal URL</label>
                            <input
                              type="text"
                              value={card.applyUrl}
                              onChange={(e) => updateListItem('admissionUpdatesList', card.id, { applyUrl: e.target.value })}
                              className="w-full px-2 py-1 border border-slate-200 rounded mt-0.5 text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold uppercase">Ticker Important Notice Description</label>
                          <input
                            type="text"
                            value={card.importantNotice}
                            onChange={(e) => updateListItem('admissionUpdatesList', card.id, { importantNotice: e.target.value })}
                            className="w-full px-2 py-1 border border-slate-200 rounded mt-0.5 text-xs"
                          />
                        </div>
                      </div>
                    ))}

                    {/* Add Countdown Form */}
                    <form onSubmit={handleAddAdmissionUpdate} className="bg-white border border-dashed border-slate-200 p-3 rounded-xl space-y-3">
                      <div className="text-xs font-bold text-slate-600">Add New Admission Countdown</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="University Name (e.g., DU KA Unit)"
                          value={newUpdateName}
                          onChange={(e) => setNewUpdateName(e.target.value)}
                          className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Pill Status (e.g., Exam Declared)"
                          value={newUpdateStatus}
                          onChange={(e) => setNewUpdateStatus(e.target.value)}
                          className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="datetime-local"
                          value={newUpdateCountdown}
                          onChange={(e) => setNewUpdateCountdown(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-[#6C4CF5] hover:bg-[#5b3ee0] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Sub-section: Latest Circulars List */}
                <div className="border-t border-slate-100 pt-5">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Notice Board & Official Circular Files</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Notices block */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-600">Important Notices Ticker ({state.importantNotices.length})</div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto border border-slate-100 rounded-lg p-2 bg-slate-50">
                        {state.importantNotices.map(notice => (
                          <div key={notice.id} className="flex justify-between items-center text-xs p-1 bg-white border border-slate-100 rounded">
                            <span className="truncate pr-1 font-sans text-slate-700" title={notice.title}>{notice.title}</span>
                            <button 
                              onClick={() => deleteListItem('importantNotices', notice.id)}
                              className="text-red-500 hover:bg-red-50 p-0.5 rounded shrink-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleAddNotice} className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="Quick notice announcement..."
                          value={newNoticeTitle}
                          onChange={(e) => setNewNoticeTitle(e.target.value)}
                          className="flex-1 px-2 py-1 border border-slate-200 rounded-lg text-xs"
                        />
                        <button type="submit" className="bg-[#6C4CF5] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          Add
                        </button>
                      </form>
                    </div>

                    {/* Circulars block */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-600">PDF Circulars Links ({state.latestCirculars.length})</div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto border border-slate-100 rounded-lg p-2 bg-slate-50">
                        {state.latestCirculars.map(circ => (
                          <div key={circ.id} className="flex justify-between items-center text-xs p-1 bg-white border border-slate-100 rounded">
                            <span className="truncate pr-1 font-sans text-slate-700" title={circ.title}>{circ.title}</span>
                            <button 
                              onClick={() => deleteListItem('latestCirculars', circ.id)}
                              className="text-red-500 hover:bg-red-50 p-0.5 rounded shrink-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleAddCircular} className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="Official PDF Circular file..."
                          value={newCircularTitle}
                          onChange={(e) => setNewCircularTitle(e.target.value)}
                          className="flex-1 px-2 py-1 border border-slate-200 rounded-lg text-xs"
                        />
                        <button type="submit" className="bg-[#6C4CF5] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: COURSES */}
            {activeTab === 'courses' && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Courses Section Settings</h3>
                  <p className="text-xs text-slate-500">Edit course titles, descriptions and toggle item visibilities</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Courses Section Heading Label</label>
                  <input
                    type="text"
                    value={state.coursesHeading}
                    onChange={(e) => handleTextChange('coursesHeading', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Main Subtitle</label>
                  <input
                    type="text"
                    value={state.coursesSubheading}
                    onChange={(e) => handleTextChange('coursesSubheading', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20 font-serif"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Course Section Description</label>
                  <textarea
                    rows={2}
                    value={state.coursesDescription}
                    onChange={(e) => handleTextChange('coursesDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C4CF5]/20"
                  />
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="text-xs font-bold text-slate-700">Course / Program Cards ({state.coursesList.length})</div>
                  {state.coursesList.map(course => (
                    <div key={course.id} className="border border-slate-200 rounded-xl p-3 space-y-2 bg-white text-xs">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">Card Status:</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{course.gradeBadge}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={course.visible} 
                            onChange={(e) => updateListItem('coursesList', course.id, { visible: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#6C4CF5]"></div>
                        </label>
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-400 font-bold uppercase">Program Name / Title</label>
                        <input
                          type="text"
                          value={course.title}
                          onChange={(e) => updateListItem('coursesList', course.id, { title: e.target.value })}
                          className="w-full px-2 py-1.5 border border-slate-150 rounded mt-0.5 font-semibold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-400 font-bold uppercase">Cover Image URL</label>
                        <input
                          type="text"
                          value={course.image || ''}
                          onChange={(e) => updateListItem('coursesList', course.id, { image: e.target.value })}
                          className="w-full px-2 py-1.5 border border-slate-150 rounded mt-0.5 font-mono text-[10px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-400 font-bold uppercase">Badge text (e.g. Running, Upcoming)</label>
                        <input
                          type="text"
                          value={course.gradeBadge}
                          onChange={(e) => updateListItem('coursesList', course.id, { gradeBadge: e.target.value })}
                          className="w-full px-2 py-1.5 border border-slate-150 rounded mt-0.5"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-400 font-bold uppercase">Description</label>
                        <textarea
                          rows={2}
                          value={course.description}
                          onChange={(e) => updateListItem('coursesList', course.id, { description: e.target.value })}
                          className="w-full px-2 py-1 border border-slate-100 rounded text-slate-600 mt-0.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navbar Plans Dropdown Categories Management */}
                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-850">Navbar Plans Dropdown Menu Items</h4>
                    <p className="text-xs text-slate-500">Add, edit, or remove the list items shown in the navigation bar dropdown columns</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Academic list */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                      <div className="text-xs font-bold text-slate-700 flex justify-between items-center">
                        <span>📘 Academic Categories</span>
                        <span className="text-[10px] text-slate-400 font-bold">{(state.academicCategories || []).length} items</span>
                      </div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto bg-white p-2 rounded-lg border border-slate-150">
                        {(state.academicCategories || []).map((cat, idx) => (
                          <div key={idx} className="flex justify-between items-center gap-1.5 text-xs bg-slate-50 p-1.5 rounded border border-slate-200">
                            <input
                              type="text"
                              value={cat}
                              onChange={(e) => {
                                const list = [...(state.academicCategories || [])];
                                list[idx] = e.target.value;
                                updateState({ academicCategories: list });
                              }}
                              className="font-medium text-slate-700 bg-transparent focus:bg-white focus:outline-none w-full px-1 py-0.5 rounded"
                            />
                            <button
                              onClick={() => {
                                const list = (state.academicCategories || []).filter((_, i) => i !== idx);
                                updateState({ academicCategories: list });
                              }}
                              className="text-red-500 hover:bg-red-50 p-0.5 rounded shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1">
                        <input
                          id="new-academic-cat-input"
                          type="text"
                          placeholder="New academic item..."
                          className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              const val = input.value.trim();
                              if (val) {
                                updateState({ academicCategories: [...(state.academicCategories || []), val] });
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('new-academic-cat-input') as HTMLInputElement;
                            const val = input?.value?.trim();
                            if (val) {
                              updateState({ academicCategories: [...(state.academicCategories || []), val] });
                              input.value = '';
                            }
                          }}
                          className="bg-[#6C4CF5] text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Admission list */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                      <div className="text-xs font-bold text-slate-700 flex justify-between items-center">
                        <span>🎯 Admission Categories</span>
                        <span className="text-[10px] text-slate-400 font-bold">{(state.admissionCategories || []).length} items</span>
                      </div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto bg-white p-2 rounded-lg border border-slate-150">
                        {(state.admissionCategories || []).map((cat, idx) => (
                          <div key={idx} className="flex justify-between items-center gap-1.5 text-xs bg-slate-50 p-1.5 rounded border border-slate-200">
                            <input
                              type="text"
                              value={cat}
                              onChange={(e) => {
                                const list = [...(state.admissionCategories || [])];
                                list[idx] = e.target.value;
                                updateState({ admissionCategories: list });
                              }}
                              className="font-medium text-slate-700 bg-transparent focus:bg-white focus:outline-none w-full px-1 py-0.5 rounded"
                            />
                            <button
                              onClick={() => {
                                const list = (state.admissionCategories || []).filter((_, i) => i !== idx);
                                updateState({ admissionCategories: list });
                              }}
                              className="text-red-500 hover:bg-red-50 p-0.5 rounded shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1">
                        <input
                          id="new-admission-cat-input"
                          type="text"
                          placeholder="New admission item..."
                          className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              const val = input.value.trim();
                              if (val) {
                                updateState({ admissionCategories: [...(state.admissionCategories || []), val] });
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('new-admission-cat-input') as HTMLInputElement;
                            const val = input?.value?.trim();
                            if (val) {
                              updateState({ admissionCategories: [...(state.admissionCategories || []), val] });
                              input.value = '';
                            }
                          }}
                          className="bg-[#6C4CF5] text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Career list */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                      <div className="text-xs font-bold text-slate-700 flex justify-between items-center">
                        <span>🏛 Career Categories</span>
                        <span className="text-[10px] text-slate-400 font-bold">{(state.careerCategories || []).length} items</span>
                      </div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto bg-white p-2 rounded-lg border border-slate-150">
                        {(state.careerCategories || []).map((cat, idx) => (
                          <div key={idx} className="flex justify-between items-center gap-1.5 text-xs bg-slate-50 p-1.5 rounded border border-slate-200">
                            <input
                              type="text"
                              value={cat}
                              onChange={(e) => {
                                const list = [...(state.careerCategories || [])];
                                list[idx] = e.target.value;
                                updateState({ careerCategories: list });
                              }}
                              className="font-medium text-slate-700 bg-transparent focus:bg-white focus:outline-none w-full px-1 py-0.5 rounded"
                            />
                            <button
                              onClick={() => {
                                const list = (state.careerCategories || []).filter((_, i) => i !== idx);
                                updateState({ careerCategories: list });
                              }}
                              className="text-red-500 hover:bg-red-50 p-0.5 rounded shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1">
                        <input
                          id="new-career-cat-input"
                          type="text"
                          placeholder="New career item..."
                          className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              const val = input.value.trim();
                              if (val) {
                                updateState({ careerCategories: [...(state.careerCategories || []), val] });
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('new-career-cat-input') as HTMLInputElement;
                            const val = input?.value?.trim();
                            if (val) {
                              updateState({ careerCategories: [...(state.careerCategories || []), val] });
                              input.value = '';
                            }
                          }}
                          className="bg-[#6C4CF5] text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: FEATURES & STATS */}
            {activeTab === 'features' && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Feature Matrix & Numerical Counters</h3>
                  <p className="text-xs text-slate-500">Edit the 10 critical student support widgets and stat boxes</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Students Count</label>
                    <input
                      type="text"
                      value={state.stats.studentsCount}
                      onChange={(e) => updateState({ stats: { ...state.stats, studentsCount: e.target.value } })}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Questions Count</label>
                    <input
                      type="text"
                      value={state.stats.questionsCount}
                      onChange={(e) => updateState({ stats: { ...state.stats, questionsCount: e.target.value } })}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Study Materials</label>
                    <input
                      type="text"
                      value={state.stats.studyMaterialsCount}
                      onChange={(e) => updateState({ stats: { ...state.stats, studyMaterialsCount: e.target.value } })}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">AI Tutor Hours</label>
                    <input
                      type="text"
                      value={state.stats.aiTutorAvailability}
                      onChange={(e) => updateState({ stats: { ...state.stats, aiTutorAvailability: e.target.value } })}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="text-xs font-bold text-slate-700">10 Core Feature Cards</div>
                  <div className="space-y-2 max-h-64 overflow-y-auto border border-slate-100 rounded-lg p-2 bg-slate-50">
                    {state.featuresList.map(feat => (
                      <div key={feat.id} className="flex items-center justify-between p-2 bg-white border border-slate-100 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400 font-bold">{feat.number}</span>
                          <span className="text-xs font-bold text-slate-700">{feat.title}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={feat.visible} 
                            onChange={(e) => updateListItem('featuresList', feat.id, { visible: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#6C4CF5]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Student Reviews & Endorsements</h3>
                  <p className="text-xs text-slate-500">Edit the customer stories slider reviews directly</p>
                </div>

                <div className="space-y-3">
                  {state.testimonialsList.map(test => (
                    <div key={test.id} className="border border-slate-200 bg-white rounded-xl p-3 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => updateListItem('testimonialsList', test.id, { name: e.target.value })}
                          className="font-bold text-slate-800 border-b border-dashed border-slate-200 focus:outline-none"
                        />
                        <button
                          onClick={() => deleteListItem('testimonialsList', test.id)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] text-slate-400 uppercase font-semibold">Exam category</label>
                          <input
                            type="text"
                            value={test.examCategory}
                            onChange={(e) => updateListItem('testimonialsList', test.id, { examCategory: e.target.value })}
                            className="w-full border border-slate-100 rounded px-1.5 py-0.5 mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-slate-400 uppercase font-semibold">Institution / College</label>
                          <input
                            type="text"
                            value={test.institution}
                            onChange={(e) => updateListItem('testimonialsList', test.id, { institution: e.target.value })}
                            className="w-full border border-slate-100 rounded px-1.5 py-0.5 mt-0.5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] text-slate-400 uppercase font-semibold">Quote Body</label>
                        <textarea
                          rows={2}
                          value={test.quote}
                          onChange={(e) => updateListItem('testimonialsList', test.id, { quote: e.target.value })}
                          className="w-full border border-slate-100 rounded px-1.5 py-0.5 mt-0.5"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newTest: TestimonialItem = {
                        id: `t-${Date.now()}`,
                        name: "Sadia Rahman",
                        examCategory: "Medical Admission Candidate",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
                        quote: "Completing daily dynamic quizzes on Gyanpeon helped me get 100% preparation with no stress.",
                        institution: "Viqarunnisa Noon College, Dhaka",
                        rating: 5,
                        visible: true
                      };
                      updateState(prev => ({ ...prev, testimonialsList: [...prev.testimonialsList, newTest] }));
                    }}
                    className="w-full border border-dashed border-[#6C4CF5] text-[#6C4CF5] hover:bg-[#6C4CF5]/5 rounded-xl py-2 flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Custom Testimonial
                  </button>
                </div>
              </div>
            )}

            {/* TAB: VIDEO SLIDER */}
            {activeTab === 'video-slider' && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Video & Stream Banner Slider Settings</h3>
                  <p className="text-xs text-slate-500">Add, edit, or remove the large Toffee-style video sliders on the landing page</p>
                </div>

                <div className="space-y-4">
                  {state.videoSlides?.map(slide => (
                    <div key={slide.id} className="border border-slate-200 bg-slate-50/50 rounded-xl p-4 space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700">Stream Slide ID: {slide.id}</span>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={slide.visible} 
                              onChange={(e) => updateListItem('videoSlides', slide.id, { visible: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6C4CF5] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                            <span className="ml-1.5 text-[10px] font-bold text-slate-500">Visible</span>
                          </label>
                          <button
                            onClick={() => deleteListItem('videoSlides', slide.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete Slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Badge (e.g. LIVE, Admissions)</label>
                          <input
                            type="text"
                            value={slide.badge}
                            onChange={(e) => updateListItem('videoSlides', slide.id, { badge: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Event Schedule/Time Text</label>
                          <input
                            type="text"
                            value={slide.timeText}
                            onChange={(e) => updateListItem('videoSlides', slide.id, { timeText: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase">Headline / Stream Title</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => updateListItem('videoSlides', slide.id, { title: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-semibold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase">Description / Details</label>
                        <textarea
                          rows={2}
                          value={slide.description || ''}
                          onChange={(e) => updateListItem('videoSlides', slide.id, { description: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg mt-0.5 text-slate-700"
                          placeholder="Provide any details about this admission plan..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Background Banner Image URL</label>
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => updateListItem('videoSlides', slide.id, { image: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-mono text-[10px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">CTA Link URL</label>
                          <input
                            type="text"
                            value={slide.linkUrl}
                            onChange={(e) => updateListItem('videoSlides', slide.id, { linkUrl: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-mono text-[10px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newSlide = {
                        id: `v-slide-${Date.now()}`,
                        badge: "LIVE STREAM",
                        title: "আর্জেন্টিনা বনাম সুইজারল্যান্ড - বিশ্বকাপ ২০২৬",
                        timeText: "১২ জুলাই | সকাল ৭:০০ টা",
                        description: "বিশ্বকাপের উত্তেজনাপূর্ণ লাইভ ম্যাচ মেন্টরশিপের মাধ্যমে সমাধান করুন।",
                        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
                        linkUrl: "#watch",
                        visible: true
                      };
                      updateState(prev => ({
                        ...prev,
                        videoSlides: [...(prev.videoSlides || []), newSlide]
                      }));
                    }}
                    className="w-full border border-dashed border-[#6C4CF5] text-[#6C4CF5] hover:bg-[#6C4CF5]/5 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Live Video Stream Banner
                  </button>
                </div>
              </div>
            )}

            {/* TAB: PRICING PACKAGES */}
            {activeTab === 'pricing' && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Pricing & Course Plan Settings</h3>
                  <p className="text-xs text-slate-500">Edit features, costs, badges, and cover images for premium prep plans</p>
                </div>

                <div className="space-y-4">
                  {state.pricingPlans?.map(plan => (
                    <div key={plan.id} className="border border-slate-200 bg-slate-50/50 rounded-xl p-4 space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700">Package ID: {plan.id}</span>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={plan.isActive} 
                              onChange={(e) => updateListItem('pricingPlans', plan.id, { isActive: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                            <span className="ml-1.5 text-[10px] font-bold text-emerald-600">Active Tag</span>
                          </label>

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={plan.visible} 
                              onChange={(e) => updateListItem('pricingPlans', plan.id, { visible: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6C4CF5] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                            <span className="ml-1.5 text-[10px] font-bold text-slate-500">Visible</span>
                          </label>

                          <button
                            onClick={() => deleteListItem('pricingPlans', plan.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete Plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Package Plan Name</label>
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => updateListItem('pricingPlans', plan.id, { name: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Button Text</label>
                          <input
                            type="text"
                            value={plan.buttonText}
                            onChange={(e) => updateListItem('pricingPlans', plan.id, { buttonText: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Price (e.g. ৳৩৪৯/-, Free)</label>
                          <input
                            type="text"
                            value={plan.price}
                            onChange={(e) => updateListItem('pricingPlans', plan.id, { price: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-mono text-[#6C4CF5] font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Duration Period (e.g. 1yr, Month)</label>
                          <input
                            type="text"
                            value={plan.period}
                            onChange={(e) => updateListItem('pricingPlans', plan.id, { period: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Header Graphic / Cover URL</label>
                          <input
                            type="text"
                            value={plan.image}
                            onChange={(e) => updateListItem('pricingPlans', plan.id, { image: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-mono text-[10px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-bold uppercase">Short Description</label>
                          <input
                            type="text"
                            value={plan.description}
                            onChange={(e) => updateListItem('pricingPlans', plan.id, { description: e.target.value })}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase">Bullet Features (One per line)</label>
                        <textarea
                          rows={3}
                          value={plan.features.join('\n')}
                          onChange={(e) => updateListItem('pricingPlans', plan.id, { features: e.target.value.split('\n').filter(Boolean) })}
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg mt-0.5 text-[11px]"
                          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newPlan = {
                        id: `p-plan-${Date.now()}`,
                        name: "নতুন প্যাক",
                        price: "৳৩৪৯/-",
                        period: "১ বছর",
                        description: "Complete and target-focused MCQ examination with study plan.",
                        features: [
                          "Chapter-wise 20,000+ Smart MCQs",
                          "Real-time Live Merit Lists",
                          "Interactive AI Companion"
                        ],
                        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80",
                        buttonText: "Purchase Package",
                        isActive: false,
                        visible: true
                      };
                      updateState(prev => ({
                        ...prev,
                        pricingPlans: [...(prev.pricingPlans || []), newPlan]
                      }));
                    }}
                    className="w-full border border-dashed border-[#6C4CF5] text-[#6C4CF5] hover:bg-[#6C4CF5]/5 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Custom Pricing Plan
                  </button>
                </div>
              </div>
            )}

            {/* TAB 9: FOOTER SETTINGS */}
            {activeTab === 'footer' && state.footer && (
              <div className="space-y-6 animate-fade-in text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Footer Settings</h3>
                  <p className="text-xs text-slate-500">Edit and customize all sections, links, branding, and socials in the footer</p>
                </div>

                {/* Company Info */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Company Info & Logo</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase">Logo Text</label>
                      <input
                        type="text"
                        value={state.footer.logoText}
                        onChange={(e) => updateFooterField('logoText', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase">Copyright Text</label>
                      <input
                        type="text"
                        value={state.footer.copyrightText}
                        onChange={(e) => updateFooterField('copyrightText', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold uppercase">Description</label>
                    <textarea
                      rows={2}
                      value={state.footer.description}
                      onChange={(e) => updateFooterField('description', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                    />
                  </div>

                  {/* Social Media Links */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                    <label className="block text-[10px] text-slate-500 font-bold uppercase">Social Media Links</label>
                    {state.footer.socialLinks.map((social) => (
                      <div key={social.id} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                        <span className="font-bold text-slate-700 capitalize w-16">{social.platform}</span>
                        <input
                          type="text"
                          value={social.url}
                          onChange={(e) => updateFooterListItem('socialLinks', social.id, { url: e.target.value })}
                          className="flex-1 px-2 py-1 border border-slate-200 rounded-md font-mono text-[10px]"
                          placeholder={`${social.platform} URL`}
                        />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={social.visible} 
                            onChange={(e) => updateFooterListItem('socialLinks', social.id, { visible: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#6C4CF5] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download App Store Buttons */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Download Buttons Settings</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Google Play</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={state.footer.storeLinks.showGooglePlay} 
                            onChange={(e) => updateFooterStoreLink('showGooglePlay', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                      <input
                        type="text"
                        value={state.footer.storeLinks.googlePlayUrl}
                        onChange={(e) => updateFooterStoreLink('googlePlayUrl', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-[10px] font-mono"
                        placeholder="Google Play Store link"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">App Store</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={state.footer.storeLinks.showAppStore} 
                            onChange={(e) => updateFooterStoreLink('showAppStore', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                      <input
                        type="text"
                        value={state.footer.storeLinks.appStoreUrl}
                        onChange={(e) => updateFooterStoreLink('appStoreUrl', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-[10px] font-mono"
                        placeholder="App Store link"
                      />
                    </div>
                  </div>
                </div>

                {/* Admission Programs Links */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Admission Programs Links</h4>
                  
                  <div className="space-y-2">
                    {state.footer.admissionPrograms?.map((link, idx) => (
                      <div key={link.id} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-150 shadow-sm">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => updateFooterListItem('admissionPrograms', link.id, { label: e.target.value })}
                          className="w-24 px-2 py-1 border border-slate-200 rounded-md font-semibold text-slate-700"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => updateFooterListItem('admissionPrograms', link.id, { url: e.target.value })}
                          className="flex-1 px-2 py-1 border border-slate-200 rounded-md text-[10px] font-mono"
                          placeholder="URL"
                        />
                        
                        <div className="flex items-center gap-1.5">
                          {/* Reorder Buttons */}
                          <button 
                            onClick={() => moveFooterListItem('admissionPrograms', idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-500"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button 
                            onClick={() => moveFooterListItem('admissionPrograms', idx, 'down')}
                            disabled={idx === state.footer.admissionPrograms.length - 1}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-500"
                            title="Move Down"
                          >
                            ▼
                          </button>

                          {/* Visibility Checkbox */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={link.visible} 
                              onChange={(e) => updateFooterListItem('admissionPrograms', link.id, { visible: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-7 h-3.5 bg-gray-200 rounded-full peer peer-checked:bg-[#6C4CF5] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:after:translate-x-full"></div>
                          </label>

                          {/* Trash Icon */}
                          <button
                            onClick={() => deleteFooterListItem('admissionPrograms', link.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Link */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="New label (e.g. DU, GST)"
                      value={newApLabel}
                      onChange={(e) => setNewApLabel(e.target.value)}
                      className="w-1/3 px-2 py-1.5 border border-slate-200 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="URL (e.g. #courses)"
                      value={newApUrl}
                      onChange={(e) => setNewApUrl(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono"
                    />
                    <button
                      onClick={() => {
                        addFooterListItem('admissionPrograms', newApLabel, newApUrl);
                        setNewApLabel('');
                        setNewApUrl('#courses');
                      }}
                      className="px-3 py-1.5 bg-[#6C4CF5] hover:bg-[#583ae0] text-white rounded-md font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Platform Links */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Platform Links</h4>
                  
                  <div className="space-y-2">
                    {state.footer.platformLinks?.map((link, idx) => (
                      <div key={link.id} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-150 shadow-sm">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => updateFooterListItem('platformLinks', link.id, { label: e.target.value })}
                          className="w-24 px-2 py-1 border border-slate-200 rounded-md font-semibold text-slate-700"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => updateFooterListItem('platformLinks', link.id, { url: e.target.value })}
                          className="flex-1 px-2 py-1 border border-slate-200 rounded-md text-[10px] font-mono"
                          placeholder="URL"
                        />
                        
                        <div className="flex items-center gap-1.5">
                          {/* Reorder */}
                          <button 
                            onClick={() => moveFooterListItem('platformLinks', idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-500"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button 
                            onClick={() => moveFooterListItem('platformLinks', idx, 'down')}
                            disabled={idx === state.footer.platformLinks.length - 1}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-500"
                            title="Move Down"
                          >
                            ▼
                          </button>

                          {/* Visibility */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={link.visible} 
                              onChange={(e) => updateFooterListItem('platformLinks', link.id, { visible: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-7 h-3.5 bg-gray-200 rounded-full peer peer-checked:bg-[#6C4CF5] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:after:translate-x-full"></div>
                          </label>

                          {/* Trash */}
                          <button
                            onClick={() => deleteFooterListItem('platformLinks', link.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Link */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="New label (e.g. Pricing, Blog)"
                      value={newPlLabel}
                      onChange={(e) => setNewPlLabel(e.target.value)}
                      className="w-1/3 px-2 py-1.5 border border-slate-200 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="URL (e.g. #pricing)"
                      value={newPlUrl}
                      onChange={(e) => setNewPlUrl(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono"
                    />
                    <button
                      onClick={() => {
                        addFooterListItem('platformLinks', newPlLabel, newPlUrl);
                        setNewPlLabel('');
                        setNewPlUrl('#');
                      }}
                      className="px-3 py-1.5 bg-[#6C4CF5] hover:bg-[#583ae0] text-white rounded-md font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Company Links */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Company Links</h4>
                  
                  <div className="space-y-2">
                    {state.footer.companyLinks?.map((link, idx) => (
                      <div key={link.id} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-150 shadow-sm">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => updateFooterListItem('companyLinks', link.id, { label: e.target.value })}
                          className="w-24 px-2 py-1 border border-slate-200 rounded-md font-semibold text-slate-700"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => updateFooterListItem('companyLinks', link.id, { url: e.target.value })}
                          className="flex-1 px-2 py-1 border border-slate-200 rounded-md text-[10px] font-mono"
                          placeholder="URL"
                        />
                        
                        <div className="flex items-center gap-1.5">
                          {/* Reorder */}
                          <button 
                            onClick={() => moveFooterListItem('companyLinks', idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-500"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button 
                            onClick={() => moveFooterListItem('companyLinks', idx, 'down')}
                            disabled={idx === state.footer.companyLinks.length - 1}
                            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-500"
                            title="Move Down"
                          >
                            ▼
                          </button>

                          {/* Visibility */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={link.visible} 
                              onChange={(e) => updateFooterListItem('companyLinks', link.id, { visible: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-7 h-3.5 bg-gray-200 rounded-full peer peer-checked:bg-[#6C4CF5] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:after:translate-x-full"></div>
                          </label>

                          {/* Trash */}
                          <button
                            onClick={() => deleteFooterListItem('companyLinks', link.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Link */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="New label (e.g. Terms, Help)"
                      value={newClLabel}
                      onChange={(e) => setNewClLabel(e.target.value)}
                      className="w-1/3 px-2 py-1.5 border border-slate-200 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="URL (e.g. #terms)"
                      value={newClUrl}
                      onChange={(e) => setNewClUrl(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono"
                    />
                    <button
                      onClick={() => {
                        addFooterListItem('companyLinks', newClLabel, newClUrl);
                        setNewClLabel('');
                        setNewClUrl('#');
                      }}
                      className="px-3 py-1.5 bg-[#6C4CF5] hover:bg-[#583ae0] text-white rounded-md font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Newsletter Input */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Newsletter Controls</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase">Heading</label>
                      <input
                        type="text"
                        value={state.footer.newsletterHeading}
                        onChange={(e) => updateFooterField('newsletterHeading', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase">Button Text</label>
                      <input
                        type="text"
                        value={state.footer.newsletterButtonText}
                        onChange={(e) => updateFooterField('newsletterButtonText', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase">Input Placeholder</label>
                      <input
                        type="text"
                        value={state.footer.newsletterPlaceholder}
                        onChange={(e) => updateFooterField('newsletterPlaceholder', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase">Description</label>
                      <input
                        type="text"
                        value={state.footer.newsletterDescription}
                        onChange={(e) => updateFooterField('newsletterDescription', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg mt-0.5"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Footer actions inside control panel */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex gap-3 justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 rounded-xl bg-[#6C4CF5] hover:bg-[#5b3ee0] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#6C4CF5]/10"
          >
            <Save className="w-3.5 h-3.5" />
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
