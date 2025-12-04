import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Express from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ripcore External Module',
            version: '1.0.0',
            description: 'Documentación generada automáticamente', 
        },

        servers: [{ url: '/' }], 
    },
    apis: ['./src/routes/*.ts'],
};

export const setupSwagger = (app: Express) => {
    const specs = swaggerJSDoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
};