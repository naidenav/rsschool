/* eslint-disable import/no-cycle */

import { App } from '../app';
import { CARDS_STORAGE, CORRECT_AUDIO_SRC, ERROR_AUDIO_SRC, FALSE_COUNT, MAIN_PAGE, STATISTICS_PAGE, TRAIN_COUNT, TRUE_COUNT, TRUE_PER_COUNT } from '../constants';
import { CardInfo, State } from '../interfaces';
import { Card } from './card/card';
import { addMistake, breakGame, setCurrentCard } from './redux/actions';

export const playAudio = (src: string): void => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
};

export const renderTableIcon = (iconClass: string): string => {
  return `
    <div class="table-icon ${iconClass}-icon"></div>
  `
}

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
  word: card.getWord(),
  translation: card.getTranslation(),
  image: card.getImageSrc(),
  audioSrc: card.getAudioSrc(),
  trainModeTurns: 0,
  trueChoices: 0,
  falseChoices: 0,
  trueChoicesPer: 0,
});

const calculatePercentage = (card: CardInfo) => {
  const falseChoices = card.falseChoices;
  const trueChoices = card.trueChoices;

  card.trueChoicesPer = Math.round(trueChoices / (trueChoices + falseChoices) * 100);
}

export const updateStatistics = (categoryIndex: string, word: string, count: string) => {
  if (categoryIndex === STATISTICS_PAGE) return;
  const cardsData = localStorage.getItem(CARDS_STORAGE);

  if ( cardsData !== null) {
    const cards: CardInfo[][] = JSON.parse(cardsData);
    const index = Number(categoryIndex);
    console.log(categoryIndex, word, count)
    const card: CardInfo | undefined = cards[index].find(item => item.word === word);
    if (card)
    switch (count) {
      case TRAIN_COUNT:
        card.trainModeTurns += 1;
        break;
      case TRUE_COUNT:
        card.trueChoices += 1;
        calculatePercentage(card)
        break;
      case FALSE_COUNT:
        card.falseChoices += 1;
        break;
      case TRUE_PER_COUNT:
        card.trueChoicesPer += 1;
        break;
    }

    localStorage.setItem(CARDS_STORAGE, JSON.stringify(cards));
  }
}

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
