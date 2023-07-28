const Cocktail = require('../models/cocktailModel');
const { serializeCocktail } = require('../serializers/cocktailSerializer');

// Controller to get all cocktails
exports.getAllCocktails = async (req, res) => {
    try {
        const cocktails = await Cocktail.findAll();
        const serializedCocktails = cocktails.map(serializeCocktail);
        res.json(serializedCocktails);
    } catch (error) {
        console.error('Error querying the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to add a new cocktail
exports.addCocktail = async (req, res) => {
    const { name, ingredients } = req.body;
    if (!name || !ingredients) {
        return res.status(400).json({ error: 'Name and ingredients are required' });
    }

    try {
        const newCocktail = await Cocktail.create({
            name: name,
            ingredients: ingredients.join(', '),
        });

        const serializedCocktail = serializeCocktail(newCocktail);
        res.status(201).json(serializedCocktail);
    } catch (error) {
        console.error('Error adding the cocktail to the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to get a single cocktail by ID
exports.getCocktailById = async (req, res) => {
    const { id } = req.params;

    try {
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) {
            return res.status(404).json({ error: 'Cocktail not found' });
        }
        const serializedCocktail = serializeCocktail(cocktail);
        res.json(serializedCocktail);
    } catch (error) {
        console.error('Error querying the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to delete a cocktail by ID
exports.deleteCocktailById = async (req, res) => {
    const { id } = req.params;

    try {
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) {
            return res.status(404).json({ error: 'Cocktail not found' });
        }
        await cocktail.destroy();
        res.json({ message: 'Cocktail deleted successfully' });
    } catch (error) {
        console.error('Error deleting the cocktail from the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to update a cocktail by ID
exports.updateCocktailById = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients } = req.body;
    if (!name || !ingredients) {
        return res.status(400).json({ error: 'Name and ingredients are required' });
    }

    try {
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) {
            return res.status(404).json({ error: 'Cocktail not found' });
        }

        await cocktail.update({
            name: name,
            ingredients: ingredients.join(', '),
        });

        const updatedCocktail = await Cocktail.findByPk(id);
        const serializedCocktail = serializeCocktail(updatedCocktail);
        res.json(serializedCocktail);
    } catch (error) {
        console.error('Error updating the cocktail in the database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};