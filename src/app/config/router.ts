import { Router } from 'express';
import bookController from '../controllers/bookController';
import WelcomeController from '../controllers/welcomeController';

const router = Router();

router.get('/', (req, res) => new WelcomeController(req, res).get());

router
  .route('/api/v1/book')
  .get((req, res) => bookController.get(req, res))
  .post((req, res) => bookController.post(req, res))
  .delete((req, res) => bookController.delete(req, res));
router.route('/api/v1/user');
router.route('/api/v1/category');

export default router;
