/* ─── app.js — CampusGrove Main Logic ─── */

// ── Leaf Particle Animation ──
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'leaf-particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${4 + Math.random() * 6}px;
      height: ${4 + Math.random() * 6}px;
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 10}s;
      border-radius: ${Math.random() > 0.5 ? '50% 0' : '0 50%'};
      opacity: 0.7;
    `;
    container.appendChild(p);
  }
}

// ── Navbar Scroll Effect ──
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Scroll Reveal ──
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Tree Emoji Map ──
const TREE_EMOJI = {
  'Banyan Tree': '🌳',
  'Neem Tree': '🌿',
  'Rain Tree': '🌲',
  'Indian Laburnum': '🌼',
  'Peepal Tree': '🌳',
  'Gulmohar': '🌺',
  'Mango Tree': '🥭',
  'Java Plum': '🫐',
  'Arjuna Tree': '🌱',
  'African Tulip': '🔴',
};

function getEmoji(name) {
  return TREE_EMOJI[name] || '🌳';
}

// ── Render Stats Strip ──
function renderStatsStrip() {
  const el = document.getElementById('stats-strip');
  if (!el) return;
  el.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  `;

  const chips = [
    { val: STATS.total, label: 'Trees Catalogued', icon: '🌳' },
    { val: STATS.local, label: 'Native Local Trees', icon: '🇮🇳' },
    { val: STATS.exotic, label: 'Exotic Introduced', icon: '🌍' },
    { val: STATS.totalCO2 + ' kg', label: 'CO₂ Absorbed / Year', icon: '💨' },
    { val: STATS.avgHealth + '%', label: 'Average Health Score', icon: '💚' },
    { val: STATS.heritage, label: 'Heritage Trees', icon: '🏛️' },
  ];

  el.innerHTML = chips.map(c => `
    <div class="stat-chip">
      <div style="font-size:24px;margin-bottom:6px;">${c.icon}</div>
      <div class="stat-chip-value">${c.val}</div>
      <div class="stat-chip-label">${c.label}</div>
    </div>
  `).join('');
}

// ── Render Hero Stats ──
function renderHeroStats() {
  const el = document.getElementById('hero-stats');
  if (!el) return;
  const chips = [
    { val: STATS.total, label: 'Trees on Campus' },
    { val: STATS.local + '/' + STATS.total, label: 'Native Species' },
    { val: STATS.totalCO2 + ' kg', label: 'CO₂/Year' },
  ];
  el.innerHTML = chips.map(c => `
    <div class="stat-chip">
      <div class="stat-chip-value">${c.val}</div>
      <div class="stat-chip-label">${c.label}</div>
    </div>
  `).join('');
}

// ── Build Tree Card HTML ──
function buildTreeCard(tree) {
  const hc = getHealthColor(tree.healthScore);
  const emoji = getEmoji(tree.name);
  const bgColors = {
    'Shade Tree':   'linear-gradient(135deg, #14532d, #1a3a20)',
    'Medicinal Tree': 'linear-gradient(135deg, #1e3a1e, #2d4a1e)',
    'Flowering Tree': 'linear-gradient(135deg, #2d1a2e, #1e2d1e)',
    'Heritage Tree': 'linear-gradient(135deg, #1a1a0a, #2d2a14)',
    'Fruit Tree':   'linear-gradient(135deg, #1a2d14, #2a1a0e)',
  };
  const bg = bgColors[tree.category] || 'linear-gradient(135deg, #14532d, #1a3a20)';

  return `
    <a class="tree-card reveal" href="tree.html?id=${tree.id}" id="card-${tree.id}">
      <div class="tree-card-banner" style="background: ${bg};">
        <div class="tree-card-emoji">${emoji}</div>
      </div>
      <div class="tree-card-body">
        <div class="tree-card-top">
          <div>
            <div class="tree-card-name">${tree.name}</div>
            <div class="tree-card-sci">${tree.scientificName}</div>
          </div>
          <span class="local-badge ${tree.isLocal ? 'local' : 'exotic'}">${tree.isLocal ? 'Local' : 'Exotic'}</span>
        </div>

        <div class="tree-card-meta">
          <span>🕐 ${tree.age} yrs</span>
          <span>📍 ${tree.location.split(',')[0]}</span>
          <span>📏 ${tree.height}</span>
        </div>

        <div class="health-bar-wrap">
          <div class="health-bar-track">
            <div class="health-bar-fill" style="width:${tree.healthScore}%; background: linear-gradient(90deg, ${hc}, ${hc}99);"></div>
          </div>
          <span class="health-bar-text" style="color:${hc}">${tree.health}</span>
        </div>

        <div class="tree-card-tags">
          ${tree.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `;
}

