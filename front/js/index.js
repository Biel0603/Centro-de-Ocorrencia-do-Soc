/* ===== dashboard.js ===== */

const HOURLY_DATA = {
  labels:['00h','02h','04h','06h','08h','10h','12h','14h','16h','18h','20h','22h'],
  values:[0.5,0.3,1,2,4.8,2.2,4,3.4,6,2.6,1.5,2]
};

const TYPE_DATA = [
  { label:'Acesso Não Autorizado', pct:31, color:'#E0392C' },
  { label:'Incidente Veicular',    pct:18, color:'#F0A184' },
  { label:'Falha de Equip.',       pct:22, color:'#2E6FE0' },
  { label:'Furto / Tentativa',     pct:14, color:'#2FA35B' },
  { label:'Outros',                pct:15, color:'#E8A93A' },
];

const RECENT = [
  { id:'INC-001', sev:'critico', title:'Acesso Não Autorizado', loc:'Portaria Principal', op:'Carlos Mendes', status:'andamento', statusLabel:'EM ANDAMENTO' },
  { id:'INC-002', sev:'alto',    title:'Incidente Veicular',    loc:'Pátio de Manobras',  op:'Ana Lima',      status:'resolvido', statusLabel:'RESOLVIDO' },
  { id:'INC-003', sev:'medio',   title:'Falha de Equipamento',  loc:'Câmera 14-C',        op:'Roberto Silva', status:'aberto',    statusLabel:'ABERTO' },
  { id:'INC-004', sev:'alto',    title:'Furto / Tentativa',     loc:'Armazém B3',         op:'Patricia Costa',status:'fechado',   statusLabel:'FECHADO' },
  { id:'INC-005', sev:'medio',   title:'Objeto Suspeito',       loc:'Dock 1-A',           op:'Diego Souza',   status:'resolvido', statusLabel:'RESOLVIDO' },
];

function svgIcon(paths, cls){
  return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
const ICONS = {
  alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  chevron:'<path d="M9 18l6-6-6-6"/>',
  warnCircle:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  trendDown:'<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
  trendUp:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
};

function statCard({icon,iconClass,trend,trendDir,value,label,sub}){
  let arrowIcon = '';
  if (trend) {
    const isUp = trend.startsWith('+');
    arrowIcon = isUp ? ICONS.trendUp : ICONS.trendDown;
  }
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

function recentRow(item){
  return `
  <div class="recent-row">
    <div class="recent-sev"><span class="sev ${item.sev}">${item.sev}</span></div>
    <div class="recent-mid">
      <div class="r-title">${item.title}</div>
      <div class="r-sub">${item.loc} · ${item.op}</div>
    </div>
    <div class="recent-status"><span class="badge ${item.status}">${item.statusLabel}</span></div>
    <div class="recent-id">${item.id}</div>
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
  const html = `
    <div class="alert-banner">
      <div class="alert-icon">${svgIcon(ICONS.alert)}</div>
      <div class="alert-body">
        <div class="alert-title">Atenção — Ocorrências críticas ativas</div>
        <div class="alert-desc">2 ocorrências requerem ação imediata da equipe de segurança.</div>
      </div>
      <a class="alert-link" href="ocorrencias.html">Ver ${svgIcon(ICONS.chevron)}</a>
    </div>

    <div class="stat-grid">
      ${statCard({icon:ICONS.warnCircle, trend:'+2', trendDir:'down', value:'2', label:'Ocorrências Abertas', sub:'ativas no momento'})}
      ${statCard({icon:ICONS.alert, trend:'+1', trendDir:'down', value:'2', label:'Críticas', sub:'requerem atenção'})}
      ${statCard({icon:ICONS.check, trend:'+5', trendDir:'up', value:'5', label:'Resolvidas', sub:'nas últimas 24h'})}
      ${statCard({icon:ICONS.camera, iconClass:'orange', value:'47/48', label:'Câmeras Ativas', sub:'1 em manutenção'})}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="panel-head">
          <div class="panel-title">Ocorrências por Hora</div>
          <div class="panel-sub">Últimas 24 horas</div>
        </div>
        <div class="chart-wrap"><canvas id="hourlyChart" height="230"></canvas></div>
      </div>
      <div class="card">
        <div class="panel-head">
          <div class="panel-title">Por Tipo</div>
          <div class="panel-sub">Distribuição acumulada</div>
        </div>
        <div class="chart-wrap" style="max-width:260px;margin:0 auto;"><canvas id="typeChart" height="220"></canvas></div>
        <div class="legend-list">${TYPE_DATA.map(legendRow).join('')}</div>
      </div>
    </div>

    <div class="card">
      <div class="table-header-row">
        <div>
          <div class="panel-title">Ocorrências Recentes</div>
          <div class="panel-sub">Atualizadas em tempo real</div>
        </div>
        <a class="alert-link" style="color:var(--orange)" href="ocorrencias.html">Ver todas ${svgIcon(ICONS.chevron)}</a>
      </div>
      ${RECENT.map(recentRow).join('')}
    </div>
  `;
  document.getElementById('pageContent').innerHTML = html;

  new Chart(document.getElementById('hourlyChart'), {
    type:'line',
    data:{ labels:HOURLY_DATA.labels, datasets:[{
      data:HOURLY_DATA.values, borderColor:'#EE4D2D', borderWidth:2.5,
      backgroundColor:'rgba(238,77,45,0.08)', fill:true, tension:0.42, pointRadius:0,
    }]},
    options:{
      plugins:{legend:{display:false}},
      scales:{
        y:{beginAtZero:true, max:8, grid:{color:'#F0F0F1'}, ticks:{stepSize:2, color:'#A6A9AE', font:{size:11}}},
        x:{grid:{display:false}, ticks:{color:'#A6A9AE', font:{size:11}}},
      }
    }
  });

  new Chart(document.getElementById('typeChart'), {
    type:'doughnut',
    data:{ labels:TYPE_DATA.map(d=>d.label), datasets:[{
      data:TYPE_DATA.map(d=>d.pct), backgroundColor:TYPE_DATA.map(d=>d.color), borderWidth:3, borderColor:'#fff',
    }]},
    options:{ cutout:'68%', plugins:{legend:{display:false}} }
  });
}

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 0));