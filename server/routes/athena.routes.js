import path from 'path';
import { Router } from 'express';
import multer from 'multer';
import * as AthenaController from '../controllers/athena.controller';
const router = new Router();

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const fileLocation = path.resolve(__dirname, '../../python/athena_package/input_images/');
const storage = multer.diskStorage({
  destination: fileLocation,
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

// Content (Personal) Image Upload
router.post('/upload-images/content', upload.single('content_image'), function (req, res, next) {
  // console.log('+++++++++++++++++++++');
  return AthenaController.saveContentImage(req, res);
});

// Style Image Upload
router.post('/upload-images/style', upload.single('style_image'), function (req, res, next) {
  // console.log('+++++++++++++++++++++');
  return AthenaController.saveStyleImage(req, res);
});

// Get all ...
// router.route('/athena').get(AthenaController.getSomeCollection);

// Get one ... by cuid
// router.route('/athena/:cuid').get(AthenaController.getSomeThing);

// Add a new art generation task
// router.route('/images').post(upload, AthenaController.saveImages);

// Delete a ... by cuid
// router.route('/athena/:cuid').delete(AthenaController.deleteThing);

export default router;