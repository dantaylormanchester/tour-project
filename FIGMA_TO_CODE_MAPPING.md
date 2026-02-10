# Figma to Code Mapping

This document maps the Figma design structure to the implemented React components.

## Page Structure

### Figma Frame: "Tour - landing - M" (Node: 6188:143875)
→ **Component**: `App.jsx`
→ **Description**: Main container for the entire page

## Component Mapping

### 1. Header Section
**Figma**: `_header__nav` (Node: 6188:143876)
→ **Component**: `Header.jsx`
→ **Features**:
  - Menu burger button
  - Centered logo
  - Profile button with avatar
  - Shopping basket with count badge

**CSS Variables Used**:
```css
background-color: var(--color-bg-core-secondary);
height: 64px;
padding: var(--spacing-0) var(--spacing-6);
```

---

### 2. Breadcrumb Navigation
**Figma**: `breadcrumb` (Node: 6188:146545)
→ **Component**: `Breadcrumb.jsx`
→ **Features**:
  - Dynamic breadcrumb items
  - Active state styling
  - Chevron separators

**Example Usage**:
```jsx
<Breadcrumb items={[
  { label: 'Experiences', onClick: handleClick },
  { label: 'Stadium Tours', active: true }
]} />
```

---

### 3. Hero Title
**Figma**: Hero title text (Node: 6188:146546)
→ **Component**: `App.jsx` (inline h1)
→ **Styling**: 
```css
font-size: var(--font-size-hero-medium);
font-weight: 800;
text-transform: uppercase;
```

---

### 4. Image Gallery
**Figma**: `Img Gallery` (Node: 6188:143921)
→ **Component**: `ImageGallery.jsx`
→ **Features**:
  - Main image/video display
  - Thumbnail navigation (5 images)
  - Active thumbnail with border
  - Video support with autoplay

**Props**:
```jsx
<ImageGallery 
  images={[...imageUrls]}
  mainVideo="video-url.mp4"
/>
```

---

### 5. Description Section
**Figma**: Content paragraphs (Node: 6188:146556)
→ **Component**: `App.jsx` (inline)
→ **Styling**: Body text with paragraph spacing

---

### 6. Feature Badges
**Figma**: Badge components (Nodes: 6188:146558, 6188:146560, 6188:146562)
→ **Component**: `Badge.jsx`
→ **Features**:
  - Icon support
  - Multiple variants (default, small)
  - Flexible sizing

**Icons Implemented**:
- Digital ticket (Node: 3313:1426)
- Wheelchair accessible (Node: 3687:63722)
- In-person guide (Node: 950:4259)

**Example Usage**:
```jsx
<Badge icon={<TicketIcon />} text="Digital ticket" />
<Badge icon={<WheelchairIcon />} text="Wheelchair accessible" />
<Badge icon={<GuideIcon />} text="In-person guide" />
```

---

### 7. Divider
**Figma**: `Divider` component (Node: 3389:54444)
→ **Component**: `Divider.jsx`
→ **Features**:
  - Horizontal and vertical orientation
  - 1px solid line with border color

---

### 8. Discount Alert
**Figma**: `Discount alert` (Node: 6188:146563)
→ **Component**: `App.jsx` (inline)
→ **Features**:
  - Success-themed background
  - Check circle icon
  - Call-to-action link

**Styling**:
```css
background-color: var(--color-bg-status-success-subtle);
border-color: var(--color-border-status-success);
```

---

### 9. Booking Widget
**Figma**: `widget` (Node: 6192:159228)
→ **Component**: `BookingWidget.jsx`
→ **Features**:
  - Price display
  - Date selector input
  - Participants selector input
  - Primary action button
  - Free cancellation notice

**Form Inputs**:
- Calendar icon (Node: 3450:62091)
- Users icon (Node: 4380:180617)
- Chevron down icon (Node: 3537:44870)

**Props**:
```jsx
<BookingWidget 
  price="£22"
  priceLabel="from"
/>
```

---

### 10. Tour Card
**Figma**: Tour card section (Node: 6192:170731)
→ **Component**: `TourCard.jsx`
→ **Features**:
  - Image with aspect ratio
  - Badge pills (Most popular, duration)
  - Title and price
  - Description text
  - Secondary action button

**Props**:
```jsx
<TourCard
  image="image-url.jpg"
  title="Stadium and Academy tour"
  price="From £26 per person"
  description="Exclusive combined tour..."
  badges={['Most popular', '120 mins']}
  onMoreInfo={() => console.log('More info')}
/>
```

---

## Icon Components

All icons are implemented as inline SVG components in `App.jsx`:

| Figma Node | Component Name | Usage |
|------------|---------------|-------|
| 3313:1426 | `TicketIcon` | Digital ticket feature |
| 3687:63722 | `WheelchairIcon` | Accessibility feature |
| 950:4259 | `GuideIcon` | In-person guide feature |
| 3687:63669 | `CheckCircleIcon` | Success states |
| 3450:62091 | Calendar icon | Date selection |
| 4380:180617 | Users icon | Participant selection |
| 3537:44870 | Chevron icon | Dropdown indicators |

---

### Delete confirmation overlay (Basket)

