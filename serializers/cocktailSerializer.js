// Serializer function to format cocktail data for API responses
exports.serializeCocktail = (cocktail) => {
    return {
        id: cocktail.id,
        name: cocktail.name,
        ingredients: cocktail.ingredients.split(', '),
        createdAt: cocktail.createdAt,
        updatedAt: cocktail.updatedAt,
    };
};
