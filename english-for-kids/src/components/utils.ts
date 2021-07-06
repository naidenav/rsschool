/* eslint-disable import/no-cycle */

import { App } from '../app';
import {
  CARDS_STORAGE, CATEGORIES_STORAGE, CORRECT_AUDIO_SRC, ERROR_AUDIO_SRC, FALSE_COUNT,
  MAIN_PAGE, PLAY_MODE, STATISTICS_PAGE, TRAIN_COUNT, TRAIN_MODE, TRUE_COUNT, TRUE_PER_COUNT,
} from '../constants';
import { CardInfo, CategoryInfo, State } from '../interfaces';
import { BaseComponent } from './base-component';
import { Card } from './card/card';
import { addMistake, breakGame, setCurrentCard } from './redux/actions';

// export const initLocalStorage = (categories: CategoryInfo[]): void => {
//   if (!localStorage.getItem(CATEGORIES_STORAGE)) {
//     const data = JSON.stringify(categories);
//     localStorage.setItem(CATEGORIES_STORAGE, data);
//   }
// };

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

export const navigate = (content: HTMLElement, app: App): void => {
  const currentChild = app.container.element.firstElementChild;
  if (currentChild) {
    app.container.element.replaceChild(content, currentChild);
  }
};

export const highlightActiveRoute = (state: string): void => {
  const prevRoute = document.querySelector('.active-route');
  prevRoute?.classList.remove('active-route');
  const currentRoute = document.getElementById(`${state}-route`);
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

const calculatePercentage = (card: CardInfo) => {
  const { falseChoices } = card;
  const { trueChoices } = card;

  card.trueChoicesPer = Math.round((trueChoices / (trueChoices + falseChoices)) * 100);
};

export const updateStatistics = (categoryIndex: string, word: string, count: string): void => {
  if (categoryIndex === STATISTICS_PAGE) return;
  const cardsData = localStorage.getItem(CARDS_STORAGE);

  if (cardsData !== null) {
    const cards: CardInfo[][] = JSON.parse(cardsData);
    const index = Number(categoryIndex);
    const card: CardInfo | undefined = cards[index].find((item) => item.word === word);
    if (card) {
      switch (count) {
        case TRAIN_COUNT:
          card.trainModeTurns += 1;
          break;
        case TRUE_COUNT:
          card.trueChoices += 1;
          calculatePercentage(card);
          break;
        case FALSE_COUNT:
          card.falseChoices += 1;
          break;
        case TRUE_PER_COUNT:
          card.trueChoicesPer += 1;
          break;
        default:
          break;
      }
    }

    localStorage.setItem(CARDS_STORAGE, JSON.stringify(cards));
  }
};

export const cardsHandler = async (cards: Card[], app: App, play: boolean): Promise<void> => {
  const cardInfo = getCardInfo(cards[0]);
  let state: State = app.store.getState();
  if (state.currentCard !== cardInfo) {
    app.store.dispatch(setCurrentCard(cardInfo));
    if (play) setTimeout(() => playAudio(cards[0].getAudioSrc()), 500);
  }
  app.cardModule.element.addEventListener('click', (e) => {
    state = app.store.getState();
    if (state.isBreak) {
      app.store.dispatch(breakGame(false));
      return;
    }
    const target = (e.target as HTMLElement).closest('.card-container');
    if (target && target !== cards[0].element) {
      playAudio(ERROR_AUDIO_SRC);
      app.progressBar.wrongChoice();
      updateStatistics(state.page, cardInfo.word, FALSE_COUNT);
      app.store.dispatch(addMistake());
      cardsHandler(cards, app, false);
    } else if (target && target === cards[0].element) {
      playAudio(CORRECT_AUDIO_SRC);
      app.progressBar.rightChoice();
      cards[0].setTrueCard();
      updateStatistics(state.page, cardInfo.word, TRUE_COUNT);
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

export const getRandomDifficultWords = (app: App): CardInfo[] | undefined => {
  const { categories } = app;
  const cardsList: CardInfo[] = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].cards.length; j++) {
      if (categories[i].cards[j].trueChoicesPer > 0 && categories[i].cards[j].trueChoicesPer < 100) {
        cardsList.push(categories[i].cards[j]);
      }
    }
  }
  cardsList.sort((a, b) => (a.trueChoicesPer > b.trueChoicesPer ? 1 : -1));

  return cardsList.length <= 8 ? cardsList : cardsList.slice(0, 8);
};

export const trainDifficultWords = async (app: App): Promise<void> => {
  const cardsInfo = getRandomDifficultWords(app);

  if (cardsInfo) {
    const cards = cardsInfo.map((item) => new Card(item.image, item.word, item.translation, item.audioSrc, item.category, item.categoryId));
    if (cards) {
      cards.sort(() => Math.random() - 0.5);
      const state: State = app.store.getState();
      app.cardModule.clear();
      app.cardModule.clearCardList();
      app.cardModule.render(state.mode, undefined, cards);
      navigate(app.cardModule.element, app);
    }
  }
};
