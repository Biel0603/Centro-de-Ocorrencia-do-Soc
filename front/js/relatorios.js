/* ===== relatorios.js =====
   Tela de Relatórios: KPIs, volume por dia da semana, distribuição por
   severidade, correlação acessos x ocorrências e pipeline de status.
   Os dados abaixo são mockados — troque REPORT_DATA por uma chamada
   real à sua API quando tiver o backend pronto.
*/

const REPORT_DATA = {
  '7': {
    label: '7 dias',
    kpis: { total: 7, taxaResolucao: 71, taxaTrend: '+3%', taxaDir: 'up', tempoMedio: '28 min', criticas: 2, criticasTrend: '+1', criticasDir: 'down' },
    weekday: {
      labels: ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
      critico: [0,0,0,0,0,0,0],
      alto:    [0,0,0,0,0,0,0],
      medio:   [0,0,0,0,0,0,0],
      baixo:   [1,1,2,0,2,1,0],
    },
    severidade: [
      { key:'critico', label:'Crítico', colorVar:'--critical', count:2, pct:29 },
      { key:'alto',    label:'Alto',    colorVar:'--high',     count:2, pct:29 },
      { key:'medio',   label:'Médio',   colorVar:'--medium',   count:2, pct:29 },
      { key:'baixo',   label:'Baixo',   colorVar:'--low',      count:1, pct:14 },
    ],
    acessos: {
      labels: ['02h','06h','10h','14h','18h','22h'],
      acessos:     [22, 68, 205, 148, 188, 42],
      ocorrencias: [0, 1, 3, 2, 3, 1],
    },
    pipeline: [
      { label:'Aberto',        colorVar:'--status-open',     count:1 },
      { label:'Em Andamento',  colorVar:'--status-progress',  count:1 },
      { label:'Resolvido',     colorVar:'--status-resolved', count:2 },
      { label:'Fechado',       colorVar:'--status-closed',   count:3 },
    ],
    porTipo: [
      { label:'Acesso Não Autorizado', pct:31, color:'#E0392C' },
      { label:'Incidente Veicular',    pct:18, color:'#F0A184' },
      { label:'Falha de Equip.',       pct:22, color:'#2E6FE0' },
      { label:'Furto / Tentativa',     pct:14, color:'#2FA35B' },
      { label:'Outros',                pct:15, color:'#E8A93A' },
    ],
  },
  '30': {
    label: '30 dias',
    kpis: { total: 34, taxaResolucao: 68, taxaTrend: '-2%', taxaDir: 'down', tempoMedio: '32 min', criticas: 9, criticasTrend: '+4', criticasDir: 'down' },
    weekday: {
      labels: ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
      critico: [1,0,1,0,2,1,0],
      alto:    [1,1,0,1,1,0,0],
      medio:   [2,1,2,1,2,1,1],
      baixo:   [2,2,3,1,3,1,1],
    },
    severidade: [
      { key:'critico', label:'Crítico', colorVar:'--critical', count:9,  pct:26 },
      { key:'alto',    label:'Alto',    colorVar:'--high',     count:6,  pct:18 },
      { key:'medio',   label:'Médio',   colorVar:'--medium',   count:10, pct:29 },
      { key:'baixo',   label:'Baixo',   colorVar:'--low',      count:9,  pct:27 },
    ],
    acessos: {
      labels: ['02h','06h','10h','14h','18h','22h'],
      acessos:     [30, 82, 224, 160, 210, 58],
      ocorrencias: [1, 4, 9, 6, 8, 3],
    },
    pipeline: [
      { label:'Aberto',        colorVar:'--status-open',     count:4 },
      { label:'Em Andamento',  colorVar:'--status-progress',  count:5 },
      { label:'Resolvido',     colorVar:'--status-resolved', count:14 },
      { label:'Fechado',       colorVar:'--status-closed',   count:11 },
    ],
    porTipo: [
      { label:'Acesso Não Autorizado', pct:28, color:'#E0392C' },
      { label:'Incidente Veicular',    pct:21, color:'#F0A184' },
      { label:'Falha de Equip.',       pct:19, color:'#2E6FE0' },
      { label:'Furto / Tentativa',     pct:17, color:'#2FA35B' },
      { label:'Outros',                pct:15, color:'#E8A93A' },
    ],
  },
  '90': {
    label: '90 dias',
    kpis: { total: 112, taxaResolucao: 74, taxaTrend: '+6%', taxaDir: 'up', tempoMedio: '25 min', criticas: 21, criticasTrend: '-3', criticasDir: 'up' },
    weekday: {
      labels: ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
      critico: [3,2,3,1,4,2,1],
      alto:    [3,2,2,2,3,1,1],
      medio:   [5,4,5,3,6,3,2],
      baixo:   [6,5,7,4,7,3,3],
    },
    severidade: [
      { key:'critico', label:'Crítico', colorVar:'--critical', count:21, pct:19 },
      { key:'alto',    label:'Alto',    colorVar:'--high',     count:20, pct:18 },
      { key:'medio',   label:'Médio',   colorVar:'--medium',   count:36, pct:32 },
      { key:'baixo',   label:'Baixo',   colorVar:'--low',      count:35, pct:31 },
    ],
    acessos: {
      labels: ['02h','06h','10h','14h','18h','22h'],
      acessos:     [35, 90, 232, 172, 218, 64],
      ocorrencias: [3, 10, 22, 16, 20, 8],
    },
    pipeline: [
      { label:'Aberto',        colorVar:'--status-open',     count:9 },
      { label:'Em Andamento',  colorVar:'--status-progress',  count:12 },
      { label:'Resolvido',     colorVar:'--status-resolved', count:52 },
      { label:'Fechado',       colorVar:'--status-closed',   count:39 },
    ],
    porTipo: [
      { label:'Acesso Não Autorizado', pct:27, color:'#E0392C' },
      { label:'Incidente Veicular',    pct:19, color:'#F0A184' },
      { label:'Falha de Equip.',       pct:20, color:'#2E6FE0' },
      { label:'Furto / Tentativa',     pct:18, color:'#2FA35B' },
      { label:'Outros',                pct:16, color:'#E8A93A' },
    ],
  },
};

