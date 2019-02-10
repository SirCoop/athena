import { Router } from 'express';
import * as AthenaController from '../controllers/athena.controller';
const router = new Router();

// Get all ...
// router.route('/athena').get(AthenaController.getSomeCollection);

// Get one ... by cuid
// router.route('/athena/:cuid').get(AthenaController.getSomeThing);

// Add a new art generation task
router.route('/images').post(AthenaController.saveImages);

// Delete a ... by cuid
// router.route('/athena/:cuid').delete(AthenaController.deleteThing);

export default router;