import './progress-bar.scss';
import { BaseComponent } from "../base-component";

export class ProgressBar extends BaseComponent {
  constructor() {
    super('div', ['progress-bar']);
  }

  rightChoice() {
    const rightIcon = new BaseComponent('div', ['progress-bar__right-icon']);
    this.element.append(rightIcon.element);
  }

  wrongChoice() {
    const wrongIcon = new BaseComponent('div', ['progress-bar__wrong-icon']);
    this.element.append(wrongIcon.element);
  }

  clear() {
    this.element.firstElementChild?.remove();
    if (this.element.firstElementChild) this.clear();
  }
}
