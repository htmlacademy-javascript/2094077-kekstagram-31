import {isEscapeKey} from './util.js';
import {arrayComments, photoList} from './add-pictures.js';

const bigPicturePopup = document.querySelector('.big-picture');
const buttonClosePopup = document.querySelector('.big-picture__cancel');
const comments = bigPicturePopup.querySelector('.social__comments');
const comment = bigPicturePopup.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');

const fillComments = (photoComments) => {
  comments.innerHTML = '';
  photoComments.forEach(({avatar, name, message}) => {
    const newComment = comment.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    comments.append(newComment);
  });
}

const fillPopup = (miniature) => {
  const bigImage = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
  const picture = miniature.querySelector('.picture__img')
  bigImage.src = picture.src;
  bigImage.alt = picture.alt;
  bigPicturePopup.querySelector('.social__caption').textContent = miniature.querySelector('.picture__img').alt;
  bigPicturePopup.querySelector('.likes-count').textContent = miniature.querySelector('.picture__likes').textContent;
  bigPicturePopup.querySelector('.social__comment-total-count').textContent = miniature.querySelector('.picture__comments').textContent;
  bigPicturePopup.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment:not(.hidden)').length;
};

const closePopup = () => {
  bigPicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  buttonClosePopup.removeEventListener('click', closePopup);
}

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function (evt) {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    const index = [...photoList.querySelectorAll('.picture')].indexOf(evt.target.parentNode);
    fillComments(arrayComments[index]);
    fillPopup(evt.target.parentNode);
    bigPicturePopup.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    commentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');
    buttonClosePopup.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
};

export {openPopup};
