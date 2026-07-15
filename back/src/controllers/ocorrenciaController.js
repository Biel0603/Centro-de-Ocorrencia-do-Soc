const prisma = require('../config/database');

// req.app.get('io') dá acesso à instância do Socket.io configurada no server.js

async function listar(req, res) {
  try {
    const { status, prioridade, categoria } = req.query;

    const ocorrencias = await prisma.ocorrencia.findMany({
      where: {
        ...(status && { status }),
        ...(prioridade && { prioridade }),
        ...(categoria && { categoria }),
      },
      include: {
        criadoPor: { select: { id: true, nome: true, role: true } },
        _count: { select: { comentarios: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(ocorrencias);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar ocorrências.' });
  }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    const ocorrencia = await prisma.ocorrencia.findUnique({
      where: { id },
      include: {
        criadoPor: { select: { id: true, nome: true, role: true } },
        comentarios: {
          include: { autor: { select: { id: true, nome: true, role: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!ocorrencia) {
      return res.status(404).json({ erro: 'Ocorrência não encontrada.' });
    }

    return res.json(ocorrencia);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar ocorrência.' });
  }
}

async function criar(req, res) {
  try {
    const { titulo, descricao, categoria, prioridade, local } = req.body;

    if (!titulo || !descricao || !categoria) {
      return res.status(400).json({ erro: 'Título, descrição e categoria são obrigatórios.' });
    }

    const ocorrencia = await prisma.ocorrencia.create({
      data: {
        titulo,
        descricao,
        categoria,
        prioridade: prioridade || 'MEDIA',
        local,
        criadoPorId: req.usuario.id,
      },
      include: { criadoPor: { select: { id: true, nome: true, role: true } } },
    });

    // Notifica todos os clientes conectados em tempo real
    const io = req.app.get('io');
    io.emit('ocorrencia:nova', ocorrencia);

    return res.status(201).json(ocorrencia);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar ocorrência.' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao, categoria, prioridade, local, status } = req.body;

    const ocorrenciaExiste = await prisma.ocorrencia.findUnique({ where: { id } });
    if (!ocorrenciaExiste) {
      return res.status(404).json({ erro: 'Ocorrência não encontrada.' });
    }

    const dadosAtualizados = {
      ...(titulo && { titulo }),
      ...(descricao && { descricao }),
      ...(categoria && { categoria }),
      ...(prioridade && { prioridade }),
      ...(local !== undefined && { local }),
      ...(status && { status }),
    };

    // Se a ocorrência foi marcada como resolvida, registra o timestamp
    if (status === 'RESOLVIDA' && ocorrenciaExiste.status !== 'RESOLVIDA') {
      dadosAtualizados.resolvidaEm = new Date();
    }

    const ocorrencia = await prisma.ocorrencia.update({
      where: { id },
      data: dadosAtualizados,
      include: { criadoPor: { select: { id: true, nome: true, role: true } } },
    });

    const io = req.app.get('io');
    io.emit('ocorrencia:atualizada', ocorrencia);

    return res.json(ocorrencia);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar ocorrência.' });
  }
}

async function remover(req, res) {
  try {
    const { id } = req.params;

    const ocorrenciaExiste = await prisma.ocorrencia.findUnique({ where: { id } });
    if (!ocorrenciaExiste) {
      return res.status(404).json({ erro: 'Ocorrência não encontrada.' });
    }

    await prisma.ocorrencia.delete({ where: { id } });

    const io = req.app.get('io');
    io.emit('ocorrencia:removida', { id });

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao remover ocorrência.' });
  }
}

async function adicionarComentario(req, res) {
  try {
    const { id } = req.params;
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ erro: 'Texto do comentário é obrigatório.' });
    }

    const ocorrencia = await prisma.ocorrencia.findUnique({ where: { id } });
    if (!ocorrencia) {
      return res.status(404).json({ erro: 'Ocorrência não encontrada.' });
    }

    const comentario = await prisma.comentario.create({
      data: { texto, ocorrenciaId: id, autorId: req.usuario.id },
      include: { autor: { select: { id: true, nome: true, role: true } } },
    });

    const io = req.app.get('io');
    io.emit('ocorrencia:comentario', { ocorrenciaId: id, comentario });

    return res.status(201).json(comentario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao adicionar comentário.' });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover, adicionarComentario };
