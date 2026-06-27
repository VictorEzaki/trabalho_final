// req, res
const ExpenseController = require('../controllers/expense');

class ExpenseView {
    async getAll(req, res) {
        try {
            const { categoryId, dateIni, dateFim, vlMin, vlMax, status } = req.query;

            const expenses = await ExpenseController.getAll(categoryId, dateIni, dateFim, vlMin, vlMax, status);

            res.status(200).json(expenses);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message,
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const expense = await ExpenseController.getById(Number(id));

            res.status(200).json(expense);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { amount, date, description, status, categoryId, userId } = req.body;

            const expense = await ExpenseController.create(amount, date, description, status, categoryId, userId);

            res.status(201).json(expense);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const { amount, date, description, status, categoryId, userId } = req.body;
            const { id } = req.params;

            const expense = await ExpenseController.update(amount, date, description, status, categoryId, userId, Number(id));

            res.status(200).json(expense);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await ExpenseController.delete(Number(id));

            res.status(204).send();
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message,
            });
        }
    }

    async getTotalExpenses(req, res) {
        try {
            const { userId } = req.params;

            const totalExpenses = await ExpenseController.getTotalExpenses(userId);

            res.status(200).json(totalExpenses);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message,
            });
        }
    }

    async getQuantidadeExpenses(req, res) {
        try {
            const { userId } = req.params;

            const quantidadeExpenses = await ExpenseController.getQuantidadeExpenses(userId);

            res.status(200).json(quantidadeExpenses);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message,
            });
        }
    }

    async getTotalExpensesByCategory(req, res) {
        try {
            const { userId } = req.params;

            const totalExpensesByCategory = await ExpenseController.getTotalExpensesByCategory(userId);

            res.status(200).json(totalExpensesByCategory);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message,
            });
        }
    }
}

module.exports = new ExpenseView();