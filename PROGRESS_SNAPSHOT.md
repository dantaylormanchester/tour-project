# Progress Snapshot – Discovery & Stadium Tours

**Saved:** February 4, 2026  
**Purpose:** Record current design state so you can revert or compare later.

---

## Where You Are

### 1. **Discovery page** (`discovery.html`)

Single-page “Discovery” experience: intro copy, experience cards (image + overlay + title, price, CTA), no footer, no partners section.

**Backup of this state:**  
`discovery-backup-20260204.html`

**To revert Discovery to this snapshot:**
```bash
cp discovery-backup-20260204.html discovery.html
```

#### Discovery – design details (current)

| Area | What’s in place |
|------|------------------|
| **Experience cards** | Full-width cards, background image, overlay gradient, badge, title, price, button. |
| **Overlay gradient** | Starts higher on card: transparent 0–35%, then dark 35%→65%→100% (0.7 then 0.95). Dark sits behind title. |
| **Badge** | Matches Stadium Tours “Most popular”: `.badge.badge--small` style – 24px height, `--spacing-1` / `--spacing-3` padding, `--border-radius-small`, `--color-bg-subtle-primary`, `--color-content-core-primary`, label-small font, 0.12px letter-spacing. |
| **Title** | 31pt, Kippax Modern condensed, 40px line-height, 12px margin below. |
| **Price** | 12pt, 18px line-height. |
| **Title ↔ price spacing** | 12px. |
| **Discover button** | Figma-style: 44px height, full width, `--color-bg-action-brand-secondary-default` (#18486d), white text, 14px CTA medium, 6px radius. |
| **Intro** | “Discover Manchester City’s newest experiences” + description; 6px between heading and body. |
| **Removed** | Footer; partners section (ETIHAD, PUMA, “View all club partners”). |
| **Fonts** | Kippax Modern from `./fonts/` (Rg, Md, Bd, CndRg, CndMd, CndBd, CndxBd, CndBlk). |

---

### 2. **Stadium Tours** (`stadium-tours.html`)

Booking flow: hero, gallery, description, booking widget (date + participants, “Show available tours”), tour cards, add-ons, etc. Design baseline and tokens live here and in `DESIGN_BASELINE.md`.

**Existing backup:**  
`standalone-backup-20260204-112742.html` (see `BACKUP_LOG.md`)

**To revert Stadium Tours to that backup:**
```bash
cp standalone-backup-20260204-112742.html stadium-tours.html
```

---

## Files to know

| File | Role |
|------|------|
| `discovery.html` | Discovery page (current working copy). |
| `discovery-backup-20260204.html` | Snapshot of Discovery as of this save. |
| `stadium-tours.html` | Stadium Tours page (main booking). |
| `standalone-backup-20260204-112742.html` | Earlier snapshot of Stadium Tours. |
| `DESIGN_BASELINE.md` | Design tokens and component specs (single source of truth). |
| `BACKUP_LOG.md` | Log of standalone backups and what changed. |

---

## Session summary (what was done)

- **Discovery page:** Experience cards, gradient, badge (Stadium Tours match), title/price/button typography and spacing, Discover button (Figma colours/sizing), intro spacing. Footer and partners section removed.
- **Stadium Tours:** No changes in this session; existing design and backup remain as-is.
- **Figma:** Used for badge, button, and gradient reference; design tokens/variables used where noted above.

---

## Reverting

- **Only Discovery:**  
  `cp discovery-backup-20260204.html discovery.html`
- **Only Stadium Tours:**  
  `cp standalone-backup-20260204-112742.html stadium-tours.html`
- **Both:** run both commands above.

You can keep this file and the backup filenames in mind when you want to “return to this design” or compare later.
