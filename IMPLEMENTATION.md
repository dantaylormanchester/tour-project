# Implementation Guide

## Design System Implementation

This project implements the ECOM-2 Figma design with a comprehensive design system approach.

## Key Design Tokens

### Colors
The color system follows the Figma variables exactly:
- **Primary Content**: `#001838` - Main text and important UI elements
- **Secondary Content**: `rgba(0, 24, 56, 0.8)` - Supporting text
- **Tertiary Content**: `#69738c` - Muted text and inactive states
- **Core Primary**: `#348acb` - Brand color for CTAs and highlights
- **Electric Blue**: `#3bd6ff` - Accent color for primary actions

### Typography
Using **Kippax Modern** font family:
- **Hero/Medium**: 48px, weight 800, line-height 48px (condensed-extrabold)
- **Body/Large**: 16px, weight 700, line-height 24px
- **Body/Medium**: 15px, weight 400/700, line-height 24px
- **Body/Small**: 14px, weight 400/500, line-height 24px
- **Body/XSmall**: 12px, weight 400/700, line-height 20px
- **Label/Medium**: 12px, weight 500, line-height 16px
- **Label/Small**: 10px, weight 500, line-height 16px

### Spacing Scale
Consistent spacing using the 4px base unit:
- 0: 0px
- 1: 2px
- 2: 4px
- 3: 6px
- 4: 8px
- 5: 12px
- 6: 16px
- 7: 20px
- 8: 24px
- 12: 56px

### Border Radius
- Small: 4px (badges, inputs)
- Medium: 6px (images, buttons)
- Large: 8px (cards, widgets)
- XLarge: 12px (major cards)
- Round: 999px (circular elements)

## Component Architecture

### Header Component
- Fixed height: 64px
- Glassmorphic profile and basket buttons
- Centered logo
- Mobile-first responsive design

### Breadcrumb Component
- Dynamic navigation trail
- Active state management
- Chevron separators

### ImageGallery Component
- Main image display with video support
- Thumbnail navigation (5 images max)
- Active state for selected thumbnail
- 2px border on active thumbnail

### Badge Component
- Two variants: medium (default) and small
- Icon support (optional)
- Flexible sizing and colors

### BookingWidget Component
- Price display section
- Date and participant selection inputs
- Primary action button with gradient
- Free cancellation notice
- Divider separation

### TourCard Component
- Image with rounded corners
- Badge pills for tour attributes
- Title, price, and description
- Secondary action button

## CSS Variables

All design tokens are defined as CSS custom properties in `src/index.css` for:
- Easy theme switching
- Consistency across components
- Maintainability
- Design system scalability

## Responsive Approach

- Mobile-first design (375px base)
- Flexbox for layout
- CSS Grid for complex arrangements
- Max-width constraints for larger screens

## Accessibility Features

- Semantic HTML elements
- ARIA labels for icon buttons
- Proper heading hierarchy
- Keyboard navigation support
- Focus states on interactive elements

## Best Practices

1. **Component Isolation**: Each component has its own CSS file
2. **Design Token Usage**: All values reference CSS variables
3. **Reusability**: Components accept props for flexibility
4. **Consistency**: Follows Figma design exactly
5. **Performance**: Optimized images and minimal dependencies

## Future Enhancements

- [ ] Add state management (Context API or Redux)
- [ ] Implement actual date picker
- [ ] Add form validation
- [ ] Implement image lightbox
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Implement accessibility audit
- [ ] Add analytics tracking
