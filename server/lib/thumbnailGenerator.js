import { thumb } from 'node-thumbnail';

const ThumbnailGenerator = {
  create: (filePath, outputDirectory) => createThumbnail(filePath, outputDirectory),
  remove: () => deleteThumbnail(),
};

export default ThumbnailGenerator;

const createThumbnail = (filePath, outputDirectory) => {
  console.log('make thumbnail for %s', filePath);
  const config = {
    source: `${filePath}`, // could be a filename: dest/path/image.jpg
    destination: `${outputDirectory}`,
    prefix: '',
    suffix: '_thumb',
    digest: false,
    //hashingType: 'sha1', // 'sha1', 'md5', 'sha256', 'sha512'
    width: '300px',
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
      console.log('Success');
    }).catch((e) => {
      console.log('Error', e.toString());
    });
};

const deleteThumbnail = (filePath) => {
  return console.log('delete thumbnail for %s', filePath);
};