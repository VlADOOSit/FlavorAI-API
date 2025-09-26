import { Request, Response, NextFunction } from 'express';

export function requireFields(fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const field of fields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `Field "${field}" is required` });
            }
        }
        next();
    };
}