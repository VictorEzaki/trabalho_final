const UserController = require('../controllers/user');
const HttpError = require('./../errors/HttpError');

class UserView {
    constructor() {
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const auth = await UserController.login(email, password);
            return res.json(auth);
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await UserController.getAll();
            res.json(users);
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const { email, password, name } = req.body;

            const newUser = await UserController.create(email, password, name);
            res.status(201).json(newUser);
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const user = await UserController.getById(id);

            res.json(user);
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const { email, password, name } = req.body;

            const updatedUser = await UserController.update(id, email, password, name);

            res.json(updatedUser);
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await UserController.delete(id);

            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserView();
