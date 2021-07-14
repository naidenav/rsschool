/* eslint-disable import/no-cycle */

import { App } from '../app';
import {
  CARDS_STORAGE, CLASS_NAMES, CONTROL_PAGE, CORRECT_AUDIO_SRC, ERROR_AUDIO_SRC, FALSE_COUNT,
  MAIN_PAGE, PLAY_MODE, STATISTICS_PAGE, TRAIN_COUNT, TRAIN_MODE, TRUE_COUNT, TRUE_PER_COUNT,
} from '../constants';
import { CardInfo, CategoryInfo, State } from '../interfaces';
import {
  createCategory, deleteCard, deleteCategory, getAllCategories, getCategory, updateCategoryInDB, updateCategoryName,
} from '../REST-api';
import { BaseComponent } from './base-component';
import { Card } from './card/card';
import { CategoryCard } from './category-card/category-card';
import { addMistake, breakGame, setCurrentCard } from './redux/actions';

export const getAllWords = async (): Promise<CardInfo[]> => {
  const categories = await getAllCategories();
  const words = categories
    .map(category => category.cards)
    .reduce((commonArray, currentArray) => commonArray.concat(currentArray), []);

  return words;
};

export const updateMode = (state: State, app: App): void => {
  if (state.mode === PLAY_MODE) {
    if (document.body.classList.contains(TRAIN_MODE)) {
      document.body.classList.remove(TRAIN_MODE);
      document.body.classList.add(PLAY_MODE);
    }

    app.cardModule.hideTitles();
  } else if (state.mode === TRAIN_MODE) {
    if (document.body.classList.contains(PLAY_MODE)) {
      document.body.classList.remove(PLAY_MODE);
      document.body.classList.add(TRAIN_MODE);
    }

    app.cardModule.showTitles();
  }
};

export const playAudio = (src: string): void => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
};

export const renderTableIcon = (iconClass: string): string => `
    <div class="table-icon ${iconClass}-icon"></div>
  `;

export const navigate = (content: HTMLElement, container: HTMLElement): void => {
  const currentChild = container.firstElementChild;
  if (currentChild) {
    container.replaceChild(content, currentChild);
  }
};

export const highlightActiveRoute = (state: string): void => {
  const prevRoute = document.querySelector('.active-route');
  prevRoute?.classList.remove('active-route');
  let page = state;
  if (page.includes('/')) page = page.split('/')[0];
  const currentRoute = document.getElementById(`${page}-route`);
  currentRoute?.classList.add('active-route');
};

export const getCardInfo = (card: Card): CardInfo => ({
  category: card.getCategory(),
  categoryId: card.getCategoryId(),
  word: card.getWord(),
  translation: card.getTranslation(),
  image: card.getImageSrc(),
  audioSrc: card.getAudioSrc(),
  trainModeTurns: 0,
  trueChoices: 0,
  falseChoices: 0,
  trueChoicesPer: 0,
});

export const getNewCategory = (name: string, id: number): CategoryInfo => ({
  category: name,
  id,
  cards: [],
});

export const getNewWord = (category: CategoryInfo, num: number): CardInfo => ({
  category: category.category,
  categoryId: category.id,
  word: `Word-${num}`,
  translation: 'Слово',
  image: 'https://res.cloudinary.com/naidenav/image/upload/v1625834746/efk-files/img/image-placeholder_yxuvx1.jpg',
  audioSrc: 'https://res.cloudinary.com/naidenav/video/upload/v1625834476/efk-files/audio/word_lpfgpi.mp3',
  trainModeTurns: 0,
  falseChoices: 0,
  trueChoices: 0,
  trueChoicesPer: 0,
});

const calculatePercentage = (card: CardInfo) => {
  const { falseChoices } = card;
  const { trueChoices } = card;

  card.trueChoicesPer = Math.round((trueChoices / (trueChoices + falseChoices)) * 100);
};

export const updateStatistics = async (categoryIndex: string, word: string, count: string): Promise<void> => {
  if (categoryIndex === STATISTICS_PAGE) return;
  const index = Number(categoryIndex);
  const category: CategoryInfo = await getCategory(index);

  const cards = category.cards;
  const cardIndex = cards.findIndex((item) => item.word === word);
    switch (count) {
      case TRAIN_COUNT:
        cards[cardIndex].trainModeTurns += 1;
        break;
      case TRUE_COUNT:
        cards[cardIndex].trueChoices += 1;
        calculatePercentage(cards[cardIndex]);
        break;
      case FALSE_COUNT:
        cards[cardIndex].falseChoices += 1;
        break;
      case TRUE_PER_COUNT:
        cards[cardIndex].trueChoicesPer += 1;
        break;
      default:
        break;
    }
  const catrgoryInfo: CategoryInfo = {
    category: category.category,
    id: category.id,
    cards: category.cards,
  };

  await updateCategoryInDB(catrgoryInfo);
};

function declareWrongChoice(app: App) {
  playAudio(ERROR_AUDIO_SRC);
  app.progressBar.wrongChoice();
  app.store.dispatch(addMistake());
}

