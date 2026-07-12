# 📋 GYANPEON LANDING PAGE - COMPLETE DEVELOPER HANDOFF & SPECIFICATION DOCUMENT

> **Document Purpose:** This comprehensive specification guide provides frontend developers, UI/UX engineers, and full-stack architects with 100% pixel-perfect technical instructions to recreate the **Gyanpeon** landing page. Every layout metric, typography rule, design token, component blueprint, and animation curve is documented below.

---

## 🏗️ 1. ARCHITECTURAL OVERVIEW & TECH STACK

**Gyanpeon** is Bangladesh's premier all-in-one EdTech study powerhouse targeting learners from **School (Class 3-8)** through **SSC**, **HSC**, **University Admission**, and **BCS Civil Service** exams. 

### Recommended Frontend Stack:
* **Framework:** React 18+ / Next.js (App Router recommended)
* **Language:** TypeScript (`strict: true`)
* **Styling Engine:** Tailwind CSS v3.4+ / v4.0
* **Animation Engine:** `motion` (Framer Motion) / CSS Hardware-Accelerated Keyframes
* **Iconography:** `lucide-react` (Clean vector outline icons)

---

## 🎨 2. DESIGN PHILOSOPHY & TOKEN SYSTEM

The interface follows a **Premium SaaS Architecture** characterized by generous negative space, high-contrast typography pairings, subtle glassmorphic layers, and zero clutter (no decorative noise or pseudo-technical AI slop).

### 📐 Structural Layout Tokens
* **Max Desktop Container Width:** `1320px` centered (`mx-auto px-4 sm:px-6 lg:px-8`)
* **Grid System:** Standard 12-column responsive layout
* **Corner Radius Standards:**
  * Standard CTA Buttons: `16px` (`rounded-[16px]`)
  * Feature & Course Cards: `20px` – `24px` (`rounded-[20px]`, `rounded-[24px]`)
  * Badges & Pills: `9999px` (`rounded-full`)
* **Section Vertical Spacing:** `96px` to `128px` (`py-24 sm:py-32`)

### 🖌️ Color Palette & Hex Codes

| Token Name | Hex Code | Tailwind Equivalent | Usage Description |
| :--- | :--- | :--- | :--- |
| **Primary Violet** | `#6C63FF` | `text-[#6C63FF]` | Main brand accent, primary CTA buttons, active links |
| **Secondary Lavender** | `#8B5CF6` | `text-[#8B5CF6]` | Secondary gradient stops, hover highlights |
| **Accent Orange** | `#F97316` | `text-[#F97316]` | Curved underline SVG stroke under hero text |
| **Pure Dark Slate** | `#111111` | `text-[#111111]` | Main headlines, dark hero mockup frames, primary typography |
| **Body Muted Gray** | `#6B7280` | `text-[#6B7280]` | Subtitles, descriptive paragraphs, footer secondary links |
| **Soft Glass Bg** | `#FAF8FF` | `bg-[#FAF8FF]` | Subtle card backdrops, mega menu hover states |
| **Card Border Light** | `#F3E8FF` | `border-purple-100` | Crisp 1px borders surrounding glassmorphic cards |

### 🔤 Typography & Font Pairings

The design relies on an intentional **Serif Display + Modern Sans-Serif** pairing.

1. **Primary Headings (Display Serif):** `Playfair Display` (Weights: `600 SemiBold`, `700 Bold`, `800 ExtraBold`)
   * *Fallback:* `Cormorant Garamond`, `Georgia`, serif
   * *Applied to:* Hero H1, Section Headings (H2), Course Card Titles (H3)
2. **Body & Interface (Clean Sans):** `Plus Jakarta Sans` (Weights: `400 Regular`, `500 Medium`, `600 SemiBold`, `700 Bold`)
   * *Fallback:* `Inter`, `Manrope`, system-ui, sans-serif
   * *Applied to:* Navigation, descriptive copy, button text, badges

