# Gyanpeon UI/UX Design System Spec (Figma-Ready Blueprint)

This document is a comprehensive UI/UX specification sheet designed to map 1:1 with **Figma** layers, frames, styles, and Auto-Layout configurations. You can use these values to construct a pixel-perfect Figma component library or hand this to frontend engineers for absolute design-to-code alignment.

---

## 1. Global Canvas & Layout Grid Settings

| Parameter | Figma Value | Tailwind Equivalent | Notes |
| :--- | :--- | :--- | :--- |
| **Workspace Width** | `1440px` | - | Standard desktop breakpoint |
| **Grid Type** | `Columns` | `grid-cols-12` | 12-Column Responsive Grid |
| **Count** | `12` | - | Standard desktop layout grid |
| **Width** | `Auto` | - | Responsive grid behavior |
| **Gutter** | `32px` | `gap-8` | Spacing between columns |
| **Margin** | `60px` | `px-4 sm:px-6 lg:px-8` | Left and right boundary padding |
| **Max Content Width**| `1320px` | `max-w-[1320px]` | Maximum layout frame width |

---

## 2. Color Styles (Figma Color Palette)

Create these local color variables in your Figma library:

### Brand Colors
*   **Primary (Purple)**: `#6C63FF` (HSL `243, 100%, 69%`)
*   **Secondary (Violet)**: `#8B5CF6` (HSL `259, 92%, 60%`)
*   **Primary Dark (Black)**: `#111111` (HSL `0, 0%, 7%`)
*   **Paragraph Muted (Gray)**: `#6B7280` (HSL `220, 9%, 46%`)
*   **Accent Stroke (Orange)**: `#F97316` (HSL `25, 95%, 53%`)

### Light Theme Tones
*   **Soft Lavender Background**: `#FAF8FF` (HSL `255, 100%, 99%`)
*   **Border Gray**: `#E5E7EB` (HSL `220, 13%, 91%`)
*   **Transparent Purple Glow**: `rgba(108, 99, 255, 0.08)` to `rgba(139, 92, 246, 0.15)`

---

## 3. Typography Hierarchy

### Font Family Pairings
*   **Display / Serif Headings**: `Playfair Display` (Google Fonts)
*   **UI / Sans-Serif Elements**: `Plus Jakarta Sans` (Google Fonts)

### Text Style Presets

| Style Name | Font Family | Weight | Size (px) | Line Height | Letter Spacing | Notes / Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `Playfair Display` | Bold (700) | `68px` | `110%` | `-0.02em` | Desktop Hero Heading |
| **Section H2** | `Playfair Display` | Bold (700) | `48px` | `115%` | `-0.015em`| Section Headings |
| **Card H3** | `Playfair Display` | Bold (700) | `24px` | `120%` | `0` | Course & Feature Titles |
| **Hero Slogan**| `Plus Jakarta Sans` | Semi-Bold (600) | `24px` | `130%` | `0` | Slogan below main headline |
| **Sub-Heading**| `Plus Jakarta Sans` | Medium (500) | `18px` | `170%` | `0` | Descriptions / Intro |
| **Body Base** | `Plus Jakarta Sans` | Regular (400) | `15px` | `160%` | `0` | Feature description lists |
| **Badge Upper**| `Plus Jakarta Sans` | Bold (700) | `12px` | `100%` | `0.08em` | Upper Pill Badge (All Caps) |
| **Button Text**| `Plus Jakarta Sans` | Bold (700) | `15px` | `100%` | `0` | Core CTA Buttons |

---

## 4. Layer Effects & Shadow Styles

Apply these effect styles inside Figma for consistent elevation:

```text
Style Name: [Gyanpeon - Subtle Card Shadow]
Type: Drop Shadow
------------------------------------
Color   : rgba(17, 17, 17, 0.04)
X-Offset: 0px
Y-Offset: 10px
Blur    : 30px
Spread  : 0px

Style Name: [Gyanpeon - Hover Card Shadow]
Type: Drop Shadow
------------------------------------
Color   : rgba(108, 99, 255, 0.12)
X-Offset: 0px
Y-Offset: 20px
Blur    : 40px
Spread  : 0px

Style Name: [Gyanpeon - Glass Background Blur]
Type: Background Blur
------------------------------------
Blur Radius: 16px
Fill Color : rgba(255, 255, 255, 0.85)
```

---

## 5. Main Component Layout Schematics (Auto-Layout)

Reconstruct these components in Figma using **Auto-Layout (Shift + A)** for absolute responsiveness.

