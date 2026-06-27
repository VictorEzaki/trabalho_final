// validações e regra de negócio
const HttpError = require('../errors/HttpError');
const CategoryModel = require('../models/category');

class CategoryController {
    async getAll() {   
        return await CategoryModel.getAll();
    }
    
    async getById(id) {
        if (!id) {
            throw new HttpError(400, 'ID é obrigatório.');
        }
        
        if (id < 1) {
            throw new HttpError(400, 'ID não pode ser menor que 1.');
        }
        
        const category = await CategoryModel.getById(id); 
        if (!category) {
            throw new HttpError(404, 'Categoria não encontrada.');
        }
        
        return category;
    }
    
    async create(name, description) {
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            throw new HttpError(400, "Descrição de categoria ausente ou inválido.");
        }
        
        const categoryCreated = await CategoryModel.create(name, description)
        
        if (!categoryCreated) {
            throw new HttpError(500, 'Erro ao criar categoria.');
        }
        
        return categoryCreated;
    }
    
    async update(name, description, id) {
        // validações da regra de negócio
        // ID é obrigatório para edição
        if (!id) {
            throw new HttpError(400, 'ID é obrigatório.')
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            throw new HttpError(400, 'ID não pode ser menor que 1.')
        }
        
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            throw new HttpError(400, "Descrição de categoria ausente ou inválido.");
        }
        
        const category = await CategoryModel.getById(id);
        if (!category) {
            throw new HttpError(404, 'Categoria não encontrada.');
        }
        
        const categoryUpdated = await CategoryModel.update(name, description, id);
        if (!categoryUpdated) {
            throw new HttpError(500, 'Ocorreu um erro ao editar a categoria!');
        }
        
        return categoryUpdated;
    }
    
    async delete(id) {
        // ID é obrigatório para edição
        if (!id) {
            throw new Error('ID é obrigatório.')
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            throw new Error('ID não pode ser menor que 1.')
        }
        
        const category = await CategoryModel.getById(Number(id));
        if (!category) {
            throw new HttpError(404, 'Categoria não encontrada.');
        }
        
        return CategoryModel.delete(Number(id));
    }
}

module.exports = new CategoryController();