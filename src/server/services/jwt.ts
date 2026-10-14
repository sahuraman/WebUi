import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SESSION_SECRET ?? 'my-32-character-ultra-secure-and-ultra-long-secret'; // 32 characters for HS256
const JWT_ALGORITHM = 'HS256' as const;
const JWT_EXPIRY = '24h';

export interface JwtPayload {
  email: string;
  name: string;
}

export const signToken = (payload: JwtPayload): string => {
  console.log('signToken payload', { payload });
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_EXPIRY,
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
    }) as JwtPayload;
  } catch {
    return null;
  }
};
