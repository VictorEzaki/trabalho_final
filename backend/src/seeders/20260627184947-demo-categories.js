"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Alimentação",
        description: "Gastos com comida, restaurantes e supermercado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Transporte",
        description: "Uber, ônibus, combustível e deslocamentos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Moradia",
        description: "Aluguel, contas de casa e manutenção",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Saúde",
        description: "Consultas, remédios e exames",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lazer",
        description: "Cinema, viagens, jogos e entretenimento",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Educação",
        description: "Cursos, faculdade e materiais de estudo",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};