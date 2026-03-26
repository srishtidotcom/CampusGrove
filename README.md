# 🌳 CampusGrove

**A campus tree registry that lets students and faculty discover, track, and care for every tree on campus — just by scanning a QR code.**

---

## Overview

CampusGrove is a static web app that turns your campus into an interactive arboretum. Every tree gets a weatherproof QR tag. Scan it with any smartphone (no app needed), and you instantly get the tree's full profile — its age, health score, scientific name, care guide, CO₂ absorption stats, and more.


---

## Features

- **QR Scanner** — live camera-based QR scanning via `html5-qrcode`, with fallback manual ID entry
- **Tree Directory** — searchable, filterable grid of all campus trees with health indicators
- **Tree Profile Pages** — full per-tree detail including specs, care guides, fun facts, and inspection schedule
- **Interactive Campus Map** — SVG map with clickable pins and hover tooltips for every tree
- **Native vs Exotic Breakdown** — dedicated section explaining the biodiversity of local and introduced species
- **Issue Reporting** — modal form on each tree profile to report problems directly to the horticulture team
- **Print QR Tags** — generate and print QR codes from any tree's profile page

---

## Project Structure

```
CampusGrove/
├── index.html      # Landing page — hero, tree directory, map, scanner guide
├── tree.html       # Individual tree profile page (loaded via ?id=T001)
├── scan.html       # QR scanner page (camera + manual entry)
├── styles.css      # All styles — design system, components, responsive layout
├── data.js         # Tree database + helper functions (TREES array, getTreeById, etc.)
└── app.js          # Main JS — rendering logic for grid, map, stats, filters
```

---

## Getting Started

No build step required. Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

> **Note:** The QR camera scanner requires HTTPS or `localhost` due to browser camera permissions. For local testing, `localhost` works fine.

---

## Tree Data

All tree data lives in `data.js` as a plain JavaScript array (`TREES`). Each tree object follows this shape:

```js
{
  id: "T001",                        // Unique ID, used in QR codes and URLs
  name: "Banyan Tree",
  scientificName: "Ficus benghalensis",
  localName: "Vad / Bargad",
  isLocal: true,                     // true = native Indian species
  age: 87,
  height: "22 m",
  girth: "4.3 m",
  location: "Main Quad, Near Admin Block",
  coordinates: { lat: 18.5204, lng: 73.8567 },
  planted: "1938",
  health: "Excellent",               // Excellent | Good | Fair | Poor
  healthScore: 95,                   // 0–100
  category: "Shade Tree",
  co2Absorbed: "48 kg/year",
  waterNeeded: "120 L/week",
  lastInspected: "2026-02-10",
  nextInspection: "2026-05-10",
  description: "...",
  funFact: "...",
  nativeRegion: "Indian Subcontinent",
  care: [                            // Array of known issues + treatments
    {
      issue: "Yellowing Leaves",
      cause: "Iron deficiency or overwatering",
      treatment: "Apply ferrous sulfate solution...",
      urgency: "Low"                 // Critical | High | Medium | Low
    }
  ],
  tags: ["Heritage Tree", "Sacred", "Shade Provider"]
}
```

To add a new tree, append an entry to the `TREES` array in `data.js` and assign it the next sequential ID (`T011`, `T012`, etc.).

---

## QR Codes

Each tree's QR code encodes a URL in this format:

```
tree.html?id=T001
```

The scanner (`scan.html`) handles both full URLs and raw IDs (`T001`) from the QR payload. QR codes can be generated and printed directly from the tree's profile page using the **Print QR Tag** button.

---

## Accessing a Tree Profile Directly

Any tree profile can be linked or bookmarked:

```
tree.html?id=T001   → Banyan Tree
tree.html?id=T005   → Peepal Tree (oldest on campus)
tree.html?id=T006   → Gulmohar
```

---

## Current Tree Inventory

| ID | Tree | Type | Health |
|----|------|------|--------|
| T001 | Banyan Tree | Local | Excellent (95%) |
| T002 | Neem Tree | Local | Good (82%) |
| T003 | Rain Tree | Exotic | Good (78%) |
| T004 | Indian Laburnum | Local | Excellent (91%) |
| T005 | Peepal Tree | Local | Good (74%) |
| T006 | Gulmohar | Exotic | Excellent (88%) |
| T007 | Mango Tree | Local | Fair (65%) |
| T008 | Java Plum | Local | Excellent (90%) |
| T009 | Arjuna Tree | Local | Good (85%) |
| T010 | African Tulip | Exotic | Good (80%) |

---

## Dependencies

All dependencies are loaded via CDN — no `npm install` needed.

- [html5-qrcode](https://github.com/mebjas/html5-qrcode) `v2.3.8` — QR camera scanning
- [Google Fonts](https://fonts.google.com) — Inter + Playfair Display

---

