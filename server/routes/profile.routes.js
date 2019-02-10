import { Router } from 'express';
import * as ProfileController from '../controllers/profile.controller';
const router = new Router();

// Get all Profiles
router.route('/profile').get(ProfileController.getProfiles);

// Get one profile by cuid
router.route('/profile/:cuid').get(ProfileController.getProfile);

// Add a new profile
router.route('/profile').post(ProfileController.addProfile);

// Delete a profile by cuid
router.route('/profile/:cuid').delete(ProfileController.deleteProfile);

export default router;