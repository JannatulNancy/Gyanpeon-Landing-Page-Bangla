export interface CourseCategory {
  id: string;
  title: string;
  gradeBadge: string;
  description: string;
  buttonText: string;
  iconName: string;
  gradient: string;
  accentColor: string;
}

export interface MegaMenuItem {
  title: string;
  subtitle?: string;
  icon: string;
  items: string[];
}

export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  value: string;
  label: string;
  iconName: string;
}

export interface Testimonial {
  name: string;
  examCategory: string;
  avatar: string;
  quote: string;
  institution: string;
}
