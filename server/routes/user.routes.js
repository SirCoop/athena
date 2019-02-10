import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Users
router.route('/user').get(UserController.getUsers);

// Get one user by cuid
router.route('/user/:cuid').get(UserController.getUser);

// Add a new user
router.route('/user').post(UserController.addUser);

// Delete a user by cuid
router.route('/user/:cuid').delete(UserController.deleteUser);

export default router;