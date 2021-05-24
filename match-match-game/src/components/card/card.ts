import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  falseCard: BaseComponent;

  trueCard: BaseComponent;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.falseCard = new BaseComponent('div', ['false-card']);
    this.trueCard = new BaseComponent('div', ['true-card']);
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background: url('./images/${image}') center"></div>
        <div class="card__back"></div>
      </div>
    `;
    this.element.append(this.falseCard.element, this.trueCard.element);
  }

  flipToBack(): Promise<void> {
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  setTrueCard(): void {
    setTimeout(() => this.trueCard.element.classList.add('appearance-on'), 200);
  }

  setFalseCard(): void {
    setTimeout(() => this.falseCard.element.classList.add('appearance-on'), 200);
    setTimeout(() => this.falseCard.element.classList.remove('appearance-on'), 1800);
  }
}
