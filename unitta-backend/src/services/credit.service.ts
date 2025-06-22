import prisma from '../prisma/client';

export async function getUserCreditsService(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true }
  });

  if (!user) throw new Error('Usuário não encontrado');
  return user.credits;
}

export async function addCreditsToUserService(userId: string, amount: number) {
  if (amount <= 0) throw new Error('Valor de créditos inválido');

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { increment: amount }
    },
    select: {
      id: true,
      name: true,
      credits: true
    }
  });

  return user;
}
