import { CARDS, PLAY_MODE } from "../../constants";
import { BaseComponent } from "../base-component";
import { Card } from "../card/card";
import { playAudio } from "../utils";

export class CardModule extends BaseComponent {
  constructor() {
    super('div', ['card-module']);

    this.element.addEventListener('click', (e) => {
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
    const i = +index;
    CARDS[i].forEach(item => {
      const card = new Card(item.image, item.word, item.translation, item.audioSrc);
      if (state === PLAY_MODE) card.hideTitile();
      this.element.append(card.element);
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
}
