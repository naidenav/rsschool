import './header.scss';
import { BaseComponent } from '../base-component';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.element.innerHTML = `
    <button class="header__nav-btn">
      <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="2.5" x2="40" y2="2.5" stroke="#333333" stroke-width="5"/>
        <line x1="5" y1="13.5" x2="40" y2="13.5" stroke="#333333" stroke-width="5"/>
        <line x1="5" y1="24.5" x2="40" y2="24.5" stroke="#333333" stroke-width="5"/>
      </svg>
    </button>
    <h1 class="h1">English for kids</h1>
    <div class="mode-switcher">
      <input type="checkbox" id="mode-switcher__input">
      <label class="mode-switcher__container" for="mode-switcher__input">
          <span class="mode-switcher__circle"></span>
          <span class="mode-switcher__train">Train</span>
          <span class="mode-switcher__play">Play</span>
      </label>
    </div>
    `
  }
}


