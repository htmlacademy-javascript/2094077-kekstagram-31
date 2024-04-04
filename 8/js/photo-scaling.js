import {scalingSettings} from './data.js';

const scale = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

const onScaleChange = (evt) => {
  let currentValue = parseInt(scale.value);
  if (evt.target.classList.contains('scale__control--smaller') && currentValue > scalingSettings.MIN) {
    currentValue = currentValue - scalingSettings.STEP;
    scale.value = `${currentValue}%`;
    photo.style.transform = `scale(${0.01 * currentValue})`;
  } else if (evt.target.classList.contains('scale__control--bigger') && currentValue < scalingSettings.MAX) {
    currentValue = currentValue + scalingSettings.STEP;
    scale.value = `${currentValue}%`;
    photo.style.transform = `scale(${0.01 * currentValue})`;
  };
};

export {onScaleChange};
