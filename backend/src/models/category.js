const { DataTypes } = require('sequelize'); 
const sequelize = require('./database.js');

const db = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

class CategoryModel {
    constructor() {}
    
    async getAll() {
        return db.findAll();
    }
    
    async getById(id) {
        return db.findOne({
            where: { id }
        });
    }
    
    async create(name, description) {
        return db.create({name, description})
    }
    
    async update(name, description, id) {
        const category = await db.findByPk(id);
        
        if (!category) {
            return null;
        }
        
        category.name = name;
        category.description = description;
        
        await category.save();
        
        return category;
    }
    
    async delete(id) {
        return db.destroy({
            where: { id }
        });
    }
}

const categoryModel = new CategoryModel();
categoryModel.Category = db;

module.exports = categoryModel;