function declareCorrectChoice(app: App, card: Card) {
  playAudio(CORRECT_AUDIO_SRC);
  app.progressBar.rightChoice();
  card.setTrueCard();
}

export const cardsHandler = async (cards: Card[], app: App, play: boolean): Promise<void> => {
  const cardInfo = getCardInfo(cards[0]);
  let state: State = app.store.getState();
  if (state.currentCard !== cardInfo) {
    app.store.dispatch(setCurrentCard(cardInfo));
    if (play) setTimeout(() => playAudio(cards[0].getAudioSrc()), 500);
  }
  app.cardModule.element.addEventListener('click', async (e) => {
    state = app.store.getState();
    if (state.isBreak) {
      app.store.dispatch(breakGame(false));
      return;
    }
    const target = (e.target as HTMLElement).closest('.card-container');
    if (target && target !== cards[0].element) {
      declareWrongChoice(app);
      await updateStatistics(state.page, cardInfo.word, FALSE_COUNT);
      cardsHandler(cards, app, false);
    } else if (target && target === cards[0].element) {
      declareCorrectChoice(app, cards[0]);
      await updateStatistics(state.page, cardInfo.word, TRUE_COUNT);
      if (cards.length > 1) {
        cards.shift();
        cardsHandler(cards, app, true);
      } else {
        app.cardModule.finishGame(app);
        app.header.hideGameBtn();
        state = app.store.getState();
        if (state.mistakes) {
          app.summary.failure(state.mistakes, app);
        } else app.summary.succes(app);
        setTimeout(() => {
          window.location.hash = `#${MAIN_PAGE}`;
        }, 4000);
      }
    } else cardsHandler(cards, app, false);
  }, { once: true });
};

export const createRecord = (card: CardInfo, index: number): HTMLElement => {
  const tr = new BaseComponent('tr', ['tr-body']);
  const tdPosition = new BaseComponent('td', ['td'], `${index + 1}.`);
  const thCategory = new BaseComponent('td', ['td'], `${card.category}`);
  const thWord = new BaseComponent('td', ['td'], `${card.word}`);
  const thTranslation = new BaseComponent('td', ['td'], `${card.translation}`);
  const thTrainCardsNum = new BaseComponent('td', ['td'], `${card.trainModeTurns}`);
  const thPlayCardsNum = new BaseComponent('td', ['td'], `${card.trueChoices}`);
  const thTrueCardsNum = new BaseComponent('td', ['td'], `${card.falseChoices}`);
  const thTrueCardsPer = new BaseComponent('td', ['td'], `${card.trueChoicesPer}`);

  tr.element.append(
    tdPosition.element,
    thCategory.element,
    thWord.element,
    thTranslation.element,
    thTrainCardsNum.element,
    thPlayCardsNum.element,
    thTrueCardsNum.element,
    thTrueCardsPer.element,
  );

  return tr.element;
};

export const getRandomDifficultWords = async (): Promise<CardInfo[]> => {
  const words = await getAllWords();
  const cardsList: CardInfo[] = [];
  words.forEach((word) => {
    if (word.trueChoicesPer > 0 && word.trueChoicesPer < 100) {
      cardsList.push(word);
    }
  });
  cardsList.sort((a, b) => (a.trueChoicesPer > b.trueChoicesPer ? 1 : -1));

  return cardsList.length <= 8 ? cardsList : cardsList.slice(0, 8);
};

export const trainDifficultWords = async (app: App): Promise<void> => {
  const cardsInfo = await getRandomDifficultWords();

  if (cardsInfo) {
    const cards = cardsInfo.map((item) => new Card(item.image, item.word, item.translation, item.audioSrc, item.category, item.categoryId));
    if (cards) {
      cards.sort(() => Math.random() - 0.5);
      const state: State = app.store.getState();
      app.cardModule.clear();
      app.cardModule.clearCardList();
      app.cardModule.render(state.mode, undefined, cards);
      navigate(app.cardModule.element, app.container.element);
    }
  }
};

export const showControlRoute = (): void => {
  const controlRoute = document.getElementById('categories-route');
  if (controlRoute?.classList.contains('btn-hidden')) {
    controlRoute.classList.remove('btn-hidden');
  }
};

export const hideControlRoute = (): void => {
  const controlRoute = document.getElementById('categories-route');
  if (!controlRoute?.classList.contains('btn-hidden')) {
    controlRoute?.classList.add('btn-hidden');
  }
};

export const updateCategoriesLists = async (app: App): Promise<void> => {
  const categories = await getAllCategories();
  app.sidebar.renderList(categories);
  showControlRoute();
  app.categoryModule.render(categories);
};

export const clear = (elem: HTMLElement): void => {
  elem.firstElementChild?.remove();
  if (elem.firstElementChild) clear(elem);
};

export const setCardEditMode = (id: string): void => {
  const mainView = document.getElementById(`main-view-${id}`);
  const updateView = document.getElementById(`update-view-${id}`);
  if (!mainView?.classList.contains('show-update-view')) {
    mainView?.classList.add('show-update-view');
    updateView?.classList.add('show-update-view');
  }
};

