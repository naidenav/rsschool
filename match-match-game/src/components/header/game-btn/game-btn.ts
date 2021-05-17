import './game-btn.scss';
import { BaseComponent } from '../../base-component';

export class GameBtn extends BaseComponent {
  constructor(title: string) {
    super('button', ['game-btn']);
    this.element.innerHTML = title;
  }
}
