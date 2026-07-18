---
name: Structural Integrity
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#584237'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8c7265'
  outline-variant: '#dfc0b2'
  surface-tint: '#9e4300'
  primary: '#9e4300'
  on-primary: '#ffffff'
  primary-container: '#f47321'
  on-primary-container: '#562100'
  inverse-primary: '#ffb691'
  secondary: '#595f67'
  on-secondary: '#ffffff'
  secondary-container: '#dde3ec'
  on-secondary-container: '#5f656d'
  tertiary: '#5b5f61'
  on-tertiary: '#ffffff'
  tertiary-container: '#96999b'
  on-tertiary-container: '#2e3133'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb691'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#793100'
  secondary-fixed: '#dde3ec'
  secondary-fixed-dim: '#c1c7d0'
  on-secondary-fixed: '#161c23'
  on-secondary-fixed-variant: '#41474f'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1440px
---

## Brand & Style

This design system is built for the construction and civil engineering sector, emphasizing reliability, physical scale, and technical precision. The brand personality is authoritative yet approachable, reflecting the expertise required to execute large-scale infrastructure projects.

The design style is **Corporate / Modern** with a lean toward **Industrial Functionalism**. It utilizes clean lines, high-contrast sectioning, and generous whitespace to ensure project photography and technical data remain the focal point. The aesthetic avoids unnecessary ornamentation, opting instead for a "built" feel—where every UI element serves a clear structural purpose. The emotional response should be one of absolute trust and permanence.

## Colors

The palette is derived from the high-visibility and raw materials of a job site. 

- **Primary (Safety Orange):** Used exclusively for call-to-actions, critical highlights, and progress indicators. It provides a high-contrast focal point against the neutral base.
- **Secondary (Deep Slate Gray):** The foundation for typography and structural elements. It conveys the weight and strength of steel.
- **Tertiary (Concrete Gray):** Used for borders, subtle backgrounds, and secondary information, mimicking the textures of modern infrastructure.
- **Neutral (Architectural White):** Provides a clean, sterile canvas that ensures the design remains professional and modern rather than "gritty."
- **Status Colors:** Use standard semantic reds and greens, but keep them desaturated to match the industrial tone.

## Typography

The typography system relies on **Inter** for its maximum legibility and systematic appearance. For technical data, project specs, and "meta" information (like coordinates or serial numbers), **JetBrains Mono** is introduced to evoke a sense of engineering precision.

Headlines should use tight tracking and heavy weights to simulate the impact of architectural signage. Body copy is kept spacious to ensure readability in field conditions. All labels and technical data should be set in uppercase when using the monospaced font to reinforce the industrial blueprint aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to mirror the stability of a structural grid. 

- **Grid:** A 12-column system with 24px gutters. Content is centered with a max-width of 1440px.
- **Rhythm:** Use an 8px linear scale for all padding and margins. 
- **Mobile:** Transition to a 4-column fluid grid with 16px side margins.
- **Sectioning:** Use high-contrast background shifts (e.g., alternating Architectural White and Concrete Gray) to define project phases or service categories visually.

## Elevation & Depth

This design system eschews soft shadows in favor of **Tonal Layers** and **Low-contrast Outlines**. Depth is communicated through the stacking of grayscale values rather than simulated lighting.

- **Level 0:** Architectural White (Main background).
- **Level 1:** Neutral/Concrete Gray (Card backgrounds, subtle containers).
- **Level 2:** 1px Solid Deep Slate Gray borders (Interactive elements, input fields).
- **Surface Detail:** Use 1px "grid lines" in light gray to separate content sections, mimicking technical drawings. Only use shadows for "Floating" elements like Modals, and keep them sharp and dark (low blur, 10-15% opacity).

## Shapes

The shape language is strictly **Sharp (0)**. In civil engineering, right angles and straight lines represent structural integrity and precision. 

- **Corners:** 0px radius on all buttons, cards, and input fields.
- **Dividers:** Horizontal and vertical rules should be 1px or 2px thick to emphasize the "grid-built" nature of the interface.
- **Icons:** Use thick-stroke, geometric icons. Avoid rounded terminals; prefer squared-off ends.

## Components

- **Buttons:** Primary buttons are Safety Orange with white uppercase text. Secondary buttons are Deep Slate Gray or outlined. Use a 2px border for outlined variants. No rounded corners.
- **Cards:** Cards use a light Concrete Gray background with a 1px border. Project cards should feature full-width photography at the top with text content separated by a clear horizontal rule.
- **Inputs:** Text fields feature a 1px Slate Gray bottom border only (monospaced label above). On focus, the border thickness increases to 2px in Safety Orange.
- **Chips/Status Tags:** Square-edged tags using Monospaced type. Use a solid Slate Gray background for "In Progress" and Safety Orange for "Critical/Urgent."
- **Lists:** Use heavy 1px dividers between list items. Bullet points should be replaced with small orange squares.
- **Imagery:** Photography should be desaturated slightly, emphasizing steel, concrete, and high-vis equipment. Use "Letterbox" aspect ratios (21:9) for hero sections to emphasize the horizontal scale of civil projects.