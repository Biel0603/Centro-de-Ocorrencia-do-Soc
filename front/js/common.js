/* ===== SOC — common.js =====
   Renders the sidebar + topbar on every page and keeps the clock live.
   Each page sets `window.PAGE = { key, title }` before including this file,
   and includes an empty <div id="app-shell-top"></div> wrapper — see pages.
*/

const NAV_ITEMS = [
  { key:'dashboard',  label:'Dashboard',        href:'index.html',
    icon:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>' },
  { key:'ocorrencias', label:'Ocorrências',      href:'ocorrencias.html',
    icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>' },
  { key:'turno',      label:'Passagem de Turno', href:'turno.html',
    icon:'<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>' },
  { key:'historico',  label:'Histórico',         href:'historico.html',
    icon:'<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>' },
  { key:'relatorios', label:'Relatórios',        href:'relatorios.html',
    icon:'<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>' },
];

function fmtDateTime(d){
  const dias = ['dom.','seg.','ter.','qua.','qui.','sex.','sáb.'];
  const meses = ['jan.','fev.','mar.','abr.','mai.','jun.','jul.','ago.','set.','out.','nov.','dez.'];
  const dia = dias[d.getDay()];
  const dd = String(d.getDate()).padStart(2,'0');
  const mes = meses[d.getMonth()];
  const hh = String(d.getHours()).padStart(2,'0');
  const mm = String(d.getMinutes()).padStart(2,'0');
  const ss = String(d.getSeconds()).padStart(2,'0');
  return `${dia}, ${dd} de ${mes} · ${hh}:${mm}:${ss}`;
}

function renderShell(){
  const page = window.PAGE || { key:'dashboard', title:'Dashboard' };

  const navHtml = NAV_ITEMS.map(item => `
    <a class="nav-item ${item.key===page.key?'active':''}" href="${item.href}">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
      ${item.label}
    </a>`).join('');

  const shellHtml = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2l8 3.5v5C20 15.5 16.5 20 12 22 7.5 20 4 15.5 4 10.5v-5L12 2z"/>
          </svg>
        </div>
        <div class="brand-text">
          <div class="name">SOC</div>
          <div class="sub">Centro de Distribuição</div>
        </div>
      </div>
      <nav class="sidebar-nav">${navHtml}</nav>
      <div class="sidebar-footer">
        <span class="status-dot"></span> Sistema Online
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="topbar-left">
          <button class="menu-btn" id="menuToggle" aria-label="Abrir menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div class="page-heading">
            <div class="title">${page.title}</div>
            <div class="subtitle" id="clock">${fmtDateTime(new Date())}</div>
          </div>
        </div>
        <div class="topbar-right">
          <button class="icon-btn" aria-label="Notificações">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
            <span class="dot-badge"></span>
          </button>
          <div class="user-chip">
            <div class="avatar">G</div>
            <div class="user-meta">
              <div class="u-name">gabriel.lucas</div>
              <div class="u-role">Operador SOC</div>
            </div>
            <button class="logout-btn" aria-label="Sair">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
            </button>
          </div>
        </div>
      </header>
      <main class="content" id="pageContent"></main>
    </div>
  `;

  document.getElementById('app-shell-top').outerHTML = shellHtml;

  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  setInterval(() => {
    const el = document.getElementById('clock');
    if (el) el.textContent = fmtDateTime(new Date());
  }, 1000);
}

document.addEventListener('DOMContentLoaded', renderShell);