// ── Render Tree Grid ──
let currentFilter = 'all';
let currentSearch = '';

function renderTreeGrid() {
  const grid = document.getElementById('tree-grid');
  if (!grid) return;

  const filtered = TREES.filter(tree => {
    const matchFilter =
      currentFilter === 'all' ||
      (currentFilter === 'local' && tree.isLocal) ||
      (currentFilter === 'exotic' && !tree.isLocal) ||
      (currentFilter === 'flowering' && tree.category === 'Flowering Tree') ||
      (currentFilter === 'medicinal' && tree.category === 'Medicinal Tree');

    const q = currentSearch.toLowerCase();
    const matchSearch = !q ||
      tree.name.toLowerCase().includes(q) ||
      tree.scientificName.toLowerCase().includes(q) ||
      tree.localName.toLowerCase().includes(q) ||
      tree.location.toLowerCase().includes(q) ||
      tree.category.toLowerCase().includes(q) ||
      tree.tags.some(t => t.toLowerCase().includes(q));

    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="icon">🌾</div>
        <div style="font-size:18px; font-weight:700; color: var(--text-muted);">No trees found</div>
        <div style="font-size:14px; margin-top:8px; color: rgba(134,239,172,0.5);">Try a different search or filter</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(t => buildTreeCard(t)).join('');

  // Trigger reveal animations for newly rendered cards
  setTimeout(() => initReveal(), 50);
}

// ── Filter Buttons ──
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTreeGrid();
    });
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', e => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        currentSearch = e.target.value;
        renderTreeGrid();
      }, 200);
    });
  }
}

