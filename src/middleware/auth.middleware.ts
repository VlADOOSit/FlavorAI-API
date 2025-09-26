import { Request, Response, NextFunction } from 'express';
import { TokenService, TokenPayload } from '../services/token.service';

export interface AuthRequest extends Request {
    user?: TokenPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid authorization header' });

    const payload = TokenService.validateAccessToken(token) as TokenPayload;
    if (!payload) return res.status(401).json({ error: 'Invalid or expired token' });

    req.user = payload;
    next();
}
