#!/bin/sh

echo "Aguardando o banco de dados iniciar..."

# Espera o banco responder na porta 5432
while ! nc -z db 5432; do
  sleep 1
done

echo "Banco de dados disponível! Executando Prisma..."

npx prisma generate
npx prisma migrate deploy
npx prisma db seed

echo "Iniciando servidor Node"
npx ts-node-dev src/server.ts
