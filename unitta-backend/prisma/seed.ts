// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Salas
  const sala1 = await prisma.sala.create({
    data: {
      nome: 'Sala 1 - Atendimento Adulto',
      precoHora: 28.0,
      tipo: 'ADULTO',
    },
  });

  const sala2 = await prisma.sala.create({
    data: {
      nome: 'Sala 3 - Atendimento Infantil',
      precoHora: 30.0,
      tipo: 'INFANTIL',
    },
  });

  const sala3 = await prisma.sala.create({
    data: {
      nome: 'Sala Virtual - Atendimento Online',
      precoHora: 14.0,
      tipo: 'ONLINE',
    },
  });

  // Pacotes
  await prisma.pacote.createMany({
    data: [
      { nome: 'Pacote Adulto 10h', horas: 10, valor: 230.0, tipo: 'ADULTO' },
      { nome: 'Pacote Adulto 5h', horas: 5, valor: 115.0, tipo: 'ADULTO' },
      { nome: 'Pacote Infantil 10h', horas: 10, valor: 250.0, tipo: 'INFANTIL' },
      { nome: 'Pacote Infantil 5h', horas: 5, valor: 125.0, tipo: 'INFANTIL' },
    ],
  });

  // Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Clínica',
      email: 'admin@clinica.com',
      password: 'admin123', // lembre-se de criptografar em produção
      role: 'ADMIN',
      status: 'APPROVED',
    },
  });

  // Profissional
  const pro = await prisma.user.create({
    data: {
      name: 'Dra. Ana Psicóloga',
      email: 'ana@pro.com',
      password: 'ana123',
      role: 'PRO',
      status: 'APPROVED',
      credits: 10,
    },
  });

  // Reserva de exemplo
  await prisma.reserva.create({
    data: {
      userId: pro.id,
      salaId: sala1.id,
      inicio: new Date('2025-06-01T10:00:00Z'),
      fim: new Date('2025-06-01T11:00:00Z'),
    },
  });

  // Compra de créditos de exemplo
  const pacote = await prisma.pacote.findFirst({ where: { tipo: 'ADULTO', horas: 5 } });
  if (pacote) {
    await prisma.compra.create({
      data: {
        userId: pro.id,
        pacoteId: pacote.id,
        horas: pacote.horas,
      },
    });
  }
}

main()
  .then(() => console.log('Seed concluído.'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
