import { Router } from 'express';
import bookController from '../controllers/bookController';
import userController from '../controllers/userController';
import WelcomeController from '../controllers/welcomeController';
import requiredTokenMiddleWare from '../middlewares/requiredToken';

const router = Router();

router.get('/', (req, res) => new WelcomeController(req, res).get());

router
  .route('/api/v1/book')
  .get(requiredTokenMiddleWare, (req, res) => bookController.get(req, res))
  .post(requiredTokenMiddleWare, (req, res) => bookController.post(req, res))
  .delete(requiredTokenMiddleWare, (req, res) => bookController.delete(req, res))
  .put(requiredTokenMiddleWare, (req, res) => bookController.update(req, res));
router.route('/api/v1/user/login').post((req, res) => userController.login(req, res));
router.route('/api/v1/user/register').post((req, res) => userController.register(req, res));
router.route('/api/v1/category');

export default router;
