// validações e regra de negócio
const CategoryModel = require('../models/category');
const ExpenseModel = require('../models/expense');

class ExpenseController {
    async getAll(categoryId, dateIni, dateFim, vlMin, vlMax, status) {
        let expenses = await ExpenseModel.getAll(categoryId, dateIni, dateFim, vlMin, vlMax, status);
        
        return expenses;
    }
    
    async getById(id) {
        if (!id) {
            const error = new Error('ID não informado.');
            error.status = 400;
            throw error;
        }
        
        if (id < 1) {
            const error = new Error('ID não pode ser menor que 1.');
            error.status = 400;
            throw error;
        }
        
        const expense = await ExpenseModel.getById(id); 
        if (!expense) {
            const error = new Error('Despesa não encontrada.');
            error.status = 404;
            throw error;
        }
        
        return expense;
    }
    
    async create(amount, date, description, status, categoryId, userId) {
        // validações da regra de negócio
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            const error = new Error('Valor da despesa não pode ser menor que zero.');
            error.status = 400;
            throw error;
        }
        
        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];
            
            if (dateDespesa > dateAtual) {
                const error = new Error('A data da despesa não pode ser maior que atual.');
                error.status = 400;
                throw error;
            }
        }
        
        // Validações extras para tratamento
        
        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            const error = new Error("Valor de despesa inválido.");
            error.status = 400;
            throw error;
        }
        
        if (!categoryId) {
            const error = new Error('Categoria é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        const categoryExists = await CategoryModel.getById(categoryId);
        if (!categoryExists) {
            const error = new Error('Categoria não encontrada.');
            error.status = 404;
            throw error;
        }
        
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            const error = new Error("Descrição de despesa ausente ou inválido.");
            error.status = 400;
            throw error;
        }
        
        const expenseCreated = await ExpenseModel.create(amount, date, description, status, categoryId, userId)
        
        if (!expenseCreated) {
            const error = new Error('Erro ao criar despesa.');
            error.status = 500;
            throw error;
        }
        
        return expenseCreated;
    }
    
    async update(amount, date, description, status, categoryId, userId, id) {
        // validações da regra de negócio
        // ID é obrigatório para edição
        if (!id) {
            const error = new Error('ID é obrigatório.')
            error.status = 400;
            throw error;
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            const error = new Error('ID não pode ser menor que 1.')
            error.status = 400;
            throw error;
        }
        
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            const error = new Error('Valor da despesa não pode ser menor que zero.')
            error.status = 400;
            throw error;
        }
        
        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];
            
            if (dateDespesa > dateAtual) {
                const error = new Error('A data da despesa não pode ser maior que atual.');
                error.status = 400;
                throw error;
            }
        }
        
        // validações extras para tratamento
        
        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            const error = new Error("Valor de despesa inválido.");
            error.status = 400;
            throw error;
        }
        
        if (!categoryId) {
            const error = new Error('Categoria é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        const categoryExists = await CategoryModel.getById(categoryId);
        if (!categoryExists) {
            const error = new Error('Categoria não encontrada.');
            error.status = 404;
            throw error;
        }
        
        // verifica se é uma data válida quando enviada
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (date !== undefined && !dateRegex.test(date)) {
            const error = new Error("Formato de data inválido. Use YYYY-MM-DD.");
            error.status = 400;
            throw error;
        }
        
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            const error = new Error("Descrição de despesa ausente ou inválido.");
            error.status = 400;
            throw error;
        }
        
        const expense = await ExpenseModel.getById(id);
        if (!expense) {
            const error = new Error('Despesa não encontrada.');
            error.status = 404;
            throw error;
        }
        
        const expenseUpdated = await ExpenseModel.update(amount, date, description, status, categoryId, userId, id);
        if (!expenseUpdated) {
            const error = new Error('Ocorreu um erro ao editar a despesa!');
            error.status = 500;
            throw error;
        }
        
        return expenseUpdated;
    }
    
    async delete(id) {
        // ID é obrigatório para edição
        if (!id) {
            const error = new Error('ID é obrigatório.');
            error.status = 400;
            throw error;
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            const error = new Error('ID não pode ser menor que 1.');
            error.status = 400;
            throw error;
        }
        
        const expense = await ExpenseModel.getById(Number(id));
        if (!expense) {
            const error = new Error('Despesa não encontrada.');
            error.status = 404;
            throw error;
        }
        
        return ExpenseModel.delete(Number(id));
    }
    
    async getTotalExpenses(userId) {
        const totalExpense = await ExpenseModel.getTotalExpenses(userId);
        
        return totalExpense;
    }
    
    async getQuantidadeExpenses(userId) {
        const quantidadeExpenses = await ExpenseModel.getQuantidadeExpenses(userId);
        
        return quantidadeExpenses;
    }
    
    async getTotalExpensesByCategory(userId) {
        const totalbyCategory = await ExpenseModel.getTotalExpensesByCategory(userId);
        
        return totalbyCategory;
    }
}

module.exports = new ExpenseController();