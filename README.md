# 🚀 Unitta

**Rede inteligente de espaços terapêuticos**  
*Comece pelo seu centro comportamental. Escale para qualquer lugar.*

---

## 🌟 Visão Geral

**Unitta** é uma plataforma moderna criada para facilitar a gestão e sublocação de salas de atendimento psicológico. Profissionais da saúde mental podem adquirir créditos de hora (individual ou pacotes) e utilizá-los para reservar salas por meio de uma interface web interativa e fácil de usar.

### Principais recursos:
- 📅 Reservas por calendário interativo (estilo Google Agenda)
- 💳 Compra e gerenciamento de créditos
- 🧠 Painel administrativo com controle de salas, pacotes, aprovações e histórico
- 📱 Interface web responsiva para desktop e mobile

---

## 📦 Estrutura do Repositório

```
unitta/
├── docker-compose.yml      # Orquestra PostgreSQL, backend e frontend via Docker
├── unitta-backend/         # Backend (Node.js + Express + Prisma)
├── unitta-frontend/        # Frontend (React + Vite + Tailwind)
└── README.md               # Este arquivo
```

---

## ⚙️ Tecnologias Utilizadas

### 🔧 Backend
- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- JWT, bcrypt, cors, dotenv, morgan

### 🎨 Frontend
- React + Vite
- Tailwind CSS
- shadcn/ui
- React Big Calendar (com modo escuro)
- React Query + Zod (em breve)

### 🐳 Infraestrutura
- Docker + Docker Compose
- PNPM (estrutura de monorepo)

---

## 🧩 Funcionalidades (MVP)

- ✅ Cadastro e autenticação de usuários (admin e profissionais)
- 🔒 Aprovação de cadastro pelo admin
- 💳 Compra de créditos e pacotes
- 🗓️ Reserva de salas com desconto automático de créditos
- 🏷️ Gestão de salas com valores por tipo (adulto, infantil, online)
- 📊 Relatórios de uso e consumo

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Pré-requisitos
- Docker + Docker Compose
- PNPM global instalado

### 2. Instruções
Execute os comandos abaixo a partir da raiz do projeto:

```bash
pnpm install
pnpm run dev
```

Isso irá:
- Subir o PostgreSQL com Docker
- Rodar `migrate` + `seed` via Prisma
- Levantar o backend (`http://localhost:3333`)
- Levantar o frontend (`http://localhost:5173`)

---

## 🗂 Estrutura Interna

### 🧠 Backend (`unitta-backend/`)
- `src/`: rotas, controladores, serviços
- `prisma/`: schema.prisma + seed.ts
- Dockerfile + entrada customizada para migração automatizada

### 🎨 Frontend (`unitta-frontend/`)
- `components/`: elementos reutilizáveis (botões, calendários)
- `pages/`: telas (Login, Dashboard, Agenda, Salas, Créditos)
- `styles/`: Tailwind CSS e suporte dark mode

---

## 📈 Roadmap (Próximos Passos)

### Frontend
- Integração com pagamento (Stripe/MercadoPago)
- Tela de seleção de salas e confirmação
- Perfil do usuário e histórico de reservas

### Backend
- CRUD para pacotes, salas e relatórios
- Webhook para confirmação de compra
- Migração para autorização por função (roles)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Você pode ajudar com:
- Testes (Jest, Supertest)
- Integração contínua ou deploy automático
- Refatoração para turborepo ou nx
- Internacionalização e suporte a múltiplas clínicas

---

## 📝 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Feito com ❤️ por [@ReinheimerPiano](https://github.com/ReinheimerPiano)
