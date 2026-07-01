const express = require('express');

const router = express.Router();
const ExpenseView = require('../views/expense');

const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Criar despesa
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, date, status, categoryId, userId]
 *             properties:
 *               description:
 *                 type: string
 *                 example: Jantar
 *               amount:
 *                 type: double
 *                 example: 150.40
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-10
 *               status:
 *                 type: string
 *                 enum: [PAGA, PENDENTE]
 *                 example: PAGA
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ExpenseMenorQueZero:
 *                 $ref: '#/components/examples/ExpenseMenorQueZero'
 *               validDate:
 *                 $ref: '#/components/examples/validDate'
 *               validValue:
 *                 $ref: '#/components/examples/validValue'
 *               categoryRequired:
 *                 $ref: '#/components/examples/categoryRequired'
 *               descriptionValid:
 *                 $ref: '#/components/examples/descriptionValid'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro ao criar despesa
 */
router.post("/expenses", authMiddleware, ExpenseView.create);
/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Listar despesas
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/expenses", authMiddleware, ExpenseView.getAll);
/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Buscar despesa por ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
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
 *         description: Despesa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/expenses/:id", authMiddleware, ExpenseView.getById);
/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Editar despesa
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, date, status, categoryId, userId]
 *             properties:
 *               description:
 *                 type: string
 *                 example: Jantar
 *               amount:
 *                 type: double
 *                 example: 150.40
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-10
 *               status:
 *                 type: string
 *                 enum: [PAGA, PENDENTE]
 *                 example: PAGA
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
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
 *               ExpenseMenorQueZero:
 *                 $ref: '#/components/examples/ExpenseMenorQueZero'
 *               validDate:
 *                 $ref: '#/components/examples/validDate'
 *               validValue:
 *                 $ref: '#/components/examples/validValue'
 *               categoryRequired:
 *                 $ref: '#/components/examples/categoryRequired'
 *               descriptionValid:
 *                 $ref: '#/components/examples/descriptionValid'
 *               FormatDateInvalid:
 *                 $ref: '#/components/examples/FormatDateInvalid'
 *       404:
 *         description: Despesa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/expenses/:id", authMiddleware, ExpenseView.update);
/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Deletar despesa
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
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
 *         description: Despesa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/expenses/:id", authMiddleware, ExpenseView.delete);

// Dashboard
/**
 * @swagger
 * /dashboard/total-expenses:
 *   get:
 *     summary: Retorna o total de despesas
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: double
 *                   example: 140.5
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/dashboard/total-expenses", authMiddleware, ExpenseView.getTotalExpenses);
/**
 * @swagger
 * /dashboard/expenses-count:
 *   get:
 *     summary: Retorna o total de despesas
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidade:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/dashboard/expenses-count", authMiddleware, ExpenseView.getQuantidadeExpenses);
/**
 * @swagger
 * /dashboard/expenses-by-category:
 *   get:
 *     summary: Retorna o total de despesas
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoria:
 *                   type: string
 *                   example: Lazer
 *                 total:
 *                   type: double
 *                   example: 150.4
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/dashboard/expenses-by-category", authMiddleware, ExpenseView.getTotalExpensesByCategory);

module.exports = router;
