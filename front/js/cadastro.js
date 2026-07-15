/* ===== cadastro.js — Lógica da tela de cadastro ===== */

const API = 'http://localhost:3000';

// Toggle mostrar/ocultar senha — campo senha
document.getElementById('togglePw2').addEventListener('click', function () {
  toggleSenha('cadastroSenha', this);
});

// Toggle mostrar/ocultar senha — campo confirmar
document.getElementById('togglePw3').addEventListener('click', function () {
  toggleSenha('cadastroConfirma', this);
});

function toggleSenha(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.querySelector('svg').innerHTML = isHidden
    ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>'
    : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
}

// Submit do formulário
document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('cadastroNome').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const role = document.getElementById('cadastroRole').value;
  const senha = document.getElementById('cadastroSenha').value;
  const confirma = document.getElementById('cadastroConfirma').value;

  const errorEl = document.getElementById('cadastroError');
  const successEl = document.getElementById('cadastroSuccess');
  const btn = document.getElementById('cadastroBtn');
  const btnText = document.getElementById('cadastroBtnText');

  // Limpa mensagens anteriores
  errorEl.style.display = 'none';
  successEl.style.display = 'none';

  // Validações
  if (!nome || !email || !senha || !confirma) {
    mostrarErro(errorEl, 'Preencha todos os campos obrigatórios.');
    return;
  }

  if (senha.length < 6) {
    mostrarErro(errorEl, 'A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  if (senha !== confirma) {
    mostrarErro(errorEl, 'As senhas não coincidem. Verifique e tente novamente.');
    document.getElementById('cadastroConfirma').classList.add('error');
    return;
  }

  document.getElementById('cadastroConfirma').classList.remove('error');

  // Loading
  btn.disabled = true;
  btnText.textContent = 'Criando conta...';

  try {
    const resp = await fetch(`${API}/api/auth/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, role }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      mostrarErro(errorEl, data.erro || 'Erro ao criar conta. Tente novamente.');
      return;
    }

    // Salva token e dados do usuário
    localStorage.setItem('soc_token', data.token);
    localStorage.setItem('soc_usuario', JSON.stringify(data.usuario));

    // Exibe sucesso e redireciona
    successEl.textContent = '✅ Conta criada com sucesso! Redirecionando...';
    successEl.style.display = 'block';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);

  } catch (err) {
    mostrarErro(errorEl, 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
  } finally {
    btn.disabled = false;
    btnText.textContent = 'Criar Conta';
  }
});

function mostrarErro(el, msg) {
  el.textContent = msg;
  el.style.display = 'block';
}
