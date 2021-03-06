import watch from 'node-watch';
import path from 'path';
import ThumbnailGenerator from '../lib/thumbnailGenerator';

const carouselImageDirectory = path.resolve(__dirname, '../public/carousel');
const thumbnailOutputDirectory = path.resolve(__dirname, '../public/thumbnails/carousel');

const watchCarouselDirectory = () => {
  watch(carouselImageDirectory, { recursive: false }, (evt, name) => {
    switch (evt) {
      case 'update':
      ThumbnailGenerator.create(name, thumbnailOutputDirectory);
        break;
      case 'remove':
      ThumbnailGenerator.remove(name, thumbnailOutputDirectory);
        break;
      default:
        break;
    }
  });
};

export default watchCarouselDirectory;
