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
  { key:'configuracoes', label:'Configurações',  href:'configuracoes.html',
    icon:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
];

/* ===== Perfil do usuário (persistido no navegador) ===== */
const PROFILE_KEY = 'socProfile';

function getProfile(){
  try{
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}

function saveProfile(profile){
  const current = getProfile() || {};
  const merged = { ...current, ...profile };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
  updateShellProfile();
  return merged;
}

function getInitials(name){
  if(!name) return 'G';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if(parts.length === 0) return 'G';
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

function applyAvatar(el, profile){
  const name = (profile && profile.name) || 'gabriel.lucas';
  if(profile && profile.photo){
    el.style.backgroundImage = `url(${profile.photo})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.textContent = '';
  } else {
    el.style.backgroundImage = '';
    el.textContent = getInitials(name);
  }
}

function updateShellProfile(){
  const profile = getProfile();
  const avatarEl = document.getElementById('userAvatar');
  const nameEl = document.getElementById('userName');
  const roleEl = document.getElementById('userRole');
  if(!avatarEl) return;
  const name = (profile && profile.name) || 'gabriel.lucas';
  const role = (profile && profile.role) || 'Operador SOC';
  if(nameEl) nameEl.textContent = name;
  if(roleEl) roleEl.textContent = role;
  applyAvatar(avatarEl, profile);
}

/* ===== Notificações ===== */
const NOTIF_READ_KEY = 'socNotifReadIds';

const NOTIFICATIONS = [
  { id:'n1', sev:'critico', title:'Acesso Não Autorizado', desc:'Portaria Principal · Carlos Mendes', time:'há 8 min',  href:'ocorrencias.html' },
  { id:'n2', sev:'critico', title:'Incidente Veicular',     desc:'Pátio de Manobras · Ana Lima',     time:'há 34 min', href:'ocorrencias.html' },
  { id:'n3', sev:'medio',   title:'Falha de Equipamento',   desc:'Câmera 14-C · Roberto Silva',      time:'há 1 h',    href:'ocorrencias.html' },
  { id:'n4', sev:'alto',    title:'Furto / Tentativa',      desc:'Armazém B3 · Patricia Costa',      time:'há 3 h',    href:'ocorrencias.html' },
  { id:'n5', sev:'medio',   title:'Objeto Suspeito',        desc:'Dock 1-A · Diego Souza',           time:'ontem',     href:'ocorrencias.html' },
];

function getReadIds(){
  try{
    const raw = localStorage.getItem(NOTIF_READ_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  }catch(e){ return new Set(); }
}

function setReadIds(idsSet){
  localStorage.setItem(NOTIF_READ_KEY, JSON.stringify([...idsSet]));
}

function getUnreadCount(){
  const readIds = getReadIds();
  return NOTIFICATIONS.filter(n => !readIds.has(n.id)).length;
}

function notifIconSvg(){
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>`;
}

function renderNotifContent(){
  const readIds = getReadIds();
  const unread = NOTIFICATIONS.filter(n => !readIds.has(n.id)).length;

  const itemsHtml = NOTIFICATIONS.length ? NOTIFICATIONS.map(n => `
    <a class="notif-item ${readIds.has(n.id) ? '' : 'unread'}" href="${n.href}" data-notif-id="${n.id}">
      <span class="sev ${n.sev}"></span>
      <span class="notif-body">
        <span class="notif-title">${n.title}</span>
        <span class="notif-desc">${n.desc}</span>
        <span class="notif-time">${n.time}</span>
      </span>
      ${readIds.has(n.id) ? '' : '<span class="unread-dot"></span>'}
    </a>`).join('') : `<div class="notif-empty">Nenhuma notificação por aqui.</div>`;

  return `
    <div class="notif-header">
      <span>Notificações${unread ? ` (${unread})` : ''}</span>
      <button class="notif-mark-all" id="notifMarkAll" type="button" ${unread ? '' : 'disabled'}>Marcar todas como lidas</button>
    </div>
    <div class="notif-list">${itemsHtml}</div>
    <a class="notif-footer" href="ocorrencias.html">Ver todas as ocorrências</a>`;
}

function renderNotifPanel(){
  return `<div class="notif-dropdown" id="notifDropdown" hidden>${renderNotifContent()}</div>`;
}

function updateNotifBadge(){
  const dot = document.getElementById('notifDot');
  if(!dot) return;
  dot.style.display = getUnreadCount() > 0 ? '' : 'none';
}

function initNotifications(){
  const wrap = document.getElementById('notifWrap');
  const btn = document.getElementById('notifBtn');
  const dropdown = document.getElementById('notifDropdown');
  if(!wrap || !btn || !dropdown) return;

  updateNotifBadge();

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
  });

  // Delegação: cobre itens e o botão "marcar todas", mesmo depois do innerHTML ser atualizado
  dropdown.addEventListener('click', (e) => {
    if(e.target.closest('#notifMarkAll')){
      e.preventDefault();
      setReadIds(new Set(NOTIFICATIONS.map(n => n.id)));
      dropdown.innerHTML = renderNotifContent();
      updateNotifBadge();
      return;
    }
    const item = e.target.closest('.notif-item');
    if(item){
      const readIds = getReadIds();
      readIds.add(item.dataset.notifId);
      setReadIds(readIds);
      updateNotifBadge();
      // não bloqueia a navegação — o item também é um link para a ocorrência
    }
  });

  document.addEventListener('click', (e) => {
    if(!wrap.contains(e.target)) dropdown.hidden = true;
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') dropdown.hidden = true;
  });
}

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
  const profile = getProfile();
  const name = (profile && profile.name) || 'gabriel.lucas';
  const role = (profile && profile.role) || 'Operador SOC';

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
          <div class="notif-wrap" id="notifWrap">
            <button class="icon-btn" id="notifBtn" aria-label="Notificações" aria-haspopup="true">
              ${notifIconSvg()}
              <span class="dot-badge" id="notifDot"></span>
            </button>
            ${renderNotifPanel()}
          </div>
          <div class="user-chip">
            <a class="user-chip-link" href="conta.html" title="Minha conta">
              <div class="avatar" id="userAvatar">${name ? '' : 'G'}</div>
              <div class="user-meta">
                <div class="u-name" id="userName">${name}</div>
                <div class="u-role" id="userRole">${role}</div>
              </div>
            </a>
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

  applyAvatar(document.getElementById('userAvatar'), profile);
  initNotifications();

  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  setInterval(() => {
    const el = document.getElementById('clock');
    if (el) el.textContent = fmtDateTime(new Date());
  }, 1000);
}

document.addEventListener('DOMContentLoaded', renderShell);