let currentPeriod = '7';
let weekdayChart = null;
let accessChart = null;
let typeChart = null;

function svgIcon(paths, cls){
  return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
const ICONS = {
  fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>',
  checkCircle:'<circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  alertTriangle:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  trendDown:'<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
  trendUp:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
};

function statCard({icon, iconClass, trend, trendDir, value, label, sub}){
  let arrowIcon = '';
  if (trend) arrowIcon = trend.startsWith('+') ? ICONS.trendUp : ICONS.trendDown;
  const trendHtml = trend ? `<span class="trend ${trendDir}">${svgIcon(arrowIcon)}${trend}</span>` : '';
  return `
  <div class="card stat-card">
    <div class="stat-top">
      <div class="stat-icon ${iconClass||''}">${svgIcon(icon)}</div>
      ${trendHtml}
    </div>
    <div class="stat-value">${value}</div>
    <div class="stat-label">${label}</div>
    <div class="stat-sub">${sub}</div>
  </div>`;
}

function statBarRow({label, colorVar, valueText, pct}){
  return `
  <div class="stat-bar-row">
    <div class="stat-bar-head">
      <span class="sev-label" style="color:var(${colorVar})"><span class="sev-dot" style="background:var(${colorVar})"></span>${label}</span>
      <span class="stat-bar-value">${valueText}</span>
    </div>
    <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${pct}%;background:var(${colorVar})"></div></div>
  </div>`;
}

function legendRow(item){
  return `
  <div class="legend-row">
    <span class="legend-dot" style="background:${item.color}"></span>
    <span class="legend-name">${item.label}</span>
    <span class="legend-pct">${item.pct}%</span>
  </div>`;
}

function render(){
  const data = REPORT_DATA[currentPeriod];
  const k = data.kpis;

  const html = `
    <div class="toolbar-between">
      <div class="toolbar">
        ${['7','30','90'].map(p => `<button class="btn btn-ghost period-btn ${p===currentPeriod?'active':''}" data-period="${p}">${p} dias</button>`).join('')}
      </div>
      <button class="btn btn-primary" id="btnExportar">${svgIcon(ICONS.download)} Exportar PDF</button>
    </div>

    <div class="stat-grid">
      ${statCard({icon:ICONS.fileText, iconClass:'orange', value:k.total, label:'Total de Ocorrências', sub:'no período selecionado'})}
      ${statCard({icon:ICONS.checkCircle, trend:k.taxaTrend, trendDir:k.taxaDir, value:k.taxaResolucao+'%', label:'Taxa de Resolução', sub:'resolvidas/fechadas'})}
      ${statCard({icon:ICONS.clock, value:k.tempoMedio, label:'Tempo Médio Resposta', sub:'abertura → resolução'})}
      ${statCard({icon:ICONS.alertTriangle, iconClass:'red', trend:k.criticasTrend, trendDir:k.criticasDir, value:k.criticas, label:'Ocorrências Críticas', sub:'no período'})}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="panel-head">
          <div class="panel-title">Por Dia da Semana</div>
          <div class="panel-sub">Volume por severidade</div>
        </div>
        <div class="chart-wrap"><canvas id="weekdayChart" height="230"></canvas></div>
      </div>
      <div class="card">
        <div class="panel-head">
          <div class="panel-title">Distribuição por Severidade</div>
        </div>
        <div class="stat-bar-list">
          ${data.severidade.map(s => statBarRow({label:s.label.toUpperCase(), colorVar:s.colorVar, valueText:`${s.count} (${s.pct}%)`, pct:s.pct})).join('')}
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="panel-head">
          <div class="panel-title">Volume de Acessos vs. Ocorrências</div>
          <div class="panel-sub">Correlação por hora</div>
        </div>
        <div class="chart-wrap"><canvas id="accessChart" height="230"></canvas></div>
      </div>
      <div class="card">
        <div class="panel-head">
          <div class="panel-title">Pipeline de Status</div>
        </div>
        <div class="stat-bar-list">
          ${(() => {
            const max = Math.max(...data.pipeline.map(p => p.count), 1);
            return data.pipeline.map(p => statBarRow({
              label: p.label.toUpperCase(),
              colorVar: p.colorVar,
              valueText: `${p.count} ocorrência${p.count===1?'':'s'}`,
              pct: Math.round((p.count / max) * 100),
            })).join('');
          })()}
        </div>
        <div class="section-head" style="padding-top:6px;">
          <div class="panel-title" style="font-size:13px;">Por Tipo</div>
        </div>
        <div class="chart-wrap" style="max-width:220px;margin:0 auto;"><canvas id="typeChart" height="200"></canvas></div>
        <div class="legend-list">${data.porTipo.map(legendRow).join('')}</div>
      </div>
    </div>
  `;

  document.getElementById('pageContent').innerHTML = html;

  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPeriod = btn.dataset.period;
      render();
    });
  });

  document.getElementById('btnExportar').addEventListener('click', () => {
    window.print();
  });

  renderCharts(data);
}

