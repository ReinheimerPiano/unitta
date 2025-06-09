# 🚀 Unitta

**Rede inteligente de espaços terapêuticos**

---

## 🌟 Visão geral

Unitta é uma plataforma moderna desenvolvida para clínicas e psicólogos independentes. Permite a sublocação de salas por profissionais da área de saúde mental, via compra de créditos ou pacotes de horas. O sistema oferece:

- Reservas simples via calendário (estilo Google Agenda)
- Gestão de créditos (criar, consultar, consumir)
- Painel administrativo para clínicas: aprovações, salas, pacotes, relatórios
- Interface web totalmente responsiva (desktop & mobile)

---

## 📦 Estrutura do repositório

unitta/
├── docker-compose.yml # Orquestra PostgreSQL, backend e frontend via Docker
├── unitta-backend/ # API Node.js (Express + Prisma + PostgreSQL)
├── unitta-frontend/ # Frontend React + Vite + Tailwind + shadcn/UI
└── README.md # Você está aqui!

yaml
Copiar
Editar

---

## ⚙️ Tecnologias principais

**Backend**
- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- JWT, bcrypt, CORS, morgan, dotenv

**Frontend**
- React + Vite
- Tailwind CSS
- shadcn/UI + React Big Calendar (modo escuro ativado)
- React Query + Zod (em breve!)

**Infraestrutura**
- Docker + Docker Compose
- PNPM (monorepo)

---

## 🧩 Funcionalidades (MVP)

- 💬 Cadastro e login de usuários (admin & profissional)
- ✔️ Aprovação de cadastro pelos administradores
- 💳 Sistema de créditos e compra de pacotes
- 📅 Agenda com reservas e consumo automático de créditos
- 🏷️ Gestão de salas com valores por tipo (adulto, infantil, online, pacotes por período)
- 📊 Relatórios de uso e crédito

---

## 🚀 Como rodar o projeto localmente

### 1. Pré-requisitos

- Docker + Docker Compose
- PNPM instalado globalmente

### 2. Na raiz do projeto

```bash
pnpm install
pnpm run dev
Ele irá:

Subir o PostgreSQL

Rodar migrate + seed

Subir o backend em http://localhost:3333

Subir o frontend em http://localhost:5173

🔧 Estrutura dos projetos
🧠 Backend (unitta-backend)
src/: Rotas, controladores, modelos e configuração do Express

prisma/: schema.prisma + seed.ts

Dockerfile + entrypoint.sh: migrações, seed e start automatizados

🎨 Frontend (unitta-frontend)
src/components: Componentes reutilizáveis (Calendar, Dialog, etc.)

src/pages: Telas (Home, Login, Dashboard, Agenda, Salas, Créditos)

src/styles: Tailwind + tema dark

✅ Próximos passos
Cliente:

Integrar compras via gateway (Stripe/Mercado Pago)

Formulário de reserva com seleção de sala + confirmação

Perfil de usuário e histórico de reservas

Backend:

CRUD completo para pacotes, salas, relatórios e reservas

Webhook para atualização automática de créditos

Autenticação robusta + autorização por roles

📬 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests, especialmente para:

Testes unificados (Jest/Supertest)

Tratamento de erros Elasticsearch

Refatoração para monorepo com turbo ou nx

Internacionalização ou suporte a multi-instituições

📝 Licença
Este projeto está licenciado sob a MIT License.

Feito com ❤️ por ReinheimerPiano

yaml
Copiar
Editar

---

### ✅ Próximos passos:

- Quer que eu gere badges (build, coverage, license)?
- Deseja que eu te ajude a preencher seções como *Como contribuir* e *Roadmap*?
- Posso criar um template de issue e PR para padronizar contribuições.

É só falar!