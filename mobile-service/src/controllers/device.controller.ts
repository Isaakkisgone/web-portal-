import { Request, Response, NextFunction } from 'express';
import { DeviceService } from '../services/device.service';

export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  createDevice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const device = await this.deviceService.createDevice(req.body);
      res.status(201).json({
        success: true,
        message: 'Device registered successfully',
        data: device
      });
    } catch (error) {
      next(error);
    }
  };

  getAllDevices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { manufacturer, status } = req.query;
      const devices = await this.deviceService.getAllDevices({
        manufacturer: manufacturer as string | undefined,
        status: status as string | undefined
      });
      res.status(200).json({
        success: true,
        count: devices.length,
        data: devices
      });
    } catch (error) {
      next(error);
    }
  };

  getDeviceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const device = await this.deviceService.getDeviceById(id);
      res.status(200).json({
        success: true,
        data: device
      });
    } catch (error) {
      next(error);
    }
  };
}
