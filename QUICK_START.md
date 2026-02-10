# Quick Start Guide

Get up and running with the Stadium Tours application in 5 minutes.

## Prerequisites

You need **Node.js** installed on your computer. Check if you have it:

```bash
node --version
```

If not installed, download from: https://nodejs.org/ (Choose LTS version)

## Installation

### Step 1: Open Terminal

**Mac**: Press `Cmd + Space`, type "Terminal", press Enter
**Windows**: Press `Win + R`, type "cmd", press Enter

### Step 2: Navigate to Project

```bash
cd "/Users/dan.taylor/Desktop/Cursor Projects/Tours"
```

### Step 3: Install Dependencies

```bash
npm install
```

This will take 1-2 minutes and install all required packages.

### Step 4: Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.4.11  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Open in Browser

Open your browser and go to: **http://localhost:5173**

🎉 **You should see the Stadium Tours application!**

## What You'll See

- **Header** with menu, logo, and shopping basket
- **Breadcrumb** navigation (Experiences > Stadium Tours)
- **Hero title** "STADIUM TOURS"
- **Image gallery** with thumbnails
- **Description** text about the tour
- **Feature badges** (Digital ticket, Wheelchair accessible, In-person guide)
- **Discount alert** for members
- **Booking widget** with date and participant selection
- **Tour card** showing Stadium and Academy tour

## Making Changes

### Edit Components

All components are in `src/components/`. For example:

```bash
# Edit the header
open src/components/Header.jsx
```

Changes will appear **instantly** in your browser (Hot Module Replacement).

### Edit Styles

Each component has its own CSS file:

```bash
# Edit header styles
open src/components/Header.css
```

### Edit Design Tokens

To change colors, spacing, or typography:

```bash
# Edit CSS variables
open src/index.css
```

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Stop the server
Press Ctrl + C in terminal
```

## Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### Port 5173 is already in use
→ Vite will automatically use the next available port (5174, 5175, etc.)

### Changes not appearing
→ Hard refresh browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## File Locations

| What | Where |
|------|-------|
| Components | `src/components/` |
| Styles | `src/components/*.css` |
| Main App | `src/App.jsx` |
| CSS Variables | `src/index.css` |
| Design System | `design-system.json` |

## Keyboard Shortcuts in Browser

- **Cmd/Ctrl + Shift + I**: Open Developer Tools
- **Cmd/Ctrl + Shift + C**: Inspect Element
- **Cmd/Ctrl + Shift + R**: Hard Refresh

## Next Steps

1. ✅ **Explore the code** - Open files in `src/components/`
2. ✅ **Read the docs** - Check `IMPLEMENTATION.md` for details
3. ✅ **Customize** - Change colors, text, or layout
4. ✅ **Add features** - Build on top of the existing components
5. ✅ **Deploy** - Run `npm run build` to create production build

## Getting Help

- **Implementation Details**: Read `IMPLEMENTATION.md`
- **Design Tokens**: Check `DESIGN_TOKENS_REFERENCE.md`
- **Figma Mapping**: See `FIGMA_TO_CODE_MAPPING.md`
- **Full Documentation**: Open `README.md`

## Development Tips

### VS Code Extensions (Recommended)
- **ES7+ React/Redux/React-Native snippets** - Quick component creation
- **Prettier** - Code formatting
- **ESLint** - Code quality
- **Auto Rename Tag** - Rename HTML/JSX tags automatically

### Chrome Extensions (Recommended)
- **React Developer Tools** - Inspect React components
- **CSS Peeper** - Inspect CSS values

---

**You're all set!** 🚀

Start editing files and watch your changes appear instantly in the browser.
