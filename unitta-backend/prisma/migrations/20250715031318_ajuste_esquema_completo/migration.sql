/*
  Warnings:

  - You are about to drop the column `credits` on the `User` table. All the data in the column will be lost.
  - Added the required column `valorTotal` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorCobrado` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Sala` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoReserva" AS ENUM ('NORMAL', 'PERIODO');

-- CreateEnum
CREATE TYPE "FaixaHorario" AS ENUM ('MANHA', 'TARDE', 'SABADO');

-- CreateEnum
CREATE TYPE "StatusCompra" AS ENUM ('PENDENTE', 'CONFIRMADA', 'RECUSADA');

-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_pacoteId_fkey";

-- AlterTable
ALTER TABLE "Compra" ADD COLUMN     "compraAvulsa" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "StatusCompra" NOT NULL DEFAULT 'PENDENTE',
ADD COLUMN     "valorTotal" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "pacoteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pacote" ADD COLUMN     "ehPorPeriodo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "faixaHorario" "FaixaHorario",
ADD COLUMN     "precoHora" DOUBLE PRECISION,
ADD COLUMN     "quantidadeHorasMinima" INTEGER;

-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "tipoReserva" "TipoReserva" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "valorCobrado" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Sala" ADD COLUMN     "aceitaPeriodo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "codigo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "credits";

-- CreateTable
CREATE TABLE "PacoteSala" (
    "id" TEXT NOT NULL,
    "salaId" TEXT NOT NULL,
    "pacoteId" TEXT NOT NULL,

    CONSTRAINT "PacoteSala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credito" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "compraId" TEXT NOT NULL,
    "horas" INTEGER NOT NULL,
    "usadas" INTEGER NOT NULL DEFAULT 0,
    "tipo" "SalaTipo" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credito_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PacoteSala" ADD CONSTRAINT "PacoteSala_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacoteSala" ADD CONSTRAINT "PacoteSala_pacoteId_fkey" FOREIGN KEY ("pacoteId") REFERENCES "Pacote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_pacoteId_fkey" FOREIGN KEY ("pacoteId") REFERENCES "Pacote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
