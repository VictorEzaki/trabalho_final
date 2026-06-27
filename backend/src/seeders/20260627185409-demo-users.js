"use strict";

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "João Silva",
        email: "joao@email.com",
        password: bcrypt.hashSync("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Maria Souza",
        email: "maria@email.com",
        password: bcrypt.hashSync("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: ["admin@email.com", "joao@email.com", "maria@email.com"]
    });
  }
};