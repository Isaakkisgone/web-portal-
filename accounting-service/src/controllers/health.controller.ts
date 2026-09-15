import { Request, Response } from 'express';
import { config } from '../config';

export class HealthController {
  check = (_req: Request, res: Response): void => {
    const memory = process.memoryUsage();

    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'accounting-service',
      environment: config.nodeEnv,
      uptimeSeconds: Math.floor(process.uptime()),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsageMb: {
          rss: Math.round((memory.rss / 1024 / 1024) * 100) / 100,
          heapTotal: Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100,
          heapUsed: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100
        }
      }
    });
  };
}
