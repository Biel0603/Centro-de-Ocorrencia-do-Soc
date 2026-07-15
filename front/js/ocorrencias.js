/* ===== SOC — ocorrencias.js ===== */

const OCCURRENCES = [
  { id: 'INC-001', sev: 'critico', title: 'Acesso Não Autorizado', loc: 'Portaria Principal', op: 'Carlos Mendes', date: '12/07/2026 19:30', status: 'andamento', statusLabel: 'EM ANDAMENTO', desc: 'Indivíduo sem credencial tentou passar pelo torniquete da portaria. Detido pela equipe.' },
  { id: 'INC-002', sev: 'alto',    title: 'Incidente Veicular',    loc: 'Pátio de Manobras',  op: 'Ana Lima',      date: '12/07/2026 18:15', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Colisão leve entre duas carretas durante manobra no pátio. Sem feridos, apenas danos materiais leves.' },
  { id: 'INC-003', sev: 'medio',   title: 'Falha de Equipamento',  loc: 'Câmera 14-C',        op: 'Roberto Silva', date: '12/07/2026 17:40', status: 'aberto',    statusLabel: 'ABERTO', desc: 'Câmera 14-C apresentou perda de sinal de vídeo intermitente. Manutenção acionada.' },
  { id: 'INC-004', sev: 'alto',    title: 'Furto / Tentativa',     loc: 'Armazém B3',         op: 'Patricia Costa',date: '11/07/2026 23:10', status: 'fechado',   statusLabel: 'FECHADO', desc: 'Suspeita de violação de lacre de palete no setor B3. Nada foi subtraído após conferência física.' },
  { id: 'INC-005', sev: 'medio',   title: 'Objeto Suspeito',       loc: 'Dock 1-A',           op: 'Diego Souza',   date: '11/07/2026 15:45', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Mochila esquecida na área de recepção do Dock 1. Identificada como pertencente a funcionário terceirizado.' },
  { id: 'INC-006', sev: 'baixo',   title: 'Lâmpada Queimada',      loc: 'Estacionamento Norte',op: 'Carlos Mendes',date: '11/07/2026 10:20', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Refletor 4 do estacionamento norte queimado. Lâmpada substituída.' },
  { id: 'INC-007', sev: 'critico', title: 'Falha no Alarme',       loc: 'Setor Administrativo', op: 'Ana Lima', date: '10/07/2026 09:15', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Disparo falso do alarme no prédio administrativo. Sensor de fumaça limpo.' }
];

function buildRow(item) {
  return `
    <tr onclick="showDetails('${item.id}')">
      <td class="id-cell">${item.id}</td>
      <td><span class="sev ${item.sev}">${item.sev}</span></td>
      <td><strong>${item.title}</strong></td>
      <td>${item.loc}</td>
      <td>${item.op}</td>
      <td class="mono">${item.date}</td>
      <td><span class="badge ${item.status}">${item.statusLabel}</span></td>
      <td>
        <button class="action-btn" onclick="event.stopPropagation(); alert('Editar ${item.id}');" aria-label="Editar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </td>
    </tr>
  `;
}

function showDetails(id) {
  const item = OCCURRENCES.find(o => o.id === id);
  if (!item) return;
  alert(`[Detalhes da Ocorrência ${item.id}]\n\nTítulo: ${item.title}\nLocal: ${item.loc}\nOperador: ${item.op}\nData: ${item.date}\nStatus: ${item.statusLabel}\n\nDescrição: ${item.desc}`);
}

function render() {
  const html = `
    <div class="toolbar">
      <div class="search-input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="input" id="searchOcc" placeholder="Buscar por título, local ou operador...">
      </div>
      
      <select class="select" id="filterSev">
        <option value="">Todas as Severidades</option>
        <option value="critico">Crítica</option>
        <option value="alto">Alta</option>
        <option value="medio">Média</option>
        <option value="baixo">Baixa</option>
      </select>

      <select class="select" id="filterStatus">
        <option value="">Todos os Status</option>
        <option value="aberto">Aberto</option>
        <option value="andamento">Em Andamento</option>
        <option value="resolvido">Resolvido</option>
        <option value="fechado">Fechado</option>
      </select>

      <button class="btn btn-primary" id="btnNewOcc">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Nova Ocorrência
      </button>
    </div>

    <div class="card table-card">
      <div class="table-header-row">
        <div class="table-count" id="tableCount">Mostrando ${OCCURRENCES.length} ocorrências</div>
        <div class="filters-active" id="filtersActive" style="display:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
          Filtros ativos
        </div>
      </div>
      <div class="table-scroll">
        <table id="occTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Severidade</th>
              <th>Título</th>
              <th>Localização</th>
              <th>Operador</th>
              <th>Data/Hora</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="occTableBody">
            <!-- rows -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div id="occModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.45); z-index:1000; align-items:center; justify-content:center; backdrop-filter: blur(2px);">
      <div class="card" style="width:500px; padding:28px; background:#fff; position:relative; border-radius:16px;">
        <h3 style="margin-top:0; margin-bottom:20px; font-size:18px; font-weight:700; color:var(--ink);">Registrar Ocorrência</h3>
        <form id="frmNewOcc" style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; flex-direction:column; gap:6px;">
            <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Título</label>
            <input type="text" class="input" id="newTitle" required placeholder="Ex: Incidente Veicular">
          </div>
          <div style="display:flex; gap:16px;">
            <div style="display:flex; flex-direction:column; gap:6px; flex:1;">
              <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Severidade</label>
              <select class="select" id="newSev" required>
                <option value="baixo">Baixo</option>
                <option value="medio">Médio</option>
                <option value="alto">Alto</option>
                <option value="critico">Crítico</option>
              </select>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px; flex:1;">
              <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Localização</label>
              <input type="text" class="input" id="newLoc" required placeholder="Ex: Dock 4">
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Descrição</label>
            <textarea id="newDesc" required placeholder="Detalhes do incidente..." style="min-height:100px;"></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:8px;">
            <button type="button" class="btn btn-ghost" id="btnCancelOcc">Cancelar</button>
            <button type="submit" class="btn btn-primary">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('pageContent').innerHTML = html;

  const tableBody = document.getElementById('occTableBody');
  const searchInput = document.getElementById('searchOcc');
  const filterSev = document.getElementById('filterSev');
  const filterStatus = document.getElementById('filterStatus');
  const tableCount = document.getElementById('tableCount');
  const filtersActive = document.getElementById('filtersActive');
  const modal = document.getElementById('occModal');
  const btnNewOcc = document.getElementById('btnNewOcc');
  const btnCancelOcc = document.getElementById('btnCancelOcc');
  const frmNewOcc = document.getElementById('frmNewOcc');

  function updateTable() {
    const q = searchInput.value.toLowerCase();
    const sev = filterSev.value;
    const status = filterStatus.value;

    const filtered = OCCURRENCES.filter(item => {
      const matchQ = !q || item.title.toLowerCase().includes(q) || item.loc.toLowerCase().includes(q) || item.op.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      const matchSev = !sev || item.sev === sev;
      const matchStatus = !status || item.status === status;
      return matchQ && matchSev && matchStatus;
    });

    tableBody.innerHTML = filtered.map(buildRow).join('');
    tableCount.textContent = `Mostrando ${filtered.length} ocorrência${filtered.length === 1 ? '' : 's'}`;
    
    if (sev || status || q) {
      filtersActive.style.display = 'flex';
    } else {
      filtersActive.style.display = 'none';
    }
  }

  searchInput.addEventListener('input', updateTable);
  filterSev.addEventListener('change', updateTable);
  filterStatus.addEventListener('change', updateTable);

  btnNewOcc.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  btnCancelOcc.addEventListener('click', () => {
    modal.style.display = 'none';
    frmNewOcc.reset();
  });

  frmNewOcc.addEventListener('submit', (e) => {
    e.preventDefault();
    const newId = `INC-${String(OCCURRENCES.length + 1).padStart(3, '0')}`;
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newObj = {
      id: newId,
      title: document.getElementById('newTitle').value,
      sev: document.getElementById('newSev').value,
      loc: document.getElementById('newLoc').value,
      op: 'gabriel.lucas',
      date: dateStr,
      status: 'aberto',
      statusLabel: 'ABERTO',
      desc: document.getElementById('newDesc').value
    };

    OCCURRENCES.unshift(newObj);
    modal.style.display = 'none';
    frmNewOcc.reset();
    updateTable();
  });

  updateTable();
}

window.showDetails = showDetails;

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 10));
