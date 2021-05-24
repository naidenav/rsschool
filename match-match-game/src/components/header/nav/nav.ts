import './nav.scss';
import { BaseComponent } from '../../base-component';
import { NavBtn } from './nav-btn/nav-btn';

export class Nav extends BaseComponent {
  readonly about: NavBtn;

  readonly score: NavBtn;

  readonly setting: NavBtn;

  constructor() {
    super('nav', ['nav']);
    this.about = new NavBtn(0, 'about game', '#about');
    this.about.element.classList.add('nav-btn_highlight');
    this.score = new NavBtn(1, 'best score', '#score');
    this.setting = new NavBtn(2, 'game setting', '#setting');
    this.element.append(this.about.element, this.score.element, this.setting.element);
  }

  removeHighlight(): void {
    const routes = [this.about.element, this.score.element, this.setting.element];
    routes.forEach((elem) => {
      if (elem.classList.contains('nav-btn_highlight')) {
        elem.classList.remove('nav-btn_highlight');
      }
    });
  }
}
