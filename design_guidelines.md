# Design Guidelines: 성북구 대학생 미용실 예약 대행 서비스

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern Korean web services (Naver, Kakao) combined with booking platforms optimized for student users. The design should feel trustworthy yet youthful, professional yet approachable.

**Key Design Principles**:
- Student-friendly accessibility with clear visual hierarchy
- Mobile-first responsive design (students primarily use mobile)
- Clean, organized form layouts that reduce cognitive load
- Trust-building through professional aesthetics

## Core Design Elements

### A. Color Palette

**Light Mode**:
- Primary: 230 70% 50% (vibrant blue - trustworthy, professional)
- Primary Hover: 230 70% 45%
- Background: 0 0% 98% (soft white)
- Surface: 0 0% 100% (pure white cards)
- Text Primary: 220 15% 20%
- Text Secondary: 220 10% 50%
- Border: 220 15% 88%

**Dark Mode**:
- Primary: 230 65% 55%
- Primary Hover: 230 65% 60%
- Background: 220 20% 10%
- Surface: 220 18% 14%
- Text Primary: 220 15% 95%
- Text Secondary: 220 10% 65%
- Border: 220 15% 25%

**Accent Colors** (use sparingly):
- Success: 145 65% 50% (booking confirmation)
- Warning: 35 85% 55% (form validation)
- Info: 200 70% 50% (helper text)

### B. Typography

**Font Families**:
- Primary: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif (Korean-optimized)
- Fallback: 'Noto Sans KR', sans-serif

**Typography Scale**:
- Hero Heading: text-4xl md:text-5xl font-bold (landing page title)
- Section Heading: text-2xl md:text-3xl font-semibold
- Form Section Title: text-xl font-semibold
- Form Labels: text-sm font-medium
- Input Text: text-base
- Helper Text: text-sm text-secondary
- Button Text: text-base font-medium

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistency
- Form field spacing: gap-6
- Section padding: px-4 py-12 md:px-8 md:py-20
- Card padding: p-6 md:p-8
- Button padding: px-6 py-3

**Container Widths**:
- Landing page max-width: max-w-6xl
- Form container: max-w-3xl
- Admin table: max-w-7xl

**Grid System**:
- Form fields: Single column on mobile, 2-column on md+ for shorter fields
- Admin dashboard: Responsive table with horizontal scroll on mobile

### D. Component Library

**Landing Page Structure**:
1. **Hero Section**: 
   - Gradient background (primary color variants)
   - Bold heading introducing the service
   - Short subheading explaining value proposition
   - CTA scroll indicator to form
   
2. **Service Introduction** (Above Form):
   - 3-column grid (mobile: single column) showing key benefits
   - Icons + short descriptions (예: "빠른 예약", "학생 할인", "맞춤 추천")

3. **Booking Form Section**:
   - Two visual subsections with clear headings
   - Card-based design with subtle shadow
   - Organized field groups with proper spacing

**Form Components**:
- **Input Fields**: 
  - Rounded corners (rounded-lg)
  - Clear borders in light mode, subtle in dark mode
  - Focus state with primary color ring
  - Placeholder text in muted color
  
- **Date Picker**: Calendar icon, clean dropdown
- **Time Slots**: Dropdown or button grid showing 9:00-20:00 (30min intervals)
- **Combo Boxes**: Custom styled dropdowns with smooth animations
- **File Upload**: Drag-and-drop area with preview capability
- **Text Areas**: Larger input for detailed requests
- **Submit Button**: 
  - Full width on mobile, auto width on desktop
  - Primary color with hover effect
  - Loading state indicator

**Admin Dashboard Components**:
- Login card: Centered, max-w-md, clean form
- Data table: Alternating row colors, sticky header
- Status badges: Color-coded (pending, confirmed, completed)
- Filter/search bar: Top of table
- Action buttons: Edit, delete with confirmation modals

### E. Responsive Behavior

**Breakpoints**:
- Mobile: base (< 768px) - Single column, full-width elements
- Tablet: md (768px+) - 2-column form fields where appropriate
- Desktop: lg (1024px+) - Optimized spacing, multi-column layouts

**Form Responsiveness**:
- Mobile: Stack all fields vertically, full-width inputs
- Tablet/Desktop: Group related fields (name + phone, school + student ID)

### F. Interactions & States

**Micro-interactions** (minimal, purposeful):
- Form field focus: Smooth border color transition
- Button hover: Subtle scale (scale-[1.02])
- Dropdown open: Fade-in animation
- Form submission: Loading spinner, success message

**Validation**:
- Real-time validation with inline error messages
- Required field indicators (*)
- Success checkmarks for completed fields

## Images

**Hero Section Image**: 
- Modern beauty salon interior or stylish hairstyle showcase
- Overlaid with gradient to ensure text readability
- Size: Full-width, height: 60vh on desktop, 50vh on mobile
- Placement: Top of landing page behind hero content

**Service Icons**: 
- Use Heroicons for service benefit icons (calendar, scissors, stars)
- Simple, outline style in primary color

**Form Section**: No background image - keep focus on form inputs

**Admin Dashboard**: No decorative images - focus on data clarity

## Korean UI Conventions

- Right-to-left reading flow for form labels
- Clear hierarchy with proper hangul line-height (1.6-1.8)
- Form labels above inputs (not floating)
- Helper text below inputs in muted color
- Proper spacing for Korean characters (more generous than English)
- "제출하기" button prominently placed at form end

## Trust & Professional Elements

- Clean, organized form layout
- Professional color scheme
- Clear data privacy notice near submit button
- Contact information in footer
- Responsive confirmation messages
- Secure login UI for admin (centered card, password masking)