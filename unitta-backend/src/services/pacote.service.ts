import prisma from '../prisma/client';
import { SalaTipo } from '@prisma/client';

export async function findAllPacotes() {
  return prisma.pacote.findMany({
    orderBy: { nome: 'asc' }
  });
}

export async function createPacoteService(data: {
  nome: string;
  horas: number;
  valor: number;
  tipo: SalaTipo;
  ativos?: boolean;
}) {
  return prisma.pacote.create({
    data: {
      nome: data.nome,
      horas: data.horas,
      valor: data.valor,
      tipo: data.tipo,
      ativos: data.ativos ?? true
    }
  });
}

export async function updatePacoteService(id: string, data: {
  nome?: string;
  horas?: number;
  valor?: number;
  tipo?: SalaTipo;
  ativos?: boolean;
}) {
  return prisma.pacote.update({
    where: { id },
    data
  });
}

export async function deletePacoteService(id: string) {
  await prisma.pacote.delete({ where: { id } });
}
