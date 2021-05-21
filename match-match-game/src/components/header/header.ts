import './header.scss';
import { BaseComponent } from '../base-component';
import { Nav } from './nav/nav';
import { GameBtn } from './game-btn/game-btn';

export class Header extends BaseComponent {
  readonly nav: Nav;

  readonly registerUserBtn: GameBtn;

  readonly startGameBtn: GameBtn;

  readonly stopGameBtn: GameBtn;

  constructor() {
    super('header', ['header']);
    this.nav = new Nav();
    this.registerUserBtn = new GameBtn('register new player');
    this.startGameBtn = new GameBtn('start game');
    this.stopGameBtn = new GameBtn('stop game');
    this.element.innerHTML = `
      <div class='game-logo'>
        <p class='match-top'>match</p>
        <p class='match-bottom'>match</p>
      </div>
    `;
    this.element.appendChild(this.nav.element);
    this.element.appendChild(this.registerUserBtn.element);
  }
}
