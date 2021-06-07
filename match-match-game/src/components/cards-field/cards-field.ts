import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 5;

export class CardsField extends BaseComponent {
  public cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => {
      card.element.classList.add('not-available');
      this.element.appendChild(card.element);
    });
    setTimeout(() => {
      this.cards.forEach((card) => {
        card.flipToBack();
        card.element.classList.remove('not-available');
      });
    }, SHOW_TIME * 1000);
  }

  setDefault(): void {
    if (this.element.classList.contains('cards-field_24')) {
      this.element.classList.remove('cards-field_24');
    }
    if (this.element.classList.contains('cards-field_36')) {
      this.element.classList.remove('cards-field_36');
    }
  }
}
