import { prisma } from '../config/db';
import { CreateRecipeDto, SearchRecipeDto, UpdateRecipeDto } from '../dtos/recipe.dto';

export class RecipeService {
    static async createRecipe(userId: number, dto: CreateRecipeDto) {
        return prisma.recipe.create({
            data: {
                ...dto,
                authorId: userId,
            },
        });
    }

    static async getAll() {
        return prisma.recipe.findMany({
            include: { author: true },
        });
    }

    static async getById(id: number) {
        return prisma.recipe.findUnique({ where: { id } });
    }

    static async update(id: number, userId: number, dto: UpdateRecipeDto) {
        return prisma.recipe.updateMany({
            where: { id, authorId: userId },
            data: dto,
        });
    }

    static async delete(id: number, userId: number) {
        return prisma.recipe.deleteMany({
            where: { id, authorId: userId },
        });
    }

    static async getByUser(userId: number) {
        return prisma.recipe.findMany({
            where: { authorId: userId },
        });
    }

    static async searchByName(dto: SearchRecipeDto) {
        return prisma.recipe.findMany({
            where: {
                title: {
                    contains: dto.name, 
                    mode: 'insensitive', 
                },
            },
        });
    }

    async delete(id: number, userId: number) {
        return prisma.recipe.deleteMany({
            where: { id, authorId: userId },
        });
    }
}
