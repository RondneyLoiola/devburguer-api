# 🍔 DevBurguer API

API REST desenvolvida em Node.js para gerenciar pedidos, produtos e usuários de uma hamburgueria.

## 📋 Sobre o Projeto

O DevBurguer API é o backend de um sistema completo de hamburgueria, fornecendo endpoints para gerenciamento de produtos, pedidos, categorias e autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Sequelize** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação por token
- **Multer** - Upload de imagens
- **Yup** - Validação de dados
- **Bcrypt** - Criptografia de senhas

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [PostgreSQL](https://www.postgresql.org/)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/RondneyLoiola/devburguer-api.git
```

2. Entre na pasta do projeto:
```bash
cd devburguer-api
```

3. Instale as dependências:
```bash
pnpm install
```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
# Banco de Dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/devburguer

# JWT
JWT_SECRET=sua_chave_secreta_aqui

# Aplicação
PORT=3001
```

5. Execute as migrations do banco de dados:
```bash
pnpm sequelize db:migrate
```

6. (Opcional) Execute os seeds para popular o banco:
```bash
pnpm sequelize db:seed:all
```

## ▶️ Como Executar

### Modo de Desenvolvimento
```bash
pnpm dev
```

### Modo de Produção
```bash
pnpm start
```

A API estará rodando em `http://localhost:3001`

## 📚 Documentação da API

### Autenticação

#### Criar Usuário
```http
POST /users
Content-Type: application/json

{
  "name": "Seu Nome",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

#### Login
```http
POST /sessions
Content-Type: application/json

{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

### Produtos

#### Listar Produtos
```http
GET /products
```

#### Criar Produto (requer autenticação admin)
```http
POST /products
Authorization: Bearer {token}
Content-Type: multipart/form-data

name: Nome do Produto
price: 25.90
category_id: 1
file: imagem.jpg
```

### Categorias

#### Listar Categorias
```http
GET /categories
```

### Pedidos

#### Criar Pedido (requer autenticação)
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "products": [
    {
      "id": 1,
      "quantity": 2
    }
  ]
}
```

#### Listar Pedidos (requer autenticação admin)
```http
GET /orders
Authorization: Bearer {token}
```

## 📁 Estrutura de Pastas

```
devburguer-api/
├── src/
│   ├── app/
│   │   ├── controllers/     # Controladores das rotas
│   │   ├── middlewares/     # Middlewares da aplicação
│   │   └── models/          # Modelos do banco de dados
│   ├── config/              # Configurações
│   ├── database/            # Migrations e seeds
│   └── routes.js            # Definição de rotas
├── uploads/                 # Pasta de arquivos enviados
├── .sequelizerc            # Configuração do Sequelize
├── package.json
└── README.md
```

## 🛠️ Scripts Disponíveis

- `pnpm dev` - Inicia o servidor em modo desenvolvimento
- `pnpm start` - Inicia o servidor em modo produção
- `pnpm sequelize` - Executa comandos do Sequelize CLI

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

**Rondney Loiola**

- LinkedIn: https://www.linkedin.com/in/rondneyloiola/
- GitHub: [@RondneyLoiola](https://github.com/RondneyLoiola)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
