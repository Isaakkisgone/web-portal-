import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../services/account.service';

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  createAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const account = await this.accountService.createAccount(req.body);
      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: account
      });
    } catch (error) {
      next(error);
    }
  };

  getAccountById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const account = await this.accountService.getAccountById(id);
      res.status(200).json({
        success: true,
        data: account
      });
    } catch (error) {
      next(error);
    }
  };

  getAllAccounts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accounts = await this.accountService.getAllAccounts();
      res.status(200).json({
        success: true,
        count: accounts.length,
        data: accounts
      });
    } catch (error) {
      next(error);
    }
  };

  downloadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { imageUrl, accountId } = req.body;
      const result = await this.accountService.downloadAndStoreImage(imageUrl, accountId);
      res.status(200).json({
        success: true,
        message: 'Image downloaded and stored successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}
