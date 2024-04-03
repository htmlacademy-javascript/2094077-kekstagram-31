import {createPhotoDescriptions} from './generation-photo-descriptions.js';
import {addPhotos, photoList} from './add-pictures.js';
import {openPopup} from './popup.js';
import {formValidation} from './form.js';

const photosData = createPhotoDescriptions();
addPhotos(photosData);
photoList.addEventListener('click', (evt) => {openPopup(evt, photosData)});
formValidation();


