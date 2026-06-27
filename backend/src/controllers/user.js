const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const HttpError = require('../errors/HttpError');

class UserController {
    constructor() {
    }
    
    mapUser(user) {
        const userData = user.dataValues || user;
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email
        };
    }
    
    async getAll() {
        const users = (await UserModel.getAllUsers()).map(u => this.mapUser(u));
        
        if (!users) {
            throw new HttpError(500, 'Ocorreu um erro ao buscar usuários.');
        }
        
        return users;
    }
    
    async create(email, password, name) {
        if (!email) {
            throw new HttpError(400, 'Email é um campo obrigatório.');
        }
        
        if (!password) {
            throw new HttpError(400, 'Senha é um campo obrigatório.');
        }
        
        if (!name) {
            throw new HttpError(400, 'Nome é um campo obrigatório.');
        }
        
        if (password.length < 6) {
            throw new HttpError(400, 'A senha deve conter pelo menos 6 caracteres');
        }
        
        if (email.length < 5 || !email.includes('@')) {
            throw new HttpError(400, 'O email deve conter pelo menos 5 caracteres e incluir um "@"');
        }
        
        const userExists = await UserModel.getUserByEmail(email);
        if (userExists) {
            throw new HttpError(409, 'Já existe um usuário cadastrado com este email.');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = await UserModel.createUser(email, hashPassword, name);
        
        const userJson = user.toJSON();
        
        return this.mapUser(user);
    }
    
    async login(email, password) {
        if (!email || !password) {
            throw new HttpError(400, 'Email e senha são obrigatórios.');
        }
        
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            throw new HttpError(400, 'Credenciais inválidas.');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new HttpError(400, 'Credenciais inválidas.');
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            authConfig.jwt.secret,
            { expiresIn: authConfig.jwt.expiresIn }
        );
        
        return {
            token,
            user: this.mapUser(user)
        };
    }
    
    async getById(id) {
        const user = await UserModel.getUserById(id);

        if (!user) {
            throw new HttpError(404, 'Nenhum usuário encontrado.');
        }
        
        return this.mapUser(user);
    }
    
    async update(id, email, password, name) {
        if (!email) {
            throw new HttpError(400, 'Email é um campo obrigatório.');
        }
        
        if (!password) {
            throw new HttpError(400, 'Senha é um campo obrigatório.');
        }
        
        if (!name) {
            throw new HttpError(400, 'Nome é um campo obrigatório.');
        }
        
        if (password.length < 6) {
            throw new HttpError(400, 'A senha deve conter pelo menos 6 caracteres');
        }
        
        if (email.length < 5 || !email.includes('@')) {
            throw new HttpError(400, 'O email deve conter pelo menos 5 caracteres e incluir um "@"');
        }
        
        const userExists = await UserModel.getUserById(Number(id));
        if (!userExists) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
        
        const emailExists = await UserModel.getUserByEmail(email);
        if (emailExists && emailExists.id !== Number(id)) {
            throw new HttpError(409, 'Já existe um usuário cadastrado com este email.');
        }
        
        const user = await UserModel.updateUser(id, email, password, name);
        const userJson = user.toJSON();
        
        return {
            ...userJson,
            password: this.replacePassword(userJson.password)
        };
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
        
        const user = await UserModel.getUserById(Number(id));
        if (!user) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
        
        return await UserModel.deleteUser(id);
    }
}

module.exports = new UserController();
