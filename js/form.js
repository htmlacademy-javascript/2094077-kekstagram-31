import {isEscapeKey} from './util.js';
import {MAX_HASHTAGS, REGEX, MAX_COMMENT_LENGTH} from './data.js';
import {onScaleChange} from './photo-scaling.js';
import {onSelectEffect} from './slider.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const imageDescriptionInput = document.querySelector('.text__description');
const zoomOutPhoto = document.querySelector('.scale__control--smaller');
const zoomPhoto = document.querySelector('.scale__control--bigger');
const effectsRadio = document.querySelector('.effects__list');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onEscapeEvent = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadForm();
  };
};

const displayUploadForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeEvent);
  zoomOutPhoto.addEventListener('click', onScaleChange);
  zoomPhoto.addEventListener('click', onScaleChange);
  effectsRadio.addEventListener('change', onSelectEffect);
};

function hideUploadForm() {
  pristine.reset();
  uploadForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeEvent);
  zoomOutPhoto.removeEventListener('click', onScaleChange);
  zoomPhoto.removeEventListener('click', onScaleChange);
  effectsRadio.removeEventListener('change', onSelectEffect);
};

const submitForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
    hideUploadForm();
  };
};

const validateHashtag = (hashtag) => {
  return REGEX.test(hashtag);
};

const conversionHashtagsString = (string) => {
  const newString = string.trim();
  const hashtags = newString.split(' ');
  return hashtags;
};

const areEveryHashtagValid = (hashtagsString) => {
  const hashtags = conversionHashtagsString(hashtagsString);
  if (!hashtags[0]) {
    return true;
  };
  const validHashtags = hashtags.every((hashtag) => validateHashtag(hashtag));
  return validHashtags;
};

const areHashtagsUnique = (hashtagsString) => {
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

const isCommentValid = (comment) => {
  return comment.length <= MAX_COMMENT_LENGTH;
};

const formValidation = () => {
  uploadForm.addEventListener('submit', submitForm);
  overlayCloseButton.addEventListener('click', hideUploadForm);
  imageDescriptionInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  hashtagInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    };
  });
  uploadImage.addEventListener('change', displayUploadForm);
  pristine.addValidator(hashtagInput, areEveryHashtagValid, 'Неверная структура хэштега. Хэштег начинается с символа #. строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Максимальная длина одного хэштега 20 символов, включая решётку.');
  pristine.addValidator(hashtagInput, areHashtagsUnique, 'Каждый хэштег дожен быть уникальным.');
  pristine.addValidator(hashtagInput, isHashtagsArrayLengthValid, 'Превышен лимит указанных хэштегов. Можно указать не более 5 хэштегов.');
  pristine.addValidator(imageDescriptionInput, isCommentValid, 'Превышена длина комментария. Максимальная длина комментария 140 символов.');
};

export {formValidation};
