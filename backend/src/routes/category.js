const express = require('express');

const router = express.Router();
const CategoryView = require('../views/category');

const authMiddleware = require('../middlewares/auth');
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Criar categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lazer
 *               description:
 *                 type: string
 *                 example: Categoria destinado às depesas de lazer
 *     responses:
 *       201:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               DescriptionCateoryInvalid:
 *                 $ref: '#/components/examples/DescriptionCateoryInvalid'
 *       500:
 *         description: Erro ao criar categoria
 */
router.post("/categories", authMiddleware, CategoryView.create);
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Listar categorias
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/categories", authMiddleware, CategoryView.getAll);
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Buscar categoria por ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro no envio dos dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               IdObrigatorio:
 *                 $ref: '#/components/examples/IdObrigatorio'
 *               IdValid:
 *                 $ref: '#/components/examples/IdValid'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/categories/:id", authMiddleware, CategoryView.getById);
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Editar categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lazer
 *               description:
 *                 type: string
 *                 example: Categoria destinado às depesas de lazer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro no envio dos dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               IdObrigatorio:
 *                 $ref: '#/components/examples/IdObrigatorio'
 *               IdValid:
 *                 $ref: '#/components/examples/IdValid'
 *               DescriptionCateoryInvalid:
 *                 $ref: '#/components/examples/DescriptionCateoryInvalid'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Ocorreu um erro ao editar a categoria
 */
router.put("/categories/:id", authMiddleware, CategoryView.update);
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Deletar categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro no envio dos dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               IdObrigatorio:
 *                 $ref: '#/components/examples/IdObrigatorio'
 *               IdValid:
 *                 $ref: '#/components/examples/IdValid'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor 
 */
router.delete("/categories/:id", authMiddleware, CategoryView.delete);

module.exports = router;
