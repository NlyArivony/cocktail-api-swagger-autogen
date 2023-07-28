const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();

// Mock data for cocktails (you can replace this with a database)
const cocktails = [
    { id: 1, name: 'Mojito', ingredients: ['White rum', 'Lime juice', 'Mint leaves', 'Sugar', 'Soda water'] },
    { id: 2, name: 'Martini', ingredients: ['Gin', 'Dry vermouth', 'Olive'] },
    { id: 3, name: 'Daiquiri', ingredients: ['White rum', 'Lime juice', 'Simple syrup'] },
];

// Route to get all cocktails
app.get('/api/cocktails', (req, res) => {
    res.json(cocktails);
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
