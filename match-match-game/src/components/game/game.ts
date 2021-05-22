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

  currentCountCouple: number = 0;

  totalCountCouple: number = 8;

  score: number = 0;

  totalCompare: number = 0;

  wrongCompare: number = 0;

  constructor() {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.timer = new Timer();
    this.element.append(this.timer.element);
    this.element.append(this.cardsField.element);
  }

  newGame(images: string[]): void {
    const count = Number(sessionStorage.getItem('difficulty'));
    if (count !== 16) {
      if (this.cardsField.element.classList.contains('cards-field_24')) {
        this.cardsField.element.classList.remove('cards-field_24');
      }
      if (this.cardsField.element.classList.contains('cards-field_36')) {
        this.cardsField.element.classList.remove('cards-field_36');
      }
      this.cardsField.element.classList.add(`cards-field_${count}`);
    }
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
    setTimeout(() => this.timer.startTimer(), 5000);
  }

  getScore() {
    this.timer.finishTimer();
    const seconds = this.timer.getSeconds();
    this.score = ((this.totalCompare - this.wrongCompare) * 100
    - seconds * 10) * (this.totalCountCouple / 8);
    if (this.score < 0) this.score = 0;
    console.log(this.score);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    this.isAnimation = true;

    this.totalCompare++;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
    } else {
      if (card.image === this.activeCard.image) {
        card.element.classList.add('not-available');
        this.activeCard.element.classList.add('not-available');
        this.currentCountCouple++;
        this.isAnimation = false;
        if (this.currentCountCouple < this.totalCountCouple) {
          this.activeCard = undefined;
          return;
        } else this.getScore();
      }
      if (this.activeCard.image !== card.image) {
        this.wrongCompare++;
        await delay(FLIP_DELAY);
        await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      }
      this.activeCard = undefined;
    }

    this.isAnimation = false;
  }
}
