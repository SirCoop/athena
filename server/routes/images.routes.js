import path from 'path';
import { Router } from 'express';
import multer from 'multer';
import * as ImagesController from '../controllers/athena.controller';
const router = new Router();

const fileLocation = path.resolve(__dirname, '../../python/athena_package/user_images/');
const storage = multer.diskStorage({
  destination: fileLocation,
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

// Content (Personal) Image Upload
router.post('/upload-images/content', upload.single('content_image'), (req, res) => {
  return ImagesController.saveContentImage(req, res);
});

// Style Image Upload
router.post('/upload-images/style', upload.single('style_image'), (req, res) => {
  return ImagesController.saveStyleImage(req, res);
});

// Start Athen Job
router.route('/start').post(ImagesController.startAthena);


// Get all ...
// router.route('/athena').get(ImagesController.getSomeCollection);

// Get one ... by cuid
// router.route('/athena/:cuid').get(ImagesController.getSomeThing);

// Add a new art generation task
// router.route('/images').post(upload, ImagesController.saveImages);

// Delete a ... by cuid
// router.route('/athena/:cuid').delete(ImagesController.deleteThing);

export default router;