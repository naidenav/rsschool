import './header.scss';
import { BaseComponent } from '../base-component';
import { Nav } from './nav/nav';
import { GameBtn } from './game-btn/game-btn';

export class Header extends BaseComponent {
  readonly nav: Nav;

  readonly registerUserBtn: GameBtn;

  readonly startGameBtn: GameBtn;

  readonly stopGameBtn: GameBtn;

  readonly userName: BaseComponent;

  constructor() {
    super('header', ['header']);
    this.nav = new Nav();
    this.registerUserBtn = new GameBtn('register new player');
    this.startGameBtn = new GameBtn('start game');
    this.stopGameBtn = new GameBtn('stop game');
    this.userName = new BaseComponent('p', ['user-name'])
    this.element.innerHTML = `
      <div class='game-logo'>
        <p class='match-top'>match</p>
        <p class='match-bottom'>match</p>
      </div>
    `;
    const userName = sessionStorage.getItem('firstName');
    if (userName) {
      this.userName.element.innerText = userName;
    }
    this.element.append(this.nav.element);
    if (userName) {
      this.element.append(this.startGameBtn.element);
    } else this.element.append(this.registerUserBtn.element);
    this.element.append(this.userName.element);
  }
}
