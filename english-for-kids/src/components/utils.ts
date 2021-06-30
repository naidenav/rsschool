/* eslint-disable import/no-cycle */

import { App } from '../app';
import { CORRECT_AUDIO_SRC, ERROR_AUDIO_SRC, MAIN_PAGE } from '../constants';
import { CardInfo, State } from '../interfaces';
import { Card } from './card/card';
import { addMistake, breakGame, setCurrentCard } from './redux/actions';

export const playAudio = (src: string): void => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
};

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
});

export const cardsHandler = async (cards: Card[], app: App): Promise<void> => {
  const cardInfo = getCardInfo(cards[0]);
  let state: State = app.store.getState();

  if (state.currentCard !== cardInfo) {
    app.store.dispatch(setCurrentCard(cardInfo));
    setTimeout(() => playAudio(cards[0].getAudioSrc()), 500);
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
      cardsHandler(cards, app);
      app.store.dispatch(addMistake());
    } else if (target && target === cards[0].element) {
      playAudio(CORRECT_AUDIO_SRC);
      app.progressBar.rightChoice();
      cards[0].setTrueCard();
      if (cards.length > 1) {
        cards.shift();
        cardsHandler(cards, app);
      } else {
        app.cardModule.finishGame(app);
        app.header.hideGameBtn();
        state = app.store.getState();
        if (state.mistakes) {
          app.summary.failure(state.mistakes, app);
        } else app.summary.succes(app);
        setTimeout(() => {
          window.location.hash = `#${MAIN_PAGE}`;
          app.header.showGameBtn();
        }, 4000);
      }
    }
  }, { once: true });
};
