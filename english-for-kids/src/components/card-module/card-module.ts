/* eslint-disable import/no-cycle */

import { App } from '../../app';
import { FLIPP_DELAY, PLAY_MODE, TRAIN_COUNT } from '../../constants';
import { CategoryInfo, State } from '../../interfaces';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { game, removeMistakes, setCurrentCard } from '../redux/actions';
import { cardsHandler, playAudio, updateStatistics } from '../utils';

export class CardModule extends BaseComponent {
  cardList: Card[] = [];

  constructor(app: App) {
    super('div', ['card-module']);

    this.element.addEventListener('click', (e) => {
      const state: State = app.store.getState();
      if (state.mode === PLAY_MODE) return;

      const card = (e.target as HTMLElement).closest('.card-container');
      if (card && !(e.target as HTMLElement).classList.contains('card__turn-btn')) {
        const audioSrc = (card as HTMLElement).dataset.audio;
        if (audioSrc) {
          playAudio(audioSrc);
        }
      }
    });

    this.element.addEventListener('click', async (e) => {
      if ((e.target as HTMLElement).classList.contains('card__turn-btn')) {
        const card = (e.target as HTMLElement).closest('.card-container');
        const state: State = app.store.getState();
        const { word } = (card as HTMLElement).dataset;
        if (word) await updateStatistics(state.page, word, TRAIN_COUNT);
        card?.classList.add('flipped');
        setTimeout(() => card?.classList.remove('flipped'), FLIPP_DELAY);
      }
    });
  }

  render(state: string, category?: CategoryInfo, difficultWords?: Card[]): void {
    this.clearCardList();
    if (category && !difficultWords) {
      category.cards.forEach((item) => {
        const card = new Card(item.image, item.word, item.translation, item.audioSrc, item.category, item.categoryId);
        if (state === PLAY_MODE) card.hideTitile();
        this.element.append(card.element);
        this.cardList.push(card);
      });
    } else if (!category && difficultWords) {
      difficultWords.forEach((card) => {
        if (state === PLAY_MODE) card.hideTitile();
        this.element.append(card.element);
        this.cardList.push(card);
      });
    }
  }

  clear(): void {
    this.element.firstElementChild?.remove();
    if (this.element.firstElementChild) this.clear();
  }

  clearCardList(): void {
    this.cardList = [];
  }

  hideTitles(): void {
    this.cardList.forEach((item) => item.hideTitile());
  }

  showTitles(): void {
    this.cardList.forEach((item) => item.showTitile());
  }

  async startGame(app: App): Promise<void> {
    const cards = [...this.cardList].sort(() => Math.random() - 0.5);
    app.store.dispatch(game(true));
    app.store.dispatch(removeMistakes());

    await cardsHandler(cards, app, true);
  }

  finishGame(app: App): void {
    app.store.dispatch(game(false));
    app.store.dispatch(setCurrentCard(null));
    app.header.setStartGameBtn();
    this.cardList.forEach((item) => item.removeTrueCard());
    app.progressBar.clear();
  }
}
