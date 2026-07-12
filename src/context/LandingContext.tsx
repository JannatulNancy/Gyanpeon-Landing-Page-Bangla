import React, { createContext, useContext, useState, useEffect } from 'react';

// Data types matching the user request
export interface HeroCampaign {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  image: string;
  backgroundGradient: string;
  buttonBg: string;
  badgeBg: string;
  visible: boolean;
}

export interface FeaturedProgram {
  id: string;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  visible: boolean;
}

export interface VideoSlide {
  id: string;
  badge: string;
  title: string;
  timeText: string;
  image: string;
  linkUrl: string;
  visible: boolean;
  description?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  image: string;
  buttonText: string;
  isActive: boolean;
  visible: boolean;
}

export interface AdmissionUpdateCard {
  id: string;
  examName: string; // e.g., "Medical", "DU"
  statusText: string; // e.g., "Exam Date", "Application Closing"
  countdownDate: string; // countdown target date, should be the exam date
  examDate: string; // Specific exam date
  lastApplyDate: string; // Specific last apply date
  applyUrl: string;
  circularUrl: string;
  importantNotice: string;
  isPinned: boolean;
  isHighlighted: boolean;
  visible: boolean;
}

export interface CourseCard {
  id: string;
  title: string;
  gradeBadge: string;
  description: string;
  buttonText: string;
  iconName: string;
  gradient: string;
  accentColor: string;
  image?: string;
  visible: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  examCategory: string;
  avatar: string;
  quote: string;
  institution: string;
  rating: number;
  visible: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  type: 'new' | 'announcement' | 'update' | 'seat-plan';
  date: string;
}

export interface CircularItem {
  id: string;
  title: string;
  date: string;
  downloadUrl: string;
}

export interface StatisticsState {
  studentsCount: string;
  questionsCount: string;
  studyMaterialsCount: string;
  aiTutorAvailability: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  visible: boolean;
}

export interface FooterLink {
  id: string;
  label: string;
  url: string;
  visible: boolean;
}

export interface FooterSocialLink {
  id: string;
  platform: 'facebook' | 'youtube' | 'instagram' | 'linkedin';
  url: string;
  visible: boolean;
}

export interface FooterStoreLink {
  googlePlayUrl: string;
  appStoreUrl: string;
  showGooglePlay: boolean;
  showAppStore: boolean;
}

