import prisma from '../prisma/client';
import { differenceInMinutes, parseISO } from 'date-fns';

export async function findAllReservas() {
  return prisma.reserva.findMany({
    include: {
      sala: true,
      user: { select: { name: true, email: true } }
    },
    orderBy: { inicio: 'desc' }
  });
}

export async function findReservaById(id: string) {
  return prisma.reserva.findUnique({
    where: { id },
    include: {
      sala: true,
      user: { select: { name: true, email: true } }
    }
  });
}

export async function createReservaService({
  userId,
  salaId,
  inicio,
  fim
}: {
  userId: string;
  salaId: string;
  inicio: string;
  fim: string;
}) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const sala = await prisma.sala.findUnique({ where: { id: salaId } });

  if (!user) throw new Error('Usuário não encontrado');
  if (!sala) throw new Error('Sala não encontrada');

  const start = parseISO(inicio);
  const end = parseISO(fim);
  const duracaoMin = differenceInMinutes(end, start);
  const duracaoHoras = Math.ceil(duracaoMin / 60);

  if (user.credits < duracaoHoras)
    throw new Error('Créditos insuficientes');

  const reserva = await prisma.reserva.create({
    data: {
      userId,
      salaId,
      inicio: start,
      fim: end
    }
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: user.credits - duracaoHoras
    }
  });

  return reserva;
}
