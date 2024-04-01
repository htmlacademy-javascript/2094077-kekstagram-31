import {isEscapeKey} from './util.js';

const bigPicturePopup = document.querySelector('.big-picture');
const buttonClosePopup = document.querySelector('.big-picture__cancel');
const comments = bigPicturePopup.querySelector('.social__comments');
const comment = bigPicturePopup.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');

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
}

const fillPopup = ({url, description, likes, comments}) => {
  const bigImage = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
  bigImage.src = url;
  bigImage.alt = description;
  bigPicturePopup.querySelector('.social__caption').textContent = description;
  bigPicturePopup.querySelector('.likes-count').textContent = likes;
  bigPicturePopup.querySelector('.social__comment-total-count').textContent = comments.length;
};

const closePopup = () => {
  bigPicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  buttonClosePopup.removeEventListener('click', closePopup);
  commentLoader.removeEventListener('click', loadComments);
}

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

// const loadComments = function (evt, objectComments) {
//   evt.preventDefault();
//   const hiddenCommentItems = comments.querySelectorAll('.hidden');
//   for (let i = 0; i < 5; i++) {
//     if (hiddenCommentItems.length === 0) {
//       break;
//     } else {
//       hiddenCommentItems[i].classList.remove('hidden');
//       const hiddenCommentItem = comments.querySelectorAll('.hidden');
//       console.log(hiddenCommentItems.length);
//       bigPicturePopup.querySelector('.social__comment-shown-count').textContent = objectComments.comments.length - hiddenCommentItem.length;
//     };
//   };
// };

const openPopup = function (evt, arrayData) {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    let object = arrayData.find((item) => item.id == evt.target.parentNode.getAttribute('data-id'));
    fillComments(object);
    fillPopup(object);
    console.log(object);
    bigPicturePopup.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    buttonClosePopup.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
    const commentItems = bigPicturePopup.querySelectorAll('.social__comment');
    for (let i = commentItems.length - 1; i > 4; i--) {
      commentItems[i].classList.add('hidden');
    };
    // commentLoader.addEventListener('click', (evt) => {loadComments(evt, object)});
    bigPicturePopup.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment:not(.hidden)').length;
  };
};

export {openPopup};
