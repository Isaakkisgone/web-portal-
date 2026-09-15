import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { InMemoryAccountRepository } from './repositories/in-memory-account.repository';
import { ImageDownloaderService } from './services/image-downloader.service';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { HealthController } from './controllers/health.controller';
import { requestLogger } from './middlewares/request-logger.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import { validateBody } from './middlewares/validate.middleware';
import { CreateAccountSchema, DownloadImageSchema } from './models/account.model';
import { swaggerSpec } from './docs/swagger';

export function createApp(accountRepo?: InMemoryAccountRepository): Express {
  const app = express();

  // Core middlewares
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // Dependency Injection
  const repository = accountRepo || new InMemoryAccountRepository();
  const imageDownloaderService = new ImageDownloaderService();
  const accountService = new AccountService(repository, imageDownloaderService);

  const accountController = new AccountController(accountService);
  const healthController = new HealthController();

  // Health endpoint
  app.get('/health', healthController.check);

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Account REST APIs
  app.post('/accounts/create', validateBody(CreateAccountSchema), accountController.createAccount);
  app.get('/accounts', accountController.getAllAccounts);
  app.get('/accounts/:id', accountController.getAccountById);
  app.post('/accounts/download-image', validateBody(DownloadImageSchema), accountController.downloadImage);

  // 404 Handler for undefined routes
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
