import path from 'path';
import { Router } from 'express';
import multer from 'multer';
import * as ImageController from '../controllers/image.controller';
const router = new Router();

//Get all image urls
router.route('/carousel').get(ImageController.getCarouselImageUrls);
// Get one image by name
router.route('/carousel/:name').get(ImageController.getCarouselImage);

export default router;