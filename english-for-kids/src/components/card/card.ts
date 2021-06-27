import './card.scss';
import { BaseComponent } from '../base-component';
import { FLIP_CLASS, TITLE_HEIGHT } from '../../constants';

export class Card extends BaseComponent {
  card: BaseComponent;

  frontCard: BaseComponent;

  backCard: BaseComponent;

  trueCard: BaseComponent;

  frontTitle: BaseComponent;

  backTitle: BaseComponent;

  turnBtn: BaseComponent;

  constructor(image: string, word: string, translation: string, audioSrc: string) {
    super('div', ['card-container']);
    this.element.dataset.audio = audioSrc;
    this.card = new BaseComponent('div', ['card']);
    this.frontCard = new BaseComponent('div', ['card__front']);
    this.frontCard.element.style.background = `url('${image}') no-repeat`;
    this.backCard = new BaseComponent('div', ['card__back']);
    this.backCard.element.style.background = `url('${image}') no-repeat`;
    this.trueCard = new BaseComponent('div', ['card__true']);
    this.frontTitle = new BaseComponent('div', ['card__front-title'], word);
    this.backTitle = new BaseComponent('div', ['card__back-title'], translation);
    this.turnBtn = new BaseComponent('div', ['card__turn-btn']);

    this.frontCard.element.append(this.frontTitle.element);
    this.backCard.element.append(this.backTitle.element);
    this.frontTitle.element.append(this.turnBtn.element);
    this.card.element.append(this.frontCard.element, this.backCard.element);

    this.element.append(this.card.element, this.trueCard.element);
  }

  setTrueCard(): void {
    setTimeout(() => this.trueCard.element.classList.add('appearance-on'), 200);
  }

  hideTitile() {
    this.frontTitle.element.classList.add('hide-title');
  }

  showTitile() {
    this.frontTitle.element.classList.remove('hide-title');
  }
}
