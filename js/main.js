import {createPhotoDescriptions} from './generation-photo-descriptions.js';
import {addPhotos} from './add-pictures.js';

console.table(addPhotos(createPhotoDescriptions()));
