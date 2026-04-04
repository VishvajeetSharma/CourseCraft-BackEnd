import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const generateAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (payload: object) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, JWT_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, JWT_REFRESH_SECRET);

// backward compat
export const generateToken = generateAccessToken;