# LSAT Study App - Design Guidelines

## Design Approach: Gamified Education Hybrid
**Reference Inspiration:** Duolingo (gamification & progress), Mimo (coding lessons format), Brilliant (problem-solving UI)
**Rationale:** Educational apps require clear information hierarchy and usability, but gamification demands engaging visuals and playful interactions. We'll blend educational clarity with motivational design patterns.

**Core Principles:**
- Encourage progression through visual rewards and celebration
- Maintain clarity for complex LSAT content
- Create bite-sized, digestible learning moments
- Mobile-first touch interactions

## Color Palette

**Light Mode:**
- Primary Brand: 240 68% 56% (Vibrant Purple - education/growth)
- Primary Dark: 240 68% 45% (depth/buttons)
- Success: 142 71% 45% (correct answers/achievements)
- Warning: 38 92% 50% (timer/challenges)
- Error: 0 84% 60% (incorrect answers)
- Background: 0 0% 100%
- Surface: 240 20% 98%
- Text Primary: 240 10% 15%
- Text Secondary: 240 5% 45%

**Dark Mode:**
- Primary Brand: 240 68% 65%
- Primary Dark: 240 68% 55%
- Success: 142 71% 55%
- Warning: 38 92% 60%
- Error: 0 84% 70%
- Background: 240 15% 8%
- Surface: 240 12% 12%
- Text Primary: 0 0% 95%
- Text Secondary: 240 5% 65%

**Accent Colors:**
- Experience Points: 280 65% 60% (Purple gradient for XP bars)
- Streak Fire: 25 95% 53% (Orange for daily streaks)
- Achievement Gold: 45 93% 58% (For badges/medals)

## Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, modern readability for UI and content
- Display: 'Poppins' (Google Fonts) - Bold, friendly for headings and gamification elements

**Type Scale:**
- Hero/Display: text-4xl md:text-5xl font-bold (Poppins)
- Section Headers: text-2xl md:text-3xl font-bold (Poppins)
- Card Titles: text-lg font-semibold (Inter)
- Body Text: text-base leading-relaxed (Inter)
- Small Text/Labels: text-sm (Inter)
- Micro (XP/Stats): text-xs font-medium (Inter)

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-16
- Card gaps: gap-4 to gap-6
- Icon spacing: space-x-2 to space-x-3

**Container Strategy:**
- Max width: max-w-7xl for desktop
- Mobile padding: px-4
- Card containers: max-w-2xl for focused content
- Question containers: max-w-3xl for readability

## Component Library

### Navigation
**Mobile Bottom Tab Bar:**
- Fixed bottom navigation with 4 tabs: Home, Practice, Progress, Profile
- Icon + label, active state with primary color fill
- Smooth transitions between sections

**Desktop Top Navigation:**
- Horizontal nav with logo left, menu center, user avatar/streak counter right
- Sticky on scroll with subtle shadow

### Study Mode Cards
**Lesson Cards:**
- Rounded-2xl with subtle shadow
- Icon (top-left), title, description, progress indicator
- Locked state: Grayscale with lock icon overlay
- Hover: Lift effect (translate-y-1)

**Question Cards:**
- Clean white/dark surface with generous padding (p-6 to p-8)
- Question text prominent (text-lg)
- Multiple choice options as interactive buttons with radio indicators
- Explanation panel (collapsible) with icon indicators for correct/incorrect

### Gamification Elements
**XP Progress Bar:**
- Horizontal bar with gradient fill (primary to accent)
- Animated on score updates
- Current/target XP displayed inline

**Streak Display:**
- Fire icon with day counter
- Pulsing animation on active streaks
- Calendar grid showing streak history (7-day view)

**Achievement Badges:**
- Circular or shield-shaped icons
- Gold/silver/bronze color variants
- Grid display (3 columns mobile, 4-6 desktop)
- Unlock animation: Scale + glow effect

**Level Indicator:**
- Circular progress ring around user avatar
- Level number centered
- Fills clockwise as XP increases

### Practice Interface
**Timed Challenge Mode:**
- Prominent timer at top (countdown format)
- Pulse animation at 30s, 10s remaining
- Question counter (e.g., "5/10")
- Answer buttons with instant feedback (green/red border flash)

**Study Session:**
- No timer, relaxed pace
- "Check Answer" button reveals explanation
- "Next Question" progression
- Review option at end of set

### Dashboard Components
**Performance Analytics:**
- Stat cards in grid (2x2 mobile, 4 columns desktop)
- Large number with icon, label beneath
- Color-coded by metric type (accuracy=success, speed=warning)

**Recent Activity Feed:**
- Timeline view with date markers
- Activity icons (trophy for achievements, checkmark for completions)
- Compact card format

### Feedback & Interactions
**Success States:**
- Confetti animation on achievements
- Success checkmark with bounce
- Encouraging messages ("Great job!", "Perfect!")

**Error States:**
- Gentle shake animation
- Constructive feedback ("Review this concept")
- Show correct answer with explanation

**Loading States:**
- Skeleton screens for content
- Playful spinner with brand colors
- Progress indicators for multi-step actions

## Animations
**Purposeful Motion Only:**
- Page transitions: Subtle slide (100ms)
- Button interactions: Scale on press (95%)
- Achievement unlocks: Scale + fade-in (300ms)
- Progress updates: Smooth bar fills (400ms)
- NO continuous looping animations except active timers

## Mobile-Specific Patterns
- Swipe gestures: Left/right for question navigation
- Touch targets: Minimum 44px for all interactive elements
- Bottom sheet modals for explanations (smooth slide-up)
- Pull-to-refresh on activity feeds
- Card-based layouts (single column stack)

## Images
**Hero Image:** Yes - Abstract illustration of brain/puzzle pieces in primary brand colors, positioned in landing page hero section with overlaid text. Should convey critical thinking and problem-solving.

**Additional Images:**
- Study mode icons: Custom illustrated icons for each LSAT section (Logic Games=puzzle, Logical Reasoning=lightbulb, Reading Comp=book)
- Achievement badges: Icon-based graphics, no photos
- Empty states: Friendly illustrations (e.g., "No active streak yet" with kindling wood illustration)

## Accessibility
- Maintain 4.5:1 contrast ratios for all text
- Dark mode: Ensure form inputs have visible borders (primary color at 20% opacity)
- Focus indicators: 2px primary color ring
- Screen reader labels for all icon buttons
- Haptic feedback on mobile for correct/incorrect answers