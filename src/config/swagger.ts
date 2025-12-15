import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IKEA Inventory API 🇸🇪",
      version: "1.0.0",
      description: "API para manejar el stock de productos (Senior Assessment)",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    // Aquí definimos tus rutas manualmente para que aparezcan YA
    paths: {
      "/products": {
        get: {
          summary: "Obtener todos los productos",
          tags: ["Products"],
          responses: {
            200: { description: "Lista de productos" },
          },
        },
        post: {
          summary: "Crear un nuevo producto",
          tags: ["Products"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Mesa Lack" },
                    sku: { type: "string", example: "LACK-001" },
                    stock: { type: "integer", example: 10 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Producto creado exitosamente" },
          },
        },
      },
      "/products/{id}/increment": {
        post: {
          summary: "Aumentar Stock",
          tags: ["Stock Operations"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID del producto",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    amount: { type: "integer", example: 5 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Stock actualizado" },
          },
        },
      },
      "/products/{id}/decrement": {
        post: {
          summary: "Disminuir Stock (Valida negativos)",
          tags: ["Stock Operations"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    amount: { type: "integer", example: 10 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Stock actualizado" },
            400: { description: "Error: Stock insuficiente" },
          },
        },
      },
    },
  },
  apis: [], // Normalmente aquí van los archivos, pero los definimos arriba para ir rápido
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);