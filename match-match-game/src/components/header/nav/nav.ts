import './nav.scss';
import { BaseComponent } from '../../base-component';
import { NavBtn } from './nav-btn/nav-btn';

export class Nav extends BaseComponent {
  readonly about: NavBtn;

  readonly score: NavBtn;

  readonly setting: NavBtn;

  constructor() {
    super('nav', ['nav']);
    this.about = new NavBtn('about', 'about game', '#about');
    this.score = new NavBtn('score', 'best score', '#score');
    this.setting = new NavBtn('setting', 'game setting', '#setting');
    this.element.append(this.about.element, this.score.element, this.setting.element);
  }

  removeHighlight() {
    const routes = [this.about.element, this.score.element, this.setting.element];
    routes.forEach((elem) => {
      if (elem.classList.contains('highlight')) {
        elem.classList.remove('highlight');
      }
    })
  }
}
