const express = require('express');

const router = express.Router();
const UserView = require('../views/user');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Victor
 *               email:
 *                 type: string
 *                 example: victor@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               nomeObrigatorio:
 *                 $ref: '#/components/examples/UserNomeObrigatorio'
 *               emailObrigatorio:
 *                 $ref: '#/components/examples/UserEmailObrigatorio'
 *               senhaObrigatoria:
 *                 $ref: '#/components/examples/UserSenhaObrigatoria'
 *               senhaCurta:
 *                 $ref: '#/components/examples/UserSenhaCurta'
 *               emailInvalido:
 *                 $ref: '#/components/examples/UserEmailInvalido'
 *       409:
 *         description: Conflito ao criar usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               emailDuplicado:
 *                 $ref: '#/components/examples/UserEmailDuplicado'
 */
router.post("/users", UserView.create);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: victor@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               InvalidCredentials:
 *                 $ref: '#/components/examples/InvalidCredentials'
 *               UserFieldsObrigatorio:
 *                 $ref: '#/components/examples/UserFieldsObrigatorio'
 */
router.post("/auth/login", UserView.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Objeto de usuário
 *       401:
 *         description: Erro de autorização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidToken:
 *                 $ref: '#/components/examples/InvalidToken'
 *               tokenNotProvide:
 *                 $ref: '#/components/examples/TokenNotProvide'
 *               tokenMalFormated:
 *                 $ref: '#/components/examples/TokenMalFormated'
 *       500:
 *          description: Ocorreu um erro ao buscar usuários
 */
router.get("/users", authMiddleware, UserView.getAll);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto de usuário
 *       401:
 *         description: Erro de autorização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidToken:
 *                 $ref: '#/components/examples/InvalidToken'
 *               tokenNotProvide:
 *                 $ref: '#/components/examples/TokenNotProvide'
 *               tokenMalFormated:
 *                 $ref: '#/components/examples/TokenMalFormated'
 *       404:
 *         description: Nenhum usuário encontrado
 */
router.get("/users/:id", authMiddleware, UserView.getById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Editar um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Victor
 *               email:
 *                 type: string
 *                 example: victor@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Objeto de usuário
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               nomeObrigatorio:
 *                 $ref: '#/components/examples/UserNomeObrigatorio'
 *               emailObrigatorio:
 *                 $ref: '#/components/examples/UserEmailObrigatorio'
 *               senhaObrigatoria:
 *                 $ref: '#/components/examples/UserSenhaObrigatoria'
 *               senhaCurta:
 *                 $ref: '#/components/examples/UserSenhaCurta'
 *               emailInvalido:
 *                 $ref: '#/components/examples/UserEmailInvalido'
 *       401:
 *         description: Erro de autorização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidToken:
 *                 $ref: '#/components/examples/InvalidToken'
 *               tokenNotProvide:
 *                 $ref: '#/components/examples/TokenNotProvide'
 *               tokenMalFormated:
 *                 $ref: '#/components/examples/TokenMalFormated'
 *       404:
 *         description: Nenhum usuário encontrado
 *       409:
 *         description: Conflito ao editar usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               emailDuplicado:
 *                 $ref: '#/components/examples/UserEmailDuplicado'
 */
router.put("/users/:id", authMiddleware, UserView.update);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       400:
 *         description: Erros de ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               userIdObrigatorio:
 *                   $ref: '#/components/examples/UserIdObrigatorio'
 *               userIdValid:
 *                   $ref: '#/components/examples/UserIdValid'
 *          
 *       401:
 *         description: Erro de autorização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidToken:
 *                 $ref: '#/components/examples/InvalidToken'
 *               tokenNotProvide:
 *                 $ref: '#/components/examples/TokenNotProvide'
 *               tokenMalFormated:
 *                 $ref: '#/components/examples/TokenMalFormated'
 *       404:
 *         description: Nenhum usuário encontrado
 */
router.delete("/users/:id", authMiddleware, UserView.delete);

module.exports = router;