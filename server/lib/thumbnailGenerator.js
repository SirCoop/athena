import path from 'path';
import fs from 'fs-extra';
import { thumb } from 'node-thumbnail';

const ThumbnailGenerator = {
  create: (filePath, outputDirectory) => createThumbnail(filePath, outputDirectory),
  remove: (filePath, thumbnailDirectory) => deleteThumbnail(filePath, thumbnailDirectory),
};

export default ThumbnailGenerator;

const createThumbnail = (filePath, outputDirectory) => {
  const config = {
    source: `${filePath}`, // could be a filename: dest/path/image.jpg
    destination: `${outputDirectory}`,
    prefix: '',
    suffix: '_thumb',
    digest: false,
    //hashingType: 'sha1', // 'sha1', 'md5', 'sha256', 'sha512'
    width: '100px',
    // concurrency: 2,
    quiet: true, // if set to 'true', console.log status messages will be supressed
    overwrite: false,
    skip: true, // Skip generation of existing thumbnails
    basename: undefined, // basename of the thumbnail. If unset, the name of the source file is used as basename.
    ignore: true, // Ignore unsupported files in "dest"
    logger: (message) => {
      console.log(message);
      }
    };

    return thumb(config).then(() => {
      console.log('Created thumbnail.');
    }).catch((e) => {
      console.log('Error', e.toString());
    });
};

const deleteThumbnail = (filePath, thumbnailDirectory) => {
  // E:\Drive\nuvopastiche_api\server\public\carousel\Pastiche.JPG
  const name = filePath.split('.')[0].split('\\').pop();
  const ext = filePath.split('.').pop();
  const fileName = `${name}_thumb.${ext}`;
  const thumbnail = path.resolve(thumbnailDirectory, fileName);
  console.log('delete thumbnail %s', fileName);
  fs.remove(`${thumbnail}`)
};