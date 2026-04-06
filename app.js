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
  const imageUrl = Array.isArray(tree.images) && tree.images.length > 0 ? tree.images[0] : null;
  const hasImage = Boolean(imageUrl);
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
        ${hasImage
          ? `<img src="${imageUrl}" alt="${tree.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" onerror="this.remove();" />
             <div class="tree-card-emoji" aria-hidden="true">${emoji}</div>`
          : `<div class="tree-card-emoji" aria-hidden="true">${emoji}</div>`}
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
  renderLocalExoticLists();
  setTimeout(initReveal, 100);
});
