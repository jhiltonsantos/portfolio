---
name: Cyber-Minimalist Portfolio
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#292a2b'
  surface-container-highest: '#333535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#bacbbc'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#859587'
  outline-variant: '#3c4a3f'
  surface-tint: '#22e286'
  primary: '#44f697'
  on-primary: '#00391d'
  primary-container: '#00d97e'
  on-primary-container: '#005930'
  inverse-primary: '#006d3c'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffd0b2'
  on-tertiary: '#502500'
  tertiary-container: '#ffaa6d'
  on-tertiary-container: '#783c06'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#5affa2'
  primary-fixed-dim: '#22e286'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#00522c'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb785'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713701'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 80px
---

## Brand & Style
This design system establishes a high-performance, technical aesthetic tailored for a professional tech portfolio. It leverages a "Dark Mode First" philosophy to create a focused, immersive environment that highlights engineering precision and creative output.

The visual style is a fusion of **Modern Minimalism** and **Technical Futurism**. It utilizes a "Terminal-Luxe" approach: the raw efficiency of developer tools refined with the spatial elegance of premium product design. The interface should feel fast, intentional, and authoritative, evoking an emotional response of "digital craftsmanship."

## Colors
The palette is built on a "Void and Glow" concept. The absolute black background (`#000000`) provides infinite depth, ensuring that the primary vibrant green (`#00D97E`) appears to emit light. 

- **Primary:** Used exclusively for calls to action, active states, and critical highlights.
- **Surface:** Secondary gray (`#1A1A1A`) is used for containers and cards to create subtle separation from the background without breaking the dark aesthetic.
- **Content:** Pure white is reserved for high-impact headings to ensure maximum readability, while light gray (`#D0D0D0`) is used for body text to reduce eye strain and establish hierarchy.

## Typography
The typography system uses a tri-font structure to reinforce the technical narrative. 

- **Sora** handles headings with its wide, geometric stance, giving the portfolio a modern, "built" feel. Use tight letter spacing for large display text.
- **Hanken Grotesk** provides a clean, highly legible experience for long-form content and project descriptions.
- **JetBrains Mono** is used sparingly for labels, metadata, and "code-like" details to emphasize the technical proficiency of the work.

All headings should be pure white (`#FFFFFF`). Body text should utilize the neutral light gray (`#D0D0D0`) to maintain a soft contrast ratio that remains accessible.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous vertical breathing room to allow individual projects to stand alone.

- **Grid:** Use a 12-column grid for desktop with 24px gutters. Elements should generally align to the grid, but "break-out" sections for imagery are encouraged.
- **Rhythm:** Vertical spacing should be aggressive. Use `stack-lg` (80px) between major sections to emphasize the minimalist "gallery" feel.
- **Responsibility:** On mobile, collapse to a single column with 20px side margins. Scale typography using the mobile-specific tokens to prevent clipping and ensure readability.

## Elevation & Depth
In an absolute black environment, traditional shadows are ineffective. Instead, this design system uses **Tonal Layering** and **Subtle Outlines**:

- **Layer 0:** Background (`#000000`).
- **Layer 1:** Surface containers (`#1A1A1A`) used for project cards and navigation bars.
- **Accents:** Use 1px solid borders (`#2A2A2A`) to define edges of containers.
- **Glow:** For the primary green elements, use a soft, low-opacity outer glow (`0px 0px 20px rgba(0, 217, 126, 0.2)`) instead of a shadow to simulate a light-emitting interface.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding provides a professional, "machined" edge that feels more sophisticated than sharp 90-degree corners, without losing the technical precision of the brand.

- **Primary Buttons:** Apply `rounded-lg` (0.5rem) for a more approachable feel.
- **Project Cards:** Use the standard 0.25rem rounding with a 1px stroke.
- **Interactive Elements:** Hover states should transition the stroke color from `#2A2A2A` to the primary green `#00D97E`.

## Components
- **Buttons:** Primary buttons use a solid background of `#00D97E` with black text. Secondary buttons are ghost-style with a 1px white or green border and no fill.
- **Cards:** Project cards should have a background of `#1A1A1A`. Images within cards should have a slight grayscale filter that saturates on hover.
- **Chips/Tags:** Use **JetBrains Mono** in all-caps for tags. Backgrounds should be a dark tint of the primary color (`rgba(0, 217, 126, 0.1)`) with green text.
- **Inputs:** Dark fields (`#0B0B0B`) with a bottom-border only, or a subtle 1px outline. The focus state must use a glowing green border.
- **Lists:** Use custom bullet points (small green squares or "code-style" arrows `->`) instead of standard browser dots.
- **Project Navigation:** Implement a "Next Project" footer at the bottom of case studies that uses the `display-lg` typography for a bold, immersive transition.