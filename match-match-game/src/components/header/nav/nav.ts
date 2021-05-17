import './nav.scss';
import { BaseComponent } from '../../base-component';
import { NavBtn } from './nav-btn/nav-btn';

export class Nav extends BaseComponent {
  private readonly about: NavBtn;

  private readonly score: NavBtn;

  private readonly setting: NavBtn;

  constructor() {
    super('nav', ['nav']);
    this.about = new NavBtn('about', 'about game', '#about');
    this.score = new NavBtn('score', 'best score', '#score');
    this.setting = new NavBtn('setting', 'game setting', '#game');
    this.element.appendChild(this.about.element);
    this.element.appendChild(this.score.element);
    this.element.appendChild(this.setting.element);
  }
}
