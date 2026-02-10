# Design Baseline – Continue From Here

**Created**: February 3, 2026  
**Primary file**: `stadium-tours.html`  
**Purpose**: This document captures the current design state. All future work should build on this baseline.

---

## Implementation Overview

The main UI lives in **stadium-tours.html**, a single-file React app (inline Babel, no build). It implements the stadium tours booking flow with design matched to Figma.

---

## Design Tokens (CSS Variables)

### Status & Error
- `--color-bg-status-error-subtle: #FFEEF0` – error alert background
- `--color-bg-status-warning-subtle: #FFF8E1` – low availability badge background
- `--color-content-status-warning: #E65100` – low availability badge text
- `--color-border-status-error: #DC2626` – error borders & icons
- `--color-matchday-indicator: #FF00FF` – matchday dot in date picker

### Core
- `--color-content-primary: #001838` – dark blue (also used for primary button bg)
- `--color-content-on-dark: #ffffff` – text on dark backgrounds
- `--color-bg-subtle-primary: #eef5fc` – light blue (e.g. times section)
- `--color-border-subtle: #c9e0f3` – light blue border

---

## Component Design Specifications

### Tour Time Dropdown
- Custom dropdown (not native `<select>`)
- Rounded panel with shadow
- Only shows **available** times (unavailable hidden)
- **Low availability badge**: pale yellow bg (`--color-bg-status-warning-subtle`), orange-brown text (`--color-content-status-warning`), pill shape
- Times sorted chronologically
- First available time pre-selected
- Dropdown trigger: white bg, `--color-border-subtle` border

### Times Section (tour-card__times-section)
- Background: `--color-bg-subtle-primary`
- Border: 1px solid `--color-border-subtle`
- Border radius: `--border-radius-large`
- Padding: `--spacing-6`
- Uses design tokens for all colours

### Book Now Button (tour-card__book-button)
- Background: solid `--color-content-primary` (#001838)
- Text: `--color-content-on-dark` (white)
- Border radius: `--border-radius-medium` (6px)
- No gradient

### Show Available Tours Button (booking-widget__submit)
- Primary button style
- Background: solid `--color-content-primary`
- Text: `--color-content-on-dark`
- Height: `--button-height-small` (36px)
- Border radius: `--border-radius-medium`

### Error Alerts (booking-widget__alert, tour-card__alert)
- Background: `--color-bg-status-error-subtle`
- Border: 1px solid `--color-border-status-error`
- Icon: red circle with white exclamation mark

### Date Picker
- Nav buttons: SVG chevrons (left/right), stroke 1.5, `currentColor`
- Matchday indicator: `--color-matchday-indicator` (#FF00FF)
- Matchday label dot and day-cell dot share same colour

### Tour Card Expand Icon
- SVG chevron, stroke-based
- Path: `M7 10l5 5 5-5` (chevron down)
- Rotates 180° when expanded
- strokeWidth 2, strokeLinecap/join round

---

## Conventions

1. **Colours**: Always use design tokens (e.g. `var(--color-*)`), not raw hex.
2. **Figma alignment**: When changing UI, check Figma and use `get_design_context` / `get_screenshot` for reference.
3. **Icons**: Prefer SVG stroke icons with `stroke="currentColor"` for themeable icons.
4. **Borders**: Use `--border-width-xsmall` (1px) for alerts, `--border-width-medium` (2px) only where explicitly designed.

---

## File Structure

- `stadium-tours.html` – Stadium Tours page (React + inline styles)
- `design-system.json` – design tokens reference
- `DESIGN_BASELINE.md` – this baseline (continue from here)

---

## How to Continue

1. Read this file to understand the current design state.
2. Use the design tokens defined above.
3. Align changes with Figma using the Figma MCP tools.
4. Do not revert or override these design choices unless the user explicitly requests it.
