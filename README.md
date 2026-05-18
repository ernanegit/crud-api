# 📒 CRUD API Agenda

API RESTful para gerenciamento de contatos construída com **NestJS**, **Prisma ORM** e **PostgreSQL**.

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) — framework Node.js para construção de APIs escaláveis
- [Prisma ORM](https://www.prisma.io/) — ORM moderno e tipado para TypeScript
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional
- [Docker](https://www.docker.com/) — container do banco de dados
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

---

## ⚙️ Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/ernanegit/crud-api.git
cd crud-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agenda_db"
```

### 4. Suba o banco de dados com Docker

```bash
docker compose up -d
```

### 5. Execute as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Inicie a aplicação

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

---

## 📁 Estrutura do projeto

```
crud-api-agenda/
├── prisma/
│   ├── migrations/               # Histórico de migrações do banco
│   └── schema.prisma             # Definição dos models e conexão
├── src/
│   ├── contatos/
│   │   ├── contatos.controller.ts  # Rotas HTTP dos contatos
│   │   ├── contatos.module.ts      # Módulo de contatos
│   │   └── contatos.service.ts     # Regras de negócio
│   ├── prisma/
│   │   ├── prisma.module.ts        # Módulo global do Prisma
│   │   └── prisma.service.ts       # Serviço de conexão com o banco
│   ├── app.controller.ts           # Controller padrão do NestJS
│   ├── app.controller.spec.ts      # Testes do controller padrão
│   ├── app.module.ts               # Módulo raiz da aplicação
│   ├── app.service.ts              # Service padrão do NestJS
│   └── main.ts                     # Ponto de entrada da aplicação
├── test/                           # Testes end-to-end
├── test/                           # Testes end-to-end
├── .env                            # Variáveis de ambiente (não vai ao Git)
├── .gitignore                      # Arquivos ignorados pelo Git
├── .prettierrc                     # Configurações de formatação
├── docker-compose.yml              # Container do PostgreSQL
├── eslint.config.mjs               # Configurações do ESLint
├── nest-cli.json                   # Configurações do NestJS CLI
├── package.json                    # Dependências e scripts npm
├── package-lock.json               # Lock das versões das dependências
├── README.md                       # Documentação do projeto
├── tsconfig.build.json             # Configurações TypeScript para build
└── tsconfig.json                   # Configurações do TypeScript
```

---

## 🔌 Endpoints

### Contatos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/contatos` | Criar um contato |
| `GET` | `/contatos` | Listar todos os contatos |
| `GET` | `/contatos/:id` | Buscar contato por ID |
| `PUT` | `/contatos/:id` | Atualizar contato |
| `DELETE` | `/contatos/:id` | Deletar contato |

---

## 📨 Exemplos de uso

### Criar contato

```http
POST /contatos
Content-Type: application/json

{
  "nome": "Ernan",
  "email": "ernan@email.com",
  "telefone": "85999999999"
}
```

### Resposta

```json
{
  "id": 1,
  "nome": "Ernan",
  "email": "ernan@email.com",
  "telefone": "85999999999",
  "createdAt": "2026-05-18T00:13:31.518Z"
}
```

### Atualizar contato

```http
PUT /contatos/1
Content-Type: application/json

{
  "telefone": "85988888888"
}
```

### Deletar contato

```http
DELETE /contatos/1
```

---

## 🗄️ Model do banco de dados

```prisma
model Contato {
  id        Int      @id @default(autoincrement())
  nome      String
  email     String   @unique
  telefone  String?
  createdAt DateTime @default(now())
}
```

---

## 🐳 Docker

O banco de dados PostgreSQL roda em um container Docker.

```bash
# Subir o container
docker compose up -d

# Parar o container
docker compose down

# Ver logs do container
docker logs agenda_db
```

---

## 📜 Scripts disponíveis

```bash
npm run start        # Inicia em produção
npm run start:dev    # Inicia com hot-reload
npm run build        # Compila o TypeScript
npm run test         # Executa os testes
```

---

## 👨‍💻 Autor

Desenvolvido por **Ernan** como projeto de aprendizado de NestJS + Prisma + PostgreSQL.