/* ===== configuracoes.js =====
   Tela de Configurações: preferências de notificação, painel e segurança.
   Persistidas em localStorage sob a chave 'socSettings'.
*/

const SETTINGS_KEY = 'socSettings';

const DEFAULT_SETTINGS = {
  alertasEmail: true,
  notifPush: true,
  somAlerta: false,
  atualizacaoAuto: true,
  itensPorPagina: '25',
  doisFatores: false,
};

function loadSettings(){
  try{
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  }catch(e){
    return { ...DEFAULT_SETTINGS };
  }
}

function svgIcon(paths, cls){
  return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
const ICONS = {
  chevron:'<path d="M9 18l6-6-6-6"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  shield:'<path d="M12 2 4 5v6c0 5.5 3.4 9.4 8 11 4.6-1.6 8-5.5 8-11V5z"/>',
};

function toggleRow({id, title, desc, checked}){
  return `
  <div class="pref-row">
    <div class="pref-info">
      <div class="pref-title">${title}</div>
      <div class="pref-desc">${desc}</div>
    </div>
    <div class="pref-control">
      <label class="switch">
        <input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>
        <span class="slider"></span>
      </label>
    </div>
  </div>`;
}

function render(){
  const settings = loadSettings();
  const profile = (typeof getProfile === 'function' && getProfile()) || {};
  const name = profile.name || 'gabriel.lucas';
  const role = profile.role || 'Operador SOC';

  const html = `
    <div class="card settings-section">
      <a class="link-card" href="conta.html">
        <div class="avatar-md" id="accountLinkAvatar">${name.charAt(0).toUpperCase() || 'G'}</div>
        <div class="link-card-body">
          <div class="link-card-title">${name}</div>
          <div class="link-card-sub">${role} · Editar foto, dados pessoais e senha</div>
        </div>
        ${svgIcon(ICONS.chevron, 'link-card-arrow')}
      </a>
    </div>

    <div class="card settings-section">
      <div class="section-head">
        <div class="panel-title">Notificações</div>
        <div class="section-desc">Escolha como você quer ser avisado sobre ocorrências e eventos do sistema.</div>
      </div>
      ${toggleRow({id:'alertasEmail', title:'Alertas críticos por e-mail', desc:'Receber um e-mail quando uma ocorrência crítica for aberta.', checked:settings.alertasEmail})}
      ${toggleRow({id:'notifPush', title:'Notificações no navegador', desc:'Mostrar notificações push enquanto o painel estiver aberto.', checked:settings.notifPush})}
      ${toggleRow({id:'somAlerta', title:'Som de alerta', desc:'Tocar um som ao receber uma ocorrência crítica.', checked:settings.somAlerta})}
    </div>

    <div class="card settings-section">
      <div class="section-head">
        <div class="panel-title">Preferências do Painel</div>
        <div class="section-desc">Ajuste como as informações são exibidas nas listas e tabelas.</div>
      </div>
      ${toggleRow({id:'atualizacaoAuto', title:'Atualização automática', desc:'Atualizar dashboards e listas automaticamente a cada minuto.', checked:settings.atualizacaoAuto})}
      <div class="pref-row">
        <div class="pref-info">
          <div class="pref-title">Itens por página</div>
          <div class="pref-desc">Quantidade de linhas exibidas em tabelas como Ocorrências e Histórico.</div>
        </div>
        <div class="pref-control">
          <select class="select" id="itensPorPagina">
            <option value="10" ${settings.itensPorPagina==='10'?'selected':''}>10</option>
            <option value="25" ${settings.itensPorPagina==='25'?'selected':''}>25</option>
            <option value="50" ${settings.itensPorPagina==='50'?'selected':''}>50</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card settings-section">
      <div class="section-head">
        <div class="panel-title">Segurança</div>
        <div class="section-desc">Proteja o acesso à sua conta no sistema.</div>
      </div>
      ${toggleRow({id:'doisFatores', title:'Autenticação de dois fatores', desc:'Exigir um código adicional ao entrar no sistema.', checked:settings.doisFatores})}
      <div class="pref-row">
        <div class="pref-info">
          <div class="pref-title">Sessões ativas</div>
          <div class="pref-desc">Encerrar todas as sessões abertas em outros dispositivos.</div>
        </div>
        <div class="pref-control">
          <button class="btn btn-ghost" id="btnEncerrarSessoes">Encerrar sessões</button>
        </div>
      </div>
      <div class="save-bar" style="border-radius:0 0 var(--radius-md) var(--radius-md);">
        <span class="save-status" id="saveStatus">${svgIcon(ICONS.check)} Alterações salvas</span>
        <button class="btn btn-primary" id="btnSalvar">Salvar alterações</button>
      </div>
    </div>
  `;

  document.getElementById('pageContent').innerHTML = html;

  const inputIds = ['alertasEmail','notifPush','somAlerta','atualizacaoAuto','itensPorPagina','doisFatores'];

  document.getElementById('btnSalvar').addEventListener('click', () => {
    const updated = {};
    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      updated[id] = el.type === 'checkbox' ? el.checked : el.value;
    });
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...loadSettings(), ...updated }));
    const status = document.getElementById('saveStatus');
    status.classList.add('show');
    setTimeout(() => status.classList.remove('show'), 2200);
  });

  document.getElementById('btnEncerrarSessoes').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const original = btn.textContent;
    btn.textContent = 'Sessões encerradas';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2000);
  });

  const linkAvatar = document.getElementById('accountLinkAvatar');
  if(linkAvatar && typeof applyAvatar === 'function'){
    applyAvatar(linkAvatar, profile);
  }
}

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 0));
