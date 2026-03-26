# 🌳 CampusGrove

**CampusGrove** is a campus tree registry and education platform. Physical QR code tags attached to trees on campus link students and faculty to rich tree profiles — covering age, health, scientific history, care protocols, and fascinating facts.

---

## Features

- **Tree Directory** — Browse all 10 catalogued campus trees with search and category filters (Local / Exotic / Flowering / Medicinal)
- **Interactive Campus Map** — SVG map with animated pins for each tree; hover for a quick summary, click to open the full profile
- **Tree Profiles** — Dedicated page per tree with health score, care guide, urgency-rated issue protocols, fun facts, and inspection history
- **Live QR Scanner** — Camera-based QR code reader; scanning a tree's physical tag navigates directly to its profile
- **Biodiversity Overview** — Side-by-side breakdown of native Indian trees vs. introduced exotic species
- **Statistics Strip** — Live-computed campus stats: total trees, CO₂ absorbed per year, average health score, heritage tree count

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, grid, glassmorphism, keyframe animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter & Playfair Display |
| QR Scanning | [html5-qrcode](https://github.com/mebjas/html5-qrcode) v2.3.8 (CDN) |
| Hosting | Any static file host (no build step required) |

---

## File Structure

```
CampusGrove/
├── index.html      # Main landing page (hero, tree directory, map, QR guide, biodiversity)
├── tree.html       # Individual tree profile page (URL param: ?id=T001)
├── scan.html       # Live camera QR scanner page
├── styles.css      # Full design system — dark forest theme, CSS variables, animations
├── data.js         # Tree database (10 trees), computed STATS, and helper functions
└── app.js          # All UI logic — rendering, filtering, map, scroll-reveal, events
```

---

## Getting Started

No build tools or dependencies to install. Just open `index.html` in a browser:

```bash
# Clone the repository
git clone https://github.com/srishtidotcom/CampusGrove.git
cd CampusGrove

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html
```

Or serve it with any static file server:

```bash
npx serve .
# then visit http://localhost:3000
```

---

## Tree Data

Each tree in `data.js` contains:

| Field | Description |
|---|---|
| `id` | Unique identifier (e.g. `T001`) — matches the QR code URL |
| `name` / `scientificName` / `localName` | Common, Latin, and regional names |
| `isLocal` | `true` for native Indian species, `false` for introduced exotics |
| `age`, `height`, `girth` | Physical measurements |
| `location`, `coordinates` | Campus location name and GPS coordinates |
| `health` / `healthScore` | Qualitative label and 0–100 score |
| `co2Absorbed` | Estimated annual CO₂ absorption |
| `category` | Shade / Medicinal / Flowering / Heritage / Fruit Tree |
| `care[]` | Array of `{ issue, cause, treatment, urgency }` care protocols |
| `tags` | Searchable keywords |

### Adding a New Tree

1. Open `data.js` and add a new object to the `TREES` array following the existing schema.
2. Use the next sequential ID (e.g. `T011`).
3. Add a coordinate entry in the `positions` array inside `renderCampusMap()` in `app.js` to place the tree on the campus map.

---

## QR Code Integration

Each tree's QR code encodes a URL of the form:

```
https://<your-domain>/tree.html?id=T001
```

Scanning the code with the built-in scanner (`scan.html`) or any smartphone camera navigates directly to that tree's profile page. To generate QR codes for physical tags, use any QR generator with the appropriate `tree.html?id=TXXX` URL.

---

## Campus Trees

| ID | Name | Category | Health | Local? |
|---|---|---|---|---|
| T001 | Banyan Tree | Shade Tree | Excellent (95%) | ✅ Native |
| T002 | Neem Tree | Medicinal Tree | Good (82%) | ✅ Native |
| T003 | Rain Tree | Shade Tree | Good (78%) | 🌍 Exotic |
| T004 | Indian Laburnum | Flowering Tree | Excellent (91%) | ✅ Native |
| T005 | Peepal Tree | Heritage Tree | Good (74%) | ✅ Native |
| T006 | Gulmohar | Flowering Tree | Excellent (88%) | 🌍 Exotic |
| T007 | Mango Tree | Fruit Tree | Fair (65%) | ✅ Native |
| T008 | Java Plum | Fruit Tree | Excellent (90%) | ✅ Native |
| T009 | Arjuna Tree | Medicinal Tree | Good (85%) | ✅ Native |
| T010 | African Tulip | Flowering Tree | Good (80%) | 🌍 Exotic |

---

## Contact

Maintained by the **Campus Horticulture Department**.  
Report tree issues: trees@campus.edu · Emergency: Ext. 4200

---

© 2026 CampusGrove · All tree data verified by certified arborists
