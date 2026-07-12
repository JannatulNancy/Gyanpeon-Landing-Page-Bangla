# GYANPEON - FRONTEND DEVELOPER HANDOFF SPECIFICATION

**Project Name:** Gyanpeon Landing Page  
**Target Platform:** Modern Web (Responsive Desktop, Tablet, Mobile)  
**Core Aesthetic:** Premium SaaS, Clean Minimalist, Generous Negative Space, Soft Lavender Gradients  

---

## 1. TECH STACK & ARCHITECTURE

* **Core Framework:** React 18+ / React 19 (Vite + TypeScript)
* **CSS Framework:** Tailwind CSS v4 (`@import "tailwindcss";`)
* **Icon Library:** `lucide-react` (Strict consistent stroke width)
* **Animation Engine:** `motion` (Framer Motion API equivalent)
* **Typography (Google Fonts):**
  * **Primary Serif (Display/Headings):** `'Playfair Display', Georgia, serif` (Weights: 600, 700, 800)
  * **Secondary Sans (Body/UI/Buttons):** `'Plus Jakarta Sans', sans-serif` (Weights: 400, 500, 600, 700)

---

## 2. DESIGN TOKENS & COLOR SYSTEM

```text
Primary Brand   : #6C63FF  (Main CTA, Active States, Key Highlights)
Secondary Brand : #8B5CF6  (Gradient Pairings, Hover Accents)
Text Primary    : #111111  (Main Headings, High-Contrast Text)
Text Muted      : #6B7280  (Descriptions, Subtitles, Slogans)
App Canvas      : #FFFFFF  (Pure White Base)
Soft Lavender   : #FAF8FF  (Alternate Section Tint, Card Backgrounds)
Accent Stroke   : #F97316  (Vibrant Orange Hero Underline SVG Stroke)
Dark Base       : #111111  (Footer Background & Realistic iPhone Frame)
```

### Geometry & Spacing Rules
* **Max Content Container:** `1320px` centered (`max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8`).
* **Button Radius:** `16px` (`rounded-[16px]`). *Do NOT use 8px standard rounded corners.*
* **Card Radius:** `20px` to `24px` (`rounded-[20px]`, `rounded-[24px]`).
* **Section Spacing:** `96px` to `128px` vertical padding (`py-24 sm:py-32`).
* **Touch Targets:** Minimum `44px` height on mobile; desktop primary CTAs are `56px`.

---

## 3. CSS ANIMATIONS & UTILITIES (`src/index.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@layer base {
  body { font-family: 'Plus Jakarta Sans', sans-serif; color: #111111; background-color: #ffffff; overflow-x: hidden; }
  h1, h2, h3, .font-serif-title { font-family: 'Playfair Display', Georgia, serif; }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float { animation: float-slow 6s ease-in-out infinite; }
.animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 1.5s; }

.bg-hero-gradient {
  background: radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, rgba(108, 99, 255, 0.08) 35%, rgba(255, 255, 255, 0) 70%),
              linear-gradient(180deg, #FAF8FF 0%, #FFFFFF 100%);
}
```

---

## 4. SECTION-BY-SECTION BLUEPRINT

### A. Sticky Navbar (`<header>`)
* **Top Bar:** Sticky (`sticky top-0 z-50`). On scroll > 20px, apply `bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100`.
* **Left Brand:** Logo icon (`w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6]` with white Sparkles icon) + Text `Gyanpeon` (`peon` in `#6C63FF`).
* **Center Links:** `Courses ▼` (Triggers Mega Menu dropdown on hover), `Features`, `Pricing`, `About`.
* **Mega Menu Spec:** `850px` width container centered below trigger. Grid with 3 columns containing 5 core paths: *School (Class 3-8), SSC, HSC, Admission, BCS*. Bottom of mega menu contains a promotional violet gradient bar directing to a diagnostic test.
* **Right Actions:** `Log In` (Text link) + `Get Started` (`#6C63FF` solid button, rounded 16px, shadow).

### B. Hero Section (`min-h-[calc(100vh-80px)]`)
* **Left Column (7 Cols):**
  1. **Badge:** Pill shape (`bg-[#EDE9FE] text-[#6C63FF] px-4 py-2 rounded-full text-xs font-bold uppercase`): `EVERY EXAM. ONE DESTINATION.`
  2. **Main Headline:** `Your All-in-One` <br/> `Study Powerhouse.` (Serif Display, Bold, `#111111`, `text-[46px] sm:text-[58px] xl:text-[68px] leading-[1.1]`).
  3. **Gradient Highlight:** `Ace Every Exam.` (Purple gradient text) with an absolute positioned SVG stroke underline underneath in Orange (`#F97316`, `strokeWidth="6"`).
  4. **Slogan Line:** `Learn. Practice. Compete. Succeed.` (Sans-serif, `#6C63FF`, `text-[22px] sm:text-[24px] font-semibold`). *Must look like a slogan, not paragraph text.*
  5. **Description:** `#6B7280`, 18px font size, `max-w-[520px] leading-[1.7]`.
  6. **CTA Buttons:** Primary `Start Learning Free` (`#6C63FF` bg, white text, 56px height) + Secondary `Explore Courses` (White bg, border `#E5E7EB`, `#111111` text). *Note: Trailing arrows removed per final approval.*
  7. **Trust Footer:** 3 inline badges with emerald checkmarks: *No Credit Card • Instant Access • NCTB Aligned*.

