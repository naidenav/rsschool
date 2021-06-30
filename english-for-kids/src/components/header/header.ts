/* eslint-disable import/no-cycle */

import './header.scss';
import { BaseComponent } from '../base-component';
import { App } from '../../app';
import { CardInfo, State } from '../../interfaces';
import { playAudio } from '../utils';

export class Header extends BaseComponent {
  readonly sidebarBtn: BaseComponent;

  readonly title: BaseComponent;

  readonly gameBtn: BaseComponent;

  readonly modeSwitcher: BaseComponent;

  constructor(app: App) {
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
    this.gameBtn = new BaseComponent('button', ['game-btn', 'game-btn-off']);
    this.gameBtn.element.setAttribute('id', 'game-btn');
    this.gameBtn.element.innerHTML = `
      <p class="game-btn__title">Start</p>
      <div class="game-btn__repeat-image"></div>
    `;
    this.modeSwitcher = new BaseComponent('div', ['mode-switcher']);
    this.modeSwitcher.element.innerHTML = `
      <input type="checkbox" id="mode-switcher__input">
        <label class="mode-switcher__container" for="mode-switcher__input">
            <span class="mode-switcher__circle"></span>
            <span class="mode-switcher__train">Train</span>
            <span class="mode-switcher__play">Play</span>
        </label>
    `;

    this.element.append(this.sidebarBtn.element, this.title.element, this.gameBtn.element, this.modeSwitcher.element);

    this.gameBtn.element.addEventListener('click', () => {
      const gameState:State = app.store.getState();
      if (!gameState.isGameStarted) {
        app.cardModule.startGame(app);
        this.setRepeatBtn();
      }
      if (gameState.isGameStarted) playAudio((gameState.currentCard as CardInfo).audioSrc);
    });
  }

  showGameBtn(): void {
    this.gameBtn.element.classList.remove('game-btn-off');
  }

  hideGameBtn(): void {
    this.gameBtn.element.classList.add('game-btn-off');
  }

  setStartGameBtn(): void {
    this.gameBtn.element.classList.remove('game-btn_transform');
  }

  setRepeatBtn(): void {
    this.gameBtn.element.classList.add('game-btn_transform');
  }
}
