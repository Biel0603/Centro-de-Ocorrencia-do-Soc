/* ===== SOC — historico.js ===== */

const HISTORICO_DATA = [
  { id: 'INC-001', sev: 'critico', title: 'Acesso Não Autorizado', loc: 'Portaria Principal', op: 'Carlos Mendes', date: '12/07/2026 19:30', status: 'andamento', statusLabel: 'EM ANDAMENTO', desc: 'Indivíduo sem credencial tentou passar pelo torniquete da portaria. Detido pela equipe.' },
  { id: 'INC-002', sev: 'alto',    title: 'Incidente Veicular',    loc: 'Pátio de Manobras',  op: 'Ana Lima',      date: '12/07/2026 18:15', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Colisão leve entre duas carretas durante manobra no pátio. Sem feridos, apenas danos materiais leves.' },
  { id: 'INC-003', sev: 'medio',   title: 'Falha de Equipamento',  loc: 'Câmera 14-C',        op: 'Roberto Silva', date: '12/07/2026 17:40', status: 'aberto',    statusLabel: 'ABERTO', desc: 'Câmera 14-C apresentou perda de sinal de vídeo intermitente. Manutenção acionada.' },
  { id: 'INC-004', sev: 'alto',    title: 'Furto / Tentativa',     loc: 'Armazém B3',         op: 'Patricia Costa',date: '11/07/2026 23:10', status: 'fechado',   statusLabel: 'FECHADO', desc: 'Suspeita de violação de lacre de palete no setor B3. Nada foi subtraído após conferência física.' },
  { id: 'INC-005', sev: 'medio',   title: 'Objeto Suspeito',       loc: 'Dock 1-A',           op: 'Diego Souza',   date: '11/07/2026 15:45', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Mochila esquecida na área de recepção do Dock 1. Identificada como pertencente a funcionário terceirizado.' },
  { id: 'INC-006', sev: 'baixo',   title: 'Lâmpada Queimada',      loc: 'Estacionamento Norte',op: 'Carlos Mendes',date: '11/07/2026 10:20', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Refletor 4 do estacionamento norte queimado. Lâmpada substituída.' },
  { id: 'INC-007', sev: 'critico', title: 'Falha no Alarme',       loc: 'Setor Administrativo', op: 'Ana Lima', date: '10/07/2026 09:15', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Disparo falso do alarme no prédio administrativo. Sensor de fumaça limpo.' },
  { id: 'INC-008', sev: 'baixo',   title: 'Vazamento de Água',     loc: 'Banheiros Docas',    op: 'Diego Souza',   date: '09/07/2026 14:00', status: 'fechado',   statusLabel: 'FECHADO', desc: 'Pequeno vazamento identificado na torneira do banheiro das docas. Reparo realizado pela equipe de infraestrutura.' },
  { id: 'INC-009', sev: 'medio',   title: 'Obstrução de Rota',     loc: 'Corredor Central',   op: 'Carlos Mendes', date: '08/07/2026 11:30', status: 'resolvido', statusLabel: 'RESOLVIDO', desc: 'Paletes vazios estavam obstruindo a rota de fuga do corredor central. Resolvido imediatamente após aviso.' },
  { id: 'INC-010', sev: 'alto',    title: 'Queda de Energia',      loc: 'Armazém A1',         op: 'Ana Lima',      date: '07/07/2026 21:05', status: 'fechado',   statusLabel: 'FECHADO', desc: 'Queda temporária de energia no bloco A1. Geradores acionados automaticamente. Energia da rede reestabelecida em 12 minutos.' }
];

function buildRow(item) {
  return `
    <tr onclick="toggleDetails('${item.id}')">
      <td class="id-cell">${item.id}</td>
      <td><span class="sev ${item.sev}">${item.sev}</span></td>
      <td><strong>${item.title}</strong></td>
      <td>${item.loc}</td>
      <td>${item.op}</td>
      <td class="mono">${item.date}</td>
      <td><span class="badge ${item.status}">${item.statusLabel}</span></td>
    </tr>
    <tr id="details-${item.id}" class="details-row" style="display:none; background:var(--gray-50);">
      <td colspan="7" style="padding: 16px 20px; border-bottom: 1px solid var(--panel-border);">
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="font-size:12px; color:var(--gray-500); font-weight:600; text-transform:uppercase;">Descrição Detalhada</div>
          <div style="font-size:13.5px; color:var(--gray-700); line-height:1.5;">${item.desc}</div>
        </div>
      </td>
    </tr>
  `;
}

function toggleDetails(id) {
  const row = document.getElementById(`details-${id}`);
  if (row) {
    row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
  }
}

function render() {
  const html = `
    <div class="toolbar">
      <div class="search-input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="input" id="searchHist" placeholder="Buscar por ID, título, local, operador ou descrição...">
      </div>
      
      <select class="select" id="histSev">
        <option value="">Todas as Severidades</option>
        <option value="critico">Crítica</option>
        <option value="alto">Alta</option>
        <option value="medio">Média</option>
        <option value="baixo">Baixa</option>
      </select>

      <select class="select" id="histStatus">
        <option value="">Todos os Status</option>
        <option value="aberto">Aberto</option>
        <option value="andamento">Em Andamento</option>
        <option value="resolvido">Resolvido</option>
        <option value="fechado">Fechado</option>
      </select>
    </div>

    <div class="card table-card">
      <div class="table-header-row">
        <div class="table-count" id="histCount">Mostrando ${HISTORICO_DATA.length} registros</div>
        <div style="font-size:12.5px; color:var(--gray-500);">Clique em uma linha para ver a descrição detalhada</div>
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Severidade</th>
              <th>Título</th>
              <th>Localização</th>
              <th>Operador</th>
              <th>Data/Hora</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="histTableBody">
            <!-- Rows -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('pageContent').innerHTML = html;

  const tableBody = document.getElementById('histTableBody');
  const searchInput = document.getElementById('searchHist');
  const filterSev = document.getElementById('histSev');
  const filterStatus = document.getElementById('histStatus');
  const histCount = document.getElementById('histCount');

  function updateTable() {
    const q = searchInput.value.toLowerCase();
    const sev = filterSev.value;
    const status = filterStatus.value;

    const filtered = HISTORICO_DATA.filter(item => {
      const matchQ = !q || 
                     item.title.toLowerCase().includes(q) || 
                     item.loc.toLowerCase().includes(q) || 
                     item.op.toLowerCase().includes(q) || 
                     item.id.toLowerCase().includes(q) ||
                     item.desc.toLowerCase().includes(q);
      const matchSev = !sev || item.sev === sev;
      const matchStatus = !status || item.status === status;
      return matchQ && matchSev && matchStatus;
    });

    tableBody.innerHTML = filtered.map(buildRow).join('');
    histCount.textContent = `Mostrando ${filtered.length} registro${filtered.length === 1 ? '' : 's'}`;
  }

  searchInput.addEventListener('input', updateTable);
  filterSev.addEventListener('change', updateTable);
  filterStatus.addEventListener('change', updateTable);

  updateTable();
}

window.toggleDetails = toggleDetails;

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 10));