* **Right Column (5 Cols):**
  * **Realistic iPhone Mockup:** Center stage CSS device (`w-[310px] bg-[#111111] rounded-[48px] p-3 shadow-2xl border-4 border-gray-800 animate-float`). Inside displays a live student dashboard (Welcome header, active BUET goal pill, live exam alert card, quick practice bento widgets).
  * **4 Floating Feature Cards:** White glassmorphic boxes (`rounded-[20px] p-3 shadow-xl border border-purple-100 bg-white`) floating around phone:
    * Top-Left: `Live Exams` (Rose icon)
    * Top-Right: `AI Teacher` (Purple bot icon)
    * Bottom-Left: `Leaderboard` (Amber trophy icon)
    * Bottom-Right: `Active Students` (Emerald users icon)

### C. Statistics Section
* **Grid:** 4 columns on desktop, 2 on mobile (`bg-gradient-to-r from-[#FAF8FF] via-purple-50/40 to-[#FAF8FF]`).
* **Data:** `120K+ Learning Students`, `350K+ Questions in Bank`, `25K+ Study Materials`, `24/7 AI Tutor Support`.

### D. Courses Section (`#courses`)
* **Header:** Pill `CHOOSE YOUR PATH`, Heading `Courses for Every learner`.
* **Grid:** 3 columns. Cards use `bg-white/80 backdrop-blur-md rounded-[24px] p-8 border border-gray-100`.
* **Hover Interaction:** Card lifts `translateY(-8px)`, soft ambient purple/blue gradient reveals inside top-right corner, bottom button turns solid `#6C63FF` with white arrow.
* **Items:** School (Class 3-8), SSC, HSC, Admission, BCS + 6th Card: *Talk to an AI Counselor* (Solid Purple Gradient card).

### E. Features Section (`#features`)
* **Header:** Pill `EVERYTHING YOU NEED`, Heading `Powerful Tools. Smarter Preparation.`
* **Grid:** 10 Glassmorphic Cards (`bg-white/80 backdrop-blur-xl rounded-[20px] p-7 border border-gray-100`).
* **Layout Detail:** Items 1 through 9 sit in standard 3-col layout. Item 10 (*Performance Analytics*) spans gracefully across remaining space. Each card features a monospace bold index number (`01` to `10`) in muted gray that brightens on hover.

### F. Why Choose Us (`#why-choose`)
* **Split Layout:** 6 Cols Left / 6 Cols Right.
* **Left:** Heading `Everything you need. One platform to achieve it.` + 5 checkmark rows (Purple round button with bold white check). CTA: `Experience GyanPeon Free` (Solid `#111111` button).
* **Right:** Simulated SaaS Dashboard Graphic (`rounded-[32px] bg-white p-8 border border-purple-100 shadow-2xl`). Shows mock Live Battle header, CSS bar chart (`Accuracy Progression +24%`), and dark AI Tutor chat card snippet.

### G. Testimonials Section (`#testimonials`)
* **Header:** Heading `Loved by Students Across Bangladesh`.
* **Anatomy:** 3 white cards (`rounded-[24px] p-8 shadow-sm`). Contains 5 yellow stars, italic quote, student avatar photo, name, category badge (`BUET Engineering Admission`, `BCS Preliminary`, `HSC Science`), and college institution name.

### H. CTA Section (`#get-started`)
* **Container:** `max-w-[1320px]` containing a full-width purple banner (`rounded-[36px] bg-gradient-to-r from-[#6C63FF] via-[#7B58FF] to-[#8B5CF6] p-16 text-center text-white shadow-2xl`).
* **Actions:** `Create Free Account` (White solid button, `#6C63FF` bold text) + `Login` (Ghost button with white border).

### I. Footer (`#about`)
* **Base:** Dark Theme (`bg-[#111111] text-white pt-20 pb-12`).
* **Columns:** Brand (4 cols with Play & App Store download badges), Courses (2 cols), Platform (2 cols), Company (2 cols), Stay Updated Newsletter (2 cols with email input & inline send icon).

---

## 5. DEVELOPER CHECKLIST
1. [ ] Verify all button border radius properties are explicitly set to `16px`.
2. [ ] Ensure no standard spring/bouncy transitions are used; use `duration-300 ease-out`.
3. [ ] Confirm mobile viewport responsiveness (test grid collapses: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
4. [ ] Ensure the Orange SVG stroke under "Ace Every Exam." renders cleanly on mobile without horizontal scrollbar overflow.
