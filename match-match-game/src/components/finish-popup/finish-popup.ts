import './finish-popup.scss';
import { BaseComponent } from '../base-component';
import { Button } from '../shared/button/button';

export class FinishPopup extends BaseComponent {
  readonly finishPopup: BaseComponent;

  readonly content: BaseComponent;

  readonly button: BaseComponent;

  constructor() {
    super('div', ['cover', 'cover_hidden']);
    this.finishPopup = new BaseComponent('div', ['finish-popup']);
    this.content = new BaseComponent('p', ['finish-popup__content']);
    this.button = new BaseComponent('button', ['finish-popup__button'], 'ok');

    this.element.append(this.finishPopup.element);
    this.finishPopup.element.append(this.content.element, this.button.element);
  }

  showFinishPopup() {
    this.element.classList.add('popup_opacity-up');
    this.element.classList.remove('cover_hidden');
    this.element.addEventListener('animationend', () => {
      this.element.classList.remove('popup_opacity-up');
      this.element.classList.remove('cover_hidden');
      document.body.classList.add('notScrollable');
    });
  }

  hideFinishPopup() {
    document.body.classList.remove('notScrollable');
    this.element.classList.add('cover_hidden');
  }
}