### A. The Butterfly Logo Icon (Figma Vector Asset)
To draw the logo vector precisely, create a custom vector path with this path data:

```xml
<!-- Primary Icon Path Coordinates (32x32 ViewBox) -->
<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <!-- Antennae -->
  <path d="M16 14C17.5 10 20 8 22.5 7.5M16 14C15 11 13 9 11 8.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  <circle cx="22.5" cy="7.5" r="1" fill="#FFFFFF"/>
  <circle cx="11" cy="8.5" r="1" fill="#FFFFFF"/>
  <!-- Body -->
  <path d="M16 13.5V26.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="16" cy="15" rx="1.5" ry="3" fill="#FFFFFF"/>
  <!-- Left Wing Book Pages -->
  <path d="M14.5 15C10 11 4.5 11 3 15C2 18 5 23 14.5 25" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
  <!-- Right Wing Book Pages -->
  <path d="M17.5 15C22 11 27.5 11 29 15C30 18 27 23 17.5 25" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
</svg>
```

### B. Sticky Header Navbar
*   **Auto-Layout Configuration**: Horizontal Flow (`row`), Center Align, Gap: `Auto` (Space between components).
*   **Padding**: Left/Right: `24px`, Top/Bottom: `20px` (or `12px` on scroll).
*   **Logo Group Frame**: Gap `10px`, center aligned.
*   **Nav Group Links Frame**: Gap `32px`, center aligned.
*   **Auth Buttons Group**: Gap `16px`.
    *   *Login Button*: Transparent fill, Padding `10px 16px`.
    *   *Get Started Button*: Fill `#6C63FF`, border-radius `16px`, Padding `12px 24px`.

### C. Hero Header Section
*   **Layout Structure**: Horizontal Auto-Layout, Center Vertical Align, Width: `Fill Container`.
*   **Left Column (Auto-Layout Vertical Stack)**:
    *   Align: Left
    *   Gap: `20px` (Between Text Elements)
    *   *Category Pill*: Auto-Layout horizontal, Background `#EDE9FE`, Text Color `#6C63FF`, Border Radius `100px`, padding `8px 16px`.
    *   *Main Headline*: Playfair Display `68px`, line height `110%`.
    *   *Highlight Text Frame*: Wrap "Ace Every Exam" inside an Auto-Layout frame with absolute vector placement for the Orange underline vector.
    *   *Buttons Container*: Horizontal Auto-Layout, Gap `16px`. Primary button has a Drop Shadow effect matching `[Gyanpeon - Hover Card Shadow]`.
*   **Right Column (iPhone Mockup Container)**:
    *   Frame Width: `310px`, Height: `600px`, Border Radius `48px`.
    *   Set absolute layered frames for floating cards with standard `[Gyanpeon - Subtle Card Shadow]`.

---

## 6. Micro-Interactions (Figma Prototyping)

For interactive prototyping inside Figma, map states to these parameters:

| Component | Trigger | Animation Style | Destination Properties |
| :--- | :--- | :--- | :--- |
| **Navbar Dropdown** | `On Hover` | **Smart Animate** (Ease Out, `200ms`) | Reveal Mega Menu Overlay, opacity `100%`, translateY `+8px` |
| **Course Cards** | `On Hover` | **Smart Animate** (Ease Out, `250ms`) | Frame moves up `8px` (`y: -8px`), shadow style shifts from `Subtle` to `Hover Card Shadow` |
| **CTA Buttons** | `On Hover` | **Smart Animate** (Ease Out, `150ms`) | Button scale transforms to `103%`, moves up `2px` |
| **Hero Phone Frame** | `In-View` | **Looping/After Delay** (Ease-in-out, `6000ms`) | Looping vertical translation `y: -12px` (floating sequence) |

---

## 7. Developer-to-Designer Handoff Tokens

If you are using **Figma Token Studio** (formerly Figma Tokens) or standard Tailwind exports, map your variables to these keys:

```json
{
  "global": {
    "colors": {
      "brand-primary": "#6C63FF",
      "brand-secondary": "#8B5CF6",
      "text-primary": "#111111",
      "text-muted": "#6B7280"
    },
    "borderRadius": {
      "button": "16px",
      "card": "24px",
      "pill": "100px"
    },
    "fontFamilies": {
      "heading": "Playfair Display",
      "body": "Plus Jakarta Sans"
    }
  }
}
```

---
*Created dynamically for **Gyanpeon Technologies Ltd.** — Use these blueprints directly inside Figma by manually assigning values or copying design tokens.*