function renderCharts(data){
  if(weekdayChart) weekdayChart.destroy();
  if(accessChart) accessChart.destroy();
  if(typeChart) typeChart.destroy();

  weekdayChart = new Chart(document.getElementById('weekdayChart'), {
    type:'bar',
    data:{
      labels: data.weekday.labels,
      datasets:[
        { label:'Crítico', data:data.weekday.critico, backgroundColor:'#E0392C', borderRadius:3 },
        { label:'Alto',    data:data.weekday.alto,    backgroundColor:'#E88A2C', borderRadius:3 },
        { label:'Médio',   data:data.weekday.medio,   backgroundColor:'#D6A420', borderRadius:3 },
        { label:'Baixo',   data:data.weekday.baixo,   backgroundColor:'#2FA35B', borderRadius:3 },
      ],
    },
    options:{
      plugins:{ legend:{ display:true, position:'bottom', labels:{ boxWidth:10, boxHeight:10, usePointStyle:true, pointStyle:'circle', color:'#6B6E75', font:{size:11.5} } } },
      scales:{
        x:{ stacked:true, grid:{ display:false }, ticks:{ color:'#A6A9AE', font:{size:11} } },
        y:{ stacked:true, beginAtZero:true, grid:{ color:'#F0F0F1' }, ticks:{ color:'#A6A9AE', font:{size:11}, stepSize: currentPeriod==='7' ? 5 : (currentPeriod==='30' ? 5 : 10) } },
      },
    },
  });

  accessChart = new Chart(document.getElementById('accessChart'), {
    type:'line',
    data:{
      labels: data.acessos.labels,
      datasets:[
        { label:'Acessos', data:data.acessos.acessos, yAxisID:'yAcessos', borderColor:'#2E6FE0', backgroundColor:'rgba(46,111,224,0.06)', borderWidth:2.5, tension:0.42, pointRadius:0, fill:false },
        { label:'Ocorrências', data:data.acessos.ocorrencias, yAxisID:'yOcorrencias', borderColor:'#EE4D2D', backgroundColor:'rgba(238,77,45,0.1)', borderWidth:2.5, tension:0.42, pointRadius:0, fill:true },
      ],
    },
    options:{
      plugins:{ legend:{ display:true, position:'bottom', labels:{ boxWidth:10, boxHeight:10, usePointStyle:true, pointStyle:'circle', color:'#6B6E75', font:{size:11.5} } } },
      interaction:{ mode:'index', intersect:false },
      scales:{
        x:{ grid:{ display:false }, ticks:{ color:'#A6A9AE', font:{size:11} } },
        yAcessos:{ position:'left', beginAtZero:true, grid:{ color:'#F0F0F1' }, ticks:{ color:'#A6A9AE', font:{size:11} } },
        yOcorrencias:{ position:'right', beginAtZero:true, grid:{ display:false }, ticks:{ color:'#A6A9AE', font:{size:11} } },
      },
    },
  });

  typeChart = new Chart(document.getElementById('typeChart'), {
    type:'doughnut',
    data:{
      labels: data.porTipo.map(d => d.label),
      datasets:[{ data:data.porTipo.map(d => d.pct), backgroundColor:data.porTipo.map(d => d.color), borderWidth:3, borderColor:'#fff' }],
    },
    options:{ cutout:'68%', plugins:{ legend:{ display:false } } },
  });
}

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 0));