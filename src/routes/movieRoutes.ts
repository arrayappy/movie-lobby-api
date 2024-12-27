import { Router } from 'express';
import { checkAdminRole } from '../middleware/auth';
import * as movieController from '../controllers/movieController';

const router = Router();

router.get('/movies', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.post('/movies', checkAdminRole, movieController.addMovie);
router.put('/movies/:id', checkAdminRole, movieController.updateMovie);
router.delete('/movies/:id', checkAdminRole, movieController.deleteMovie);

export default router;
