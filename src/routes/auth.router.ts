import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { requireFields } from '../middleware/reqCheck.middleware';

const router = Router();

router.post('/register', requireFields(['username', 'email', 'password']), AuthController.register);
router.post('/login', requireFields(['email', 'password']), AuthController.login);

export default router;