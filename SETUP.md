# Setup Instructions

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## Installation Steps

### 1. Install Dependencies

```bash
cd "/Users/dan.taylor/Desktop/Cursor Projects/Tours"
npm install
```

This will install all required dependencies:
- React 18.3.1
- React DOM 18.3.1
- Vite (build tool)
- ESLint (code quality)

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Tours/
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Breadcrumb.jsx
│   │   ├── Breadcrumb.css
│   │   ├── ImageGallery.jsx
│   │   ├── ImageGallery.css
│   │   ├── Badge.jsx
│   │   ├── Badge.css
│   │   ├── BookingWidget.jsx
│   │   ├── BookingWidget.css
│   │   ├── TourCard.jsx
│   │   ├── TourCard.css
│   │   ├── Divider.jsx
│   │   └── Divider.css
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles & CSS variables
├── design-system.json      # Design tokens & system
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── index.html              # HTML entry point
├── README.md               # Project documentation
├── IMPLEMENTATION.md       # Implementation details
└── SETUP.md                # This file

```

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant feedback during development. Changes to your files will be reflected immediately in the browser without a full page reload.

### Design System Usage
All design tokens are available as CSS custom properties in `src/index.css`. Reference them in your styles:

```css
color: var(--color-content-primary);
padding: var(--spacing-6);
border-radius: var(--border-radius-medium);
```

### Component Development
Each component follows this pattern:
1. Component logic in `.jsx` file
2. Component styles in matching `.css` file
3. Import both in the parent component

### Adding New Components

1. Create component file: `src/components/YourComponent.jsx`
2. Create styles file: `src/components/YourComponent.css`
3. Import in parent: `import YourComponent from './components/YourComponent'`

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically try the next available port.

### Module Not Found
If you see module errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working
Try hard refreshing your browser or restarting the dev server.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open http://localhost:5173 in your browser
4. Start customizing!

## Resources

- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/
- **Design System**: See `design-system.json`
- **Implementation Guide**: See `IMPLEMENTATION.md`
