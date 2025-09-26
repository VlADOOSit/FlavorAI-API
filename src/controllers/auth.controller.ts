import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { TokenPayload } from '../services/token.service';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const dto: RegisterDto = req.body;

            const existingUser = await AuthService.findUserByEmail(dto.email);
            if (existingUser) return res.status(400).json({ error: 'User already exists' });

            const user = await AuthService.createUser(dto);
        
            const payload: TokenPayload = { id: user.id, username: user.username, email: user.email };
            if (!payload) return res.status(500).json({error: "Invalid jwt"});
            
            const tokens = TokenService.generateTokens(payload);

            res.status(201).json({ user: payload, ...tokens });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
        
    }

    static async login(req: Request, res: Response) {
        try {
            const dto: LoginDto = req.body;

            const user = await AuthService.findUserByEmail(dto.email);
            if (!user) return res.status(404).json({ error: 'User not found' });

            const isValid = await AuthService.comparePassword(dto.password, user.password);
            if (!isValid) return res.status(401).json({ error: 'Invalid password' });

            const payload: TokenPayload = { id: user.id, username: user.username, email: user.email };
            if (!payload) return res.status(500).json({error: "Invalid jwt"});

            const tokens = TokenService.generateTokens(payload);

            res.status(201).json({ user: payload, ...tokens });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}