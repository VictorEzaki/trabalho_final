// validações e regra de negócio
const CategoryModel = require('../models/category');
const ExpenseModel = require('../models/expense');
const HttpError = require('../errors/HttpError');

class ExpenseController {
    async getAll(categoryId, dateIni, dateFim, vlMin, vlMax, status) {
        let expenses = await ExpenseModel.getAll(categoryId, dateIni, dateFim, vlMin, vlMax, status);
        
        return expenses;
    }
    
    async getById(id) {
        if (!id) {
            throw new HttpError(400, 'ID não informado.');
        }
        
        if (id < 1) {
            throw new HttpError(400, 'ID não pode ser menor que 1.');
        }
        
        const expense = await ExpenseModel.getById(id); 
        if (!expense) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        
        return expense;
    }
    
    async create(amount, date, description, status, categoryId, userId) {
        // validações da regra de negócio
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            throw new HttpError(400, 'Valor da despesa não pode ser menor que zero.');
        }
        
        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];
            
            if (dateDespesa > dateAtual) {
                throw new HttpError(400, 'A data da despesa não pode ser maior que atual.');
            }
        }
        
        // Validações extras para tratamento
        
        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            throw new HttpError(400, "Valor de despesa inválido.");
        }
        
        if (!categoryId) {
            throw new HttpError(400, 'Categoria é um campo obrigatório.');
        }
        
        const categoryExists = await CategoryModel.getById(categoryId);
        if (!categoryExists) {
            throw new HttpError(404, 'Categoria não encontrada.');
        }
        
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            throw new HttpError(400, "Descrição de despesa ausente ou inválido.");
        }
        
        const expenseCreated = await ExpenseModel.create(amount, date, description, status, categoryId, userId)
        
        if (!expenseCreated) {
            throw new HttpError(500, 'Erro ao criar despesa.');
        }
        
        return expenseCreated;
    }
    
    async update(amount, date, description, status, categoryId, userId, id) {
        // validações da regra de negócio
        // ID é obrigatório para edição
        if (!id) {
            throw new HttpError(400, 'ID é obrigatório.')
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            throw new HttpError(400, 'ID não pode ser menor que 1.')
        }
        
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            throw new HttpError(400, 'Valor da despesa não pode ser menor que zero.')
        }
        
        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];
            
            if (dateDespesa > dateAtual) {
                throw new HttpError(400, 'A data da despesa não pode ser maior que atual.');
            }
        }
        
        // validações extras para tratamento
        
        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            throw new HttpError(400, "Valor de despesa inválido.");
        }
        
        if (!categoryId) {
            throw new HttpError(400, 'Categoria é um campo obrigatório.');
        }
        
        const categoryExists = await CategoryModel.getById(categoryId);
        if (!categoryExists) {
            throw new HttpError(404, 'Categoria não encontrada.');
        }
        
        // verifica se é uma data válida quando enviada
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (date !== undefined && !dateRegex.test(date)) {
            throw new HttpError(400, "Formato de data inválido. Use YYYY-MM-DD.");
        }
        
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            throw new HttpError(400, "Descrição de despesa ausente ou inválido.");
        }
        
        const expense = await ExpenseModel.getById(id);
        if (!expense) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        
        const expenseUpdated = await ExpenseModel.update(amount, date, description, status, categoryId, userId, id);
        if (!expenseUpdated) {
            throw new HttpError(500, 'Ocorreu um erro ao editar a despesa!');
        }
        
        return expenseUpdated;
    }
    
    async delete(id) {
        // ID é obrigatório para edição
        if (!id) {
            throw new HttpError(400, 'ID é obrigatório.');
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            throw new HttpError(400, 'ID não pode ser menor que 1.');
        }
        
        const expense = await ExpenseModel.getById(Number(id));
        if (!expense) {
            throw new HttpError(404, 'Despesa não encontrada.');
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