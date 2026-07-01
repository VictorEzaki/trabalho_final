# 💰 Expense API - Sistema de Gestão de Despesas

## 1.1. Descrição do Projeto

### Objetivo da API

A **Expense API** é uma API RESTful desenvolvida para controle de despesas pessoais.
O sistema permite cadastrar usuários, autenticar login com JWT, criar categorias, registrar despesas, aplicar filtros nas listagens e consultar estatísticas financeiras por usuário e categoria.

A aplicação foi construída seguindo o padrão **MVC**, separando responsabilidades entre rotas, controllers, views, models, middlewares e configurações.

---

## 1.2. Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para criação da API REST.
- **Sequelize**: ORM para comunicação com o banco de dados.
- **MySQL**: Banco de dados relacional utilizado pela aplicação.
- **JWT**: Autenticação baseada em token.
- **bcrypt**: Criptografia de senhas.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **CORS**: Permite requisições entre diferentes origens.
- **Swagger**: Documentação interativa da API.
- **Sequelize CLI**: Criação de migrations e seeders.

---

## 1.3. Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- Node.js
- MySQL
- npm

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do backend com base no `.env.example`.

Exemplo:

```env
DB_NAME=expense
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

### 3. Criar o banco de dados

```bash
npm run db:create
```

### 4. Executar as migrations

```bash
npm run db:migrate
```

### 5. Executar os seeders

```bash
npm run db:seed
```

### 6. Iniciar o servidor

```bash
npm run dev
```

O servidor será iniciado em:

```
http://localhost:3000
```

---

## 1.4. Documentação Swagger

A API possui documentação interativa com Swagger.
Após iniciar o servidor, acesse:

```
http://localhost:3000/api-docs
```

---

## 1.5. Modelo de Dados

### Usuário

Representa um usuário cadastrado no sistema.

Campos:

- `id`: Identificador único.
- `name`: Nome do usuário.
- `email`: Email do usuário.
- `password`: Senha criptografada.
- `createdAt`: Data de criação.
- `updatedAt`: Data de atualização.

### Categoria

Representa uma categoria de despesa.

Campos:

- `id`: Identificador único.
- `name`: Nome da categoria.
- `description`: Descrição da categoria.
- `createdAt`: Data de criação.
- `updatedAt`: Data de atualização.

### Despesa

Representa uma despesa cadastrada no sistema.

Campos:

- `id`: Identificador único.
- `description`: Descrição da despesa.
- `amount`: Valor da despesa.
- `date`: Data da despesa no formato `YYYY-MM-DD`.
- `status`: Status da despesa, podendo ser `PENDENTE` ou `PAGA`.
- `categoryId`: ID da categoria relacionada.
- `userId`: ID do usuário relacionado.

---

## 1.6. Relacionamentos

A API possui os seguintes relacionamentos entre as entidades:

- Um usuário possui várias despesas.
- Uma categoria possui várias despesas.
- Uma despesa pertence a um usuário.
- Uma despesa pertence a uma categoria.

---

## 1.7. Autenticação

A autenticação da API é feita com JWT.
Após realizar login, o usuário recebe um token que deve ser enviado no header das rotas protegidas.

Exemplo:

```
Authorization: Bearer seu_token_jwt
```

---

## 1.8. Rotas da API

Todas as rotas utilizam o prefixo:

```
/api
```

---

## 1.9. Rotas de Autenticação e Usuário

### Cadastro de Usuário

```
POST /api/users
```

Payload:

```json
{
  "name": "Victor",
  "email": "victor@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "id": 1,
  "name": "Victor",
  "email": "victor@email.com"
}
```

### Login

```
POST /api/auth/login
```

Payload:

```json
{
  "email": "victor@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "token_jwt",
  "user": {
    "id": 1,
    "name": "Victor",
    "email": "victor@email.com"
  }
}
```

### Listar Usuários

```
GET /api/users
```

### Buscar Usuário por ID

```
GET /api/users/:id
```

### Atualizar Usuário

```
PUT /api/users/:id
```

Payload:

```json
{
  "name": "Victor Atualizado",
  "email": "victor@email.com",
  "password": "123456"
}
```

### Excluir Usuário

```
DELETE /api/users/:id
```

---

## 1.10. Rotas de Categorias

### Listar Categorias

```
GET /api/categories
```

### Buscar Categoria por ID

```
GET /api/categories/:id
```

### Criar Categoria

```
POST /api/categories
```

Payload:

```json
{
  "name": "Alimentação",
  "description": "Gastos com comida, mercado e restaurantes"
}
```

### Atualizar Categoria

```
PUT /api/categories/:id
```

Payload:

```json
{
  "name": "Transporte",
  "description": "Gastos com Uber, ônibus e combustível"
}
```

### Excluir Categoria

```
DELETE /api/categories/:id
```

---

## 1.11. Rotas de Despesas

### Listar Despesas

```
GET /api/expenses
```

### Buscar Despesa por ID

```
GET /api/expenses/:id
```

### Criar Despesa

```
POST /api/expenses
```

Payload:

```json
{
  "description": "Compra no supermercado",
  "amount": 250.75,
  "date": "2026-06-20",
  "status": "PAGA",
  "categoryId": 1,
  "userId": 1
}
```

### Atualizar Despesa

```
PUT /api/expenses/:id
```

Payload:

```json
{
  "description": "Conta de luz",
  "amount": 180.5,
  "date": "2026-06-22",
  "status": "PENDENTE",
  "categoryId": 2,
  "userId": 1
}
```

### Excluir Despesa

```
DELETE /api/expenses/:id
```

---

## 1.12. Filtros de Despesas

A listagem de despesas permite filtros por categoria, status, período, valor mínimo e valor máximo.

Endpoint:

```
GET /api/expenses
```

Exemplos:

```
GET /api/expenses?categoryId=1
GET /api/expenses?status=PAGA
GET /api/expenses?dateIni=2026-06-01&dateFim=2026-06-30
GET /api/expenses?vlMin=100&vlMax=500
```

Exemplo combinando filtros:

```
GET /api/expenses?categoryId=1&status=PAGA&dateIni=2026-06-01&dateFim=2026-06-30&vlMin=50&vlMax=1000
```

---

## 1.13. Dashboard e Estatísticas

### Total de Gastos

```
GET /api/dashboard/total-expenses
```

Resposta:

```json
{
  "total": 3500.5
}
```

### Quantidade de Despesas

```
GET /api/dashboard/expenses-count
```

Resposta:

```json
{
  "quantidade": 45
}
```

### Gastos por Categoria

```
GET /api/dashboard/expenses-by-category
```

Resposta:

```json
[
  {
    "categoria": "Alimentação",
    "total": 1200
  },
  {
    "categoria": "Transporte",
    "total": 800
  }
]
```

---

## 1.14. Recursos Implementados

- Cadastro de usuários.
- Login com JWT.
- Senhas criptografadas com bcrypt.
- Middleware de autenticação.
- CRUD de usuários.
- CRUD de categorias.
- CRUD de despesas.
- Relacionamentos com Sequelize.
- Migrations.
- Seeders.
- Filtros por categoria, status, período, valor mínimo e valor máximo.
- Dashboard com total de gastos.
- Dashboard com quantidade de despesas.
- Dashboard com gastos por categoria.
- Tratamento global de erros.
- Documentação com Swagger.
- Collection Postman para testes.

---

## 1.15. Segurança

A API possui os seguintes recursos de segurança:

- Autenticação com JWT.
- Criptografia de senha com bcrypt.
- Proteção de rotas privadas com middleware de autenticação.
- Variáveis sensíveis armazenadas em `.env`.
- Tratamento centralizado de erros.

---

## 1.16. Scripts Disponíveis

Criar banco de dados:

```bash
npm run db:create
```

Executar migrations:

```bash
npm run db:migrate
```

Executar seeders:

```bash
npm run db:seed
```

Iniciar servidor:

```bash
npm run dev
```

Iniciar servidor com nodemon:

```bash
npm run watch
```

---

## 1.17. Collection Postman

A collection do Postman está disponível no repositório para facilitar os testes das rotas da API.

Arquivo:

```
expense_api.postman.json
```

---

## 1.18. Estrutura do Projeto

```
src/
├── config/
├── controllers/
├── errors/
├── middleware/
├── migrations/
├── models/
├── routes/
├── seeders/
├── views/
├── swagger.js
└── app.js
```

---

## 1.19. Observações

Antes de testar rotas protegidas, faça login e copie o token JWT retornado.

Envie o token no header da requisição:

```
Authorization: Bearer seu_token_jwt
```