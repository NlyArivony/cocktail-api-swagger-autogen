const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const cocktailController = require('./controllers/cocktailController');

// Swagger configuration (keep this part unchanged)
const swaggerDocument = require('./swagger_output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse JSON data
app.use(express.json());

// Route to get all cocktails
app.get('/api/cocktails', cocktailController.getAllCocktails);

// Route to add a new cocktail
app.post('/api/cocktails', express.json(), cocktailController.addCocktail);

// Route to get a single cocktail by ID
app.get('/api/cocktails/:id', cocktailController.getCocktailById);

// Route to delete a cocktail by ID
app.delete('/api/cocktails/:id', cocktailController.deleteCocktailById);

// Route to update a cocktail by ID
app.put('/api/cocktails/:id', cocktailController.updateCocktailById);

// Start the server (keep this part unchanged)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
