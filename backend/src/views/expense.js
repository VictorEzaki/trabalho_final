// req, res
const ExpenseController = require('../controllers/expense');
const HttpError = require('./../errors/HttpError');

class ExpenseView {
    async getAll(req, res, next) {
        try {
            const { categoryId, dateIni, dateFim, vlMin, vlMax, status } = req.query;
            
            const expenses = await ExpenseController.getAll(categoryId, dateIni, dateFim, vlMin, vlMax, status);
            
            res.status(200).json(expenses);
        } catch (error) {
            next(error)
        }
    }
    
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            
            const expense = await ExpenseController.getById(Number(id));
            
            res.status(200).json(expense);
        } catch (error) {
            next(error)
        }
    }
    
    async create(req, res, next) {
        try {
            const { amount, date, description, status, categoryId, userId } = req.body;
            
            const expense = await ExpenseController.create(amount, date, description, status, categoryId, userId);
            
            res.status(201).json(expense);
        } catch (error) {
            next(error)
        }
    }
    
    async update(req, res, next) {
        try {
            const { amount, date, description, status, categoryId, userId } = req.body;
            const { id } = req.params;
            
            const expense = await ExpenseController.update(amount, date, description, status, categoryId, userId, Number(id));
            
            res.status(200).json(expense);
        } catch (error) {
            next(error)
        }
    }
    
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            await ExpenseController.delete(Number(id));
            
            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
    
    async getTotalExpenses(req, res, next) {
        try {
            const userId = req.user.id;
            
            const totalExpenses = await ExpenseController.getTotalExpenses(userId);
            
            res.status(200).json(totalExpenses);
        } catch (error) {
            next(error)
        }
    }
    
    async getQuantidadeExpenses(req, res, next) {
        try {
            const userId  = req.user.id;
            
            const quantidadeExpenses = await ExpenseController.getQuantidadeExpenses(userId);
            
            res.status(200).json(quantidadeExpenses);
        } catch (error) {
            next(error)
        }
    }
    
    async getTotalExpensesByCategory(req, res, next) {
        try {
            const userId = req.user.id;
            
            const totalExpensesByCategory = await ExpenseController.getTotalExpensesByCategory(userId);
            
            res.status(200).json(totalExpensesByCategory);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ExpenseView();