const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

// Gera o token JWT com os dados essenciais do usuário
function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' } // token dura o tempo de um turno de trabalho
  );
}

async function registrar(req, res) {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    const usuarioExiste = await prisma.user.findUnique({ where: { email } });
    if (usuarioExiste) {
      return res.status(409).json({ erro: 'Já existe um usuário com esse email.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        role: role || 'OPERADOR',
      },
    });

    const token = gerarToken(usuario);

    return res.status(201).json({
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao registrar usuário.' });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario || !usuario.ativo) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    const token = gerarToken(usuario);

    return res.json({
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
}

async function me(req, res) {
  const usuario = await prisma.user.findUnique({
    where: { id: req.usuario.id },
    select: { id: true, nome: true, email: true, role: true, createdAt: true },
  });
  return res.json(usuario);
}

module.exports = { registrar, login, me };
