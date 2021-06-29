import { App } from "../../app";
import { CARDS, CORRECT_AUDIO_SRC, ERROR_AUDIO_SRC, PLAY_MODE } from "../../constants";
import { CardInfo, State } from "../../interfaces";
import { BaseComponent } from "../base-component";
import { Card } from "../card/card";
import { breakGame, game, setCurrentCard } from "../redux/actions";
import { checkCard, getCardInfo, playAudio } from "../utils";

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

    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('card__turn-btn')) {
        const card = (e.target as HTMLElement).closest('.card-container');
        card?.classList.add('flipped');
        card?.addEventListener('mouseleave', () => {
          card.classList.remove('flipped');
        }, { once: true });
      }
    });
  }

  render(index: string, state: string) {
    this.cardList = [];
    const i = +index;
    CARDS[i].forEach(item => {
      const card = new Card(item.image, item.word, item.translation, item.audioSrc);
      if (state === PLAY_MODE) card.hideTitile();
      this.element.append(card.element);
      this.cardList.push(card);
    })
  }

  clear() {
    this.element.firstElementChild?.remove();
    if (this.element.firstElementChild) this.clear();
  }

  hideTitles() {
    const cards = document.querySelectorAll('.card__front-title');
    cards.forEach(item => item.classList.add('hide-title'));
  }

  showTitles() {
    const cards = document.querySelectorAll('.card__front-title');
    cards.forEach(item => item.classList.remove('hide-title'));
  }

  async startGame(app: App) {
    const cards = [...this.cardList].sort(() => Math.random() - 0.5);

    app.store.dispatch(game(true));

    await checkCard(cards, app);
  }

  finishGame(app: App) {
    app.store.dispatch(game(false));
    app.store.dispatch(breakGame(true));
    app.store.dispatch(setCurrentCard(null));
    app.header.setStartGameBtn();
    this.cardList.forEach(item => item.removeTrueCard())
    app.progressBar.clear();
  }
}
