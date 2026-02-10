# Quick Example: Adding Images

## Example 1: Replace Hero Image

1. **You:** Add `my-hero-image.jpg` to `/public/assets/`
2. **You:** Say "Replace the hero image with my-hero-image.jpg"
3. **Me:** I'll update line ~2827 and ~2802-2808

## Example 2: Add New Tour Card Image

1. **You:** Add `new-tour-image.png` to `/public/assets/`
2. **You:** Say "Use new-tour-image.png for the 'VIP Stadium Tour' card"
3. **Me:** I'll update line ~2387

## Example 3: Add Gallery Thumbnail

1. **You:** Add `gallery-thumb-1.jpg` to `/public/assets/`
2. **You:** Say "Add gallery-thumb-1.jpg as the first gallery thumbnail"
3. **Me:** I'll update the gallery array around line ~2802

## Current Image Locations in Code

- **Hero/Video poster**: Line ~2827 (`poster="/assets/..."`)
- **Gallery main images**: Lines ~2802-2808 (array)
- **Gallery thumbnails**: Lines ~2849-2855 (array)
- **Tour card images**: Lines 2369, 2378, 2387, 2396, 2405
- **Info sheet image**: Line ~2627
- **Addon images**: Lines ~3196, ~3228, ~3260
