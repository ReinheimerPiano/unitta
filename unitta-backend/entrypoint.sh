#!/bin/sh

echo "Aguardando o banco de dados iniciar..."

# Espera o banco responder na porta 5432
while ! nc -z db 5432; do
  sleep 1
done

echo "Banco de dados disponível! Executando Prisma..."

npx prisma generate
npx prisma migrate deploy

# Verificar se o banco de dados já tem dados
if ! npx prisma db seed --skip-seed-check; then
  echo "Banco de dados já populado, seed não será executado."
else
  # Rodar o seed (inserir dados iniciais no banco)
  npx ts-node ./prisma/seed.ts
fi

npx prisma studio &

echo "Iniciando servidor Node"
npx ts-node-dev src/server.ts
