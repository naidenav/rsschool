import './header.scss';
import { BaseComponent } from '../base-component';
import { App } from '../../app';

export class Header extends BaseComponent {
  readonly sidebarBtn: BaseComponent;

  readonly title: BaseComponent;

  readonly modeSwitcher: BaseComponent;

  readonly modeSwitcherInput: BaseComponent;

  constructor() {
    super('header', ['header']);
    this.sidebarBtn = new BaseComponent('button', ['header__sidebar-btn']);
    this.sidebarBtn.element.innerHTML = `
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
    `;
    this.title = new BaseComponent('h1', ['h1'], 'English for kids');
    this.modeSwitcher = new BaseComponent('div', ['mode-switcher']);
    this.modeSwitcherInput = new BaseComponent('input');
    this.modeSwitcherInput.element.setAttribute('type', 'checkbox');
    this.modeSwitcherInput.element.setAttribute('id', 'mode-switcher__input');
    this.modeSwitcher.element.append(this.modeSwitcherInput.element);
    this.modeSwitcher.element.innerHTML = `
      <input type="checkbox" id="mode-switcher__input">
        <label class="mode-switcher__container" for="mode-switcher__input">
            <span class="mode-switcher__circle"></span>
            <span class="mode-switcher__train">Train</span>
            <span class="mode-switcher__play">Play</span>
        </label>
    `;

    this.element.append(this.sidebarBtn.element, this.title.element, this.modeSwitcher.element);
  }
}


