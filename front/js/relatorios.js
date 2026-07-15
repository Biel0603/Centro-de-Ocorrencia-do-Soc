/* ===== SOC — relatorios.js ===== */

function render() {
  const html = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(400px, 1fr)); gap:20px; margin-bottom:20px;">
      
      <!-- Card 1: Ocorrências por Categoria -->
      <div class="card" style="padding:20px;">
        <div class="panel-head" style="padding:0 0 16px;">
          <div class="panel-title">Ocorrências por Categoria</div>
          <div class="panel-sub">Distribuição acumulada de incidentes</div>
        </div>
        <div class="chart-wrap" style="height:250px;"><canvas id="categoryChart"></canvas></div>
      </div>

      <!-- Card 2: Distribuição por Severidade -->
      <div class="card" style="padding:20px;">
        <div class="panel-head" style="padding:0 0 16px;">
          <div class="panel-title">Distribuição por Severidade</div>
          <div class="panel-sub">Volume de incidentes por nível de risco</div>
        </div>
        <div class="chart-wrap" style="height:250px; max-width:250px; margin:0 auto;"><canvas id="severityChart"></canvas></div>
      </div>

    </div>

    <!-- Card 3: Ocorrências Resolvidas vs Criadas -->
    <div class="card" style="padding:20px;">
      <div class="panel-head" style="padding:0 0 16px;">
        <div class="panel-title">Resoluções vs Aberturas (Mensal)</div>
        <div class="panel-sub">Acompanhamento de eficiência operacional</div>
      </div>
      <div class="chart-wrap" style="height:280px;"><canvas id="monthlyTrendChart"></canvas></div>
    </div>
  `;

  document.getElementById('pageContent').innerHTML = html;

  // Render Category Chart
  new Chart(document.getElementById('categoryChart'), {
    type: 'bar',
    data: {
      labels: ['Acesso Não Autorizado', 'Incidente Veicular', 'Falha Equip.', 'Furto / Tentativa', 'Outros'],
      datasets: [{
        label: 'Ocorrências',
        data: [15, 8, 12, 6, 9],
        backgroundColor: '#EE4D2D',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#F0F0F1' }, ticks: { color: '#A6A9AE', font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { color: '#A6A9AE', font: { size: 11 } } }
      }
    }
  });

  // Render Severity Chart
  new Chart(document.getElementById('severityChart'), {
    type: 'doughnut',
    data: {
      labels: ['Crítico', 'Alto', 'Médio', 'Baixo'],
      datasets: [{
        data: [4, 10, 18, 12],
        backgroundColor: ['#E0392C', '#E88A2C', '#D6A420', '#2FA35B'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 12, color: '#4A4D54', font: { size: 11 } } } }
    }
  });

  // Render Monthly Trend Chart
  new Chart(document.getElementById('monthlyTrendChart'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Abertas',
          data: [20, 24, 18, 28, 30, 22, 25],
          borderColor: '#E0392C',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 3
        },
        {
          label: 'Resolvidas',
          data: [18, 22, 20, 25, 29, 21, 24],
          borderColor: '#2FA35B',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'top', labels: { boxWidth: 12, color: '#4A4D54', font: { size: 11 } } } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#F0F0F1' }, ticks: { color: '#A6A9AE', font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { color: '#A6A9AE', font: { size: 11 } } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 10));
