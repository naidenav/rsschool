import './nav-btn.scss';
import { BaseComponent } from '../../../base-component';
import aboutIcon from '../../../../assets/icons/about.svg';
import scoreIcon from '../../../../assets/icons/score.svg';
import settingIcon from '../../../../assets/icons/setting.svg';

export class NavBtn extends BaseComponent {
  constructor(icon: number, title: string, href: string) {
    super('a', ['nav-btn']);
    this.element.setAttribute('href', href);
    const icons = [aboutIcon, scoreIcon, settingIcon];
    this.element.innerHTML = `
      <img class='nav-btn__icon' src='${icons[icon]}' height='20' width='20' alt='icon'>
      <p class='nav-btn__title'>${title}</p>
    `;
  }

  disable(): void {
    this.element.classList.add('nav-btn_disabled');
  }

  enable(): void {
    this.element.classList.remove('nav-btn_disabled');
  }

  highlight(): void {
    this.element.classList.add('highlight');
  }
}
