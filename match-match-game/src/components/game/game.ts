import './game.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../game-field/cards-field';
import { delay } from '../shared/delay';
import { Timer } from '../shared/timer/timer';

const FLIP_DELAY = 2000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private timer: Timer;

  constructor() {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.timer = new Timer();
    this.element.append(this.timer.element);
    this.element.append(this.cardsField.element);
  }

  newGame(images: string[]): void {
    const count = Number(sessionStorage.getItem('difficulty'));
    this.cardsField.clear();
    const cards: Card[] = images
      .sort(() => Math.random() - 0.5)
      .slice(0, (count / 2))
      .concat(images.slice(0, (count / 2)))
      .sort(() => Math.random() - 0.5)
      .map((url) => new Card(url));

    cards.forEach((card) => {
      card.element.addEventListener('click', (e) => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
    setTimeout(() => this.timer.startTimer(), 3000);
    setTimeout(() => this.timer.finishTimer(), 10000);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
    } else {
      if (card === this.activeCard) {
        this.isAnimation = false;
        return;
      }
      if (this.activeCard.image !== card.image) {
        await delay(FLIP_DELAY);
        await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      }
      this.activeCard = undefined;
    }

    this.isAnimation = false;
  }
}
