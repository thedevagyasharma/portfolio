# Project Page Style Guide

This style guide documents the design system, spacing principles, and best practices for creating project case study pages in the portfolio.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Typography System](#typography-system)
3. [Spacing & Rhythm](#spacing--rhythm)
4. [Layout Patterns](#layout-patterns)
5. [Component Library](#component-library)
6. [Code Examples](#code-examples)
7. [Common Patterns](#common-patterns)

---

## Design Philosophy

### Core Principles

1. **Single Content Box Approach**: All project content lives in one continuous white box with natural spacing between elements
2. **Visual Hierarchy Through Spacing**: Use spacing ratios to create clear content relationships
3. **Grid-Aligned Heights**: Use `useGridSnap` hook for all major content boxes
4. **Token-Based Design**: All values reference CSS custom properties
5. **No Bold with Departure Mono**: Never use font-weight > 400 with the monospace font

### Gestalt Principles Applied

- **Proximity**: Related content has tighter spacing; unrelated content has larger gaps
- **Internal ≤ External Rule**: Internal padding/spacing never exceeds external margins
- **Visual Rhythm**: Consistent spacing ratios create predictable reading flow

---

## Typography System

### Font Families

```css
/* Monospace - Used for ALL body text, headings (h2, h3), labels */
font-family: var(--font_face-mono); /* Departure Mono */

/* Pixel Font - Used ONLY for project title (h1) */
font-family: var(--font_face-8bit); /* Press Start 2P */
```

### Font Weights

**CRITICAL RULE**: Never use bold (font-weight: 500, 600, 700) with Departure Mono

```css
/* Always use */
font-weight: 400;

/* Exception: Tags can use */
font-weight: 500; /* Only for .aspire-tag elements */
```

### Heading Hierarchy

```css
/* H1 - Project Title */
.aspire-content-box h1 {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: 0 0 var(--spacing-2) 0; /* Tight to description */
}

/* Override for project title specifically */
.aspire-title {
    font-family: var(--font_face-8bit);
}

/* H2 - Major Sections */
.aspire-content-box h2 {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: var(--spacing-8) 0 var(--spacing-2) 0; /* 64px top, 16px bottom */
}

/* H3 - Subsections */
.aspire-content-box h3 {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: var(--spacing-5) 0 var(--spacing-2) 0; /* 40px top, 16px bottom */
}

/* Paragraphs */
.aspire-content-box p {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: 0 0 var(--spacing-3) 0; /* 24px bottom */
}
```

---

## Spacing & Rhythm

### The 8px Base Unit System

All spacing values are multiples of 8px:

```css
--spacing-1: 8px   /* Micro spacing */
--spacing-2: 16px  /* Tight grouping */
--spacing-3: 24px  /* Paragraph spacing */
--spacing-4: 32px  /* Component separation */
--spacing-5: 40px  /* Subsection breaks */
--spacing-6: 48px  /* (Available) */
--spacing-7: 56px  /* Section breaks */
--spacing-8: 64px  /* Major transitions */

/* Grid-based spacing (multiples of 48px) */
--grid-size: 48px
--grid-spacing-1: 48px  /* Standard padding */
--grid-spacing-half: 24px
```

### Spacing Ratios

Based on UX research, these ratios create optimal visual hierarchy:

| Content Relationship | Spacing | Ratio |
|---------------------|---------|-------|
| Tight grouping (tags → title) | 16px | 1x |
| Paragraph breaks | 24px | 1.5x |
| Component separation | 32px | 2x |
| Subsection breaks (h3) | 40px | 2.5x |
| Section breaks (h2) | 64px | 4x |
| Major transitions | 64px | 4x |

### Spacing Decision Tree

```
Is content tightly related? (icon + heading, tag + title)
├─ YES → 16px (--spacing-2)
└─ NO → Continue...

Is it a paragraph break?
├─ YES → 24px (--spacing-3)
└─ NO → Continue...

Is it separating components? (cards, images, two-col layouts)
├─ YES → 32px (--spacing-4)
└─ NO → Continue...

Is it a subsection (h3)?
├─ YES → 40px above, 16px below (--spacing-5, --spacing-2)
└─ NO → Continue...

Is it a major section (h2) or transition?
└─ YES → 64px (--spacing-8)
```

### Special Spacing Rules

```css
/* First h2 after hero - no top margin */
.aspire-hero + h2 {
    margin-top: 0;
}

/* H2 after divider - no top margin (divider provides spacing) */
.aspire-divider + h2 {
    margin-top: 0;
}

/* Related card groups - reduced spacing */
.aspire-card-group + .aspire-card-group {
    margin-top: var(--spacing-4); /* 32px instead of default h2 margin */
}

/* Hero paragraph - medium spacing */
.aspire-hero > p {
    margin-bottom: var(--spacing-4); /* 32px to meta cards */
}
```

---

## Layout Patterns

### Page Structure

```tsx
<header className="header-wrapper">
    <div className="container">
        <div className="header-content">
            <NavLogo />
            <Navbar />
        </div>
    </div>
</header>

<main>
    {/* Breadcrumbs - 1 grid below navbar */}
    <section>
        <div className="container">
            <div className="aspire-breadcrumbs">
                {/* breadcrumb content */}
            </div>
        </div>
    </section>

    {/* Main Content - 1 grid below breadcrumbs */}
    <section className="aspire-content-section">
        <div className="container">
            <div ref={contentBoxRef} className="aspire-content-box">
                {/* ALL content in one box */}
            </div>
        </div>
    </section>
</main>
```

### Main Spacing

```css
/* Project-specific main margin */
main {
    margin-top: calc(var(--grid-size) * 2); /* 96px */
}
```

### Content Box

```css
.aspire-content-box {
    background-color: white;
    border: var(--border-standard);
    padding: var(--grid-spacing-1); /* 48px */
}
```

### Breadcrumbs

```css
.aspire-breadcrumbs {
    height: var(--grid-size); /* Exactly 48px (1 grid tile) */
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: 0 var(--spacing-4); /* Horizontal padding only */
    font-family: var(--font_face-mono);
    font-size: var(--font_body-small--size);
    background-color: white;
    border: var(--border-standard);
}
```

Structure:
```tsx
<div className="aspire-breadcrumbs">
    <a href="/" className="aspire-breadcrumb-link">Home</a>
    <span className="aspire-breadcrumb-separator">/</span>
    <a href="/work" className="aspire-breadcrumb-link">Work</a>
    <span className="aspire-breadcrumb-separator">/</span>
    <span className="aspire-breadcrumb-current">Project Name</span>
</div>
```

---

## Component Library

### 1. Hero Section

**Purpose**: Project introduction with metadata

**Structure**:
```tsx
<div className="aspire-hero">
    {/* Tags */}
    <div className="aspire-tags">
        <div className="aspire-tag">UX Design</div>
        <div className="aspire-tag">Visual Design</div>
    </div>

    {/* Title */}
    <h1 className="aspire-title">Project Name</h1>

    {/* Description */}
    <p className="large">Project description...</p>

    {/* Meta Cards */}
    <div className="aspire-meta-cards">
        <div className="aspire-meta-card">
            <div className="aspire-meta-label">My Role</div>
            <div className="aspire-meta-value">UX/UI Designer</div>
        </div>
        <div className="aspire-meta-card aspire-meta-card-large">
            <div className="aspire-meta-label">Tools</div>
            <div className="aspire-tools">
                <div className="aspire-tool-tag">Figma</div>
                <div className="aspire-tool-tag">Sketch</div>
            </div>
        </div>
    </div>

    {/* Optional Footnote */}
    <p className="aspire-footnote">Footnote text...</p>
</div>
```

**Spacing**:
- Tags → Title: 16px
- Title → Description: 16px (h1 default)
- Description → Meta cards: 32px
- Meta cards → Footnote: 16px
- Hero → Next section: 64px

**Styling**:
```css
.aspire-hero {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-8); /* 64px */
}

.aspire-tags {
    display: flex;
    gap: var(--spacing-2);
    flex-wrap: wrap;
    margin-bottom: var(--spacing-2);
}

.aspire-tag {
    height: var(--grid-size); /* Exactly 48px */
    padding: 0 var(--spacing-3);
    background-color: var(--color-accent);
    color: white;
    font-family: var(--font_face-mono);
    border: var(--border-standard);
    /* NO border-radius - sharp corners */
}

.aspire-meta-cards {
    display: flex;
    gap: var(--spacing-4);
    flex-wrap: wrap;
    margin-bottom: var(--spacing-2);
}

.aspire-meta-card {
    flex: 1;
    min-width: 200px;
    padding: var(--spacing-4);
    background-color: var(--color-surface);
    border: var(--border-standard);
}

.aspire-meta-card-large {
    flex: 2; /* Takes 2x space */
}
```

### 2. Card Groups

**Purpose**: Display 3 related items in a grid with dividers

**Types**:
1. Icon + Heading only
2. Image + Heading
3. Icon + Heading + Paragraph

**Structure**:
```tsx
<div className="aspire-card-group">
    <div className="aspire-card">
        <div className="aspire-card-icon">🎨</div>
        <h3>Card Title</h3>
    </div>
    <div className="aspire-card">
        <div className="aspire-card-icon">⚡</div>
        <h3>Card Title</h3>
    </div>
    <div className="aspire-card">
        <div className="aspire-card-icon">🚀</div>
        <h3>Card Title</h3>
    </div>
</div>

{/* With text */}
<div className="aspire-card-group aspire-card-group-with-text">
    <div className="aspire-card">
        <div className="aspire-card-icon">🎨</div>
        <h3>Card Title</h3>
        <p>Supporting text...</p>
    </div>
    {/* ... */}
</div>
```

**Styling**:
```css
.aspire-card-group {
    background-color: var(--color-surface);
    border: var(--border-standard);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: var(--spacing-4); /* 32px */
}

.aspire-card {
    padding: var(--grid-spacing-1); /* 48px */
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2); /* 16px between elements */
    align-items: flex-start;
    position: relative;
}

/* Vertical dividers between cards */
.aspire-card:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: calc(var(--grid-spacing-1) / 2);
    bottom: calc(var(--grid-spacing-1) / 2);
    width: 1px;
    background-color: var(--color-divider);
}

.aspire-card-icon {
    font-size: 3rem;
    line-height: 1;
}

.aspire-card h3 {
    font-family: var(--font_face-mono);
    margin: 0; /* Gap handles spacing */
}

.aspire-card-group-with-text .aspire-card p {
    font-family: var(--font_face-mono);
    color: var(--color-text-secondary);
    margin: 0; /* Gap handles spacing */
}
```

**Responsive**:
```css
@media (max-width: 768px) {
    .aspire-card-group {
        grid-template-columns: 1fr;
    }

    /* Hide vertical dividers */
    .aspire-card:not(:last-child)::after {
        display: none;
    }

    /* Add horizontal dividers */
    .aspire-card:not(:last-child)::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: calc(var(--grid-spacing-1) / 2);
        right: calc(var(--grid-spacing-1) / 2);
        height: 1px;
        background-color: var(--color-divider);
    }
}
```

### 3. Two-Column Layouts

**Purpose**: Side-by-side content with responsive gap

**Structure**:
```tsx
<div className="aspire-two-col">
    <div className="aspire-sub-box">
        <h3>Left Column</h3>
        <img src="..." alt="..." className="aspire-image" />
    </div>
    <div className="aspire-sub-box">
        <h3>Right Column</h3>
        <img src="..." alt="..." className="aspire-image" />
    </div>
</div>
```

**Styling**:
```css
.aspire-two-col {
    display: flex;
    flex-direction: row;
    /* Dynamic gap: 1 grid if odd cols, 2 grids if even cols */
    --gap-multiplier: calc(2 - mod(var(--grid-cols), 2));
    gap: calc(var(--grid-size) * var(--gap-multiplier));
    margin-bottom: var(--spacing-4);
}

.aspire-two-col > * {
    flex: 1;
}

.aspire-sub-box {
    background-color: var(--color-surface);
    border: var(--border-standard);
    padding: var(--spacing-4); /* 32px */
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
}

.aspire-sub-box h3 {
    margin: 0; /* Gap handles spacing */
    font-family: var(--font_face-mono);
}
```

**Responsive**:
```css
@media (max-width: 768px) {
    .aspire-two-col {
        flex-direction: column;
        gap: var(--grid-spacing-1);
    }
}
```

### 4. Horizontal Dividers

**Purpose**: Separate major content sections

**Structure**:
```tsx
<hr className="aspire-divider" />
```

**When to Use**:
- Between major content groups (Context → Problem → Solution → Results)
- Before/after goal statements
- Between distinct workflow phases

**Styling**:
```css
.aspire-divider {
    width: 100%;
    height: 1px;
    background-color: var(--color-divider);
    margin: var(--spacing-8) 0; /* 64px top and bottom */
    border: none;
}
```

### 5. Goal Statement

**Purpose**: Emphasize key objective or insight

**Structure**:
```tsx
<div className="aspire-goal-statement">
    Create a Design System to — reduce <strong>inconsistencies ⬇️</strong>,
    improve <strong>accessibility 👌🏻</strong>, and streamline the
    <strong>workflow</strong> 🚀.
</div>
```

**Styling**:
```css
.aspire-goal-statement {
    font-size: var(--font_heading-2--size);
    line-height: var(--font_heading-2--line-height);
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin-bottom: var(--spacing-8); /* Large space after */
}

.aspire-goal-statement strong {
    color: var(--color-accent); /* Highlight key words */
}
```

### 6. Images

**Full-width images**:
```tsx
<img src="..." alt="..." className="aspire-image" />
```

```css
.aspire-image {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: var(--spacing-4);
}
```

**Color grids** (5 columns):
```tsx
<div className="aspire-color-grid">
    <img src="..." alt="Primary Colors" />
    <img src="..." alt="Neutral Colors" />
    <img src="..." alt="Success Colors" />
    <img src="..." alt="Warning Colors" />
    <img src="..." alt="Error Colors" />
</div>
```

```css
.aspire-color-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-5);
}

.aspire-color-grid img {
    width: 100%;
    height: auto;
    display: block;
}

@media (max-width: 768px) {
    .aspire-color-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

---

## Code Examples

### Complete Page Template

```tsx
'use client';
import './ProjectName.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function ProjectName() {
    const contentBoxRef = useGridSnap();

    return (
        <>
            <header className="header-wrapper">
                <div className="container">
                    <div className="header-content">
                        <NavLogo />
                        <Navbar />
                    </div>
                </div>
            </header>

            <main>
                {/* Breadcrumbs */}
                <section>
                    <div className="container">
                        <div className="aspire-breadcrumbs">
                            <a href="/" className="aspire-breadcrumb-link">Home</a>
                            <span className="aspire-breadcrumb-separator">/</span>
                            <a href="/work" className="aspire-breadcrumb-link">Work</a>
                            <span className="aspire-breadcrumb-separator">/</span>
                            <span className="aspire-breadcrumb-current">Project Name</span>
                        </div>
                    </div>
                </section>

                {/* Main Content Box */}
                <section className="aspire-content-section">
                    <div className="container">
                        <div ref={contentBoxRef} className="aspire-content-box">

                            {/* Hero */}
                            <div className="aspire-hero">
                                {/* Hero content */}
                            </div>

                            <hr className="aspire-divider" />

                            {/* Section 1 */}
                            <h2>Section Title</h2>
                            <p>Content...</p>

                            <hr className="aspire-divider" />

                            {/* Section 2 */}
                            <h2>Another Section</h2>
                            <div className="aspire-card-group">
                                {/* Cards */}
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
```

### CSS Template Structure

```css
/* Main margin for this page */
main {
    margin-top: calc(var(--grid-size) * 2);
}

/* Breadcrumbs */
.aspire-breadcrumbs {
    height: var(--grid-size);
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: 0 var(--spacing-4);
    font-family: var(--font_face-mono);
    font-size: var(--font_body-small--size);
    background-color: white;
    border: var(--border-standard);
}

/* Content Section Spacing */
.aspire-content-section {
    padding-top: var(--grid-size);
}

/* Main Content Box */
.aspire-content-box {
    background-color: white;
    border: var(--border-standard);
    padding: var(--grid-spacing-1);
}

/* Typography defaults */
.aspire-content-box h1 {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: 0 0 var(--spacing-2) 0;
}

.aspire-content-box h2 {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: var(--spacing-8) 0 var(--spacing-2) 0;
}

.aspire-content-box h3 {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: var(--spacing-5) 0 var(--spacing-2) 0;
}

.aspire-content-box p {
    font-family: var(--font_face-mono);
    font-weight: 400;
    margin: 0 0 var(--spacing-3) 0;
}

/* Specific spacing adjustments */
.aspire-hero + h2 {
    margin-top: 0;
}

.aspire-divider + h2 {
    margin-top: 0;
}

/* Component spacing */
.aspire-card-group {
    margin-bottom: var(--spacing-4);
}

.aspire-two-col {
    margin-bottom: var(--spacing-4);
}

.aspire-image {
    margin-bottom: var(--spacing-4);
}

/* ... rest of component styles */
```

---

## Common Patterns

### Content Grouping Strategy

**1. Hero Section** (Standalone)
- Always at the top
- Followed by divider
- 64px bottom margin

**2. Context/Background** (Related paragraphs)
- May include subsections (h3)
- Followed by divider
- Sets up the problem

**3. Problem Definition** (Tightly related)
- Multiple card groups can be related
- Use reduced spacing between related card groups
- Followed by divider

**4. Goal/Solution Statement** (Major emphasis)
- Large spacing before and after
- Use dividers for emphasis
- Often uses `.aspire-goal-statement` styling

**5. Approach/Process** (Multi-part)
- Can include card groups and two-column layouts
- Followed by divider

**6. Detailed Work** (Multiple subsections)
- Many h3 subsections
- Mix of images, two-column layouts, grids
- Followed by divider

**7. Results/Outcomes** (Summary)
- Card groups work well
- Followed by divider

**8. Reflection/Learnings** (Closure)
- Final section
- Often uses card group with text
- No divider after (end of content)

### Spacing Between Sections

```
Hero (mb: 64px)
    ↓
<hr> (m: 64px 0)
    ↓
H2 (mt: 0 - divider provides space, mb: 16px)
Content (varies)
    ↓
<hr> (m: 64px 0)
    ↓
Next section...
```

### Common Mistakes to Avoid

❌ **Don't**: Use multiple white boxes
✅ **Do**: Use one content box with natural spacing

❌ **Don't**: Use bold with Departure Mono font
✅ **Do**: Use font-weight: 400 always

❌ **Don't**: Add border-radius to tags/chips
✅ **Do**: Keep sharp corners (no border-radius)

❌ **Don't**: Guess spacing values
✅ **Do**: Use the spacing token system

❌ **Don't**: Make all gaps the same size
✅ **Do**: Use spacing ratios based on content relationship

❌ **Don't**: Add margins inside cards when using gap
✅ **Do**: Reset margins to 0, let gap handle spacing

❌ **Don't**: Stack dividers with h2 margins
✅ **Do**: Remove h2 top margin when it follows a divider

---

## Design Tokens Reference

### Colors

```css
--color-foreground: /* Main text */
--color-background: /* Page background */
--color-surface: /* Card backgrounds */
--color-accent: /* Brand color for highlights */
--color-text-secondary: /* Muted text */
--color-divider: /* Border and divider lines */
```

### Typography

```css
--font_face-mono: 'Departure Mono', monospace;
--font_face-8bit: 'Press Start 2P', cursive;

--font_body--size: /* Standard body text */
--font_body-small--size: /* Small text, labels */
--font_body-large--size: /* Large body text */
--font_heading-2--size: /* H2 size */
--font_heading-2--line-height: /* H2 line-height */
```

### Borders

```css
--border-standard: 1px solid var(--color-foreground);
```

### Spacing (All values in px)

```css
--spacing-1: 8px
--spacing-2: 16px
--spacing-3: 24px
--spacing-4: 32px
--spacing-5: 40px
--spacing-6: 48px
--spacing-7: 56px
--spacing-8: 64px
--spacing-9: 72px
--spacing-10: 80px
--spacing-11: 88px
--spacing-12: 96px

--grid-size: 48px
--grid-spacing-1: 48px
--grid-spacing-half: 24px
```

---

## Accessibility Considerations

1. **Color Contrast**: Ensure all text meets WCAG AA standards
2. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
3. **Alt Text**: Always provide descriptive alt text for images
4. **Link States**: Breadcrumb links have hover states
5. **Focus States**: Ensure keyboard navigation works

---

## Performance Notes

1. **useGridSnap**: Use only ONE ref per page (on main content box)
2. **Image Optimization**: Use WebP format where possible
3. **Lazy Loading**: Images load as needed
4. **CSS Scope**: Project-specific classes are scoped to avoid conflicts

---

## Version History

- **v1.0** - Initial style guide based on Aspire Design System migration
- Established spacing system, typography rules, and component patterns
- Date: 2025-12-24

---

## Questions or Additions?

When creating new patterns:
1. Reference this guide for spacing decisions
2. Use the spacing decision tree
3. Follow the internal ≤ external rule
4. Test with `useGridSnap` to ensure grid alignment
5. Update this guide with new patterns

