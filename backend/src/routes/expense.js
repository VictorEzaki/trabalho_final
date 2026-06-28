const express = require('express');

const router = express.Router();
const ExpenseView = require('../views/expense');

const authMiddleware = require('../middlewares/auth');

router.post("/expenses", authMiddleware, ExpenseView.create);
router.get("/expenses", authMiddleware, ExpenseView.getAll);
router.get("/expenses/:id", authMiddleware, ExpenseView.getById);
router.put("/expenses/:id", authMiddleware, ExpenseView.update);
router.delete("/expenses/:id", authMiddleware, ExpenseView.delete);

// Dashboard
router.get("/dashboard/total-expenses", authMiddleware, ExpenseView.getTotalExpenses);
router.get("/dashboard/expenses-count", authMiddleware, ExpenseView.getQuantidadeExpenses);
router.get("/dashboard/expenses-by-category", authMiddleware, ExpenseView.getTotalExpensesByCategory);

module.exports = router;
