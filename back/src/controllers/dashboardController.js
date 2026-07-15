const prisma = require('../config/database');

async function indicadores(req, res) {
  try {
    const [
      totalOcorrencias,
      abertas,
      emAndamento,
      resolvidas,
      porPrioridade,
      porCategoria,
      ultimasOcorrencias,
    ] = await Promise.all([
      prisma.ocorrencia.count(),
      prisma.ocorrencia.count({ where: { status: 'ABERTA' } }),
      prisma.ocorrencia.count({ where: { status: 'EM_ANDAMENTO' } }),
      prisma.ocorrencia.count({ where: { status: 'RESOLVIDA' } }),
      prisma.ocorrencia.groupBy({ by: ['prioridade'], _count: true }),
      prisma.ocorrencia.groupBy({ by: ['categoria'], _count: true }),
      prisma.ocorrencia.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { criadoPor: { select: { nome: true } } },
      }),
    ]);

    return res.json({
      totalOcorrencias,
      porStatus: { abertas, emAndamento, resolvidas },
      porPrioridade,
      porCategoria,
      ultimasOcorrencias,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao gerar indicadores.' });
  }
}

module.exports = { indicadores };
