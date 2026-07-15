const jwt = require('jsonwebtoken');

// Verifica se o token JWT enviado no header Authorization é válido
function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // { id, role, nome, email }
    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

// Restringe o acesso a determinados papéis (roles)
// Uso: autorizar('SUPERVISOR', 'GESTOR')
function autorizar(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Usuário não autenticado.' });
    }

    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ erro: 'Você não tem permissão para essa ação.' });
    }

    return next();
  };
}

module.exports = { autenticar, autorizar };
