import Profile from '../models/profile';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all profiles
 * @param req
 * @param res
 * @returns void
 */
export function getProfiles(req, res) {
  Profile.find().sort('-dateAdded').exec((err, profiles) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ profiles });
  });
}

/**
 * Save a profile
 * @param req
 * @param res
 * @returns void
 */
export function addProfile(req, res) {
  if (!req.body.profile.name || !req.body.profile.title || !req.body.profile.content) {
    res.status(403).end();
  }

  const newProfile = new Profile(req.body.profile);

  // Let's sanitize inputs
  newProfile.title = sanitizeHtml(newProfile.title);
  newProfile.name = sanitizeHtml(newProfile.name);
  newProfile.content = sanitizeHtml(newProfile.content);

  newProfile.slug = slug(newProfile.title.toLowerCase(), { lowercase: true });
  newProfile.cuid = cuid();
  newProfile.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ newProfile: saved });
  });
}

/**
 * Get a single profile
 * @param req
 * @param res
 * @returns void
 */
export function getProfile(req, res) {
  Profile.findOne({ cuid: req.params.cuid }).exec((err, profile) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ profile });
  });
}

/**
 * Delete a profile
 * @param req
 * @param res
 * @returns void
 */
export function deleteProfile(req, res) {
  Profile.findOne({ cuid: req.params.cuid }).exec((err, profile) => {
    if (err) {
      res.status(500).send(err);
    }

    profile.remove(() => {
      res.status(200).end();
    });
  });
}
