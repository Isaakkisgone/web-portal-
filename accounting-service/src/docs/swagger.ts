import swaggerJsDoc from 'swagger-jsdoc';
import { config } from '../config';

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Accounting Service API',
      version: '1.0.0',
      description: 'Enterprise Accounting Microservice REST API with image downloading capabilities.',
      contact: {
        name: 'API Support',
        email: 'support@enterprise.local'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: `${config.nodeEnv.toUpperCase()} server`
      }
    ],
    components: {
      schemas: {
        Account: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' },
            accountNumber: { type: 'string', example: 'ACC-10001' },
            accountName: { type: 'string', example: 'Acme Corp Operating Account' },
            accountType: { type: 'string', enum: ['SAVINGS', 'CHECKING', 'INVESTMENT', 'BUSINESS'], example: 'BUSINESS' },
            balance: { type: 'number', format: 'double', example: 154500.5 },
            currency: { type: 'string', example: 'USD' },
            status: { type: 'string', enum: ['ACTIVE', 'SUSPENDED', 'CLOSED'], example: 'ACTIVE' },
            email: { type: 'string', format: 'email', example: 'finance@acmecorp.com' },
            avatarUrl: { type: 'string', format: 'uri', example: 'https://picsum.photos/id/10/200/200' },
            avatarLocalPath: { type: 'string', example: 'c:/Users/.../storage/images/img_123.jpg' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        CreateAccountRequest: {
          type: 'object',
          required: ['accountName', 'accountType', 'email'],
          properties: {
            accountName: { type: 'string', example: 'Tech Global Treasury' },
            accountType: { type: 'string', enum: ['SAVINGS', 'CHECKING', 'INVESTMENT', 'BUSINESS'], example: 'BUSINESS' },
            initialBalance: { type: 'number', example: 25000 },
            currency: { type: 'string', default: 'USD', example: 'USD' },
            email: { type: 'string', format: 'email', example: 'treasury@techglobal.com' },
            avatarUrl: { type: 'string', format: 'uri', example: 'https://picsum.photos/200/200' },
            downloadAvatar: { type: 'boolean', default: false, example: true }
          }
        },
        DownloadImageRequest: {
          type: 'object',
          required: ['imageUrl'],
          properties: {
            imageUrl: { type: 'string', format: 'uri', example: 'https://picsum.photos/400/300' },
            accountId: { type: 'string', format: 'uuid', example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' }
          }
        },
        DownloadedImageResponse: {
          type: 'object',
          properties: {
            originalUrl: { type: 'string', example: 'https://picsum.photos/400/300' },
            localPath: { type: 'string', example: '/storage/images/img_abc.jpg' },
            fileName: { type: 'string', example: 'img_abc.jpg' },
            fileSizeBytes: { type: 'integer', example: 24530 },
            contentType: { type: 'string', example: 'image/jpeg' },
            downloadedAt: { type: 'string', format: 'date-time' }
          }
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'UP' },
            timestamp: { type: 'string', format: 'date-time' },
            service: { type: 'string', example: 'accounting-service' },
            environment: { type: 'string', example: 'development' },
            uptimeSeconds: { type: 'integer', example: 42 },
            system: {
              type: 'object',
              properties: {
                nodeVersion: { type: 'string', example: 'v24.15.0' },
                platform: { type: 'string', example: 'win32' },
                memoryUsageMb: {
                  type: 'object',
                  properties: {
                    rss: { type: 'number' },
                    heapTotal: { type: 'number' },
                    heapUsed: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    },
    paths: {
      '/health': {
        get: {
          summary: 'Health Check',
          description: 'Returns the health status and system metrics of the Accounting Service.',
          tags: ['System'],
          responses: {
            '200': {
              description: 'Service is healthy',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/HealthResponse' }
                }
              }
            }
          }
        }
      },
      '/accounts/create': {
        post: {
          summary: 'Create a new account',
          description: 'Creates an account with an initial balance and optional avatar download.',
          tags: ['Accounts'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateAccountRequest' }
              }
            }
          },
          responses: {
            '201': {
              description: 'Account created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Account created successfully' },
                      data: { $ref: '#/components/schemas/Account' }
                    }
                  }
                }
              }
            },
            '400': { description: 'Validation failed' }
          }
        }
      },
      '/accounts': {
        get: {
          summary: 'List all accounts',
          description: 'Retrieves all active accounts.',
          tags: ['Accounts'],
          responses: {
            '200': {
              description: 'List of accounts',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      count: { type: 'integer', example: 2 },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Account' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/accounts/{id}': {
        get: {
          summary: 'Get account by ID',
          description: 'Retrieves a single account record by its UUID identifier.',
          tags: ['Accounts'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
              description: 'Account UUID'
            }
          ],
          responses: {
            '200': {
              description: 'Account details',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/Account' }
                    }
                  }
                }
              }
            },
            '404': { description: 'Account not found' }
          }
        }
      },
      '/accounts/download-image': {
        post: {
          summary: 'Download and store image locally',
          description: 'Downloads an image from a URL, stores it locally on the server filesystem, and optionally associates it with an account.',
          tags: ['Media & Image'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/DownloadImageRequest' }
              }
            }
          },
          responses: {
            '200': {
              description: 'Image downloaded and stored successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string' },
                      data: { $ref: '#/components/schemas/DownloadedImageResponse' }
                    }
                  }
                }
              }
            },
            '400': { description: 'Invalid image URL or download failed' }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
