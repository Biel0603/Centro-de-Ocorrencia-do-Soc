const prisma = require('../config/database');

async function listar(req, res) {
  try {
    const turnos = await prisma.passagemTurno.findMany({
      include: { criadoPor: { select: { id: true, nome: true, role: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(turnos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar passagens de turno.' });
  }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const turno = await prisma.passagemTurno.findUnique({
      where: { id },
      include: { criadoPor: { select: { id: true, nome: true, role: true } } },
    });

    if (!turno) {
      return res.status(404).json({ erro: 'Passagem de turno não encontrada.' });
    }

    return res.json(turno);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar passagem de turno.' });
  }
}

async function criar(req, res) {
  try {
    const { turno, resumo, pendencias, eventos } = req.body;

    if (!turno || !resumo) {
      return res.status(400).json({ erro: 'Turno e resumo são obrigatórios.' });
    }

    const passagem = await prisma.passagemTurno.create({
      data: { turno, resumo, pendencias, eventos, criadoPorId: req.usuario.id },
      include: { criadoPor: { select: { id: true, nome: true, role: true } } },
    });

    const io = req.app.get('io');
    io.emit('turno:nova', passagem);

    return res.status(201).json(passagem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao registrar passagem de turno.' });
  }
}

module.exports = { listar, buscarPorId, criar };
