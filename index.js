const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen');
const { sequelize, Cocktail } = require('./models');

// Set up Sequelize and sync the database
(async () => {
    try {
        await sequelize.sync(); // This will create the "Cocktail" table if it doesn't exist
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
})();

// Route to get all cocktails
app.get('/api/cocktails', async (req, res) => {
    try {
        const cocktails = await Cocktail.findAll();
        res.json(cocktails);
    } catch (error) {
        console.error('Error querying the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to add a new cocktail
app.post('/api/cocktails', express.json(), async (req, res) => {
    const { name, ingredients } = req.body;
    if (!name || !ingredients) {
        return res.status(400).json({ error: 'Name and ingredients are required' });
    }

    try {
        const newCocktail = await Cocktail.create({
            name: name,
            ingredients: ingredients.join(', '),
        });
        res.status(201).json(newCocktail);
    } catch (error) {
        console.error('Error adding the cocktail to the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get a single cocktail by ID
app.get('/api/cocktails/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) {
            return res.status(404).json({ error: 'Cocktail not found' });
        }
        res.json(cocktail);
    } catch (error) {
        console.error('Error querying the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Swagger configuration
const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

const doc = {
    info: {
        title: 'Cocktail API',
        description: 'API for managing cocktails',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
};

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully!');
});

// Serve Swagger UI
const swaggerDocument = require('./swagger_output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
