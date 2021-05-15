import './nav-btn.scss';
import { BaseComponent } from '../../../base-component';

export class NavBtn extends BaseComponent {
  constructor(image: string, title: string, href: string) {
    super('a', ['nav-btn']);
    this.element.setAttribute('href', href);
    const img = require(`../../../../assets/icons/${image}.svg`);
    this.element.innerHTML = `
      <img class='nav-btn__icon' src='${img}' height='20' width='20' alt='${image}'>
      <p class='nav-btn__title'>${title}</p>
    `;
  }
}
