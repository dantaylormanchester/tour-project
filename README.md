# Stadium Tours - React Application

A modern, responsive web application for booking stadium tours, implemented from Figma design with a comprehensive design system.

## Features

- **Responsive Design**: Mobile-first approach optimized for 375px viewport
- **Design System**: Comprehensive JSON-based design tokens for consistent styling
- **Component-Based Architecture**: Reusable React components
- **Modern UI/UX**: Clean, accessible interface with proper semantic HTML
- **Image Gallery**: Interactive tour photo gallery
- **Booking Widget**: Date and participant selection
- **Member Benefits**: Discount alerts and authentication prompts

## Design System

The design system (`design-system.json`) includes:

- **Colors**: Primary, secondary, tertiary, background, border, and status colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale from 0-56px
- **Border Radius**: From none to round (999px)
- **Components**: Pre-defined styles for buttons, inputs, cards, badges, etc.
- **Icons**: Icon usage descriptions and semantic meanings

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Tours/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Breadcrumb.jsx
│   │   ├── ImageGallery.jsx
│   │   ├── Badge.jsx
│   │   ├── BookingWidget.jsx
│   │   ├── TourCard.jsx
│   │   └── Divider.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── design-system.json
├── package.json
└── README.md
```

## Components

### Header
Top navigation with logo, menu, profile, and basket

### Breadcrumb
Navigation breadcrumb trail

### ImageGallery
Main tour image with thumbnail gallery

### Badge
Reusable badge component for features (Digital ticket, Wheelchair accessible, etc.)

### BookingWidget
Interactive booking form with date/participant selection

### TourCard
Tour listing card with image, description, and CTA

### Divider
Horizontal divider line

## Design Tokens Usage

All components use design tokens from `design-system.json`. To maintain consistency:

1. **Colors**: Reference from `colors` object
2. **Spacing**: Use values from `spacing` scale
3. **Typography**: Apply font styles from `typography` object
4. **Border Radius**: Use predefined radius values

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved
# ToursPrototype
# ToursPrototype
# tour
