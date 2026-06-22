const sequelize = require('./database.js');
const { fn, col, Op } = require('sequelize');
const { DataTypes } = require('sequelize');
const CategoryModel = require('./category.js');

const db = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGA'),
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    createdAt: false,
    updatedAt: false
});

class ExpenseModel {
    constructor() { }
    
    async getAll(categoryId, dateIni, dateFim, vlMin, vlMax, status) {
        return db.findAll({
            where: {
                categoryId,
                date: { [Op.between]: [dateIni, dateFim]}
            }
        });
    }
    
    async getById(id) {
        return db.findOne({
            where: { id }
        });
    }
    
    async create(amount, date, description, status, categoryId, userId) {
        return db.create({ amount, date, description, status, categoryId, userId })
    }
    
    async update(amount, date, description, status, categoryId, userId, id) {
        const expense = await db.findByPk(id);
        
        if (!expense) {
            return null;
        }
        
        expense.amount = amount;
        expense.date = date;
        expense.description = description;
        expense.status = status;
        expense.categoryId = categoryId;
        expense.userId = userId;
        
        await expense.save();
        
        return expense;
    }
    
    async delete(id) {
        return db.destroy({
            where: { id }
        });
    }
    
    async getTotalExpenses(userId) {
        const total = await db.sum("amount", {
            where: {
                userId: userId
            }
        });
        
        return {
            total: Number(total || 0)
        };
    }
    
    async getQuantidadeExpenses(userId) {
        const quantidade = await db.count({
            where: {
                userId: userId
            }
        });
        
        return {
            quantidade
        };
    }
    
    async getTotalExpensesByCategory(userId) {
        const expensesByCategory = await db.findAll({
            attributes: [
                [fn("SUM", col("expenses.amount")), "total"]
            ],
            include: [
                {
                    model: CategoryModel.Category,
                    as: "categories",
                    attributes: ["name"]
                }
            ],
            where: {
                userId: userId
            },
            group: ["categories.id", "categories.name"],
            raw: true,
            nest: true
        });
        
        const formattedResult = expensesByCategory.map((item) => ({
            categoria: item.categories.name,
            total: Number(item.total || 0)
        }));
        
        return formattedResult;
    }
}

const expenseModel = new ExpenseModel();
expenseModel.Expense = db;

module.exports = expenseModel;
