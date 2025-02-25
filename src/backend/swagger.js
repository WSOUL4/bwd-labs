import swaggerJsDoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '10.9.0', // Версия OpenAPI
        info: {
            title: 'API Документация',
            version: '1.0.0',
            description: 'Пример API с использованием swagger-jsdoc',
        },
    },
    apis: ['./api.js'], // Путь к файлам с описанием API
};

const swaggerSpec = swaggerJsDoc(options);
export {swaggerSpec};

