const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();
const db = require('./database');

/**
 * @swagger
 * /api/cocktails:
 *   get:
 *     summary: Get all cocktails
 *     description: Retrieve a list of all cocktails.
 *     responses:
 *       200:
 *         description: A list of cocktails.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cocktail'
 *   post:
 *     summary: Create a new cocktail
 *     description: Add a new cocktail to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cocktail'
 *     responses:
 *       201:
 *         description: The created cocktail.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cocktail'
 */

// Route to get all cocktails
app.get('/api/cocktails', (req, res) => {
    const sql = 'SELECT * FROM cocktails';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error querying the database:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Route to add a new cocktail
app.post('/api/cocktails', express.json(), (req, res) => {
    const { name, ingredients } = req.body;
    if (!name || !ingredients) {
        return res.status(400).json({ error: 'Name and ingredients are required' });
    }

    const sql = 'INSERT INTO cocktails (name, ingredients) VALUES (?, ?)';
    db.run(sql, [name, ingredients.join(', ')], function (err) {
        if (err) {
            console.error('Error adding the cocktail to the database:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const newCocktail = {
            id: this.lastID,
            name: name,
            ingredients: ingredients,
        };
        res.status(201).json(newCocktail);
    });
});

/**
 * @swagger
 * /api/cocktails/{id}:
 *   get:
 *     summary: Get a cocktail by ID
 *     description: Retrieve a single cocktail based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the cocktail to retrieve.
 *     responses:
 *       200:
 *         description: The requested cocktail.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cocktail'
 */

// Route to get a single cocktail by ID
app.get('/api/cocktails/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM cocktails WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Error querying the database:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Cocktail not found' });
        }
        res.json(row);
    });
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
