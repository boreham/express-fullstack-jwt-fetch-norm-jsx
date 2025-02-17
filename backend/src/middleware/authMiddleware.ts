import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface JwtPayload {
  userId: number;
  email: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Нет доступа: отсутствует токен' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};

export default authMiddleware;
