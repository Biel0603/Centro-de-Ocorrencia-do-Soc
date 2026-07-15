const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash('123456', 10);

  const usuarios = [
    { nome: 'Operador Teste', email: 'operador@soc.com', role: 'OPERADOR' },
    { nome: 'Supervisor Teste', email: 'supervisor@soc.com', role: 'SUPERVISOR' },
    { nome: 'Analista Teste', email: 'analista@soc.com', role: 'ANALISTA' },
    { nome: 'Gestor Teste', email: 'gestor@soc.com', role: 'GESTOR' },
  ];

  for (const usuario of usuarios) {
    await prisma.user.upsert({
      where: { email: usuario.email },
      update: {},
      create: { ...usuario, senha: senhaHash },
    });
  }

  console.log('✅ Usuários de teste criados (senha para todos: 123456)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
