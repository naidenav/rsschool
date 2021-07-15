import { State } from './interfaces';

export const CLASS_NAMES = {
  categoryCard: 'category-card',
  updateBtn: 'category-card__update-btn',
  addWordBtn: 'category-card__add-word-btn',
  createBtn: 'category-card__create-btn',
  cancelBtn: 'category-card__cancel-btn',
  deleteBtn: 'category-card__delete-btn',
  nameInput: 'category-card__input',
  categoryName: 'category-card__title',
  wordCard: 'word-card',
  audio: 'word-card__audio',
  image: 'word-card__image',
  word: 'word-card__word',
  translation: 'word-card__translation',
  changeBtn: 'word-card__change-btn',
  wordCancelBtn: 'word-card__cancel-btn',
  wordDeleteBtn: 'word-card__delete-btn',
  saveBtn: 'word-card__save-btn',
};

export const ACCESS_TOKEN_KEY = 'accessToken';

export const LOGIN = 'admin';

export const PASSWORD = 'admin';

export const BASE_URL = 'https://alluring-glacier-28316.herokuapp.com';

export const CATEGORIES_STORAGE = 'efkCategories';

export const CARDS_STORAGE = 'efkCards';

export const TRAIN_COUNT = 'TRAIN_COUNT';

export const TRUE_COUNT = 'TRUE_COUNT';

export const FALSE_COUNT = 'FALSE_COUNT';

export const TRUE_PER_COUNT = 'TRUE_PER_COUNT';

export const MAIN_PAGE = 'main';

export const TRAIN_DIFFICULT_PAGE = 'train';

export const STATISTICS_PAGE = 'statistics';

export const CONTROL_PAGE = 'categories';

export const TRAIN_MODE = 'train-mode';

export const PLAY_MODE = 'play-mode';

export const ERROR_AUDIO_SRC = 'https://res.cloudinary.com/naidenav/video/upload/v1625392328/efk-files/audio/error_sh2l3u.mp3';

export const CORRECT_AUDIO_SRC = 'https://res.cloudinary.com/naidenav/video/upload/v1625392326/efk-files/audio/correct_rdfl23.mp3';

export const SUCCESS_AUDIO_SRC = 'https://res.cloudinary.com/naidenav/video/upload/v1625392335/efk-files/audio/success_gye62h.mp3';

export const FAILURE_AUDIO_SRC = 'https://res.cloudinary.com/naidenav/video/upload/v1625392328/efk-files/audio/failure_j2ezli.mp3';

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
  isAdmin: false,
};

export const TITLE_HEIGHT = '25%';
