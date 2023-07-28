const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cocktail = sequelize.define('Cocktail', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt columns
});

module.exports = Cocktail;
