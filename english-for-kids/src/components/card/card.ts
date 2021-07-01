import './card.scss';
import { BaseComponent } from '../base-component';

export class Card extends BaseComponent {
  card: BaseComponent;

  frontCard: BaseComponent;

  backCard: BaseComponent;

  trueCard: BaseComponent;

  frontTitle: BaseComponent;

  backTitle: BaseComponent;

  turnBtn: BaseComponent;

  word: string;

  translation: string;

  imageSrc: string;

  audioSrc: string;

  constructor(image: string, word: string, translation: string, audioSrc: string) {
    super('div', ['card-container']);
    this.word = word;
    this.translation = translation;
    this.imageSrc = image;
    this.audioSrc = audioSrc;
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

    this.frontCard.element.append(this.trueCard.element, this.frontTitle.element);
    this.backCard.element.append(this.backTitle.element);
    this.frontTitle.element.append(this.turnBtn.element);
    this.card.element.append(this.frontCard.element, this.backCard.element);

    this.element.append(this.card.element);
  }

  hideTitile(): void {
    this.frontTitle.element.classList.add('hide-title');
  }

  showTitile(): void {
    this.frontTitle.element.classList.remove('hide-title');
  }

  getWord(): string {
    return this.word;
  }

  getTranslation(): string {
    return this.translation;
  }

  getImageSrc(): string {
    return this.imageSrc;
  }

  getAudioSrc(): string {
    return this.audioSrc;
  }

  setTrueCard(): void {
    this.trueCard.element.classList.add('true_on');
    this.element.classList.add('non-interactive');
  }

  removeTrueCard(): void {
    this.trueCard.element.classList.remove('true_on');
    this.element.classList.remove('non-interactive');
  }
}
