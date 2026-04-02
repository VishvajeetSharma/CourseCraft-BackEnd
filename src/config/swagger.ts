const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Learning Platform API",
    version: "1.0.0",
    description: "API documentation for learning platform",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          email: { type: "string" },
          password: { type: "string" },
          name: { type: "string" },
        },
        required: ["email", "password", "name"],
      },
      MasterPlan: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          desc: { type: "string" },
          credit: { type: "integer" },
          price: { type: "integer" },
          offer: { type: "integer" },
          duration: { type: "integer" },
          is_rec: { type: "integer" },
          status: { type: "integer" },
        },
        required: ["name", "desc", "price", "duration"],
      },
      MasterCourse: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          desc: { type: "string" },
          level: { type: "string" },
          rating: { type: "number" },
          duration: { type: "string" },
          type: { type: "string" },
          status: { type: "integer" },
        },
        required: ["title", "desc", "level", "duration"],
      },
    },
  },
  paths: {
    "/user/register": {
      post: {
        summary: "User registration",
        tags: ["User Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          200: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    code: { type: "integer" },
                    message: { type: "string" },
                    result: { type: "object" },
                    error: { type: "boolean" },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation failed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    code: { type: "integer" },
                    message: { type: "string" },
                    errors: { type: "object" },
                    error: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/user/login": {
      post: {
        summary: "User login",
        tags: ["User Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/admin/register": {
      post: {
        summary: "Admin registration",
        tags: ["Admin Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          200: {
            description: "Admin registered successfully",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/admin/login": {
      post: {
        summary: "Admin login",
        tags: ["Admin Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Admin logged in successfully",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/admin/create-master-plan": {
      post: {
        summary: "Create master plan",
        tags: ["Master Plan"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MasterPlan" },
            },
          },
        },
        responses: {
          200: {
            description: "Master plan created successfully",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/admin/get-master-plan": {
      get: {
        summary: "Get all master plans",
        tags: ["Master Plan"],
        responses: {
          200: {
            description: "Master plans fetched successfully",
          },
        },
      },
    },
    "/admin/get-master-plan/{id}": {
      get: {
        summary: "Get master plan by ID",
        tags: ["Master Plan"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Master plan fetched successfully",
          },
          404: {
            description: "Master plan not found",
          },
        },
      },
    },
    "/admin/update-master-plan/{id}": {
      put: {
        summary: "Update master plan",
        tags: ["Master Plan"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MasterPlan" },
            },
          },
        },
        responses: {
          200: {
            description: "Master plan updated successfully",
          },
          404: {
            description: "Master plan not found",
          },
        },
      },
    },
    "/admin/delete-master-plan/{id}": {
      delete: {
        summary: "Delete master plan",
        tags: ["Master Plan"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Master plan deleted successfully",
          },
          404: {
            description: "Master plan not found",
          },
        },
      },
    },
    "/admin/create-master-course": {
      post: {
        summary: "Create master course",
        tags: ["Master Course"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MasterCourse" },
            },
          },
        },
        responses: {
          200: {
            description: "Master course created successfully",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/admin/get-master-course": {
      get: {
        summary: "Get all master courses",
        tags: ["Master Course"],
        responses: {
          200: {
            description: "Master courses fetched successfully",
          },
        },
      },
    },
    "/admin/get-master-course/{id}": {
      get: {
        summary: "Get master course by ID",
        tags: ["Master Course"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Master course fetched successfully",
          },
          404: {
            description: "Master course not found",
          },
        },
      },
    },
    "/admin/update-master-course/{id}": {
      put: {
        summary: "Update master course",
        tags: ["Master Course"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MasterCourse" },
            },
          },
        },
        responses: {
          200: {
            description: "Master course updated successfully",
          },
          404: {
            description: "Master course not found",
          },
        },
      },
    },
    "/admin/delete-master-course/{id}": {
      delete: {
        summary: "Delete master course",
        tags: ["Master Course"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Master course deleted successfully",
          },
          404: {
            description: "Master course not found",
          },
        },
      },
    },
  },
};

export default swaggerOptions;
