import fs from 'fs-extra';
import path from 'path';
import Image from '../models/image';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import ImageService from '../services/image.service';

/**
 * Get Carousel Images
 * @param req
 * @param res
 * @returns void
 */
export async function getCarouselImageUrls(req, res) {
  const directory = path.resolve(__dirname, '../public/carousel');
  const URI = `api/images/carousel`;
  try {
    const files = await ImageService.getCarouselImageUrls(directory);
    /* api file paths */
    const filePaths = files.map(file => {
      const name = file.split('.')[0];
      return {
        src: `${URI}/${file}`,
        name
      };
    });
    res.send({ data: filePaths });
  } catch (error) {
    res.send(error);
  }
}

export function getCarouselImage(req, res) {
  const { params: { name }} = req;
  const imagePath = path.join(__dirname, `../public/carousel/${name}`);

  const mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
  };

  const type = mime[path.extname(name).slice(1)] || 'text/plain';
  const s = fs.createReadStream(imagePath);
  
  s.on('open', function () {
      res.set('Content-Type', type);
      s.pipe(res);
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
}

/**
 * Get Carousel Images
 * @param req
 * @param res
 * @returns void
 */
export async function getHelpImageUrls(req, res) {
  const directory = path.resolve(__dirname, '../public/help');
  const URI = `api/images/help`;
  try {
    const files = await ImageService.getHelpImageUrls(directory);
    /* api file paths */
    const filePaths = files.map((file, idx) => {
      const name = file.split('.')[0];
      const newFile = {
        src: `${URI}/${file}`,
        name,
        step: idx + 1,
        header: '',
      };

      switch(idx) {
        case 0:
          newFile.header = `${newFile.step}) Upload a personal photo.`;
          break;
        case 1:
          newFile.header = `${newFile.step}) Upload your favorite art.`;
          break;
        case 2:
          newFile.header = `${newFile.step}) Send and wait for pastiche.`;
          break;
        default:
          break;
      }

      return newFile;
    });
    res.send({ data: filePaths });
  } catch (error) {
    res.send(error);
  }
}

export function getHelpImage(req, res) {
  const { params: { name }} = req;
  const imagePath = path.join(__dirname, `../public/help/${name}`);

  const mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
  };

  const type = mime[path.extname(name).slice(1)] || 'text/plain';
  const s = fs.createReadStream(imagePath);
  
  s.on('open', function () {
      res.set('Content-Type', type);
      s.pipe(res);
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
}
           

/**
 * Save a image
 * @param req
 * @param res
 * @returns void
 */
export function addImage(req, res) {
  const required =
    !req.body.image.email ||
    !req.body.image.firstName ||
    !req.body.image.lastName ||
    !req.body.image.username;

  if (!required) {
    res.status(403).end();
  }

  const newImage = new Image(req.body.image);

  // Let's sanitize inputs
  newImage.title = sanitizeHtml(newImage.title);
  newImage.name = sanitizeHtml(newImage.name);
  newImage.content = sanitizeHtml(newImage.content);

  newImage.slug = slug(newImage.title.toLowerCase(), { lowercase: true });
  newImage.cuid = cuid();
  newImage.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ newImage: saved });
  });
}

/**
 * Get a single image
 * @param req
 * @param res
 * @returns void
 */
export function getImage(req, res) {
  Image.findOne({ cuid: req.params.cuid }).exec((err, image) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ image });
  });
}

/**
 * Delete a image
 * @param req
 * @param res
 * @returns void
 */
export function deleteImage(req, res) {
  Image.findOne({ cuid: req.params.cuid }).exec((err, image) => {
    if (err) {
      res.status(500).send(err);
    }

    image.remove(() => {
      res.status(200).end();
    });
  });
}
