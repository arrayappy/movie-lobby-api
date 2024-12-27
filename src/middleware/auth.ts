import { Request, Response, NextFunction } from 'express';

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const role = req.headers['x-user-role'];
  
  if (role !== 'admin') {
    res.status(403).json({ error: 'Unauthorized: Admin role required' });
    return;
  }
  
  next();
};
