# Night Login Design System

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Status**: Living Document

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons & Graphics](#icons--graphics)
7. [Animations & Transitions](#animations--transitions)
8. [Responsive Design](#responsive-design)
9. [Accessibility Guidelines](#accessibility-guidelines)
10. [Usage Examples](#usage-examples)

---

## Brand Identity

### Mission

Night Login is a semi-independent organization under KMTETI FT UGM that serves as a computer society for IT students. We foster learning through hands-on project experience while providing professional IT services to clients.

### Brand Personality

- **Professional**: Delivering quality IT solutions with enterprise-grade standards
- **Tech-Savvy**: Cutting-edge technology and modern development practices
- **Student-Friendly**: Accessible, educational, and community-driven approach

### Voice & Tone

- **Professional yet approachable**: Knowledgeable but not intimidating
- **Confident**: Showcase expertise without arrogance
- **Encouraging**: Inspire students to learn and clients to collaborate

### Tagline
>
> "Are you ready to log the night away?"

*Web-specific tagline emphasizing the dedication and late-night coding culture

---

## Color System

### Primary Colors

#### Brand Red

```css
--color-red: #D62340
```

- **Usage**: Primary CTAs, important highlights, active states, brand emphasis
- **Accessibility**: WCAG AA compliant for large text on white backgrounds
- **Variations**:
  - Hover: `#B71A34` (darker)
  - Active: `#9F1629` (darkest)
  - Light: `#E84A66` (10% lighter)

#### Dark Tones

```css
--color-dark-1: #2E2E2E  /* Primary dark */
--color-dark-2: #242424  /* Secondary dark */
--color-black: #000000   /* Pure black for gradients */
```

- **Usage**: Text, backgrounds, UI elements, illustrations
- **Dark-1**: Headers, primary text, buttons
- **Dark-2**: Secondary backgrounds, cards, elevated surfaces

#### Neutral/Background Colors

```css
--color-neutral-1: #FAFAFA  /* Primary background */
--color-neutral-2: #F5F5F5  /* Secondary background */
```

- **Usage**: Page backgrounds, card backgrounds, input fields
- **Neutral-1**: Main page background (body)
- **Neutral-2**: Hover states, secondary backgrounds

### Secondary Colors

#### Input & Form Colors

```css
--color-input-bg: #F3F3F3
--color-input-bg-focus: rgba(243, 243, 243, 0.8)
```

#### Feedback Colors

```css
--color-success: #10B981  /* Green */
--color-warning: #F59E0B  /* Amber */
--color-error: #EF4444    /* Red */
--color-info: #3B82F6     /* Blue */
```

#### Text Colors

```css
--color-text-primary: #2E2E2E
--color-text-secondary: #606060
--color-text-disabled: #A8A8A8
--color-text-inverse: #FAFAFA
```

### Gradient Palettes

#### Button Gradients

```css
/* Dark Button Gradient */
background: linear-gradient(180deg, #2E2E2E 0%, #000000 100%);

/* Red Button Gradient */
background: linear-gradient(180deg, #D62340 0%, #B71A34 100%);
```

#### Decorative Gradient

```css
/* Drone/Illustration Gradient */
background: linear-gradient(180deg, transparent 0%, #D62340 50%);
opacity: 0.5;
```

### Color Usage Guidelines

| Element | Color | Notes |
|---------|-------|-------|
| Primary CTA | Red gradient | "Request Project", "Login", "Register" |
| Secondary CTA | Dark gradient | "Learn More", navigation actions |
| Body text | Dark-1 (#2E2E2E) | Paragraphs, descriptions |
| Headings | Dark-1 (#2E2E2E) | All heading levels |
| Subtext | Text-secondary (#606060) | Captions, helper text |
| Disabled | Text-disabled (#A8A8A8) | Inactive elements |
| Links | Red (#D62340) | Hover: underline |
| Active state | Red (#D62340) | Selected nav items, tabs |
| Input background | #F3F3F3 | Forms, text areas |
| Card background | Neutral-2 (#F5F5F5) | Project cards, testimonials |

---

## Typography

### Font Families

#### Primary Font: Poppins

```css
font-family: 'Poppins', sans-serif;
```

- **Usage**: Body text, UI elements, buttons, most content
- **Weights Available**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)
- **Source**: Google Fonts

#### Secondary Font: Plus Jakarta Sans

```css
font-family: 'Plus Jakarta Sans', sans-serif;
```

- **Usage**: Alternative for specific UI elements (currently minimal usage)
- **Weights Available**: 200-800
- **Source**: Google Fonts

### Type Scale

#### Headings

```css
/* H1 - Hero/Page Titles */
.text-h1 {
  font-size: 64px;      /* Desktop */
  font-size: 45px;      /* Tablet */
  font-weight: 700;     /* Bold */
  line-height: 100%;
  color: #2E2E2E;
}

/* H2 - Section Titles */
.text-h2 {
  font-size: 50px;      /* Desktop */
  font-size: 40px;      /* Tablet */
  font-size: 35px;      /* Mobile */
  font-weight: 700;
  line-height: 110%;
}

/* H3 - Component Titles */
.text-h3 {
  font-size: 36px;
  font-weight: 700;
  line-height: 120%;
}

/* H4 - Card Titles */
.text-h4 {
  font-size: 24px;
  font-weight: 600;
  line-height: 130%;
}

/* H5 - Subsection Titles */
.text-h5 {
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
}

/* H6 - Small Titles */
.text-h6 {
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
}
```

#### Body Text

```css
/* Large Body */
.text-body-lg {
  font-size: 20px;
  font-weight: 500;
  line-height: 160%;
}

/* Regular Body */
.text-body {
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
}

/* Small Body */
.text-body-sm {
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
}

/* Extra Small */
.text-body-xs {
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
}
```

#### Labels & UI Text

```css
/* Form Labels */
.text-label {
  font-size: 20px;      /* Desktop */
  font-size: 16px;      /* Mobile */
  font-weight: 600;
}

/* Button Text */
.text-button {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* Caption/Helper Text */
.text-caption {
  font-size: 14px;
  font-weight: 400;
  color: #A8A8A8;
  font-style: italic;
}
```

### Typography Guidelines

- **Line Length**: Max 70-80 characters for optimal readability
- **Paragraph Spacing**: 1.5em between paragraphs
- **Letter Spacing**: Default (0) for body text, slight increase (0.02em) for buttons
- **Text Alignment**: Left-aligned for body text, center-aligned for marketing content
- **Capitalization**:
  - Sentence case for body text
  - Title case for headings
  - UPPERCASE for labels/tags (e.g., "PROJECTS", "WEBSITE")

---

## Spacing & Layout

### Spacing System

Based on 4px grid system:

```css
--space-1: 4px;    /* 0.25rem */
--space-2: 8px;    /* 0.5rem */
--space-3: 12px;   /* 0.75rem */
--space-4: 16px;   /* 1rem */
--space-5: 20px;   /* 1.25rem */
--space-6: 24px;   /* 1.5rem */
--space-8: 32px;   /* 2rem */
--space-10: 40px;  /* 2.5rem */
--space-12: 48px;  /* 3rem */
--space-16: 64px;  /* 4rem */
--space-20: 80px;  /* 5rem */
--space-24: 96px;  /* 6rem */
--space-32: 128px; /* 8rem */
```

### Common Spacing Patterns

```css
/* Component Internal Padding */
.component-padding-sm { padding: 16px; }      /* Small cards */
.component-padding-md { padding: 24px; }      /* Medium cards */
.component-padding-lg { padding: 32px 48px; } /* Large sections */

/* Section Spacing */
.section-spacing-y { padding: 100px 0; }      /* Vertical section spacing */
.section-spacing-top { padding-top: 80px; }   /* Top spacing */
.section-spacing-bottom { padding-bottom: 100px; } /* Bottom spacing */

/* Element Gaps */
.gap-sm { gap: 16px; }  /* Small gaps between items */
.gap-md { gap: 22px; }  /* Medium gaps */
.gap-lg { gap: 32px; }  /* Large gaps */
```

### Grid & Layout

#### Container Widths

```css
.container-sm { max-width: 640px; }   /* Small content */
.container-md { max-width: 768px; }   /* Medium content */
.container-lg { max-width: 1024px; }  /* Large content */
.container-xl { max-width: 1280px; }  /* Extra large */
.container-2xl { max-width: 1536px; } /* Full width */
```

#### Common Layouts

Full-Width Section

```css
width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
```

Centered Content

```css
margin: 0 auto;
padding: 0 2.5%; /* Horizontal padding */
max-width: 1280px;
```

Two-Column Layout

```css
display: flex;
flex-direction: column; /* Mobile */
gap: 32px;

@media (min-width: 1024px) {
  flex-direction: row;
}
```

---

## Components

### Buttons

#### Primary Button (Red)

```jsx
<button className="bg-gradient-to-b from-red to-[#B71A34] 
                   px-[30px] py-[10px] 
                   text-white font-bold rounded-full
                   transition duration-200 hover:opacity-90">
  Request Project Now!
</button>
```

**Specifications**:

- Background: Linear gradient (Red to #B71A34)
- Padding: 30px horizontal, 10px vertical
- Border radius: Full (rounded-full)
- Font: Bold, white text
- Hover: 90% opacity
- Transition: 200ms

#### Secondary Button (Dark)

```jsx
<button className="bg-gradient-to-b from-dark-1 to-black 
                   px-[30px] py-[10px] 
                   text-white font-bold rounded-full
                   transition duration-200 hover:opacity-90">
  Learn More
</button>
```

#### Text Button

```jsx
<button className="text-red hover:underline font-semibold">
  Register Now
</button>
```

#### OAuth Button (Google/GitHub)

```jsx
<button className="bg-neutral-2 transition-colors hover:bg-neutral-200 
                   text-dark-1 py-2 rounded-md flex px-2 w-full">
  <Image src={GoogleIcon} alt="" className="absolute" />
  <span className="w-full font-semibold">Sign In with Google</span>
</button>
```

**Button States**:

- **Default**: Full opacity, gradient background
- **Hover**: 90% opacity / background color change
- **Active**: 80% opacity
- **Disabled**: 40% opacity, no pointer events
- **Focus**: 2px outline, red color

### Form Elements

#### Input Field

```jsx
<div className="flex flex-col gap-4">
  <label className="font-semibold text-[16px] lg:text-[20px]">
    Email
  </label>
  <input
    className="w-full bg-[#F3F3F3] px-8 py-4 rounded-lg focus:outline-none"
    type="email"
    placeholder="Enter your Email"
  />
</div>
```

**Specifications**:

- Background: #F3F3F3
- Padding: 32px horizontal, 16px vertical
- Border radius: 8px (rounded-lg)
- Focus: Remove outline, can add subtle shadow
- Placeholder: #A8A8A8 color

#### Password Input (with Toggle)

```jsx
<div className="relative">
  <input
    className="w-full bg-[#F3F3F3] px-8 py-4 rounded-lg focus:outline-none"
    type={isPasswordHidden ? "password" : "text"}
  />
  <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
    <Image 
      src={isPasswordHidden ? EyeOff : Eye} 
      onClick={toggleVisibility}
      className="cursor-pointer"
    />
  </div>
</div>
```

#### Textarea

```jsx
<textarea
  className="w-full bg-[#f3f3f3]/80 focus:bg-[#f3f3f3] 
             py-4 px-6 rounded-[10px] focus:outline-none 
             min-h-[200px]"
  placeholder="Describe your project..."
/>
```

#### Select Dropdown

```jsx
<select className="w-full bg-[#F3F3F3] px-8 py-4 rounded-lg 
                   focus:outline-none appearance-none"
        aria-label="Select option">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Cards

#### Project Card

```jsx
<div className="bg-neutral-2 rounded-xl overflow-hidden 
                shadow-md hover:shadow-lg transition-shadow 
                duration-300">
  <Image src={projectImage} alt={title} className="w-full h-48 object-cover" />
  <div className="p-6">
    <span className="text-xs font-bold text-red uppercase tracking-wide">
      {tag}
    </span>
    <h3 className="text-xl font-bold mt-2 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
</div>
```

#### Team Member Card

```jsx
<div className="bg-white rounded-2xl overflow-hidden shadow-lg 
                transform transition-transform duration-300 
                hover:scale-105">
  <Image src={photo} alt={name} className="w-full h-64 object-cover" />
  <div className="p-6 text-center">
    <h4 className="font-bold text-lg">{name}</h4>
    <p className="text-red font-semibold text-sm">{role}</p>
    <p className="text-gray-500 text-xs mt-2">{division}</p>
  </div>
</div>
```

#### Talent Card

```jsx
<div className="bg-white rounded-lg shadow-md p-6 
                border-2 border-transparent 
                hover:border-red transition-all duration-300">
  <Image src={avatar} className="w-20 h-20 rounded-full mx-auto" />
  <h3 className="font-bold text-center mt-4">{name}</h3>
  <div className="flex flex-wrap gap-2 mt-3 justify-center">
    {skills.map(skill => (
      <span className="px-3 py-1 bg-neutral-2 rounded-full text-xs">
        {skill}
      </span>
    ))}
  </div>
  <button className="w-full mt-4 py-2 bg-red text-white rounded-lg 
                     hover:bg-[#B71A34] transition">
    View Profile
  </button>
</div>
```

### Navigation

#### Header/Navbar

```jsx
<nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md 
                shadow-sm z-50 px-14 py-6">
  <div className="flex justify-between items-center">
    <Image src={Logo} alt="Night Login" className="h-10" />
    <div className="hidden md:flex gap-8">
      {navLinks.map(link => (
        <a className="font-semibold hover:text-red transition">
          {link}
        </a>
      ))}
    </div>
  </div>
</nav>
```

#### Dashboard Sidebar

```jsx
<aside className="w-64 bg-white h-screen fixed left-0 top-0 
                  border-r border-gray-200 shadow-sm">
  <div className="p-6">
    <Image src={Logo} className="h-12 mb-8" />
    <nav className="space-y-2">
      {menuItems.map(item => (
        <a className={`flex items-center gap-3 px-4 py-3 rounded-lg
                       transition-colors
                       ${isActive ? 'bg-red text-white' : 'hover:bg-neutral-2'}`}>
          <Image src={item.icon} className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </a>
      ))}
    </nav>
  </div>
</aside>
```

### Badges & Tags

#### Status Badge

```jsx
<span className="px-3 py-1 rounded-full text-xs font-bold uppercase
               bg-green-100 text-green-800">
  Active
</span>
```

**Badge Variants**:

```css
/* Success */
.badge-success { background: #D1FAE5; color: #065F46; }

/* Warning */
.badge-warning { background: #FEF3C7; color: #92400E; }

/* Error */
.badge-error { background: #FEE2E2; color: #991B1B; }

/* Info */
.badge-info { background: #DBEAFE; color: #1E40AF; }

/* Neutral */
.badge-neutral { background: #F3F4F6; color: #1F2937; }
```

#### Project Tag

```jsx
<span className="text-xs font-bold text-red uppercase tracking-wide 
               bg-red/10 px-3 py-1 rounded-full">
  WEBSITE
</span>
```

### Modal/Dialog

```jsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center 
                z-50 animate-scale-up">
  <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 
                  shadow-2xl max-h-[90vh] overflow-y-auto">
    <div className="flex justify-between items-start mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <XIcon />
      </button>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
</div>
```

### Toast Notifications

Using `react-toastify`:

```jsx
<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>
```

**Toast Usage**:

```javascript
// Success
toast.success("Project request submitted successfully!");

// Error
toast.error("Login failed. Please check your credentials.");

// Info
toast.info("Please complete your profile.");

// Warning
toast.warning("Your session will expire soon.");
```

---

## Icons & Graphics

### Icon System

#### Icon Sources

- **Custom SVG Icons**: Eye, Eye-Off, Arrow Left, Arrow Right
- **Division Logos**: NADC, NCSC, NDSC, NGDC, NHCI, NWDC (custom SVG)
- **Social Icons**: Google, GitHub, Instagram, LinkedIn, Line

#### Icon Specifications

```css
/* Small Icons */
.icon-sm { width: 16px; height: 16px; }

/* Medium Icons (Default) */
.icon-md { width: 24px; height: 24px; }

/* Large Icons */
.icon-lg { width: 32px; height: 32px; }

/* Extra Large Icons */
.icon-xl { width: 48px; height: 48px; }
```

#### Icon Usage Guidelines

- Use consistent stroke width (2px for outline icons)
- Maintain square aspect ratio (1:1)
- Use currentColor for inline SVGs to inherit text color
- Add aria-label or title for accessibility

### Decorative Graphics

#### Background Decorations

- **DecoTop**: Abstract top-right decoration
- **DecoBot**: Abstract bottom decoration
- **DecoBotRight**: Bottom-right decoration
- **DecoNLLogo**: Large NL watermark logo
- **AboutUsDeco**: Section decoration accent

**Usage Pattern**:

```jsx
<div className="relative">
  <Image src={DecoTop} 
         className="absolute top-0 right-0 max-w-[420px] w-[33%] min-w-[300px]" 
         alt="" 
  />
  {/* Content */}
</div>
```

#### Illustrations

**Drone Illustration** (Solutions Section):

- Custom SVG with animated propeller blades
- Uses gradient fills with brand colors
- Responsive sizing with viewBox

**Hero Graphics**:

- HeroMain (Desktop): Large "Night Login" wordmark
- HeroMobile (Mobile): Compact version

### Logo Usage

#### Primary Logo

- **Color Version**: Full color on light backgrounds
- **White Version**: On dark backgrounds (#2E2E2E, #242424)
- **Red Version**: For special emphasis
- **Minimum Size**: 120px width
- **Clear Space**: Minimum 20px on all sides

#### Logo Files

- `Logo.svg` - Primary color version
- `Logo-White.png` - White version
- `LogoRed.png` - Red version
- `DashboardLogo.png` - Favicon/small version

---

## Animations & Transitions

### CSS Animations

#### Horizontal Bounce

```css
@keyframes horizontalBounce {
  from { transform: translateX(-4px); }
  to { transform: translateX(4px); }
}

.animate-bounce-x {
  animation: horizontalBounce 500ms alternate infinite ease-out;
}
```

**Usage**: "Back to Home" button arrow on hover

#### Blade Rotation (Drone Propellers)

```css
@keyframes BladeR {
  from { transform: scaleX(-1) translateX(-15px); }
  to { transform: scaleX(1); }
}

@keyframes BladeL {
  from { transform: scaleX(-1) translateX(15px); }
  to { transform: scaleX(1); }
}

.animate-blade-r {
  animation: BladeR 1000ms linear alternate infinite;
}

.animate-blade-l {
  animation: BladeL 1000ms linear alternate infinite;
  animation-delay: 300ms;
}
```

**Usage**: Drone illustration propeller animation

#### Shake Animation

```css
@keyframes shake {
  0% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateY(-5px); }
  50% { transform: translateY(5px) rotate(8deg); }
  75% { transform: translateY(-5px); }
  100% { transform: translateX(0); }
}

.notice-me {
  display: block;
  animation: shake 4s ease-in-out infinite;
}
```

**Usage**: Call attention to interactive elements

#### Scale Up

```css
@keyframes scale-up {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-scale-up {
  animation: scale-up 0.2s ease-out forwards;
}
```

**Usage**: Modal/dialog entrance animation

### Transition Patterns

#### Standard Transitions

```css
/* Default (general hover effects) */
transition: all 200ms ease;

/* Color changes */
transition: color 200ms ease, background-color 200ms ease;

/* Transform effects */
transition: transform 300ms ease-out;

/* Shadow effects */
transition: box-shadow 300ms ease;

/* Opacity changes */
transition: opacity 200ms ease;
```

#### Component-Specific Transitions

**Button Hover**:

```css
transition: opacity 200ms ease;
hover:opacity-90
```

**Card Hover**:

```css
transition: transform 300ms ease-out, box-shadow 300ms ease;
hover:transform hover:scale-105 hover:shadow-lg
```

**Link Hover**:

```css
transition: color 200ms ease;
hover:text-red hover:underline
```

### Scroll Animations (AOS)

Using `aos` library for scroll-triggered animations:

```jsx
// Fade up
<div data-aos="fade-up">Content</div>

// Fade right
<div data-aos="fade-right">Content</div>

// Fade left
<div data-aos="fade-left">Content</div>

// Zoom in
<div data-aos="zoom-in">Content</div>
```

**AOS Configuration**:

```javascript
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,  // Animation happens only once
  offset: 100  // Offset from viewport
});
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
/* xs: 0px - 639px (default) */

/* sm: Small devices (tablets) */
@media (min-width: 640px) { }

/* md: Medium devices (small laptops) */
@media (min-width: 768px) { }

/* lg: Large devices (desktops) */
@media (min-width: 1024px) { }

/* xl: Extra large devices */
@media (min-width: 1280px) { }

/* 2xl: Extra extra large devices */
@media (min-width: 1536px) { }
```

### Responsive Patterns

#### Responsive Typography

```jsx
<h1 className="text-[45px] md:text-[50px] lg:text-[64px]">
  Heading
</h1>

<p className="text-[14px] md:text-[16px]">
  Body text
</p>
```

#### Responsive Layout

```jsx
<div className="flex flex-col lg:flex-row gap-8">
  {/* Stacks vertically on mobile, horizontal on desktop */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

#### Responsive Spacing

```jsx
<section className="py-10 md:py-20 px-6 md:px-12">
  {/* Smaller padding on mobile */}
</section>
```

#### Responsive Images

```jsx
{/* Show different images for mobile/desktop */}
<Image src={HeroMain} className="hidden sm:block" />
<Image src={HeroMobile} className="sm:hidden" />
```

#### Responsive Navigation

```jsx
{/* Hide on mobile, show on tablet+ */}
<nav className="hidden md:flex gap-8">
  {navLinks}
</nav>

{/* Show on mobile only */}
<button className="md:hidden">
  <MenuIcon />
</button>
```

### Touch Targets

Minimum touch target size: **44x44px** for interactive elements on mobile devices.

```css
/* Increase padding for mobile buttons */
@media (max-width: 767px) {
  button {
    min-height: 44px;
    min-width: 44px;
  }
}
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast

- **Normal Text** (< 18px): Minimum 4.5:1 contrast ratio
- **Large Text** (≥ 18px): Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

**Compliant Combinations**:

- ✅ `#D62340` (Red) on `#FAFAFA` (White) - 4.8:1
- ✅ `#2E2E2E` (Dark) on `#FAFAFA` (White) - 14.2:1
- ✅ `#FAFAFA` (White) on `#2E2E2E` (Dark) - 14.2:1

#### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Tab order must be logical

```css
/* Focus styles */
button:focus,
input:focus,
a:focus {
  outline: 2px solid #D62340;
  outline-offset: 2px;
}
```

#### Screen Reader Support

**Proper Labeling**:

```jsx
{/* Form inputs */}
<label htmlFor="email">Email</label>
<input id="email" aria-label="Email address" />

{/* Buttons */}
<button aria-label="Close modal">
  <XIcon />
</button>

{/* Links */}
<a href="/download" aria-label="Download VBG NADC wallpaper">
  Download
</a>

{/* Images */}
<Image src={icon} alt="Night Login logo" />
<Image src={decoration} alt="" /> {/* Decorative, hide from screen readers */}
```

**ARIA Attributes**:

```jsx
{/* Navigation */}
<nav aria-label="Main navigation">
  {navLinks}
</nav>

{/* Modal */}
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Project Details</h2>
</div>

{/* Loading states */}
<div role="status" aria-live="polite">
  Loading projects...
</div>
```

#### Motion & Animation

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Usage Examples

### Landing Page Hero Section

```jsx
<section className="min-h-screen flex justify-center items-center 
                    overflow-x-hidden relative z-[1] px-[2.5%]">
  <div data-aos="fade-up" 
       className="relative flex justify-start items-center 
                  w-fit max-w-full md:max-w-[1000px]">
    <Image src={HeroMain} alt="Night Login Hero" 
           className="w-full hidden min-[500px]:block" />
    <Image src={HeroMobile} alt="Night Login Hero" 
           className="w-full min-[500px]:hidden" />
    <div className="text-[14px] md:text-[16px] bg-dark-2 
                    font-semibold absolute top-[calc(100%+7px)] 
                    left-0 text-neutral-1 px-[34px] py-3 
                    rounded-[25px] rounded-bl-[37px] rounded-tl-[0px]">
      Are you ready to log the night away?
    </div>
  </div>
</section>
```

### Form with Validation

```jsx
<form onSubmit={handleSubmit} className="w-full md:w-3/5 lg:w-[30%] 
                                         flex flex-col gap-6">
  <div className="flex flex-col gap-4">
    <label htmlFor="email" 
           className="font-semibold text-[16px] lg:text-[20px]">
      Email
    </label>
    <input
      id="email"
      type="email"
      required
      className="w-full bg-[#F3F3F3] px-8 py-4 
                 rounded-lg focus:outline-none"
      placeholder="Enter your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      aria-describedby="email-error"
    />
    {error && (
      <span id="email-error" className="text-error text-sm" role="alert">
        {error}
      </span>
    )}
  </div>
  
  <button type="submit" 
          className="bg-red text-neutral-1 py-2 rounded-md 
                     transition-colors hover:bg-rose-700 
                     active:bg-rose-600">
    Login
  </button>
</form>
```

### Dashboard Card Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                gap-6 p-10">
  {projects.map(project => (
    <div key={project.id} 
         className="bg-white rounded-xl shadow-md p-6 
                    hover:shadow-lg transition-shadow duration-300">
      <Image src={project.image} 
             alt={project.title}
             className="w-full h-48 object-cover rounded-lg mb-4" />
      <span className="text-xs font-bold text-red uppercase">
        {project.tag}
      </span>
      <h3 className="font-bold text-xl mt-2 mb-3">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-3">
        {project.description}
      </p>
      <button className="mt-4 w-full py-2 bg-red text-white 
                         rounded-lg hover:bg-[#B71A34] 
                         transition-colors">
        View Details
      </button>
    </div>
  ))}
</div>
```

---

## Design Tokens

For developers integrating this design system into other frameworks or platforms:

```json
{
  "colors": {
    "brand": {
      "red": "#D62340",
      "redDark": "#B71A34",
      "redDarker": "#9F1629"
    },
    "dark": {
      "primary": "#2E2E2E",
      "secondary": "#242424",
      "pure": "#000000"
    },
    "neutral": {
      "100": "#FAFAFA",
      "200": "#F5F5F5",
      "300": "#F3F3F3"
    },
    "text": {
      "primary": "#2E2E2E",
      "secondary": "#606060",
      "disabled": "#A8A8A8"
    },
    "feedback": {
      "success": "#10B981",
      "warning": "#F59E0B",
      "error": "#EF4444",
      "info": "#3B82F6"
    }
  },
  "typography": {
    "fontFamily": {
      "primary": "Poppins, sans-serif",
      "secondary": "Plus Jakarta Sans, sans-serif"
    },
    "fontSize": {
      "h1": "64px",
      "h2": "50px",
      "h3": "36px",
      "h4": "24px",
      "h5": "20px",
      "h6": "16px",
      "body": "16px",
      "bodyLarge": "20px",
      "bodySmall": "14px",
      "caption": "12px"
    },
    "fontWeight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
    "20": "80px",
    "24": "96px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "2xl": "24px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  }
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Oct 2024 | Initial design system documentation |

---

## Credits & Resources

- **Design Team**: Night Login Design Committee
- **Fonts**: [Google Fonts](https://fonts.google.com)
  - Poppins by Indian Type Foundry
  - Plus Jakarta Sans by Tokotype
- **Animation Library**: [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- **Icons**: Custom SVG + OAuth provider icons
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com)

---

**For questions or contributions to this design system, contact the Night Login development team.**
