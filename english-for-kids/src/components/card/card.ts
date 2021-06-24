import './card.scss';
import { BaseComponent } from '../base-component';
import { FLIP_CLASS } from '../../constants';

export class Card extends BaseComponent {
  card: BaseComponent;

  frontCard: BaseComponent;

  backCard: BaseComponent;

  trueCard: BaseComponent;

  frontTitle: BaseComponent;

  backTitle: BaseComponent;

  turnBtn: BaseComponent;

  constructor(readonly image: string, word: string, translate: string) {
    super('div', ['card-container']);
    this.card = new BaseComponent('div', ['card']);
    this.frontCard = new BaseComponent('div', ['card__front']);
    this.frontCard.element.style.background = `url('${image}') no-repeat`;
    this.backCard = new BaseComponent('div', ['card__back']);
    this.backCard.element.style.background = `url('${image}') no-repeat`;
    this.trueCard = new BaseComponent('div', ['card__true']);
    this.frontTitle = new BaseComponent('div', ['card__title'], word);
    this.backTitle = new BaseComponent('div', ['card__title'], translate);
    this.turnBtn = new BaseComponent('div', ['card__turn-btn']);

    this.frontCard.element.append(this.frontTitle.element);
    this.backCard.element.append(this.backTitle.element);
    this.frontTitle.element.append(this.turnBtn.element);
    this.card.element.append(this.frontCard.element, this.backCard.element);

    this.element.append(this.card.element, this.trueCard.element);
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
}
