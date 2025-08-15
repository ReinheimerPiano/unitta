// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = bcrypt.hashSync('admin123', 10);
  const proPassword = bcrypt.hashSync('pro123', 10);

  // Salas
  const sala1 = await prisma.sala.create({
    data: {
      nome: 'Sala 1 - Atendimento Adulto',
      codigo: 'Sala 1',
      precoHora: 28.0,
      tipo: 'ADULTO',
      aceitaPeriodo: true,
    },
  });

  const sala2 = await prisma.sala.create({
    data: {
      nome: 'Sala 3 - Atendimento Infantil',
      codigo: 'Sala 3',
      precoHora: 30.0,
      tipo: 'INFANTIL',
    },
  });

  const sala3 = await prisma.sala.create({
    data: {
      nome: 'Sala Virtual - Atendimento Online',
      codigo: 'Online',
      precoHora: 14.0,
      tipo: 'ONLINE',
    },
  });

  const sala4 = await prisma.sala.create({
    data: {
      nome: 'Sala 4 - Atendimento Adulto (Período)',
      codigo: 'Sala 4',
      precoHora: 19.0,
      tipo: 'ADULTO',
      aceitaPeriodo: true,
    },
  });

  // Pacotes
  const pacoteAdulto10h = await prisma.pacote.create({
    data: {
      nome: 'Pacote Adulto 10h',
      horas: 10,
      valor: 230.0,
      tipo: 'ADULTO',
      salasPermitidas: {
        create: [
          { salaId: sala1.id },
          { salaId: sala4.id },
        ],
      },
    },
  });

  const pacoteInfantil5h = await prisma.pacote.create({
    data: {
      nome: 'Pacote Infantil 5h',
      horas: 5,
      valor: 125.0,
      tipo: 'INFANTIL',
      salasPermitidas: {
        create: [
          { salaId: sala2.id },
        ],
      },
    },
  });

  const pacotePeriodoTarde = await prisma.pacote.create({
    data: {
      nome: 'Período Tarde (Sala 4)',
      horas: 20,
      valor: 380.0,
      tipo: 'PERIODO',
      ehPorPeriodo: true,
      precoHora: 19.0,
      faixaHorario: 'TARDE',
      salasPermitidas: {
        create: [
          { salaId: sala4.id },
        ],
      },
    },
  });

  // Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Clínica',
      email: 'admin@clinica.com',
      password: adminPassword,
      role: 'ADMIN',
      status: 'APPROVED',
    },
  });

  // Profissional
  const pro = await prisma.user.create({
    data: {
      name: 'Dra. Ana Psicóloga',
      email: 'ana@pro.com',
      password: proPassword,
      role: 'PRO',
      status: 'APPROVED',
    },
  });

  // Compra e crédito confirmado
  const compraConfirmada = await prisma.compra.create({
    data: {
      userId: pro.id,
      pacoteId: pacoteAdulto10h.id,
      horas: pacoteAdulto10h.horas,
      valorTotal: pacoteAdulto10h.valor,
      status: 'CONFIRMADA'
    },
  });

  await prisma.credito.create({
    data: {
      userId: pro.id,
      compraId: compraConfirmada.id,
      horas: pacoteAdulto10h.horas,
      tipo: 'ADULTO'
    },
  });

  // Compra pendente (não gera crédito)
  await prisma.compra.create({
    data: {
      userId: pro.id,
      pacoteId: pacoteInfantil5h.id,
      horas: pacoteInfantil5h.horas,
      valorTotal: pacoteInfantil5h.valor,
      status: 'PENDENTE'
    },
  });

  // Reserva de exemplo
  await prisma.reserva.create({
    data: {
      userId: pro.id,
      salaId: sala1.id,
      inicio: new Date('2025-06-01T10:00:00Z'),
      fim: new Date('2025-06-01T11:00:00Z'),
      tipoReserva: 'NORMAL',
      valorCobrado: 28.0,
    },
  });
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
