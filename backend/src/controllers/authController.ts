import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { isValidEmail, isValidPassword } from '../utils/validation';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email и пароль обязательны для регистрации' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ message: 'Неверный формат email' });
      return;
    }

    if (!isValidPassword(password)) {
      res.status(400).json({ message: 'Пароль должен содержать минимум 6 символов' });
      return;
    }

    const user = await authService.registerUser({ email, username, password });
    res.status(201).json({ message: 'Пользователь зарегистрирован', user });
  } catch (error: any) {
    console.error('Ошибка регистрации:', error);
    res.status(400).json({ message: error.message || 'Ошибка регистрации' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email и пароль обязательны для входа' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ message: 'Неверный формат email' });
      return;
    }

    const token = await authService.loginUser({ email, password });
    if (!token) {
      res.status(401).json({ message: 'Неверные учётные данные' });
      return;
    }
    res.status(200).json({ token });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка входа' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // В JWT logout обычно реализуется на стороне клиента (удалением токена)
  res.status(200).json({ message: 'Вы успешно вышли из системы' });
};