**Figma**: Delete confirmation overlay (Node: 6321:1162141)  
**URL**: https://www.figma.com/design/4blV8cueIOXSVyVE2l4gDB/ECOM-2---Ideation?node-id=6321-1162141  
**Implementation**: `basket.html` – `.delete-confirm-overlay`, `.delete-confirm-overlay__modal`

**Behaviour**:
- Backdrop: same as loading overlay (blur + `--color-bg-alpha-dark-blue-80`).
- Modal: design-system card (padding `spacing.6`, gap `spacing.6`, border, `border-radius.xlarge`).
- Message: "Are you sure you want to delete this item?" (Figma body medium, bold).
- Buttons: Cancel (secondary – transparent, border), Delete (primary – content primary bg, white text). Same size as `button.height.small`, `border-radius.medium`.

**To refresh from Figma**: Use Figma MCP `get_design_context` or `get_screenshot` with node ID `6321:1162141` and align spacing/typography if needed.

---

### Extras page tabs

**Figma**: `tab-group` node **6323:1162226** (from frame 6323:1162225).  
**Screenshot**: `assets/figma-extras-tabs.png` (export from Figma for reference).  
**Implementation**: `extras.html` – `.extras-tabs`, `.extras-tabs__group`, `.extras-tabs__tab`, `.extras-tabs__tab--active`

**Match**:
- **Active tab**: pill with `border-radius: 999px`, background `--color-content-primary`, white text, 14px font weight 700, padding 6px 12px.
- **Inactive tab**: no background, no border, no radius; text `--color-content-tertiary`, 14px weight 500.
- **Group**: horizontal flex, gap 4px, min-height 36px; container padding 32px 16px 16px.
- **Labels**: All, Best Sellers, Experiences, Kits, Lifestyle.

---

### Extras Ecom Card (single card design)

**Figma**: Node **6323:1165615** (ECOM2 / Ecom Card)  
**URL**: https://www.figma.com/design/4blV8cueIOXSVyVE2l4gDB/ECOM-2---Ideation?node-id=6323-1165615  
**Implementation**: `extras.html` – `.extras-card`, `.extras-card__media`, `.extras-card__content`, `.extras-card__text`, `.extras-card__title`, `.extras-card__variant`, `.extras-card__add`

**Typography (match exactly)**:
- **Title**: 14px (--font-size-body-small), weight 500, line-height 24px (--line-height-body-small), color primary
- **Variant/subtitle**: 12px (--font-size-body-xsmall), weight 400, line-height 20px (--line-height-body-xsmall), color tertiary
- **Add to basket button**: 12px, weight 700, line-height 16px (--line-height-label)

**Spacing**: Gap 16 between image and content (padding-top on content); gap 6 between title and variant (--spacing-3); gap 8 between text block and button (--spacing-4). Card radius 8px, image radius 4px. Button height 36px, radius 6px, bg #DAE9F7 (--color-bg-button-secondary).

---

## Design Token Implementation

### From Figma Variables to CSS

**Color Variables**:
```
colour/content/primary → --color-content-primary
colour/background/core-secondary → --color-bg-core-secondary
colour/border/default → --color-border-default
```

**Spacing Variables**:
```
spacing/4 → --spacing-4 (8px)
spacing/6 → --spacing-6 (16px)
spacing/8 → --spacing-8 (24px)
```

**Typography Variables**:
```
font/size/body/small → --font-size-body-small (14px)
font/weight/normal/bold → font-weight: 700
font/line-height/body/small → --line-height-body-small (24px)
```

**Border Radius Variables**:
```
border-radius/small → --border-radius-small (4px)
border-radius/medium → --border-radius-medium (6px)
border-radius/large → --border-radius-large (8px)
```

---

## Layout Structure

```
App
├── Header
├── Main Content
│   ├── Breadcrumb
│   ├── Hero Title
│   ├── ImageGallery
│   ├── Description
│   ├── Features (Badges + Dividers)
│   ├── Discount Alert
│   ├── BookingWidget
│   │   ├── Price Display
│   │   ├── Date Input
│   │   ├── Participants Input
│   │   ├── Submit Button
│   │   ├── Divider
│   │   └── Cancellation Info
│   └── Tour Cards
│       └── TourCard
└── (more tour cards can be added)
```

---

## Responsive Breakpoints

**Figma Design Width**: 375px (Mobile)

**Implementation**:
- Base: 375px (mobile-first)
- Max-width constraint on content: 375px
- Flexible for larger screens with centered layout

---

## Z-Index Layers

```css
Header: z-index: 3
Main Content: z-index: 2
Tour Cards Section: z-index: 1
```

---

## Notes

1. **Image Assets**: The Figma design uses localhost image server URLs. Replace these with actual production image URLs.

2. **Video Source**: The main gallery includes a video element. Update the source path for production.

3. **Font Loading**: Kippax Modern font is loaded via CDN in `index.css`. For production, consider self-hosting.

4. **Interactive States**: All buttons include hover states with opacity or background color transitions.

5. **Accessibility**: ARIA labels are added to icon-only buttons for screen reader support.

6. **Form Functionality**: Date and participant selectors are currently button elements. Implement actual form controls as needed.
