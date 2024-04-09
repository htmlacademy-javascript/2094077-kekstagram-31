import {isEscapeKey} from './util.js';
import {MAX_HASHTAGS, REGEX, MAX_COMMENT_LENGTH} from './settings.js';
import {onScaleChange} from './photo-scaling.js';
import {onSelectEffect, sliderContainer, uploadedImage} from './slider.js';
import {sendData} from './api.js';
import {showSuccessAlert, showErrorAlert} from './alerts.js';
import {onUploadFile, uploadedImageInput} from './upload-photo.js';

const uploadForm = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const imageDescriptionInput = document.querySelector('.text__description');
const zoomOutPhoto = document.querySelector('.scale__control--smaller');
const zoomPhoto = document.querySelector('.scale__control--bigger');
const effectsRadio = document.querySelector('.effects__list');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const toggleSubmitButtonSettings = {
  block: {isDisabled: false, buttonText: 'Опубликовать'},
  unblock: {isDisabled: true, buttonText: 'Отправляю данные на сервер...'}
};

const toggleSubmitButton = (isBlock) => {
  submitButton.disabled = isBlock.isDisabled;
  submitButton.textContent = isBlock.buttonText;
};

const onEscapeEvent = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onHideUploadForm();
  }
};

const onOpenUploadForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeEvent);
  zoomOutPhoto.addEventListener('click', onScaleChange);
  zoomPhoto.addEventListener('click', onScaleChange);
  effectsRadio.addEventListener('change', onSelectEffect);
  uploadedImageInput.addEventListener('change', onUploadFile);
};

function onHideUploadForm () {
  pristine.reset();
  uploadForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadedImage.removeAttribute('style');
  sliderContainer.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeEvent);
  zoomOutPhoto.removeEventListener('click', onScaleChange);
  zoomPhoto.removeEventListener('click', onScaleChange);
  effectsRadio.removeEventListener('change', onSelectEffect);
}

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    toggleSubmitButton(toggleSubmitButtonSettings.unblock);
    setTimeout(() => {
      toggleSubmitButton(toggleSubmitButtonSettings.block);
    }, 5000);
    sendData(new FormData(evt.target))
      .then(() => {
        onHideUploadForm();
        showSuccessAlert();
      })
      .catch((err) => {
        showErrorAlert(err.message);
      });
  }
};

const validateHashtag = (hashtag) => REGEX.test(hashtag);

const conversionHashtagsString = (string) => {
  const newString = string.trim();
  const hashtags = newString.split(' ');
  return hashtags;
};

const isEveryHashtagValid = (hashtagsString) => {
  const hashtags = conversionHashtagsString(hashtagsString);
  if (!hashtags[0]) {
    return true;
  }
  const validHashtags = hashtags.every((hashtag) => validateHashtag(hashtag));
  return validHashtags;
};

const isHashtagsUnique = (hashtagsString) => {
  const hashtags = conversionHashtagsString(hashtagsString);
  const lowerHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const seenHashtag = new Set();
  for (let i = 0; i < lowerHashtags.length; i++) {
    const currentHashtag = lowerHashtags[i];
    if (seenHashtag.has(currentHashtag)) {
      return false;
    }
    seenHashtag.add(currentHashtag);
  }
  return true;
};

const isHashtagsArrayLengthValid = (hashtagsString) => {
  const hashtags = conversionHashtagsString(hashtagsString);
  return hashtags.length <= MAX_HASHTAGS;
};

const isCommentValid = (comment) => comment.length <= MAX_COMMENT_LENGTH;

const initValidation = () => {
  sliderContainer.classList.add('hidden');
  uploadForm.addEventListener('submit', onSubmitForm);
  uploadedImageInput.addEventListener('change', onUploadFile);
  overlayCloseButton.addEventListener('click', onHideUploadForm);
  imageDescriptionInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  hashtagInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  uploadedImageInput.addEventListener('change', onOpenUploadForm);
  pristine.addValidator(hashtagInput, isEveryHashtagValid, 'Неверная структура хэштега. Хэштег начинается с символа #. строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Максимальная длина одного хэштега 20 символов, включая решётку.');
  pristine.addValidator(hashtagInput, isHashtagsUnique, 'Каждый хэштег дожен быть уникальным.');
  pristine.addValidator(hashtagInput, isHashtagsArrayLengthValid, 'Превышен лимит указанных хэштегов. Можно указать не более 5 хэштегов.');
  pristine.addValidator(imageDescriptionInput, isCommentValid, 'Превышена длина комментария. Максимальная длина комментария 140 символов.');
};

export {initValidation};
