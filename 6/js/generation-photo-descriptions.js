import {getRandomInteger, createUniqueNumberFromRange} from './util.js';
import {NUMBERS_OF_OBJECTS, DESCRIPTION_PHOTO, COMMENTS, NAMES, objectId, urlPicture, likeCounter, commentCounter, commentId, avatarId} from './data.js';

const generateId = createUniqueNumberFromRange(objectId.MIN, objectId.MAX);
const generateUrlId = createUniqueNumberFromRange(urlPicture.MIN, urlPicture.MAX);
const getRandomElementArray = function (array) {
  let element = array[getRandomInteger(0, array.length - 1)];
  return element;
};
const generateCommentId = createUniqueNumberFromRange(commentId.MIN, commentId.MAX);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(avatarId.MIN, avatarId.MAX)}.svg`,
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPhotoDescription = () => {
  const id = generateId();
  const url = `photos/${generateUrlId()}.jpg`;

  return {
    id: id,
    url: url,
    description: getRandomElementArray(DESCRIPTION_PHOTO),
    likes: getRandomInteger(likeCounter.MIN, likeCounter.MAX),
    comments: Array.from({length: getRandomInteger(commentCounter.MIN, commentCounter.MAX)}, createComment)
  };
};

const createPhotoDescriptions = () => {
  return Array.from({length: NUMBERS_OF_OBJECTS}, createPhotoDescription);
}

export {createPhotoDescriptions};
