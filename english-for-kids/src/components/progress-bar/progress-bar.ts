import './progress-bar.scss';
import { BaseComponent } from '../base-component';
import { PLACE_FOR_ICON } from '../../constants';

export class ProgressBar extends BaseComponent {
  constructor() {
    super('div', ['progress-bar']);
  }

  rightChoice(): void {
    this.checkWidth();
    const rightIcon = new BaseComponent('div', ['progress-bar__right-icon']);
    this.element.append(rightIcon.element);
  }

  wrongChoice(): void {
    this.checkWidth();
    const wrongIcon = new BaseComponent('div', ['progress-bar__wrong-icon']);
    this.element.append(wrongIcon.element);
  }

  checkWidth(): void {
    const width = this.element.clientWidth;
    const numOfIcons = this.element.children.length;
    const widthOfAllIcons = numOfIcons * PLACE_FOR_ICON;

    if (widthOfAllIcons + PLACE_FOR_ICON > width) this.element.firstElementChild?.remove();
  }

  clear(): void {
    this.element.firstElementChild?.remove();
    if (this.element.firstElementChild) this.clear();
  }
}
