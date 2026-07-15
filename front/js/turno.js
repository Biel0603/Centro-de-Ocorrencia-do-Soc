/* ===== SOC — turno.js ===== */

const SHIFT_HANDOVERS = [
  { id: 'PAS-042', outgoing: 'carlos.mendes', incoming: 'gabriel.lucas', date: '12/07/2026 18:00', status: 'concluido', statusLabel: 'CONCLUÍDO', pendings: 'Nenhuma pendência crítica. Câmera 14-C em monitoramento por instabilidade.', obs: 'Turno transcorreu sem incidentes graves no pátio.' },
  { id: 'PAS-041', outgoing: 'ana.lima', incoming: 'carlos.mendes', date: '12/07/2026 06:00', status: 'concluido', statusLabel: 'CONCLUÍDO', pendings: 'Liberação de entrada da carreta placa XYZ-1234 pendente.', obs: 'Atenção redobrada na portaria norte devido a obras na via pública.' },
  { id: 'PAS-040', outgoing: 'roberto.silva', incoming: 'ana.lima', date: '11/07/2026 18:00', status: 'concluido', statusLabel: 'CONCLUÍDO', pendings: 'Nenhuma.', obs: 'Equipamento de rádio HT-03 deixado em manutenção.' }
];

function buildHandoverCard(item) {
  return `
    <div class="card" style="margin-bottom:16px; padding:20px;">
      <div style="display:flex; justify-content:between; align-items:center; flex-wrap:wrap; gap:12px; border-bottom:1px solid var(--panel-border); padding-bottom:12px; margin-bottom:12px;">
        <div style="flex:1;">
          <strong style="font-size:15px; color:var(--ink);">${item.id}</strong> · <span class="mono">${item.date}</span>
        </div>
        <div>
          <span class="badge ${item.status === 'concluido' ? 'resolvido' : 'progress'}">${item.statusLabel}</span>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:12px;">
        <div>
          <div style="font-size:12px; color:var(--gray-500); font-weight:600; text-transform:uppercase;">Operador de Saída</div>
          <div style="font-size:14px; font-weight:500; margin-top:2px;">${item.outgoing}</div>
        </div>
        <div>
          <div style="font-size:12px; color:var(--gray-500); font-weight:600; text-transform:uppercase;">Operador de Entrada</div>
          <div style="font-size:14px; font-weight:500; margin-top:2px;">${item.incoming}</div>
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <div style="font-size:12px; color:var(--gray-500); font-weight:600; text-transform:uppercase;">Pendências / Alertas</div>
        <div style="font-size:13.5px; margin-top:4px; color:var(--gray-700);">${item.pendings}</div>
      </div>
      <div>
        <div style="font-size:12px; color:var(--gray-500); font-weight:600; text-transform:uppercase;">Observações</div>
        <div style="font-size:13.5px; margin-top:4px; color:var(--gray-700);">${item.obs}</div>
      </div>
    </div>
  `;
}

function render() {
  const html = `
    <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:24px; align-items:start;">
      
      <!-- Novo Registro -->
      <div class="card" style="padding:24px;">
        <h3 style="margin-top:0; margin-bottom:20px; font-size:16.5px; font-weight:700; color:var(--ink);">Registrar Passagem de Turno</h3>
        <form id="frmTurno" style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; gap:16px;">
            <div style="display:flex; flex-direction:column; gap:6px; flex:1;">
              <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Operador de Entrada</label>
              <input type="text" class="input" id="incomingOp" required placeholder="Ex: ana.lima">
            </div>
            <div style="display:flex; flex-direction:column; gap:6px; flex:1;">
              <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Status</label>
              <select class="select" id="turnoStatus" required>
                <option value="concluido">Concluído</option>
                <option value="pendente">Pendente / Em andamento</option>
              </select>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Pendências Registradas</label>
            <textarea id="turnoPendings" required placeholder="Ex: Nenhuma pendência crítica. Câmeras ativas." style="min-height:80px;"></textarea>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <label style="font-size:13px; font-weight:600; color:var(--gray-700);">Observações Gerais do Turno</label>
            <textarea id="turnoObs" required placeholder="Observações..." style="min-height:80px;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self:flex-end;">Registrar Passagem</button>
        </form>
      </div>

      <!-- Histórico de Passagens -->
      <div>
        <h3 style="margin-top:0; margin-bottom:16px; font-size:16.5px; font-weight:700; color:var(--ink);">Passagens Recentes</h3>
        <div id="handoverList">
          <!-- Cards -->
        </div>
      </div>

    </div>
  `;

  document.getElementById('pageContent').innerHTML = html;

  const listDiv = document.getElementById('handoverList');
  const frmTurno = document.getElementById('frmTurno');

  function updateList() {
    listDiv.innerHTML = SHIFT_HANDOVERS.map(buildHandoverCard).join('');
  }

  frmTurno.addEventListener('submit', (e) => {
    e.preventDefault();
    const newId = `PAS-${String(SHIFT_HANDOVERS.length + 40).padStart(3, '0')}`;
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const statusVal = document.getElementById('turnoStatus').value;

    const newObj = {
      id: newId,
      outgoing: 'gabriel.lucas',
      incoming: document.getElementById('incomingOp').value,
      date: dateStr,
      status: statusVal,
      statusLabel: statusVal === 'concluido' ? 'CONCLUÍDO' : 'PENDENTE',
      pendings: document.getElementById('turnoPendings').value,
      obs: document.getElementById('turnoObs').value
    };

    SHIFT_HANDOVERS.unshift(newObj);
    frmTurno.reset();
    updateList();
  });

  updateList();
}

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 10));
