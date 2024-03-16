const NUMBERS_OF_OBJECTS = 25;

const objectId = {
  MIN: 1,
  MAX: 25
};

const urlPicture = {
  MIN: 1,
  MAX: 25
};

const likeCounter = {
  MIN: 15,
  MAX: 200
}

const commentCounter = {
  MIN: 0,
  MAX: 30
}

const commentId = {
  MIN: 1,
  MAX: 100000000
}

const avatarId = {
  MIN: 1,
  MAX: 6
}

const DESCRIPTION_PHOTO = [
  'Я просыпаюсь',
  'Я кушаю',
  'Я занимаюсь',
  'Я снова кушаю',
  'Я снова занимаюсь',
  'Я ложусь спать'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Бажен',
  'Белозар',
  'Твердислав',
  'Хотомир',
  'Брячислава',
  'Веченега'
]

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueNumberFromRange = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

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
