import prisma from '../prisma/client';

export async function findAllCompras() {
  return prisma.compra.findMany({
    include: {
      user: { select: { name: true, email: true } },
      pacote: true
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function findCompraById(id: string) {
  return prisma.compra.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      pacote: true
    }
  });
}

export async function createCompraService(userId: string, pacoteId: string) {
  const pacote = await prisma.pacote.findUnique({ where: { id: pacoteId } });
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!pacote || !user) throw new Error('Usuário ou pacote inválido');

  const compra = await prisma.compra.create({
    data: {
      userId,
      pacoteId,
      horas: pacote.horas
    }
  });

  await prisma.user.update({
    where: { id: userId },
    data: { credits: user.credits + pacote.horas }
  });

  return compra;
}
