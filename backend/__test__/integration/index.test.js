const { describe, teste, expect, beforeAll } = require('@jest/globals');
const ControllerUser = require('./../../src/controllers/user');
const sequelize = require('./../../src/models/database');


describe('Teste de integração de usuários', () => {
    let transaction;

    beforeAll(async () => {
        transaction = await sequelize.transaction();
    })

    afterAll(async () => {
        transaction.rollback();
        await sequelize.close();
    });

    test("Criar um usuário", async () => {
        const name = "Victor";
        const email = "victor@teste.com";
        const password = "123123";

        const user = await ControllerUser.create(email, password, name, transaction);
        
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
    });

    test("Editar um usuário", async () => {
        const name = "Victor";
        const email = "victor@batata.com";
        const password = "123123";
        const id = 27;

        const user = await ControllerUser.update(id, email, password, name, transaction);
        
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
    });

    test("Buscar um usuário", async () => {
        const id = 27;
        const name = "Victor";
        const email = "victor@email.com";

        const user = await ControllerUser.getById(id);
        
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
    });

    test("Deletar um usuário", async () => {
        const id = 27;
        const user = await ControllerUser.delete(id, transaction);
        
        expect(user).toBe(1);
    });
});