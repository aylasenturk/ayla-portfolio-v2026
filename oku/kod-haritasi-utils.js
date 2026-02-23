// ── Yardimci Fonksiyonlar ──
// Tema, panel, gorunum degistirme ve dugum islemleri

// Aktif simulasyon referansi (Force-directed graph icin)
let currentSimulation = null;

/**
 * Tema degistirme - light/dark
 */
function toggleTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  switchView(document.getElementById('viewSelect').value);
}

/**
 * Dugumun tam dosya yolunu olusturur
 * Ornek: src/pages/HomePage.tsx
 */
function getFileKey(d) {
  return d.ancestors().reverse().map(n => n.data.name).join("/");
}

/**
 * Dugum tipine gore renk dondurur
 * Klasorler: accent rengi, Dosyalar: typeColors'dan
 */
function getNodeColor(d) {
  if (d.children || d._children) {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || "#0ea5e9";
  }
  return typeColors[d.data.type] || "#999";
}

/**
 * Detay panelini acar ve dosya bilgilerini gosterir
 */
function openPanel(key) {
  const info = fileDetails[key];
  if (!info) return;

  const c = document.getElementById("detail-content");
  let html = `<h2>${key.split("/").pop()}</h2>`;
  html += `<div class="file-path">${key}</div>`;
  html += `<p style="font-size:0.85rem;color:var(--text-main);margin-bottom:0.75rem">${info.desc}</p>`;
  html += `<p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:1rem">${info.meta}</p>`;
  html += `<div class="section-title">Export</div><span class="tag tag-fn">${info.export}</span>`;

  if (info.types.length) {
    html += `<div class="section-title">Interface / Type</div>`;
    info.types.forEach(t => html += `<span class="tag tag-type">${t}</span>`);
  }
  if (info.state.length) {
    html += `<div class="section-title">State (useState)</div>`;
    info.state.forEach(s => html += `<span class="tag tag-state">${s}</span>`);
  }
  if (info.consts.length) {
    html += `<div class="section-title">Sabitler (const)</div>`;
    info.consts.forEach(c => html += `<span class="tag tag-const">${c}</span>`);
  }
  if (info.fns.length) {
    html += `<div class="section-title">Fonksiyonlar</div>`;
    info.fns.forEach(f => html += `<span class="tag tag-fn">${f}</span>`);
  }
  if (info.hooks.length) {
    html += `<div class="section-title">Hook'lar</div>`;
    info.hooks.forEach(h => html += `<span class="tag tag-hook">${h}</span>`);
  }

  c.innerHTML = html;
  document.getElementById("detail-panel").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}

/**
 * Detay panelini kapatir
 */
function closePanel() {
  document.getElementById("detail-panel").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

/**
 * Gorunum degistirir - grafik alanini temizleyip secilen gorunumu render eder
 */
function switchView(view) {
  if (currentSimulation) { currentSimulation.stop(); currentSimulation = null; }
  document.getElementById("chart").innerHTML = "";
  closePanel();
  switch (view) {
    case "indented": renderIndentedTree(); break;
    case "tidy": renderTidyTree(); break;
    case "force": renderForceGraph(); break;
    case "tangled": renderTangledTree(); break;
  }
}
