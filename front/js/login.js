/* ===== login.js — Lógica da tela de login ===== */

const API = 'http://localhost:3000';

// Toggle mostrar/ocultar senha
document.getElementById('togglePw').addEventListener('click', function () {
  const input = document.getElementById('loginSenha');
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  this.querySelector('svg').innerHTML = isHidden
    ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>'
    : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
});

// Submit do formulário
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const errorEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');
  const btnText = document.getElementById('loginBtnText');

  // Limpa erros anteriores
  errorEl.style.display = 'none';
  errorEl.textContent = '';

  // Validação básica
  if (!email || !senha) {
    mostrarErro(errorEl, 'Preencha o e-mail e a senha para continuar.');
    return;
  }

  // Loading
  btn.disabled = true;
  btnText.textContent = 'Entrando...';

  try {
    const resp = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      mostrarErro(errorEl, data.erro || 'Erro ao fazer login. Tente novamente.');
      return;
    }

    // Salva token e dados do usuário
    localStorage.setItem('soc_token', data.token);
    localStorage.setItem('soc_usuario', JSON.stringify(data.usuario));

    // Redireciona para o dashboard
    window.location.href = 'index.html';

  } catch (err) {
    mostrarErro(errorEl, 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
  } finally {
    btn.disabled = false;
    btnText.textContent = 'Entrar no Sistema';
  }
});

function mostrarErro(el, msg) {
  el.textContent = msg;
  el.style.display = 'block';
  el.classList.remove('auth-alert-success');
}

// Se já estiver logado, redireciona
if (localStorage.getItem('soc_token')) {
  window.location.href = 'index.html';
}
