import './game.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../shared/delay';
import { Timer } from '../shared/timer/timer';
import { FinishPopup } from '../finish-popup/finish-popup';

const FLIP_DELAY = 2000;

export class Game extends BaseComponent {
  cardsField: CardsField;

  finishPopup: FinishPopup;

  private activeCard?: Card;

  private isAnimation = false;

  timer: Timer;

  private totalCountCouple = 8;

  score = 0;

  private successCompare = 0;

  private wrongCompare = 0;

  constructor() {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.finishPopup = new FinishPopup();
    this.timer = new Timer();
    this.element.append(this.timer.element);
    this.element.append(this.cardsField.element, this.finishPopup.element);
  }

  startGame(images: string[]): void {
    const count = Number(sessionStorage.getItem('difficulty'));
    this.totalCountCouple = count / 2;
    this.successCompare = 0;
    this.wrongCompare = 0;
    this.score = 0;
    this.timer.stopTimer();
    this.timer.resetTimer();
    this.isAnimation = false;
    this.activeCard = undefined;

    this.cardsField.setDefault();

    if (count !== 16) {
      this.cardsField.element.classList.add(`cards-field_${count}`);
    }

    this.cardsField.clear();
    const cards: Card[] = images
      .sort(() => Math.random() - 0.5)
      .slice(0, count / 2)
      .concat(images.slice(0, count / 2))
      .sort(() => Math.random() - 0.5)
      .map((url) => new Card(url));

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
    setTimeout(() => this.timer.startTimer(), 5000);
  }

  getScore(): void {
    this.timer.stopTimer();
    const seconds = this.timer.getSeconds();

    this.score = ((this.successCompare - this.wrongCompare) * 100 - seconds * 10) * (this.totalCountCouple / 8);
    if (this.score < 0) this.score = 0;
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
    } else {
      if (card.image === this.activeCard.image) {
        this.activeCard.setTrueCard();
        card.setTrueCard();
        card.element.classList.add('not-available');
        this.activeCard.element.classList.add('not-available');
        this.successCompare++;
        this.isAnimation = false;
        if (this.successCompare < this.totalCountCouple) {
          this.activeCard = undefined;
          return;
        }
        this.getScore();

        this.finishPopup.content.element.innerHTML = `Congratulations! You successfully found all
        matches in <span class='bold'>${this.timer.minutes}.${this.timer.seconds < 10 ? `0${this.timer.seconds}` : this.timer.seconds}</span>
        minutes. Your result is <span class='bold'>${this.score}</span> points`;
        this.finishPopup.showFinishPopup();
      }
      if (this.activeCard.image !== card.image) {
        this.wrongCompare++;
        this.activeCard.setFalseCard();
        card.setFalseCard();
        await delay(FLIP_DELAY);
        await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      }
      this.activeCard = undefined;
    }

    this.isAnimation = false;
  }
}
