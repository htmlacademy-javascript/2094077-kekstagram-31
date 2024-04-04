const slider = document.querySelector('.effect-level__slider');
const uploadedImage = document.querySelector('.img-upload__preview img');
const valueEffect = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const effects = {
  chrome: {filter: 'grayscale', min: 0, max: 1, start: 1, step: 0.1},
  sepia: {filter: 'sepia', min: 0, max: 1, start: 1, step: 0.1},
  marvin: {filter: 'invert', min: 0, max: 1, start: 1, step: 0.01},
  phobos: {filter: 'blur', min: 0, max: 3, start: 3, step: 0.1},
  heat: {filter: 'brightness', min: 1, max: 3, start: 3, step: 0.1}
};

sliderContainer.classList.add('hidden');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format : {
    to:
    function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0)
      } else {
        return value.toFixed(1)
      }
    },
    from:
    function (value) {
      return parseFloat(value)
    }
  }
});

const ty = ({filter, min, max, start, step}) => {
  sliderContainer.classList.remove('hidden');
  uploadedImage.removeAttribute('style');

  slider.noUiSlider.updateOptions({
  range: {
    min: min,
    max: max,
  },
  start: start,
  step: step,
  });

  slider.noUiSlider.on('update', () => {
    valueEffect.value = slider.noUiSlider.get();
    if (filter === 'invert') {
      uploadedImage.style.filter =`${filter}(${valueEffect.value}%)`;
    } else if (filter === 'blur') {
      uploadedImage.style.filter =`${filter}(${valueEffect.value}px)`;
    } else {
      uploadedImage.style.filter =`${filter}(${valueEffect.value})`;
    };
  });
};

const onSelectEffect = function (evt) {
  const radioValue = evt.target.closest('.effects__radio').value;

  if (radioValue === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    ty(effects[radioValue]);
  };
};

export {onSelectEffect};
