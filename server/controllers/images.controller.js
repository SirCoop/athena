import Image from '../models/image';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all Images
 * @param req
 * @param res
 * @returns void
 */
export function getImages(req, res) {
  Image.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
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
