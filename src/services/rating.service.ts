import { prisma } from '../config/db';

export class RatingService {
    static async upsertRating(userId: number, recipeId: number, value: number) {
        if (value < 1 || value > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        
        const recipe = await prisma.recipe.findUnique({ where: { id: recipeId }});
        if (!recipe) throw new Error('Recipe not found');

        
        const rating = await prisma.rating.upsert({
            where: { recipeId_userId: { recipeId, userId } },
            update: { value },
            create: { value, recipeId, userId },
        });

        return rating;
    }

    static async getAverage(recipeId: number) {
        const agg = await prisma.rating.aggregate({
            where: { recipeId },
            _avg: { value: true },
            _count: { _all: true },
        });

        return {
            avgRating: agg._avg.value ?? 0,
            count: agg._count._all ?? 0,
        };
    }
}