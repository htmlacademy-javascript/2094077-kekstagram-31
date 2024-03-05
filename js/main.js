const numbersOfObjects = 25;

const objectId = {
  min: 1,
  max: 25
};

const urlPicture = {
  min: 1,
  max: 25
};

const likeCounter = {
  min: 15,
  max: 200
}

const commentCounter = {
  min: 0,
  max: 30
}

const commentId = {
  min: 1,
  max: 100000000
}

const avatarId = {
  min: 1,
  max: 6
}

const descriptionPhoto = [
  'Я просыпаюсь',
  'Я кушаю',
  'Я занимаюсь',
  'Я снова кушаю',
  'Я снова занимаюсь',
  'Я ложусь спать'
];

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
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

const generateId = createUniqueNumberFromRange(objectId.min, objectId.max);
const generateUrlId = createUniqueNumberFromRange(urlPicture.min, urlPicture.max);
const getRandomElementArray = function (array) {
  let element = array[getRandomInteger(0, array.length - 1)];
  return element;
};
const generateCommentId = createUniqueNumberFromRange(commentId.min, commentId.max);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(avatarId.min, avatarId.max)}.svg`,
  message: comments[getRandomInteger(0, comments.length - 1)],
  name: names[getRandomInteger(0, names.length - 1)]
});

const createPhotoDescription = () => {
  const id = generateId();
  const url = `photos/${generateUrlId()}.jpg`;

  return {
    id: id,
    url: url,
    description: getRandomElementArray(descriptionPhoto),
    likes: getRandomInteger(likeCounter.min, likeCounter.max),
    comments: Array.from({length: getRandomInteger(commentCounter.min, commentCounter.max)}, createComment)
  };
};

const createPhotoDescriptions = () => {
  return Array.from({length: numbersOfObjects}, createPhotoDescription);
}

console.log(createPhotoDescription());
console.table(createPhotoDescriptions());
