# Design Tokens Reference

Quick reference guide for all design tokens extracted from the Figma file.

## Color Tokens

### Content Colors
```css
--color-content-primary: #001838         /* Main text */
--color-content-secondary: rgba(0, 24, 56, 0.8)  /* Secondary text */
--color-content-tertiary: #69738c       /* Muted text */
--color-content-on-dark: #ffffff        /* Text on dark backgrounds */
--color-content-on-light: #001838       /* Text on light backgrounds */
--color-content-core-primary: #348acb   /* Brand blue */
--color-content-status-success: #0d775d /* Success state */
```

### Background Colors
```css
--color-bg-default: #ffffff             /* Default white */
--color-bg-base-white: #ffffff          /* Base white */
--color-bg-core-secondary: #98c5e9      /* Sky blue (header) */
--color-bg-subtle-primary: #eef5fc      /* Light blue (widgets) */
--color-bg-action-transparent: rgba(255, 255, 255, 0)
--color-bg-status-success-subtle: #e8fdf6  /* Light green */
```

### Border Colors
```css
--color-border-default: #c8d4e0         /* Standard border */
--color-border-contrast: #001838        /* High contrast */
--color-border-subtle: #c9e0f3          /* Subtle border */
--color-border-action-default: #aab9cb  /* Button borders */
--color-border-status-success: #18c390  /* Success border */
```

### Accent Colors
```css
--color-city-electric-blue: #3bd6ff     /* Primary CTA gradient start */
```

## Spacing Tokens

```css
--spacing-0: 0px
--spacing-1: 2px
--spacing-2: 4px
--spacing-3: 6px
--spacing-4: 8px      /* Small padding/gaps */
--spacing-5: 12px     /* Medium padding/gaps */
--spacing-6: 16px     /* Standard padding */
--spacing-7: 20px     /* Large gaps */
--spacing-8: 24px     /* Section spacing */
--spacing-12: 56px    /* Large section padding */
--spacing-negative-4: -8px
```

## Typography Tokens

### Font Family
```css
--font-family: 'Kippax Modern', sans-serif
```

### Font Sizes
```css
--font-size-hero-medium: 48px      /* Page titles */
--font-size-body-large: 16px       /* Large body text */
--font-size-body-medium: 15px      /* Medium body text */
--font-size-body-small: 14px       /* Small body text */
--font-size-body-xsmall: 12px      /* Extra small text */
--font-size-body-xxsmall: 10px     /* Tiny text */
--font-size-label-medium: 12px     /* Medium labels */
--font-size-label-small: 10px      /* Small labels */
--font-size-cta-small: 12px        /* Button text */
```

### Line Heights
```css
--line-height-hero-medium: 48px
--line-height-body-large: 24px
--line-height-body-medium: 24px
--line-height-body-small: 24px
--line-height-body-xsmall: 20px
--line-height-body-xxsmall: 16px
--line-height-label-medium: 16px
--line-height-label-small: 16px
--line-height-cta-small: 16px
```

### Font Weights
- Regular: 400
- Medium: 500
- Bold: 700
- Condensed Extrabold: 800

## Border Radius Tokens

```css
--border-radius-none: 0px
--border-radius-small: 4px      /* Badges, small buttons */
--border-radius-medium: 6px     /* Inputs, images */
--border-radius-large: 8px      /* Cards, widgets */
--border-radius-xlarge: 12px    /* Major cards */
--border-radius-round: 999px    /* Circular elements */
```

## Border Width Tokens

```css
--border-width-xsmall: 1px
```

## Component-Specific Tokens

### Button
```css
--button-height-small: 36px
```

## Usage Examples

### Primary Button
```css
.button-primary {
  height: var(--button-height-small);
  padding: var(--spacing-4) var(--spacing-5);
  background: linear-gradient(90deg, var(--color-city-electric-blue) 50%, rgb(26, 180, 246) 100%);
  border-radius: var(--border-radius-medium);
  font-size: var(--font-size-cta-small);
  font-weight: 700;
  line-height: var(--line-height-cta-small);
  color: var(--color-content-on-light);
}
```

### Secondary Button
```css
.button-secondary {
  height: var(--button-height-small);
  padding: var(--spacing-4) var(--spacing-5);
  background-color: var(--color-bg-action-transparent);
  border: var(--border-width-xsmall) solid var(--color-border-action-default);
  border-radius: var(--border-radius-medium);
  font-size: var(--font-size-cta-small);
  font-weight: 700;
  color: var(--color-content-primary);
}
```

### Card Container
```css
.card {
  padding: var(--spacing-6);
  background-color: var(--color-bg-default);
  border: var(--border-width-xsmall) solid var(--color-border-default);
  border-radius: var(--border-radius-xlarge);
  gap: var(--spacing-6);
}
```

### Widget Container
```css
.widget {
  padding: var(--spacing-6);
  background-color: var(--color-bg-subtle-primary);
  border: var(--border-width-xsmall) solid var(--color-border-subtle);
  border-radius: var(--border-radius-large);
  gap: var(--spacing-6);
}
```

### Hero Title
```css
.hero-title {
  font-size: var(--font-size-hero-medium);
  font-weight: 800;
  font-stretch: condensed;
  line-height: var(--line-height-hero-medium);
  letter-spacing: -0.48px;
  color: var(--color-content-primary);
  text-transform: uppercase;
}
```

### Body Text
```css
.body-text {
  font-size: var(--font-size-body-small);
  font-weight: 400;
  line-height: var(--line-height-body-small);
  color: var(--color-content-primary);
}
```

### Badge
```css
.badge {
  padding: var(--spacing-2) var(--spacing-3);
  background-color: var(--color-bg-subtle-primary);
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-label-small);
  font-weight: 500;
  color: var(--color-content-core-primary);
}
```

## Figma Variable Mapping

| Figma Variable | CSS Variable | Value |
|---------------|--------------|-------|
| `colour/content/primary` | `--color-content-primary` | #001838 |
| `spacing/6` | `--spacing-6` | 16px |
| `border-radius/medium` | `--border-radius-medium` | 6px |
| `font/size/body/small` | `--font-size-body-small` | 14px |
| `font/line-height/body/small` | `--line-height-body-small` | 24px |
| `colour/city/electric-blue/500` | `--color-city-electric-blue` | #3bd6ff |

## Notes

- All spacing values use multiples of 4px (except spacing-1 and spacing-7)
- Line heights are optimized for readability
- Colors maintain WCAG AA contrast ratios
- Border radius values create visual hierarchy
- Font weights align with Kippax Modern font family variants
