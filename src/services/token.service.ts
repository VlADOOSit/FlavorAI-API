// src/services/token.service.ts
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || '15m';
const REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';

export interface TokenPayload {
    id: number;
    username: string;
    email: string;
}

export class TokenService {
    static generateTokens(payload: TokenPayload) {
        const accessToken = jwt.sign(
            payload,
            JWT_ACCESS_SECRET as jwt.Secret,
            { expiresIn: ACCESS_EXPIRE } as SignOptions
        );

        const refreshToken = jwt.sign(
            payload,
            JWT_REFRESH_SECRET as jwt.Secret,
            { expiresIn: REFRESH_EXPIRE } as SignOptions
        );
        return { accessToken, refreshToken };
    }

    static validateAccessToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;
        } catch {
            return null;
        }
    }

    static validateRefreshToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
        } catch {
            return null;
        }
    }
}
