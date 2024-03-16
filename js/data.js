const NUMBERS_OF_OBJECTS = 25;

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

export {NUMBERS_OF_OBJECTS, DESCRIPTION_PHOTO, COMMENTS, NAMES, objectId, urlPicture, likeCounter, commentCounter, commentId, avatarId};
