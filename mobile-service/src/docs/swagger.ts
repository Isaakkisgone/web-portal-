import swaggerJsDoc from 'swagger-jsdoc';
import { config } from '../config';

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mobile Service API',
      version: '1.0.0',
      description: 'Enterprise Mobile Device Management Microservice REST API.',
      contact: {
        name: 'Mobile Engineering Team',
        email: 'mobile-eng@enterprise.local'
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
        Device: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: '4a1e948c-7f5b-4ec2-a279-79f826ce5a78' },
            deviceId: { type: 'string', example: 'DEV-IPH-001' },
            name: { type: 'string', example: 'Executive iPhone' },
            model: { type: 'string', example: 'iPhone 16 Pro Max' },
            manufacturer: { type: 'string', example: 'Apple' },
            osVersion: { type: 'string', example: 'iOS 18.2' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'DECOMMISSIONED'], example: 'ACTIVE' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        CreateDeviceRequest: {
          type: 'object',
          required: ['deviceId', 'name', 'model', 'manufacturer', 'osVersion'],
          properties: {
            deviceId: { type: 'string', example: 'DEV-PIX-901' },
            name: { type: 'string', example: 'Lead Developer Pixel' },
            model: { type: 'string', example: 'Pixel 9 Pro XL' },
            manufacturer: { type: 'string', example: 'Google' },
            osVersion: { type: 'string', example: 'Android 15' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'DECOMMISSIONED'], default: 'ACTIVE', example: 'ACTIVE' }
          }
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'UP' },
            timestamp: { type: 'string', format: 'date-time' },
            service: { type: 'string', example: 'mobile-service' },
            environment: { type: 'string', example: 'development' },
            uptimeSeconds: { type: 'integer', example: 55 },
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
          description: 'Returns health status and system metrics of the Mobile Service.',
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
      '/devices': {
        post: {
          summary: 'Register a new device',
          description: 'Adds a mobile device to the registry.',
          tags: ['Devices'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateDeviceRequest' }
              }
            }
          },
          responses: {
            '201': {
              description: 'Device registered successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Device registered successfully' },
                      data: { $ref: '#/components/schemas/Device' }
                    }
                  }
                }
              }
            },
            '400': { description: 'Validation error' },
            '409': { description: 'Device with this deviceId already exists' }
          }
        },
        get: {
          summary: 'List all devices',
          description: 'Retrieves all registered devices with optional filtering by manufacturer or status.',
          tags: ['Devices'],
          parameters: [
            {
              name: 'manufacturer',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Filter by manufacturer (e.g., Apple, Samsung, Google)'
            },
            {
              name: 'status',
              in: 'query',
              required: false,
              schema: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'DECOMMISSIONED'] },
              description: 'Filter by device status'
            }
          ],
          responses: {
            '200': {
              description: 'List of devices',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      count: { type: 'integer', example: 3 },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Device' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/devices/{id}': {
        get: {
          summary: 'Get device by ID or deviceId',
          description: 'Retrieves a single device record by internal UUID or unique hardware deviceId.',
          tags: ['Devices'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Internal UUID or deviceId'
            }
          ],
          responses: {
            '200': {
              description: 'Device details',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/Device' }
                    }
                  }
                }
              }
            },
            '404': { description: 'Device not found' }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
