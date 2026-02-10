# Backup Log

## Backup: discovery-backup-20260204.html
**Date:** February 4, 2026  
**Status:** ✅ Saved  
**Page:** Discovery (`discovery.html`)

### What's in this version:
- Experience cards with overlay gradient (starts at 35%, dark behind title)
- Badge matched to Stadium Tours “Most popular” (24px height, subtle primary bg, core primary text)
- Title 31pt, price 12pt, 12px spacing between title and price
- Discover button: 44px height, full width, #18486d, Figma-style
- Intro heading + description, 6px spacing
- Footer and partners section removed
- Kippax Modern from `./fonts/`

### To restore:
```bash
cp discovery-backup-20260204.html discovery.html
```

---

## Backup: standalone-backup-20260204-112742.html
**Date:** February 4, 2026, 11:27 AM  
**Status:** ✅ Saved

### What's in this version:
- ✅ Loading spinner updated to 32px (matching design system icon sizes)
- ✅ Tour card images randomly assigned:
  - Tour 1 (Manchester City Stadium tour): `3.JPG`
  - Tour 2 (Stadium and Academy Tour): `1.png`
  - Tour 3 (VIP Stadium Tour): `4.jpg.webp`
  - Tour 4 (Walk with a Legend Tour): `2.png`
  - Tour 5 (Matchday Pitch-side Walking Tour): `1.png`
- ✅ Gallery thumbnails randomly assigned (images 1-4, reused for 7 thumbnails)
- ✅ Assets symlink created: `assets` → `public/assets`
- ✅ All image paths use `/assets/` pattern

### To restore this version:
```bash
cp standalone-backup-20260204-112742.html stadium-tours.html
```
