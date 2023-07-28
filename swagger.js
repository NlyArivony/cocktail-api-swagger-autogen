const swaggerAutogen = require('swagger-autogen')();

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

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js'); // Start the Express server after generating the documentation
});
