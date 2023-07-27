const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: '시드 API 명세서',
            version: '1.0.0',
            description: '시티 가드닝 프론트 요청 API 명세서',
        },
        host: host,
        basePath: '/',
    },
    apis: ['./routes/*.js', './swagger/*'],
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
