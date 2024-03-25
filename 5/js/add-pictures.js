const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoList = document.querySelector('.pictures');
const photoFragment = document.createDocumentFragment();

const createElement = ({url, description, likes, comments}) => {
  const element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;
  return element;
};

const addPhotos = (arrayPhotos) => {
  arrayPhotos.forEach((photoDescription) => {
    const element = createElement(photoDescription);
    photoFragment.appendChild(element);
  });
  photoList.appendChild(photoFragment);
};

export {addPhotos};
