import {createPhotoDescriptions} from './generation-photo-descriptions.js';
import {addPhotos} from './add-pictures.js';
import {openPopup} from './popup.js';
import {photoList} from './add-pictures.js';

addPhotos(createPhotoDescriptions());
photoList.addEventListener('click', openPopup);
