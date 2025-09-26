import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { RatingService } from '../services/rating.service';
import { CreateRatingDto } from '../dtos/rating.dto';

export class RatingController {
    static async setRating(req: AuthRequest, res: Response) {
        try {
            const user = req.user;
            if (!user) return res.status(401).json({ error: 'Unauthorized' });

            const recipeId = Number(req.params.id);
            const body: CreateRatingDto = req.body;

            if (!Number.isInteger(recipeId) || recipeId <= 0) {
                return res.status(400).json({ error: 'Invalid recipe id' });
            }
            if (typeof body.value !== 'number') {
                return res.status(400).json({ error: 'Field "value" must be a number (1..5)' });
            }
            if (body.value < 1 || body.value > 5) {
                return res.status(400).json({ error: 'Rating must be between 1 and 5' });
            }

            const rating = await RatingService.upsertRating(user.id, recipeId, body.value);
            const avg = await RatingService.getAverage(recipeId);

            res.json({ rating, avg });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async average(req: Request, res: Response) {
        try {
            const recipeId = Number(req.params.id);
            const avg = await RatingService.getAverage(recipeId);
            res.json(avg);
        } catch (err: any) {
            res.status(500).json({ error: 'Internal server error', details: err.message });
        }
    }
}