const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// SWAGGER CONFIGARATION
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Micro Blog API",
            description: "Microblog API testing & documentation",
            termsOfService: "#",
        },
        contact: {
            name: "API Support",
            url: "#",
            email: "abidtkg@gmail.com"
        },
        version: "2.0.1",
        servers: [
            {
              "url": "http://locahost:3000",
              "description": "Development server"
            },
            {
              "url": "#",
              "description": "Production server"
            }
          ]
    },
    apis: ['routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;