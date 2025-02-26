import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
    definition: {
        openapi: '3.0.0', // Версия OpenAPI
        swagger: "6.2.8",
        info: {
            title: 'API Документация',
            version: '1.0.0',
            description: 'Пример API с использованием swagger-jsdoc',
        },
    },
    apis: ['./src/backend/api.js'], // Путь к файлам с описанием API
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
    ],
};

const swaggerSpec = swaggerJsDoc(options);
export {swaggerSpec,swaggerUi};

