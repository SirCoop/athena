import { start } from './server/server';
import watchCarouselDirectory from './server/middleware/filewatcher';

start();
watchCarouselDirectory();