// ── Campus Map (SVG) ──
function renderCampusMap() {
  const mapEl = document.getElementById('campus-map');
  if (!mapEl) return;

  const tooltip = document.getElementById('map-tooltip');
  const W = 850, H = 480;

  // Assign relative coordinates on the map
  const positions = [
    { id: 'T001', x: 300, y: 180 }, // Main Quad
    { id: 'T002', x: 490, y: 140 }, // Boys Hostel
    { id: 'T003', x: 180, y: 260 }, // Science Block
    { id: 'T004', x: 590, y: 310 }, // Botanical Garden
    { id: 'T005', x: 650, y: 120 }, // Library
    { id: 'T006', x: 120, y: 90 },  // Main Gate
    { id: 'T007', x: 370, y: 380 }, // Faculty Quarters
    { id: 'T008', x: 700, y: 370 }, // Sports Ground
    { id: 'T009', x: 460, y: 420 }, // Lake / Pond
    { id: 'T010', x: 220, y: 130 }, // Parking / Canteen
  ];

  const healthColors = {
    'Excellent': '#22c55e',
    'Good': '#86efac',
    'Fair': '#eab308',
    'Poor': '#ef4444',
  };

  // Build campus paths (building footprints)
  const buildingPaths = `
    <!-- Main Gate Arch -->
    <rect x="80" y="30" width="90" height="50" rx="6" fill="rgba(34,197,94,0.08)" stroke="rgba(134,239,172,0.15)" stroke-width="1"/>
    <text x="125" y="62" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">MAIN GATE</text>

    <!-- Admin Block -->
    <rect x="240" y="120" width="120" height="90" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(134,239,172,0.12)" stroke-width="1"/>
    <text x="300" y="170" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">ADMIN BLOCK</text>

    <!-- Science Block -->
    <rect x="140" y="210" width="100" height="100" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(134,239,172,0.12)" stroke-width="1"/>
    <text x="190" y="265" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">SCIENCE</text>

    <!-- Library -->
    <rect x="600" y="60" width="100" height="80" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(134,239,172,0.12)" stroke-width="1"/>
    <text x="650" y="105" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">LIBRARY</text>

    <!-- Hostel -->
    <rect x="440" y="80" width="100" height="80" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(134,239,172,0.12)" stroke-width="1"/>
    <text x="490" y="125" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">HOSTEL B</text>

    <!-- Botanical Garden -->
    <ellipse cx="590" cy="310" rx="60" ry="50" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.2)" stroke-width="1" stroke-dasharray="4,4"/>
    <text x="590" y="314" fill="rgba(134,239,172,0.5)" font-size="9" text-anchor="middle" font-family="Inter">BOT. GARDEN</text>

    <!-- Sports Ground -->
    <ellipse cx="700" cy="400" rx="75" ry="55" fill="rgba(34,197,94,0.07)" stroke="rgba(134,239,172,0.15)" stroke-width="1"/>
    <text x="700" y="404" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">SPORTS</text>

    <!-- Lake -->
    <ellipse cx="460" cy="430" rx="70" ry="30" fill="rgba(37,99,235,0.15)" stroke="rgba(96,165,250,0.25)" stroke-width="1"/>
    <text x="460" y="434" fill="rgba(147,197,253,0.6)" font-size="9" text-anchor="middle" font-family="Inter">🏞 LAKE</text>

    <!-- Faculty Quarters -->
    <rect x="320" y="340" width="90" height="70" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(134,239,172,0.12)" stroke-width="1"/>
    <text x="365" y="380" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">FACULTY</text>

    <!-- Canteen + Parking -->
    <rect x="180" y="90" width="80" height="50" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(134,239,172,0.12)" stroke-width="1"/>
    <text x="220" y="118" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle" font-family="Inter">CANTEEN</text>

    <!-- Roads -->
    <path d="M 80 55 Q 200 55 300 180 Q 400 280 460 430" stroke="rgba(255,255,255,0.06)" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M 80 55 Q 200 55 650 100 Q 720 130 700 380" stroke="rgba(255,255,255,0.06)" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 300 180 Q 490 150 650 100" stroke="rgba(255,255,255,0.05)" stroke-width="8" fill="none"/>
  `;

  const treePins = positions.map(pos => {
    const tree = getTreeById(pos.id);
    if (!tree) return '';
    const col = healthColors[tree.health] || '#22c55e';
    const emoji = getEmoji(tree.name);
    return `
      <g class="map-tree-pin" data-id="${tree.id}" data-x="${pos.x}" data-y="${pos.y}"
         onclick="window.location='tree.html?id=${tree.id}'"
         transform="translate(${pos.x},${pos.y})">
        <!-- Glow pulse -->
        <circle r="18" fill="${col}" opacity="0.12">
          <animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.12;0.04;0.12" dur="3s" repeatCount="indefinite"/>
        </circle>
        <!-- Pin body -->
        <circle r="14" fill="${col}" opacity="0.9" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <!-- Emoji -->
        <text y="5" text-anchor="middle" font-size="13">${emoji}</text>
        <!-- ID label -->
        <text y="26" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.6)" font-family="Inter" font-weight="600">${pos.id}</text>
      </g>
    `;
  }).join('');

  mapEl.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
      <!-- Background grid -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(134,239,172,0.04)" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#grid)"/>
      ${buildingPaths}
      ${treePins}
    </svg>
    <div class="map-tooltip" id="map-tooltip" style="display:none;"></div>
    <!-- Legend -->
    <div style="position:absolute;bottom:16px;left:16px;display:flex;gap:12px;font-size:12px;background:rgba(10,26,14,0.8);border:1px solid rgba(134,239,172,0.15);border-radius:10px;padding:10px 14px;backdrop-filter:blur(12px);">
      <span style="color:#22c55e;">● Excellent</span>
      <span style="color:#86efac;">● Good</span>
      <span style="color:#eab308;">● Fair</span>
    </div>
  `;

  // Tooltip logic
  const tooltipEl = document.getElementById('map-tooltip');
  document.querySelectorAll('.map-tree-pin').forEach(pin => {
    pin.addEventListener('mouseenter', (e) => {
      const tree = getTreeById(pin.dataset.id);
      if (!tree || !tooltipEl) return;
      tooltipEl.style.display = 'block';
      tooltipEl.innerHTML = `
        <div style="font-weight:700;font-size:14px;color:var(--text-light);margin-bottom:4px;">${getEmoji(tree.name)} ${tree.name}</div>
        <div style="font-size:12px;color:var(--text-muted);">${tree.location}</div>
        <div style="font-size:12px;margin-top:4px;color:${getHealthColor(tree.healthScore)};">Health: ${tree.health} (${tree.healthScore}%)</div>
        <div style="font-size:11px;color:rgba(134,239,172,0.5);margin-top:2px;">${tree.isLocal ? '🇮🇳 Native' : '🌍 Exotic'} · ${tree.age} years old</div>
      `;
    });

    pin.addEventListener('mousemove', (e) => {
      if (!tooltipEl) return;
      const mapRect = mapEl.getBoundingClientRect();
      let tx = e.clientX - mapRect.left + 12;
      let ty = e.clientY - mapRect.top - 10;
      if (tx + 180 > mapRect.width) tx -= 200;
      tooltipEl.style.left = tx + 'px';
      tooltipEl.style.top = ty + 'px';
    });

    pin.addEventListener('mouseleave', () => {
      if (tooltipEl) tooltipEl.style.display = 'none';
    });
  });
}

// ── Local / Exotic Lists ──
function renderLocalExoticLists() {
  const localEl = document.getElementById('local-tree-list');
  const exoticEl = document.getElementById('exotic-tree-list');

  const localTrees = TREES.filter(t => t.isLocal);
  const exoticTrees = TREES.filter(t => !t.isLocal);

  if (localEl) {
    localEl.innerHTML = localTrees.map(t => `
      <a href="tree.html?id=${t.id}" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.1);text-decoration:none;transition:all 0.2s;cursor:pointer;"
         onmouseover="this.style.background='rgba(34,197,94,0.12)'" onmouseout="this.style.background='rgba(34,197,94,0.05)'">
        <span style="font-size:24px;">${getEmoji(t.name)}</span>
        <div>
          <div style="font-weight:600;font-size:14px;color:var(--text-light);">${t.name}</div>
          <div style="font-size:12px;color:var(--text-muted);font-style:italic;">${t.scientificName}</div>
        </div>
        <span style="margin-left:auto;font-size:11px;color:var(--green-400);font-weight:600;">${t.age} yrs →</span>
      </a>
    `).join('');
  }

  if (exoticEl) {
    exoticEl.innerHTML = exoticTrees.map(t => `
      <a href="tree.html?id=${t.id}" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;background:rgba(180,140,76,0.06);border:1px solid rgba(180,140,76,0.15);text-decoration:none;transition:all 0.2s;cursor:pointer;"
         onmouseover="this.style.background='rgba(180,140,76,0.12)'" onmouseout="this.style.background='rgba(180,140,76,0.06)'">
        <span style="font-size:24px;">${getEmoji(t.name)}</span>
        <div>
          <div style="font-weight:600;font-size:14px;color:var(--text-light);">${t.name}</div>
          <div style="font-size:12px;color:var(--text-muted);font-style:italic;">${t.scientificName}</div>
        </div>
        <span style="margin-left:auto;font-size:11px;color:var(--earth-300);font-weight:600;">${t.nativeRegion.split('/')[0].trim()} →</span>
      </a>
    `).join('');
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initNavbar();
  renderHeroStats();
  renderStatsStrip();
  renderTreeGrid();
  initFilters();
  renderCampusMap();
  renderLocalExoticLists();
  setTimeout(initReveal, 100);
});
