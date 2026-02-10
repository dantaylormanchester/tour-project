# Image Management Guide

## Current Setup

Images are stored in `/public/assets/` and referenced in `standalone.html` as `/assets/filename.ext`

## Recommended Workflow

### 1. Adding Images to the Project

**Step 1:** Add your image files to the `/public/assets/` folder
- Supported formats: `.png`, `.jpg`, `.jpeg`, `.svg`, `.webp`
- Recommended naming: Use descriptive names like `stadium-tour-hero.jpg` or keep hash-based names from Figma

**Step 2:** Tell me which image goes where, and I'll update the code

### 2. Image Organization Structure

```
/public/assets/
├── hero/              # Main hero images
├── tours/             # Tour card images
├── gallery/            # Gallery thumbnails
├── icons/              # SVG icons
└── misc/               # Other images
```

### 3. Where Images Are Used

1. **Hero Image/Gallery** (lines ~2800-2860)
   - Main large image/video
   - Thumbnail gallery (5-7 images)

2. **Tour Cards** (lines ~2365-2408)
   - Each tour has an `image` property
   - Currently 5 tours with images

3. **Icons** (throughout)
   - SVG icons for UI elements
   - Menu, basket, profile icons

4. **Info Sheet** (line ~2627)
   - Large image shown in modal when clicking "More info"

5. **Addons Sheet** (lines ~3196-3260)
   - Product images for add-ons

## How to Add New Images

### Option A: Tell me the details
1. Add image file to `/public/assets/`
2. Tell me: "Add [filename] as the hero image" or "Replace tour card image for 'Stadium and Academy Tour' with [filename]"
3. I'll update the code

### Option B: I can create a helper script
I can create a script that maps image files to their usage locations automatically.

## Image Optimization Recommendations

- **Hero images**: 800-1200px width, WebP or optimized JPG
- **Tour cards**: 400-600px width, optimized JPG/PNG
- **Thumbnails**: 200-300px width, optimized JPG/PNG
- **Icons**: SVG format preferred for scalability

## Current Image References

- Hero/Gallery: `/assets/d69858829012b1e4bb6841f556263da106902583.png` (and 6 others)
- Tour Cards: 5 different images (see lines 2369-2405)
- Icons: Multiple SVG files in `/public/assets/`
