const { Sequelize } = require('sequelize');

// Create a new Sequelize instance and provide the database configuration
const sequelize = new Sequelize({
    dialect: 'sqlite',      // Specify the database dialect (in this case, SQLite)
    storage: './cocktaildb.sqlite',  // The file path to the SQLite database file
});

module.exports = sequelize;