// req, res
const CategoryController = require('../controllers/category');
const HttpError = require('./../errors/HttpError');

class CategoryView {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryController.getAll();

            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const category = await CategoryController.getById(Number(id));

            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { name, description } = req.body;

            const category = await CategoryController.create(name, description);

            res.status(201).json(category);
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { name, description } = req.body;
            const { id } = req.params;

            const category = await CategoryController.update(name, description, Number(id));

            res.status(200).json(category);
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await CategoryController.delete(Number(id));

            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CategoryView();