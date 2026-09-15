import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { InMemoryDeviceRepository } from './repositories/in-memory-device.repository';
import { DeviceService } from './services/device.service';
import { DeviceController } from './controllers/device.controller';
import { HealthController } from './controllers/health.controller';
import { requestLogger } from './middlewares/request-logger.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import { validateBody } from './middlewares/validate.middleware';
import { CreateDeviceSchema } from './models/device.model';
import { swaggerSpec } from './docs/swagger';

export function createApp(deviceRepo?: InMemoryDeviceRepository): Express {
  const app = express();

  // Core middlewares
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // Dependency Injection
  const repository = deviceRepo || new InMemoryDeviceRepository();
  const deviceService = new DeviceService(repository);

  const deviceController = new DeviceController(deviceService);
  const healthController = new HealthController();

  // Health endpoint
  app.get('/health', healthController.check);

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Device REST APIs
  app.post('/devices', validateBody(CreateDeviceSchema), deviceController.createDevice);
  app.get('/devices', deviceController.getAllDevices);
  app.get('/devices/:id', deviceController.getDeviceById);

  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'ROUTE_NOT_FOUND',
        message: `Cannot ${req.method} ${req.originalUrl}`,
        timestamp: new Date().toISOString()
      }
    });
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}
