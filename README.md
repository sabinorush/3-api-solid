# App

GymPass style App.

## Rfs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter o seu historico de check-ins;
- [x] Deve ser possivel o usuario buscar academias proximas (até 10km);
- [x] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-in em uma academia;
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastar uma academia;

## Rns (Regras de negócio)

- [x] O usuario nao deve poder se cadastrar com um email duplicado;
- [x] O usuario nao pode fazer mais de um check-in no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver proximo (100m) da academia;
- [x] O check-in so pode ser validado ate 20 minutos apos criado;
- [x] O check-in so pode ser validado por administradores;
- [x] A academia so pode ser cadastrada por administradores;

## Rnfs (Requisitos não funcionais)

- [x] A senha do usuario precisar estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [x] O usuario deve ser identificado por um JWT (JSON Web Token);

---
# Rotas da aplicação

## Rotas de Autenticação e Usuários

- POST /signup: Cadastro de um novo usuário.

- POST /signin: Autenticação de um usuário existente.

- GET /users/profile: Obtenção do perfil do usuário logado.

- PATCH /users/password/reset: Redefinição de senha do usuário.​

## Rotas de Check-ins

- POST /check-ins: Registro de um novo check-in em uma academia.

- GET /check-ins/history: Histórico de check-ins do usuário logado.

- PATCH /check-ins/validate: Validação de um check-in (apenas administradores).​

## Rotas de Academias

- GET /gyms: Listagem de academias próximas ao usuário logado.

- GET /gyms/search: Busca de academias por nome.

- POST /gyms: Cadastro de uma nova academia (apenas administradores).

---

# 🚀 Como rodar essa aplicação: [`3-api-solid`](https://github.com/sabinorush/3-api-solid)

Este guia irá te ajudar a clonar o repositório, instalar as dependências e rodar o projeto localmente.

---

## 📦 Requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Git](https://git-scm.com/)
- [Node.js (versão 18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (Rodando e com um banco criado)
- [Docker](https://www.docker.com/) *(opcional, mas recomendado para o banco de dados)*

---

## 🌀 Passo a passo ->

### 1. Clone o repositório

```bash
git clone https://github.com/sabinorush/3-api-solid.git
```

### 2. Acesse a pasta do projeto

```bash
cd 3-api-solid
```

### 3. Instale as dependências

Com **npm**:

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`:

Edite o arquivo `.env` com as configurações do seu banco de dados PostgreSQL, por exemplo:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="uma_chave_secreta"
```

> ⚠️ Certifique-se de que o banco de dados está rodando e acessível.

### 5. Rode as migrações do banco de dados

```bash
npx prisma migrate dev
```

---

## 🚀 Rodando a aplicação

### Em ambiente de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em: [http://localhost:3333](http://localhost:3333)

---

## 🧪 Rodando os testes

Se quiser executar os testes automatizados:

```bash
npm run test
```

---

## 🐳 Rodando com Docker (opcional)

Se preferir usar Docker para o banco de dados, pode subir um container PostgreSQL:

Crie um arquivo docker-compose.yml

```bash
version: '3'

services:
  api-solid-pg:
    image: bitnami/postgresql
    ports:
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
```

Você pode selecionar a versão que você preferir, assim como a imagem do banco de dados as portas de acesso,
usuário e senha também podem ser personalizados e devem ser passados igualmente no arquivo .env assim como o nome do DATABASE.

Em seguida, atualize o `DATABASE_URL` no `.env` para:

```
DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
```

Execute o comando:
```bash
docker-compose up -d
```
Para subir imagem do banco de dados no docker. (Certifique-se de que o docker esteja rodando na sua máquina local.)

Continue a partir do passo das migrações, rodando as migrações e depois inicializando o sistema.