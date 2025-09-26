import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeDto, SearchRecipeDto } from '../dtos/recipe.dto';

export class RecipeController {
    static async addRecipe(req: AuthRequest, res: Response) {
        try {
            if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
            
            const dto: CreateRecipeDto = req.body;

            const recipe = await RecipeService.createRecipe(req.user.id, dto);
            res.status(201).json(recipe);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
        
    }

    static async getAll(req: Request, res: Response) {
        try {
            const recipes = await RecipeService.getAll();
            res.json(recipes);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
        
    }

    static async getById(req: Request, res: Response) {
        try {
            const recipe = await RecipeService.getById(Number(req.params.id));
            if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
            res.json(recipe);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async searchRecipe(req: Request, res: Response) {
        try {
            const dto: SearchRecipeDto = req.query as any; // из query string
            if (!dto.name) return res.status(400).json({ error: 'Name query required' });

            const recipes = await RecipeService.searchByName(dto);
            res.status(200).json(recipes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


     static async getMyRecipes(req: AuthRequest, res: Response) {
        try {
            if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
            const recipes = await RecipeService.getByUser(req.user.id);
            res.json(recipes);
        } catch (error) {
            
        }
        
    }

    static async delete(req: AuthRequest, res: Response) {
        try {
            if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
            const deleted = await RecipeService.delete(Number(req.params.id), req.user.id);
            if (deleted.count === 0) {
                return res.status(403).json({ error: 'Not allowed or recipe not found' });
            }
            res.json({ message: 'Deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }    
    }
}