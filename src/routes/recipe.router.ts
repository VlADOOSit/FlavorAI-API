import { Router } from 'express';
import { RecipeController } from '../controllers/recipe.controller';
import { requireFields } from '../middleware/reqCheck.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { RatingController } from '../controllers/rating.controller';

const router = Router();

router.post('/', authMiddleware, RecipeController.addRecipe);
router.get('/', RecipeController.getAll);
router.get('/search', RecipeController.searchRecipe);
router.get('/:id', RecipeController.getById);


router.post('/:id/ratings', authMiddleware, RatingController.setRating);
router.get('/:id/ratings/avg', RatingController.average); 

export default router;
