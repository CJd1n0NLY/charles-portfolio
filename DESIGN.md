# Design System: Editorial Logbook

## Aesthetic Direction
A methodical builder's journal. Warm, tactical, and highly typographic. No generic UI cards, no centered blobs. We use asymmetric grids, marginalia for metadata, and strict typographical hierarchy to establish an editorial print feel.

## Typography (3-Font System)
- **Display (Serif):** `Fraunces` or `Playfair Display`. Used exclusively for large chapter markers, project titles, and section headers. Gives editorial weight.
- **Metadata (Mono):** `JetBrains Mono` or `Fira Code`. Used for dates, tags, log indexes (e.g., `001 // FOUNDATIONS`), and system status. Reinforces the engineering logbook.
- **Body (Sans):** `Inter`. Clean, readable text for the actual case studies.

## Color Palette (Warm Charcoal & Rust)
- **Background (`bg-canvas`):** `#14120f` (Off-black, warm charcoal)
- **Surface (`bg-surface`):** `#1f1c18` (Slightly elevated warm gray for forms/inputs)
- **Primary Text (`text-primary`):** `#f4f0e6` (Warm off-white)
- **Muted Text (`text-muted`):** `#8b867c` (Taupe/gray for metadata)
- **Accent (`text-accent`):** `#c25e30` (Muted Rust/Amber - draws the eye without blinding it)

## Component Shifts (Before/After)
- **Empty State:** *Before:* "No published items in this chapter yet." (Generic)
  *After:* `[ LOG ENTRY PENDING ]` (Rendered in Mono font, muted).
- **Timeline Device:**
  *Before:* Vertical line with circles.
  *After:* Marginalia indexing. E.g., `CH.01 / ACADEMIC`, sticky in the left column while content scrolls in the right column.