```css
/* Google Fonts Import to add in index.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

---

## 🧩 3. COMPONENT-BY-COMPONENT SPECIFICATIONS

### 🌐 A. Sticky Navigation Bar (`Navbar.tsx`)
* **Behavior:** Transparent at scroll position `0`. Transitions to `bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100` after scrolling >20px.
* **Items:** Brand Logo (`Gyanpeon`), Courses Dropdown, Features, Pricing, About.
* **Right CTAs:** `Log In` (Text link) + `Get Started` (Solid primary button with subtle elevation shadow).
* **Courses Dropdown (Mega Menu):**
  * Width: `850px`, absolute positioned below trigger.
  * Structure: 3-column grid featuring 5 mega items (`School`, `SSC`, `HSC`, `Admission`, `BCS`).
  * Bottom Banner: Diagnostic exam promotional strip (`bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6]`).

---

### 🦸 B. Hero Section (`Hero.tsx`)
* **Viewport Height:** Minimum `100vh` minus header height (`min-h-[calc(100vh-80px)]`).
* **Background:** Soft lavender radial glow fading into crisp white (`bg-hero-gradient`).
* **Left Column (Content - 7 Cols):**
  1. **Top Pill Badge:** Light purple background (`bg-[#EDE9FE]`), purple text (`#6C63FF`), text: `✨ EVERY EXAM. ONE DESTINATION.`
  2. **Headline H1:** `Your All-in-One Study Powerhouse.` in bold Serif (`46px` mobile to `68px` desktop), `#111111`.
  3. **Gradient Highlight:** `Ace Every Exam.` with a customized curved orange underline stroke (`#F97316`, `strokeWidth: 6px`).
  4. **Slogan Line (Critical):** Immediately below highlight. Text: `Learn. Practice. Compete. Succeed.` (`22-24px`, `#6C63FF`, medium weight sans-serif).
  5. **Description:** Muted gray (`#6B7280`), `18px`, line-height `1.7`, max-width `520px`.
  6. **CTA Group:** Primary Button (`Start Learning Free →`, violet background) + Secondary Button (`Explore Courses →`, white background with crisp border).
* **Right Column (Visual Mockup - 5 Cols):**
  * Center element: Realistic dark iPhone frame (`#111111`, `rounded-[48px]`).
  * Inside Screen: Live SSC/HSC exam interface preview showing countdown timers and topic badges.
  * **Floating Feature Cards (Surrounding Phone):**
    * 4 distinct glassmorphic white cards with soft shadows (`Live Exams`, `AI Teacher`, `Leaderboard`, `Active Students`).
    * Applied CSS Keyframe: `animate-float` (6s vertical floating oscillation).

---

### 📊 C. High-Impact Statistics (`StatsSection.tsx`)
* **Layout:** 4-column responsive grid placed inside a subtle lavender container strip (`border-y border-purple-100`).
* **Metrics to Display:**
  1. `120K+` — Learning Students
  2. `350K+` — Questions in Bank
  3. `25K+` — Study Materials
  4. `24/7` — AI Tutor Support
* **Styling:** Numbers rendered in ExtraBold Serif display font (`42px`) with gradient text clipping.

---

### 📘 D. Courses Section (`CoursesSection.tsx`)
* **Header Label:** `CHOOSE YOUR PATH` (Pill badge).
* **Section Heading:** `Courses for Every learner`
* **Grid Layout:** 3 columns × 2 rows (6 total cards).
* **Card Breakdown:**
  1. `School (Class 3-8)` — Fundamentals & chapter-wise quizzes.
  2. `SSC` — Board exam preparation, MCQs & CQ model tests.
  3. `HSC` — Science, Business & Humanities chapter mastery.
  4. `Admission` — Medical, Engineering (BUET), DU Affiliated, BUP, GST cluster.
  5. `BCS` — Preliminary, Written & Viva Voce smart analytics.
  6. `AI Counselor Promo Card` (Violet gradient fill to balance grid).
* **Hover Interaction:** Card elevates (`translateY(-8px)`), border shifts to category accent color, background reveals a glowing colorful gradient blob.

---

### ⚡ E. Features Section (`FeaturesSection.tsx`)
* **Header Label:** `EVERYTHING YOU NEED`
* **Heading H2:** `Powerful Tools. Smarter Preparation.`
* **Grid:** 10 numbered glassmorphic white cards (`01` through `10`).
* **Visual Polish:**
  * Top left: Lucide icon inside a rounded box.
  * Top right: Large monospaced watermarked index number (`01`, `02`...).
  * Bottom edge: `4px` tall violet accent bar that expands from `32px` width to `100%` card width on hover (`transition-all duration-300`).

---

### 💡 F. Why Choose Gyanpeon (`WhyChooseSection.tsx`)
* **Left Column:** 5 bold checkmark bullet points with violet circular icon wrappers.
* **Right Column:** Realistic interactive SaaS dashboard simulation card showing an accuracy progression bar chart (`+24% This Month`) and an instant AI tutor solve message preview.

---

### ⭐ G. Testimonials & Social Proof (`TestimonialsSection.tsx`)
* **Heading:** `Loved by Students Across Bangladesh`
* **Cards:** 3 student quote cards (Tanvir Ahmed - BUET, Sadia Islam - BCS, Rahim Chowdhury - HSC).
* **Trust Strip:** Bottom badge highlighting `4.9/5 Average Rating` across 15,000+ verified student reviews.

---

### 🚀 H. CTA & Footer Sections (`CTASection.tsx` & `Footer.tsx`)
* **CTA Banner:** Full-width rounded box (`rounded-[36px]`) with vibrant `#6C63FF` to `#8B5CF6` gradient background.
* **Footer:** Dark charcoal canvas (`#111111`) divided into 12 columns:
  * Brand info & App Store / Google Play download buttons (4 cols)
  * Course links (2 cols)
  * Platform links (2 cols)
  * Company & Legal (2 cols)
  * Newsletter Subscription Field (2 cols) with interactive success confirmation state.

---

## 🎞️ 4. ANIMATION & MOTION CURVES

To maintain a smooth, non-bouncy executive feel, use standard **Cubic-Bezier easing** (`cubic-bezier(0.16, 1, 0.3, 1)` or `easeOut`).

### Floating CSS Keyframes (Tailwind Utility Classes)
```css
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 5s ease-in-out infinite 1.5s;
}
```

---

## 💻 5. TYPESCRIPT INTERFACES (`types.ts`)

```typescript
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

export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  name: string;
  examCategory: string;
  avatar: string;
  quote: string;
  institution: string;
}
```

---
*End of Specification Document. Ready for Engineering Implementation.*
