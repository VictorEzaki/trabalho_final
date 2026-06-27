"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("expenses", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            amount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM("PENDENTE", "PAGA"),
                allowNull: false
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "categories",
                    key: "id"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("expenses");
    }
};