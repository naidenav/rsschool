import './header.scss';
import { BaseComponent } from '../base-component';
import { Nav } from './nav/nav';
import { GameBtn } from './game-btn/game-btn';

export class Header extends BaseComponent {
  private readonly nav: Nav;

  private readonly gameBtn: GameBtn;

  constructor() {
    super('header', ['header']);
    this.nav = new Nav();
    this.gameBtn = new GameBtn('register new player');
    this.element.innerHTML = `
      <div class='game-logo'>
        <p class='match-top'>match</p>
        <p class='match-bottom'>match</p>
      </div>
    `;
    this.element.appendChild(this.nav.element);
    this.element.appendChild(this.gameBtn.element);
  }
}
