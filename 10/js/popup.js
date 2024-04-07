import {isEscapeKey} from './util.js';

const bigPicturePopup = document.querySelector('.big-picture');
const buttonClosePopup = document.querySelector('.big-picture__cancel');
const comments = bigPicturePopup.querySelector('.social__comments');
const comment = bigPicturePopup.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const сommentsShownCounter = bigPicturePopup.querySelector('.social__comment-shown-count');

const fillComments = (photoComments) => {
  comments.innerHTML = '';
  photoComments.comments.forEach(({avatar, name, message}) => {
    const newComment = comment.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    comments.append(newComment);
  });
};

const showCommentCount = () => {
  const hiddenCommentItems = document.querySelectorAll('.social__comment.hidden').length;
  сommentsShownCounter.textContent = comments.querySelectorAll('.social__comment').length - hiddenCommentItems;
};

const fillPopup = ({url, description, likes, comments}) => {
  const bigImage = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
  bigImage.src = url;
  bigImage.alt = description;
  bigPicturePopup.querySelector('.social__caption').textContent = description;
  bigPicturePopup.querySelector('.likes-count').textContent = likes;
  bigPicturePopup.querySelector('.social__comment-total-count').textContent = comments.length;
  const commentItems = bigPicturePopup.querySelectorAll('.social__comment');
  for (let i = commentItems.length - 1; i > 4; i--) {
    commentItems[i].classList.add('hidden');
  };
  showCommentCount();
  if (сommentsShownCounter.textContent < 5) {
    commentLoader.classList.add('hidden');
  };
};

const onLoadComments = (evt) => {
  evt.preventDefault();
  let hiddenComments = document.querySelectorAll('.social__comment.hidden');
  let hiddenCounter = hiddenComments.length;
  for (let i = 0; i < 5; i++) {
    if (hiddenCounter === 0) {
      commentLoader.classList.add('hidden');
      break;
    } else {
      hiddenCounter--;
      hiddenComments[i].classList.remove('hidden');
    };
  };
  showCommentCount();
};

const onClosePopup = () => {
  bigPicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  buttonClosePopup.removeEventListener('click', onClosePopup);
  commentLoader.removeEventListener('click', onLoadComments);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePopup();
  };
};

const onOpenPopup = (evt, arrayData) => {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    let object = arrayData.find((item) => item.id == evt.target.parentNode.dataset.id);
    fillComments(object);
    fillPopup(object);
    bigPicturePopup.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    buttonClosePopup.addEventListener('click', onClosePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
    commentLoader.addEventListener('click', onLoadComments);
  };
};

export {onOpenPopup};
