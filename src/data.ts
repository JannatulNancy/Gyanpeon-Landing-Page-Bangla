import { CourseCategory, FeatureItem, MegaMenuItem, StatItem, Testimonial } from './types';

export const MEGA_MENU_DATA: MegaMenuItem[] = [
  {
    title: "School (Class 3–8)",
    subtitle: "Classes 3–8",
    icon: "📘",
    items: ["Study Materials", "Practice & Quizzes", "Chapter-wise Exams", "Model Tests"]
  },
  {
    title: "SSC Preparation",
    subtitle: "Class 9–10 Board Exam",
    icon: "🎓",
    items: ["Science Group", "Business Studies", "Humanities Group", "Board Question Solves"]
  },
  {
    title: "HSC Preparation",
    subtitle: "Class 11–12 Board Exam",
    icon: "📗",
    items: ["Science Group", "Business Studies", "Humanities Group", "Model Tests & CQ"]
  },
  {
    title: "Admission Tests",
    subtitle: "Higher Education Gateway",
    icon: "🎯",
    items: [
      "Medical Admission",
      "Engineering (BUET/CKRUET)",
      "University (DU, RU, CU, JU)",
      "DU Affiliated Colleges",
      "BUP Admission",
      "GST Cluster",
      "National University",
      "And More"
    ]
  },
  {
    title: "BCS Preparation",
    subtitle: "Bangladesh Civil Service",
    icon: "🏛",
    items: ["Preliminary MCQs", "Written Exam Guide", "Viva Voce Tips", "Smart Analytics"]
  }
];

export const COURSES_DATA: CourseCategory[] = [
  {
    id: "school",
    title: "School",
    gradeBadge: "Class 3-8",
    description: "Build strong fundamentals with chapter-wise lessons, quizzes, and practice.",
    buttonText: "Explore Classes ",
    iconName: "BookOpen",
    gradient: "from-blue-500/10 to-indigo-500/10",
    accentColor: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    id: "ssc",
    title: "SSC",
    gradeBadge: "Board Exams",
    description: "Complete board exam preparation with all subjects, MCQs, CQ, and model tests.",
    buttonText: "Explore SSC ",
    iconName: "GraduationCap",
    gradient: "from-purple-500/10 to-violet-500/10",
    accentColor: "text-purple-600 bg-purple-50 border-purple-100"
  },
  {
    id: "hsc",
    title: "HSC",
    gradeBadge: "Higher Secondary",
    description: "Science, Business Studies & Humanities with chapter-wise study and exam practice.",
    buttonText: "Explore HSC ",
    iconName: "Award",
    gradient: "from-emerald-500/10 to-teal-500/10",
    accentColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
  },
  {
    id: "admission",
    title: "Admission",
    gradeBadge: "University & Med",
    description: "Medical, Engineering, University, Agriculture, GST, BUP, DU Under Colleges & more.",
    buttonText: "Explore Admission ",
    iconName: "Target",
    gradient: "from-amber-500/10 to-orange-500/10",
    accentColor: "text-amber-600 bg-amber-50 border-amber-100"
  },
  {
    id: "bcs",
    title: "BCS",
    gradeBadge: "Civil Service",
    description: "Preliminary, Written & Viva preparation with subject-wise MCQs, model tests and smart analytics.",
    buttonText: "Explore BCS ",
    iconName: "Briefcase",
    gradient: "from-rose-500/10 to-pink-500/10",
    accentColor: "text-rose-600 bg-rose-50 border-rose-100"
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    number: "01",
    title: "Study Materials",
    description: "Chapter-wise study resources designed to make every topic easier to understand.",
    iconName: "FileText"
  },
  {
    number: "02",
    title: "Live Exams",
    description: "Experience real exam pressure with scheduled mock tests, rankings, and detailed performance analysis.",
    iconName: "Timer"
  },
  {
    number: "03",
    title: "Quick Practice",
    description: "Practice chapter-wise MCQs anytime and strengthen weak topics in just a few minutes.",
    iconName: "Zap"
  },
  {
    number: "04",
    title: "Question Bank",
    description: "Explore previous year questions, institution-wise collections, and full model tests all in one searchable library.",
    iconName: "Database"
  },
  {
    number: "05",
    title: "Battle Arena",
    description: "Challenge friends or compete with learners nationwide in fast-paced quiz battles.",
    iconName: "Swords"
  },
  {
    number: "06",
    title: "AI Tutor",
    description: "Ask questions, understand concepts, and get step-by-step explanations whenever you need them.",
    iconName: "Bot"
  },
  {
    number: "07",
    title: "Community Feed",
    description: "Stay connected with fellow learners, discover helpful study tips, ask questions, and share knowledge.",
    iconName: "Users"
  },
  {
    number: "08",
    title: "Messages",
    description: "Discuss questions, share resources, and learn together with classmates and mentors.",
    iconName: "MessageSquare"
  },
  {
    number: "09",
    title: "Leaderboard",
    description: "Earn points, maintain streaks, and climb the rankings through consistent practice.",
    iconName: "Trophy"
  },
  {
    number: "10",
    title: "Performance Analytics",
    description: "Track your progress, monitor strengths, and identify the topics that need more attention.",
    iconName: "BarChart3"
  }
];

export const STATS_DATA: StatItem[] = [
  {
    value: "120K+",
    label: "Learning Students",
    iconName: "Users"
  },
  {
    value: "350K+",
    label: "Questions in Bank",
    iconName: "CheckCircle2"
  },
  {
    value: "25K+",
    label: "Study Materials",
    iconName: "BookOpen"
  },
  {
    value: "24/7",
    label: "AI Tutor Support",
    iconName: "Sparkles"
  }
];

export const WHY_CHOOSE_BULLETS: string[] = [
  "Chapter-wise Study Materials",
  "Previous Year Questions & Model Tests",
  "AI-Powered Tutor & Instant Help",
  "Live Exams & Performance Analytics",
  "Leaderboards, Community & Smart Practice"
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Tanvir Ahmed",
    examCategory: "BUET Engineering Admission",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "The Question Bank and scheduled Live Exams gave me the exact confidence I needed. The ranking system pushed me to study harder every single evening.",
    institution: "Notre Dame College, Dhaka"
  },
  {
    name: "Sadia Islam Rani",
    examCategory: "BCS Preliminary Candidate",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    quote: "GyanPeon's subject-wise analytics identified my weak areas in Bangladesh Affairs immediately. The AI Tutor explains math shortcuts like magic!",
    institution: "Dhaka University"
  },
  {
    name: "Rahim Chowdhury",
    examCategory: "HSC Science Candidate",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "Practicing chapter-wise MCQs on my phone during commute saved me hundreds of hours. It truly is an all-in-one study powerhouse.",
    institution: "Rajshahi College"
  }
];
