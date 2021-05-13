import './main.scss';
import { BaseComponent } from '../base-component';
import { Game } from '../game/game';

export class Main extends BaseComponent {
  readonly game: Game;

  constructor() {
    super('main', ['main']);
    this.game = new Game();
    this.element.appendChild(this.game.element);
  }
}
