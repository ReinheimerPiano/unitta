import prisma from '../prisma/client';
import { SalaTipo } from '@prisma/client';

export async function findAllSalas() {
  return prisma.sala.findMany({
    select: {
      id: true,
      nome: true,
      precoHora: true,
      tipo: true,
      ativa: true
    },
    orderBy: { nome: 'asc' }
  });
}

export async function createSalaService(data: {
  nome: string;
  precoHora: number;
  tipo: SalaTipo;
}) {
  return prisma.sala.create({
    data,
    select: {
      id: true,
      nome: true,
      precoHora: true,
      tipo: true,
      ativa: true
    }
  });
}

export async function updateSalaService(id: string, data: {
  nome?: string;
  precoHora?: number;
  tipo?: SalaTipo;
}) {
  return prisma.sala.update({
    where: { id },
    data,
    select: {
      id: true,
      nome: true,
      precoHora: true,
      tipo: true,
      ativa: true
    }
  });
}

export async function toggleSalaAtivaService(id: string) {
  const sala = await prisma.sala.findUnique({ where: { id } });
  if (!sala) throw new Error('Sala não encontrada');

  return prisma.sala.update({
    where: { id },
    data: { ativa: !sala.ativa },
    select: {
      id: true,
      nome: true,
      ativa: true
    }
  });
}
