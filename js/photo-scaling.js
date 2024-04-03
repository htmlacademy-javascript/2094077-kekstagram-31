import {scalingSettings} from './data.js';

const zoomOutPhoto = document.querySelector('.scale__control--smaller');
const zoomPhoto = document.querySelector('.scale__control--bigger');
const scale = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

const onScaleChange = (evt) => {
  let currentValue = parseInt(scale.value);
  if (evt.target.classList.contains('scale__control--smaller') && currentValue > scalingSettings.MIN) {
    currentValue = currentValue - scalingSettings.STEP;
    scale.value = `${currentValue}%`;
    photo.style.transform = `scale(0.${currentValue})`;
  } else if (evt.target.classList.contains('scale__control--bigger') && currentValue < scalingSettings.MAX) {
    currentValue = currentValue + scalingSettings.STEP;
    scale.value = `${currentValue}%`;
    if (currentValue === 100) {
      photo.style.transform = `scale(${0.01 * currentValue})`;
    } else {
      photo.style.transform = `scale(0.${currentValue})`;
    };
  };
};

const photoScaling = () => {
  zoomOutPhoto.addEventListener('click', onScaleChange);
  zoomPhoto.addEventListener('click', onScaleChange);
};

export {photoScaling};
