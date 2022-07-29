import { Router } from 'express';
import userController from '@controllers/user/user.controller';
import auth from '@middlewares/auth.middlewares';

const router: Router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:userId', auth.authJWT, userController.getUserAbout);
router.patch('/', auth.authJWT, userController.updateUser);
router.delete('/', auth.authJWT, userController.deleteUser);

export default router;