export const removeCardEditMode = (id: string): void => {
  const mainView = document.getElementById(`main-view-${id}`);
  const updateView = document.getElementById(`update-view-${id}`);
  if (mainView?.classList.contains('show-update-view')) {
    updateView?.classList.remove('show-update-view');
    mainView?.classList.remove('show-update-view');
  }
};

async function checkHash(app: App, routeName: string, state: State) {
  const adminWordsRoute = new RegExp(`^${CONTROL_PAGE}/\\d+$`);
  const adminCategoriesRoute = new RegExp(`^${CONTROL_PAGE}$`);
  const cardsModuleRoute = new RegExp('^\\d+$');
  if (cardsModuleRoute.test(routeName)) {
    if (state.mode === PLAY_MODE) app.header.showGameBtn();
    app.cardModule.clear();
    navigate(app.cardModule.element, app.container.element);
    const id = Number(routeName);
    const category = await getCategory(id);
    app.cardModule.render(state.mode, category);
  } else if (adminWordsRoute.test(routeName) && state.isAdmin) {
    const categoryId = Number(routeName.split('/')[1]);
    navigate(app.adminModule.element, app.container.element);
    navigate(app.adminModule.wordEditor.element, app.adminModule.container.element);
    app.adminModule.wordEditor.render(categoryId);
  } else if (adminCategoriesRoute.test(routeName) && state.isAdmin) {
    navigate(app.adminModule.element, app.container.element);
    navigate(app.adminModule.categoryEditor.element, app.adminModule.container.element);
    app.adminModule.categoryEditor.render();
  } else {
    window.location.hash = `#${MAIN_PAGE}`;
  }
}

export const switchPage = async (app: App, routeName: string): Promise<void> => {
  const state: State = app.store.getState();
  switch (routeName) {
    case MAIN_PAGE:
      if (state.mode === PLAY_MODE) app.header.hideGameBtn();
      navigate(app.categoryModule.element, app.container.element);
      break;
    case STATISTICS_PAGE:
      app.background.hide();
      app.statistics.render();
      navigate(app.statistics.element, app.container.element);
      break;
    default:
      checkHash(app, routeName, state);
      break;
  }
};

export const updateWordCard = (card: CardInfo, prevWord: string): void => {
  const wordCard = document.getElementById(`word-card-${prevWord}`);
  const audio = wordCard?.querySelector(`.${CLASS_NAMES.audio}`);
  const image = wordCard?.querySelector(`.${CLASS_NAMES.image}`);
  const word = wordCard?.querySelector(`.${CLASS_NAMES.word}`);
  const translation = wordCard?.querySelector(`.${CLASS_NAMES.translation}`);
  (audio as HTMLElement).dataset.src = card.audioSrc;
  (image as HTMLElement).style.backgroundImage = `url('${card.image}')`;
  (word as HTMLElement).innerHTML = card.word;
  (translation as HTMLElement).innerHTML = card.translation;
};

export const deleteWord = async (category: CategoryInfo, word: string): Promise<void> => {
  await deleteCard(category.id, word);
  const wordCard = document.getElementById(`${CLASS_NAMES.wordCard}-${word}`);
  wordCard?.remove();
};

export const updateCategoryCard = (category: CategoryInfo): void => {
  const categoryName = document.getElementById(`category-name-${category.id}`);
  (categoryName as HTMLElement).innerHTML = `${category.category}`;
};

export const addCategory = async (): Promise<void> => {
  const newCategory = await createCategory('New Category');
  const category = new CategoryCard(getNewCategory('New Category', newCategory.id));
  const addCard = document.querySelector('.add-category-card');
  (addCard as HTMLElement).before(category.element);
};

export const removeCategory = async (id: string): Promise<void> => {
  await deleteCategory(Number(id));
  const category = document.getElementById(`${CLASS_NAMES.categoryCard}-${id}`);
  category?.remove();
};

export const getNameInputValue = (id: string): string => {
  const nameInput = document.getElementById(`category-name-input-${id}`);
  return (nameInput as HTMLInputElement).value;
};

export const updateCategory = async (app: App, id: string): Promise<void> => {
  const nameInputValue = getNameInputValue(id);
  if (getNameInputValue(id)) {
    const category = await updateCategoryName(Number(id), nameInputValue);
    updateCategoryCard(category);
    await updateCategoriesLists(app);
  }
};

export const eventHandler = async (e: Event, app: App): Promise<void> => {
  const target = e.target as HTMLElement;
  const { id } = target.dataset;
  if (id) {
    switch (target.className) {
      case CLASS_NAMES.addWordBtn:
        window.location.hash = `#${CONTROL_PAGE}/${id}`;
        return;
      case CLASS_NAMES.cancelBtn:
        removeCardEditMode(id);
        return;
      case CLASS_NAMES.createBtn:
        await updateCategory(app, id);
        removeCardEditMode(id);
        return;
      case CLASS_NAMES.deleteBtn:
        await removeCategory(id);
        await updateCategoriesLists(app);
        return;
      case CLASS_NAMES.updateBtn:
        setCardEditMode(id);
        break;
      default:
        break;
    }
  }
};
