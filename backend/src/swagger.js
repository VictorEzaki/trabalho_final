const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Controle de Despesas',
    version: '1.0.0',
    description: 'API para gerenciamento de despesas pessoais',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Mensagem descrevendo o erro',
          },
        },
      },
      
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1, readOnly: true },
          name: { type: 'string', example: 'Victor Ezaki' },
          email: { type: 'string', example: 'victor@email.com' },
          password: { type: 'string', example: '123456' },
        },
      },
    },
    examples: {
      // Users
      UserNomeObrigatorio: {
        summary: 'Nome não informado',
        value: { message: 'Nome é um campo obrigatório' },
      },
      UserEmailObrigatorio: {
        summary: 'Email não informado',
        value: { message: 'Email é um campo obrigatório' },
      },
      UserSenhaObrigatoria: {
        summary: 'Senha não informada',
        value: { message: 'Senha é um campo obrigatório' },
      },
      UserSenhaCurta: {
        summary: 'Senha muito curta',
        value: { message: 'A senha deve conter pelo menos 6 caracteres' },
      },
      UserEmailInvalido: {
        summary: 'Email em formato inválido',
        value: { message: 'O email deve conter pelo menos 5 caracteres e incluir um "@"' },
      },
      UserEmailDuplicado: {
        summary: 'Email já cadastrado',
        value: { message: 'Já existe um usuário cadastrado com este email' },
      },
      InvalidCredentials: {
        summary: 'Credenciais inválidas',
        value: { message: 'Credenciais inválidas' },
      },
      UserFieldsObrigatorio: {
        summary: 'Campos obrigatórios',
        value: { message: 'Email e senha são obrigatórios' },
      },
      UserIdObrigatorio: {
        summary: 'ID obrigatório',
        value: { message: 'ID é obrigatório' },
      },
      UserIdValid: {
        summary: 'ID válido',
        value: { message: 'ID não pode ser menor que 1' },
      },

      // Auth
      InvalidToken: {
        summary: 'Token inválido',
        value: { message: 'Token inválido ou expirado' },
      },
      TokenNotProvide: {
        summary: 'Token não informado',
        value: { message: 'Token não informado' },
      },
      TokenMalFormated: {
        summary: 'Token mal formatado',
        value: { message: 'Token mal formatado' },
      },
    },
  },
};

module.exports = swaggerDefinition;

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;