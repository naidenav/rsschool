import { CardInfo, State } from './interfaces';

export const FLIP_CLASS = 'flipped';

export const MAIN_PAGE = 'main';

export const STATISTICS_PAGE = 'statistics';

export const TRAIN_MODE = 'train-mode';

export const PLAY_MODE = 'play-mode';

export const ERROR_AUDIO_SRC = './audio/error.mp3';

export const CORRECT_AUDIO_SRC = './audio/correct.mp3';

export const SUCCESS_AUDIO_SRC = './audio/success.mp3';

export const FAILURE_AUDIO_SRC = './audio/failure.mp3';

export const PLACE_FOR_ICON = 34;

export const SORT_ARROW = `
  <div class="sort-arrow"></div>
`;

export const INITIAL_STATE: State = {
  mode: TRAIN_MODE,
  page: MAIN_PAGE,
  currentCard: null,
  isGameStarted: false,
  isBreak: false,
  mistakes: 0,
};

export const TITLE_HEIGHT = '25%';

export const CATEGORIES = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions',
  'Fruits', 'Colors'];

export const CARDS: CardInfo[][] = [
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'img/cry.jpg',
      audioSrc: 'audio/cry.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'img/dance.jpg',
      audioSrc: 'audio/dance.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'img/dive.jpg',
      audioSrc: 'audio/dive.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'img/draw.jpg',
      audioSrc: 'audio/draw.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'img/fish.jpg',
      audioSrc: 'audio/fish.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'img/fly.jpg',
      audioSrc: 'audio/fly.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'img/hug.jpg',
      audioSrc: 'audio/hug.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'img/jump.jpg',
      audioSrc: 'audio/jump.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'img/open.jpg',
      audioSrc: 'audio/open.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'img/play.jpg',
      audioSrc: 'audio/play.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'img/point.jpg',
      audioSrc: 'audio/point.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'img/ride.jpg',
      audioSrc: 'audio/ride.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'img/run.jpg',
      audioSrc: 'audio/run.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'img/sing.jpg',
      audioSrc: 'audio/sing.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'img/skip.jpg',
      audioSrc: 'audio/skip.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'img/swim.jpg',
      audioSrc: 'audio/swim.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'img/cat.jpg',
      audioSrc: 'audio/cat.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'img/chick.jpg',
      audioSrc: 'audio/chick.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'img/chicken.jpg',
      audioSrc: 'audio/chicken.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'img/dog.jpg',
      audioSrc: 'audio/dog.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'img/horse.jpg',
      audioSrc: 'audio/horse.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'img/pig.jpg',
      audioSrc: 'audio/pig.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'img/rabbit.jpg',
      audioSrc: 'audio/rabbit.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'img/sheep.jpg',
      audioSrc: 'audio/sheep.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'img/bird.jpg',
      audioSrc: 'audio/bird.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'img/fish1.jpg',
      audioSrc: 'audio/fish.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'img/frog.jpg',
      audioSrc: 'audio/frog.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'img/giraffe.jpg',
      audioSrc: 'audio/giraffe.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'img/lion.jpg',
      audioSrc: 'audio/lion.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'img/mouse.jpg',
      audioSrc: 'audio/mouse.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'img/turtle.jpg',
      audioSrc: 'audio/turtle.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'img/dolphin.jpg',
      audioSrc: 'audio/dolphin.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'img/skirt.jpg',
      audioSrc: 'audio/skirt.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'img/pants.jpg',
      audioSrc: 'audio/pants.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'img/blouse.jpg',
      audioSrc: 'audio/blouse.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'img/dress.jpg',
      audioSrc: 'audio/dress.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'img/boot.jpg',
      audioSrc: 'audio/boot.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'img/shirt.jpg',
      audioSrc: 'audio/shirt.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'img/coat.jpg',
      audioSrc: 'audio/coat.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'img/shoe.jpg',
      audioSrc: 'audio/shoe.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'img/sad.jpg',
      audioSrc: 'audio/sad.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'img/angry.jpg',
      audioSrc: 'audio/angry.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'img/happy.jpg',
      audioSrc: 'audio/happy.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'img/tired.jpg',
      audioSrc: 'audio/tired.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'img/surprised.jpg',
      audioSrc: 'audio/surprised.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'img/scared.jpg',
      audioSrc: 'audio/scared.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'img/smile.jpg',
      audioSrc: 'audio/smile.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'img/laugh.jpg',
      audioSrc: 'audio/laugh.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
  [
    {
      word: 'orange',
      translation: 'апельсин',
      image: 'img/orange.jpg',
      audioSrc: 'audio/orange.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'cherry',
      translation: 'вишня',
      image: 'img/cherry.jpg',
      audioSrc: 'audio/cherry.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'banana',
      translation: 'банан',
      image: 'img/banana.jpg',
      audioSrc: 'audio/banana.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'pear',
      translation: 'груша',
      image: 'img/pear.jpg',
      audioSrc: 'audio/pear.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'apple',
      translation: 'яблоко',
      image: 'img/apple.jpg',
      audioSrc: 'audio/apple.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'peach',
      translation: 'персик',
      image: 'img/peach.jpg',
      audioSrc: 'audio/peach.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'grape',
      translation: 'виноград',
      image: 'img/grape.jpg',
      audioSrc: 'audio/grape.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'pineapple',
      translation: 'ананас',
      image: 'img/pineapple.jpg',
      audioSrc: 'audio/pineapple.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
  [
    {
      word: 'black',
      translation: 'чёрный',
      image: 'img/black.jpg',
      audioSrc: 'audio/black.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'yellow',
      translation: 'жёлтый',
      image: 'img/yellow.jpg',
      audioSrc: 'audio/yellow.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'green',
      translation: 'зелёный',
      image: 'img/green.jpg',
      audioSrc: 'audio/green.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'blue',
      translation: 'голубой',
      image: 'img/blue.jpg',
      audioSrc: 'audio/blue.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'pink',
      translation: 'розовый',
      image: 'img/pink.jpg',
      audioSrc: 'audio/pink.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'brown',
      translation: 'коричневый',
      image: 'img/brown.jpg',
      audioSrc: 'audio/brown.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'white',
      translation: 'белый',
      image: 'img/white.jpg',
      audioSrc: 'audio/white.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
    {
      word: 'red',
      translation: 'красный',
      image: 'img/red.jpg',
      audioSrc: 'audio/red.mp3',
      trainModeTurns: 0,
      playModeChoices: 0,
      trueChoicesNum: 0,
      trueChoicesPer: 0,
    },
  ],
];
