/* ===== conta.js =====
   Tela "Minha Conta": foto de perfil, dados pessoais e alteração de senha.
   Perfil persistido em localStorage sob a chave 'socProfile' (ver common.js).
*/

const DEFAULT_PROFILE = {
  name: 'gabriel.lucas',
  role: 'Operador SOC',
  email: 'gabriel.lucas@socdistribuicao.com.br',
  phone: '',
  turno: 'manha',
  bio: '',
  photo: null,
};

const MAX_PHOTO_MB = 4;

let pendingPhoto = undefined; // undefined = sem alteração pendente; null = remover; string = nova foto

function svgIcon(paths, cls){
  return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
const ICONS = {
  back:'<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>',
  camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  trash:'<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  alert:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
};

function loadProfile(){
  const stored = (typeof getProfile === 'function' && getProfile()) || {};
  return { ...DEFAULT_PROFILE, ...stored };
}

function field({id, label, type='text', value='', placeholder='', full=false, hint=''}){
  return `
  <div class="form-field ${full ? 'full' : ''}">
    <label for="${id}">${label}</label>
    <input class="input" type="${type}" id="${id}" value="${value ? value.replace(/"/g,'&quot;') : ''}" placeholder="${placeholder}">
    ${hint ? `<span class="hint">${hint}</span>` : ''}
  </div>`;
}

function selectField({id, label, value, options}){
  const opts = options.map(o => `<option value="${o.value}" ${o.value===value?'selected':''}>${o.label}</option>`).join('');
  return `
  <div class="form-field">
    <label for="${id}">${label}</label>
    <select class="select" id="${id}">${opts}</select>
  </div>`;
}

function render(){
  const profile = loadProfile();
  pendingPhoto = undefined;

  const html = `
    <a class="back-link" href="configuracoes.html">${svgIcon(ICONS.back)} Voltar para Configurações</a>

    <div class="card settings-section">
      <div class="section-head">
        <div class="panel-title">Foto de perfil</div>
        <div class="section-desc">Usada na barra superior e em registros de atividade.</div>
      </div>
      <div class="avatar-upload-row">
        <div class="avatar-xl" id="avatarPreview">${(profile.name||'G').charAt(0).toUpperCase()}</div>
        <div>
          <div class="avatar-actions">
            <label class="btn btn-ghost" for="photoInput" style="margin:0;">
              ${svgIcon(ICONS.camera)} Alterar foto
            </label>
            <input class="visually-hidden" type="file" id="photoInput" accept="image/png,image/jpeg,image/webp">
            <button class="btn btn-ghost" id="btnRemoverFoto" type="button">${svgIcon(ICONS.trash)} Remover</button>
          </div>
          <div class="avatar-hint" id="photoHint">PNG, JPG ou WEBP · até ${MAX_PHOTO_MB}MB</div>
        </div>
      </div>
    </div>

    <div class="card settings-section">
      <div class="section-head">
        <div class="panel-title">Informações pessoais</div>
        <div class="section-desc">Esses dados aparecem para outros operadores do SOC.</div>
      </div>
      <div class="form-grid">
        ${field({id:'fName', label:'Nome completo', value:profile.name, placeholder:'Seu nome completo'})}
        ${field({id:'fEmail', label:'E-mail', type:'email', value:profile.email, placeholder:'nome@empresa.com'})}
        ${field({id:'fPhone', label:'Telefone', type:'tel', value:profile.phone, placeholder:'(00) 00000-0000'})}
        ${selectField({id:'fTurno', label:'Turno', value:profile.turno, options:[
          {value:'manha', label:'Manhã'},
          {value:'tarde', label:'Tarde'},
          {value:'noite', label:'Noite'},
        ]})}
        <div class="form-field full">
          <label for="fBio">Sobre</label>
          <textarea id="fBio" placeholder="Uma breve descrição sobre sua função na equipe.">${profile.bio || ''}</textarea>
        </div>
      </div>
    </div>

    <div class="card settings-section">
      <div class="section-head">
        <div class="panel-title">Alterar senha</div>
        <div class="section-desc">Deixe em branco se não quiser alterar sua senha atual.</div>
      </div>
      <div class="form-grid">
        ${field({id:'pCurrent', label:'Senha atual', type:'password', placeholder:'••••••••'})}
        <div></div>
        ${field({id:'pNew', label:'Nova senha', type:'password', placeholder:'••••••••'})}
        ${field({id:'pConfirm', label:'Confirmar nova senha', type:'password', placeholder:'••••••••'})}
      </div>
      <div id="passwordError" style="display:none;padding:0 24px 16px;color:var(--critical);font-size:12.5px;font-weight:600;align-items:center;gap:6px;">
        ${svgIcon(ICONS.alert)} <span id="passwordErrorText">As senhas não coincidem.</span>
      </div>
      <div class="save-bar">
        <span class="save-status" id="saveStatus">${svgIcon(ICONS.check)} Alterações salvas</span>
        <button class="btn btn-primary" id="btnSalvar">Salvar alterações</button>
      </div>
    </div>
  `;

  document.getElementById('pageContent').innerHTML = html;

  // Preview inicial com foto/nome atuais
  const avatarPreview = document.getElementById('avatarPreview');
  applyAvatar(avatarPreview, profile);

  // Upload de foto
  document.getElementById('photoInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    if(file.size > MAX_PHOTO_MB * 1024 * 1024){
      document.getElementById('photoHint').textContent = `Arquivo muito grande. O limite é ${MAX_PHOTO_MB}MB.`;
      document.getElementById('photoHint').style.color = 'var(--critical)';
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      pendingPhoto = reader.result;
      avatarPreview.style.backgroundImage = `url(${pendingPhoto})`;
      avatarPreview.style.backgroundSize = 'cover';
      avatarPreview.style.backgroundPosition = 'center';
      avatarPreview.textContent = '';
      document.getElementById('photoHint').style.color = '';
      document.getElementById('photoHint').textContent = `PNG, JPG ou WEBP · até ${MAX_PHOTO_MB}MB`;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('btnRemoverFoto').addEventListener('click', () => {
    pendingPhoto = null;
    avatarPreview.style.backgroundImage = '';
    const nameVal = document.getElementById('fName').value || profile.name;
    avatarPreview.textContent = getInitials(nameVal);
  });

  // Salvar
  document.getElementById('btnSalvar').addEventListener('click', () => {
    const pCurrent = document.getElementById('pCurrent').value;
    const pNew = document.getElementById('pNew').value;
    const pConfirm = document.getElementById('pConfirm').value;
    const errorBox = document.getElementById('passwordError');
    const errorText = document.getElementById('passwordErrorText');

    if(pNew || pConfirm || pCurrent){
      if(!pCurrent){
        errorText.textContent = 'Informe sua senha atual para alterá-la.';
        errorBox.style.display = 'flex';
        return;
      }
      if(pNew.length < 8){
        errorText.textContent = 'A nova senha deve ter pelo menos 8 caracteres.';
        errorBox.style.display = 'flex';
        return;
      }
      if(pNew !== pConfirm){
        errorText.textContent = 'As senhas não coincidem.';
        errorBox.style.display = 'flex';
        return;
      }
    }
    errorBox.style.display = 'none';

    const updated = {
      name: document.getElementById('fName').value.trim() || DEFAULT_PROFILE.name,
      email: document.getElementById('fEmail').value.trim(),
      phone: document.getElementById('fPhone').value.trim(),
      turno: document.getElementById('fTurno').value,
      bio: document.getElementById('fBio').value.trim(),
    };
    if(pendingPhoto !== undefined){
      updated.photo = pendingPhoto;
    }

    saveProfile(updated);

    // Nota: a troca de senha em si depende de um backend de autenticação;
    // aqui apenas validamos e limpamos os campos.
    document.getElementById('pCurrent').value = '';
    document.getElementById('pNew').value = '';
    document.getElementById('pConfirm').value = '';
    pendingPhoto = undefined;

    const status = document.getElementById('saveStatus');
    status.classList.add('show');
    setTimeout(() => status.classList.remove('show'), 2200);
  });
}

document.addEventListener('DOMContentLoaded', () => setTimeout(render, 0));
