const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance and provide the database configuration
const sequelize = new Sequelize({
    dialect: 'sqlite',      // Specify the database dialect (in this case, SQLite)
    storage: './cocktaildb.sqlite',  // The file path to the SQLite database file
});

// Define the Cocktail model and its schema
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

module.exports = {
    sequelize,
    Cocktail,
};
