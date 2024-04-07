import {addPhotos, photoList} from './add-pictures.js';
import {onOpenPopup} from './popup.js';
import {initValidation} from './form.js';
import {getData} from './api.js';
import {showDataError} from './alerts.js';

getData()
  .then((images) => {
    addPhotos(images);
    photoList.addEventListener('click', (evt) => {onOpenPopup(evt, images)});
    initValidation();
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