export interface FooterState {
  logoText: string;
  description: string;
  storeLinks: FooterStoreLink;
  admissionPrograms: FooterLink[];
  platformLinks: FooterLink[];
  companyLinks: FooterLink[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export interface LandingDataState {
  // Hero Section
  heroBadge: string;
  heroHeadline: string;
  heroGradientText: string;
  heroSlogan: string;
  heroDescription: string;
  heroImage: string;
  
  // Hero Campaign Card
  heroCampaign: HeroCampaign;
  
  // Featured Programs / Campaigns
  featuredPrograms: FeaturedProgram[];
  
  // Courses Section
  coursesHeading: string;
  coursesSubheading: string;
  coursesDescription: string;
  coursesList: CourseCard[];
  
  // Admission Updates Section
  admissionUpdatesTitle: string;
  admissionUpdatesSubtitle: string;
  admissionUpdatesList: AdmissionUpdateCard[];
  
  // Mega Menu Admission Dropdown Items
  admissionCategories: string[];
  academicCategories: string[];
  careerCategories: string[];
  
  // Admission Info dropdown tabs
  latestCirculars: CircularItem[];
  importantNotices: NoticeItem[];
  
  // Statistics
  stats: StatisticsState;
  
  // Why Choose GyanPeon
  whyChooseHeading: string;
  whyChooseDescription: string;
  whyChooseBullets: string[];
  
  // Features section
  featuresHeading: string;
  featuresList: { id: string; number: string; title: string; description: string; iconName: string; visible: boolean }[];
  
  // Testimonials Section
  testimonialsList: TestimonialItem[];
  
  // Final CTA section
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;

  // Added sections
  videoSlides: VideoSlide[];
  pricingPlans: PricingPlan[];
  footer: FooterState;
}

interface LandingContextType {
  state: LandingDataState;
  updateState: (newState: Partial<LandingDataState> | ((prev: LandingDataState) => LandingDataState)) => void;
  resetToDefaults: () => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
}

// Default state aligned with user parameters
const DEFAULT_STATE: LandingDataState = {
  heroBadge: "EVERY EXAM. ONE DESTINATION.",
  heroHeadline: "Your All-in-One\nStudy Powerhouse.",
  heroGradientText: "Ace Every Exam.",
  heroSlogan: "Learn. Practice. Compete. Succeed.",
  heroDescription: "From Admission preparation to exam success—everything you need to learn, practice, revise, and achieve your goals in one place.",
  heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
  
  heroCampaign: {
    id: "h-camp-1",
    badge: "🔥 HOT CAMPAIGN",
    title: "Medical Admission 2026",
    subtitle: "Complete preparation batch with live model tests, study planners, and subject-wise MCQ practice. Master the biology shortcuts!",
    ctaText: "Enroll in Medical Batch →",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    backgroundGradient: "from-purple-950 via-slate-900 to-[#6C4CF5]/20",
    buttonBg: "bg-[#F59E0B] hover:bg-[#D97706] text-white",
    badgeBg: "bg-red-500 text-white",
    visible: true
  },
  
  featuredPrograms: [
    {
      id: "fp-1",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
      title: "DU Admission Crash Course",
      description: "Intense daily class with full syllabus solutions, Dhaka University past 15-years question-solving tricks.",
      ctaText: "Join DU Batch",
      visible: true
    },
    {
      id: "fp-2",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
      title: "Engineering Final Revision",
      description: "Focused practice for BUET, RUET, KUET, CUET concepts. Includes dynamic interactive written exams.",
      ctaText: "Unlock Physics Hub",
      visible: true
    },
    {
      id: "fp-3",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      title: "GST Complete Masterclass",
      description: "A single course covering all 24 cluster universities with 50+ subject-wise preparation tests.",
      ctaText: "Enroll in GST",
      visible: true
    },
    {
      id: "fp-4",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
      title: "BCS Pre-Mastery Program",
      description: "General science, geography, math, and Bengali literature courses led by executive cadres.",
      ctaText: "Join BCS Prep",
      visible: true
    }
  ],
  
  coursesHeading: "RUNNING PROGRAMS",
  coursesSubheading: "Active Preparation Programs",
  coursesDescription: "Enroll in our active, high-impact admission programs designed to help you secure your spot at your dream institution.",
  coursesList: [
    {
      id: "run-du",
      title: "DU Admission Premium Batch",
      gradeBadge: "Running",
      description: "Comprehensive live classes, daily model tests, and direct mentorship by DU top-rankers to target Dhaka University.",
      buttonText: "Enroll Now",
      iconName: "GraduationCap",
      gradient: "from-blue-500/10 to-indigo-500/10",
      accentColor: "text-blue-600 bg-blue-50 border-blue-100",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80",
      visible: true
    },
    {
      id: "run-medical",
      title: "Medical Admission Batch",
      gradeBadge: "Running",
      description: "Targeted preparation focusing on Biology memory aids, Chemistry concepts, and Physics quick-solving formulas.",
      buttonText: "Enroll Now",
      iconName: "Target",
      gradient: "from-emerald-500/10 to-teal-500/10",
      accentColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
      visible: true
    },
    {
      id: "run-gst",
      title: "GST Cluster Premium Course",
      gradeBadge: "Running",
      description: "Prepare for all 24 cluster universities with 10,000+ custom question solving and full length mock tests.",
      buttonText: "Enroll Now",
      iconName: "Award",
      gradient: "from-amber-500/10 to-orange-500/10",
      accentColor: "text-amber-600 bg-amber-50 border-amber-100",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      visible: true
    },
    {
      id: "run-eng",
      title: "Engineering BUET Masterclass",
      gradeBadge: "Running",
      description: "Written syllabus mastery, advanced math shortcut techniques, and exclusive BUET standard concept-book review.",
      buttonText: "Enroll Now",
      iconName: "BookOpen",
      gradient: "from-purple-500/10 to-violet-500/10",
      accentColor: "text-purple-600 bg-purple-50 border-purple-100",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      visible: true
    }
  ],
  
  admissionUpdatesTitle: "Admission Updates",
  admissionUpdatesSubtitle: "Never miss an important deadline.",
  admissionUpdatesList: [
    {
      id: "up-1",
      examName: "Medical Admission",
      statusText: "Application Closing Soon",
      countdownDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      examDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastApplyDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applyUrl: "https://dgme.teletalk.com.bd",
      circularUrl: "#",
      importantNotice: "Admit card download link goes live on September 1st.",
      isPinned: true,
      isHighlighted: true,
      visible: true
    },
    {
      id: "up-2",
      examName: "Dhaka University (DU)",
      statusText: "Official Circular Out",
      countdownDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      examDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastApplyDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applyUrl: "https://admission.eis.du.ac.bd",
      circularUrl: "#",
      importantNotice: "Minimum GPA requirement revised. See guidelines.",
      isPinned: false,
      isHighlighted: false,
      visible: true
    },
    {
      id: "up-3",
      examName: "GST Cluster",
      statusText: "Exam Date Declared",
      countdownDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      examDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastApplyDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applyUrl: "https://gstadmission.ac.bd",
      circularUrl: "#",
      importantNotice: "A-unit exam starts in multiple regional centers simultaneously.",
      isPinned: false,
      isHighlighted: false,
      visible: true
    },
    {
      id: "up-4",
      examName: "BUET & Engineering",
      statusText: "Pre-Selection Test",
      countdownDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
      examDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastApplyDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applyUrl: "https://buet.ac.bd/admission",
      circularUrl: "#",
      importantNotice: "Check syllabus changes for the physics theory exam.",
      isPinned: true,
      isHighlighted: false,
      visible: true
    },
    {
      id: "up-5",
      examName: "BUP Admission",
      statusText: "Seat Plan Released",
      countdownDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      examDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastApplyDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applyUrl: "https://admission.bup.edu.bd",
      circularUrl: "#",
      importantNotice: "Verify physical roll number allocation on BUP portal.",
      isPinned: false,
      isHighlighted: false,
      visible: true
    }
  ],
  
  admissionCategories: [
    "Medical", "Engineering", "University", "DU", "DU Affiliated Colleges", "GST", "BUP", "Agriculture", "National University", "Others"
  ],
  academicCategories: [
    "Class 3–8 Batch", "SSC Foundation", "HSC Complete Prep"
  ],
  careerCategories: [
    "BCS Preliminary", "Written Exam Module"
  ],
  
  latestCirculars: [
    { id: "c-1", title: "Medical MCQ Exam Center Instructions, 2026", date: "July 10, 2026", downloadUrl: "#" },
    { id: "c-2", title: "Dhaka University GA, KHA & KA Unit Detailed Syllabus Guide", date: "July 08, 2026", downloadUrl: "#" },
    { id: "c-3", title: "GST Admission Combined Cluster Seat List & Centers allocation", date: "July 05, 2026", downloadUrl: "#" },
    { id: "c-4", title: "BUET Prelims Cut-Off Marks and Merit List Release Notes", date: "July 01, 2026", downloadUrl: "#" }
  ],
  
  importantNotices: [
    { id: "n-1", title: "Application window for Medical admission extended by 3 days.", type: "new", date: "July 11, 2026" },
    { id: "n-2", title: "Photo and signature correction module is now live on DU admission panel.", type: "update", date: "July 09, 2026" },
    { id: "n-3", title: "BUET pre-selection mock paper available inside student battle lounge.", type: "announcement", date: "July 07, 2026" },
    { id: "n-4", title: "GST fee payment correction guidelines for B unit candidates.", type: "update", date: "July 04, 2026" }
  ],
  
  stats: {
    studentsCount: "120K+",
    questionsCount: "350K+",
    studyMaterialsCount: "25K+",
    aiTutorAvailability: "24/7"
  },
  
  whyChooseHeading: "Everything you need. One platform to achieve it.",
  whyChooseDescription: "From Admission preparation to exam success, GyanPeon brings everything you need to learn, practice, revise, and succeed—all in one place.",
  whyChooseBullets: [
    "Chapter-wise Study Materials",
    "Previous Year Questions",
    "AI Tutor",
    "Live Exams",
    "Performance Analytics",
    "Community",
    "Smart Practice"
  ],
  
  featuresHeading: "Powerful Tools. Smarter Preparation.",
  featuresList: [
    { id: "f-1", number: "01", title: "Study Materials", description: "Chapter-wise study resources designed to make every topic easier to understand.", iconName: "FileText", visible: true },
    { id: "f-2", number: "02", title: "Live Exams", description: "Experience real exam pressure with scheduled mock tests, rankings, and detailed performance analysis.", iconName: "Timer", visible: true },
    { id: "f-3", number: "03", title: "Quick Practice", description: "Practice chapter-wise MCQs anytime and strengthen weak topics in just a few minutes.", iconName: "Zap", visible: true },
    { id: "f-4", number: "04", title: "Question Bank", description: "Explore previous year questions, institution-wise collections, and full model tests all in one searchable library.", iconName: "Database", visible: true },
    { id: "f-5", number: "05", title: "Battle Arena", description: "Challenge friends or compete with learners nationwide in fast-paced quiz battles.", iconName: "Swords", visible: true },
    { id: "f-6", number: "06", title: "AI Tutor", description: "Ask questions, understand concepts, and get step-by-step explanations whenever you need them.", iconName: "Bot", visible: true },
    { id: "f-7", number: "07", title: "Community Feed", description: "Stay connected with fellow learners, discover helpful study tips, ask questions, and share knowledge.", iconName: "Users", visible: true },
    { id: "f-8", number: "08", title: "Messages", description: "Discuss questions, share resources, and learn together with classmates and mentors.", iconName: "MessageSquare", visible: true },
    { id: "f-9", number: "09", title: "Leaderboard", description: "Earn points, maintain streaks, and climb the rankings through consistent practice.", iconName: "Trophy", visible: true },
    { id: "f-10", number: "10", title: "Performance Analytics", description: "Track your progress, monitor strengths, and identify the topics that need more attention.", iconName: "BarChart3", visible: true }
  ],
  
  testimonialsList: [
    {
      id: "t-1",
      name: "Tanvir Ahmed",
      examCategory: "BUET Engineering Admission",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      quote: "The Question Bank and scheduled Live Exams gave me the exact confidence I needed. The ranking system pushed me to study harder every single evening.",
      institution: "Notre Dame College, Dhaka",
      rating: 5,
      visible: true
    },
    {
      id: "t-2",
      name: "Sadia Islam Rani",
      examCategory: "BCS Preliminary Candidate",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote: "GyanPeon's subject-wise analytics identified my weak areas in Bangladesh Affairs immediately. The AI Tutor explains math shortcuts like magic!",
      institution: "Dhaka University",
      rating: 5,
      visible: true
    },
    {
      id: "t-3",
      name: "Rahim Chowdhury",
      examCategory: "HSC Science Candidate",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      quote: "Practicing chapter-wise MCQs on my phone during commute saved me hundreds of hours. It truly is an all-in-one study powerhouse.",
      institution: "Rajshahi College",
      rating: 5,
      visible: true
    }
  ],
  
  ctaTitle: "Ready to achieve your goals?",
  ctaSubtitle: "Join thousands of students learning smarter every day.",
  ctaPrimaryText: "Create Free Account",
  ctaSecondaryText: "Browse Courses",

  videoSlides: [
    {
      id: "vs-1",
      badge: "DU 2026",
      title: "DU Admission Package",
      timeText: "৳৩৪৯/- (১ বছর)",
      description: "Here you will get all unit preparation materials of Dhaka University",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80",
      linkUrl: "#pricing",
      visible: true
    },
    {
      id: "vs-2",
      badge: "medical 2026",
      title: "Medical Admission Package 2026",
      timeText: "৳৪৪৯/- (১ বছর)",
      description: "Here you will get complete preparation for your medical admission.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
      linkUrl: "#pricing",
      visible: true
    },
    {
      id: "vs-3",
      badge: "GST + Public 2026",
      title: "GST + Public Varsity",
      timeText: "৳৩৪৯/- (১ বছর)",
      description: "Here you will get full GST package & RU, CU, JU, JnU, KhU, CoU related materials",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
      linkUrl: "#pricing",
      visible: true
    }
  ],
  pricingPlans: [
    {
      id: "pr-1",
      name: "Free Plan",
      price: "৳0",
      period: "All Streams",
      description: "Access basic preparation resources for free",
      features: [
        "Access to Study Materials (basics)",
        "Limited Quick Practice",
        "AI Teacher (50 chats / day)",
        "Limited Question Bank"
      ],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      buttonText: "Active Now",
      isActive: true,
      visible: true
    },
    {
      id: "pr-2",
      name: "GST + Public Varsity",
      price: "৳349/-",
      period: "1yr",
      description: "Here you will get full GST package & RU, CU, JU, JnU, KhU, CoU related materials",
      features: [
        "Full Access to Study Materials",
        "Unlimited Quick Practice",
        "Unlimited AI Teacher",
        "Unlimited Question Bank"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
      buttonText: "Purchase",
      isActive: false,
      visible: true
    },
    {
      id: "pr-3",
      name: "DU Admission Package",
      price: "৳349/-",
      period: "1yr",
      description: "Here you will get all unit preparation materials of Dhaka University",
      features: [
        "Full Access to Study Materials",
        "Unlimited Quick Practice",
        "Unlimited AI Teacher",
        "Unlimited Question Bank"
      ],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
      buttonText: "Purchase",
      isActive: false,
      visible: true
    },
    {
      id: "pr-4",
      name: "Medical Admission Package",
      price: "৳449/-",
      period: "1yr",
      description: "Here you will get complete preparation for your medical admission.",
      features: [
        "Full Access to Study Materials",
        "Unlimited Quick Practice",
        "Unlimited AI Teacher",
        "Unlimited Question Bank"
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
      buttonText: "Purchase",
      isActive: false,
      visible: true
    }
  ],
  footer: {
    logoText: "GyanPeon",
    description: "Your all-in-one platform for Admission preparation, live exams, previous year questions, AI-powered learning, and smart practice.",
    storeLinks: {
      googlePlayUrl: "#google-play",
      appStoreUrl: "#app-store",
      showGooglePlay: true,
      showAppStore: true
    },
    admissionPrograms: [
      { id: "ap-1", label: "Medical", url: "#courses", visible: true },
      { id: "ap-2", label: "Engineering", url: "#courses", visible: true },
      { id: "ap-3", label: "University", url: "#courses", visible: true },
      { id: "ap-4", label: "DU", url: "#courses", visible: true },
      { id: "ap-5", label: "GST", url: "#courses", visible: true },
      { id: "ap-6", label: "BUP", url: "#courses", visible: true },
      { id: "ap-7", label: "Agriculture", url: "#courses", visible: true }
    ],
    platformLinks: [
      { id: "pl-1", label: "Admission Info", url: "#admission-updates", visible: true },
      { id: "pl-2", label: "Pricing", url: "#pricing", visible: true },
      { id: "pl-3", label: "Blog", url: "#testimonials", visible: true },
      { id: "pl-4", label: "AI Study Planner", url: "#ai-planner", visible: true }
    ],
    companyLinks: [
      { id: "cl-1", label: "About Us", url: "#about", visible: true },
      { id: "cl-2", label: "Contact Us", url: "#contact", visible: true },
      { id: "cl-3", label: "Privacy Policy", url: "#privacy", visible: true },
      { id: "cl-4", label: "Terms of Service", url: "#terms", visible: true }
    ],
    newsletterHeading: "Stay Updated",
    newsletterDescription: "Never miss admission deadlines, circulars, exam dates, preparation tips, and important announcements.",
    newsletterPlaceholder: "Enter your email",
    newsletterButtonText: "Subscribe",
    copyrightText: "© 2026 GyanPeon. All Rights Reserved.",
    socialLinks: [
      { id: "sl-1", platform: "facebook", url: "https://facebook.com", visible: true },
      { id: "sl-2", platform: "youtube", url: "https://youtube.com", visible: true },
      { id: "sl-3", platform: "instagram", url: "https://instagram.com", visible: true },
      { id: "sl-4", platform: "linkedin", url: "https://linkedin.com", visible: true }
    ]
  }
};

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export const LandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'bn'>(() => {
    try {
      const savedLang = localStorage.getItem('gyanpeon_lang');
      if (savedLang === 'en' || savedLang === 'bn') {
        return savedLang;
      }
    } catch (e) {
      console.error("Failed to load language from localStorage:", e);
    }
    return 'bn'; // Default to simple and easy Bangla on first visit as requested
  });

  const [state, setState] = useState<LandingDataState>(() => {
    try {
      const saved = localStorage.getItem('gyanpeon_landing_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge or structure checking if required
        return { 
          ...DEFAULT_STATE, 
          ...parsed,
          footer: parsed.footer ? { ...DEFAULT_STATE.footer, ...parsed.footer } : DEFAULT_STATE.footer 
        };
      }
    } catch (e) {
      console.error("Failed to load landing state from localStorage:", e);
    }
    return DEFAULT_STATE;
  });

  const setLanguage = (lang: 'en' | 'bn') => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gyanpeon_lang', lang);
    } catch (e) {
      console.error("Failed to save language to localStorage:", e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('gyanpeon_landing_v5', JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save landing state to localStorage:", e);
    }
  }, [state]);

  const updateState = (
    newState: Partial<LandingDataState> | ((prev: LandingDataState) => LandingDataState)
  ) => {
    if (typeof newState === 'function') {
      setState(prev => newState(prev));
    } else {
      setState(prev => ({ ...prev, ...newState }));
    }
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to restore all original landing page values? This will clear current admin changes.")) {
      setState(DEFAULT_STATE);
    }
  };

  return (
    <LandingContext.Provider value={{ state, updateState, resetToDefaults, language, setLanguage }}>
      {children}
    </LandingContext.Provider>
  );
};

export const useLanding = () => {
  const context = useContext(LandingContext);
  if (!context) {
    throw new Error('useLanding must be used within a LandingProvider');
  }
  return context;
};
