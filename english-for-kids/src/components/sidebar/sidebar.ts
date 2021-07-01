/* eslint-disable import/no-cycle */

import './sidebar.scss';
import { BaseComponent } from '../base-component';
import { App } from '../../app';
import { CATEGORIES } from '../../constants';

export class Sidebar extends BaseComponent {
  private list: BaseComponent;

  isSidebarOpen = false;

  constructor(app: App) {
    super('aside', ['sidebar']);
    this.list = new BaseComponent('ul', ['sidebar__list']);
    this.element.append(this.list.element);

    app.header.sidebarBtn.element.addEventListener('click', () => {
      if (app.header.sidebarBtn.element.classList.contains('sidebar-btn_active')) {
        this.hideSidebar(app);
      } else {
        this.showSidebar(app);
      }
    });

    document.body.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).classList.contains('sidebar') && this.isSidebarOpen) {
        this.hideSidebar(app);
      }
    });
  }

  renderList():void {
    const mainLink = document.createElement('li');
    mainLink.innerHTML = '<a href="#main" id="main-route" class="sidebar__link main-link active-route">Main page</a>';
    this.list.element.append(mainLink);
    CATEGORIES.forEach((category, index) => {
      const link = document.createElement('li');
      link.innerHTML = `<a href="#${index}" id="${index}-route" class="sidebar__link">${category}</a>`;
      this.list.element.append(link);
    });
    const statisticsLink = document.createElement('li');
    statisticsLink.innerHTML = '<a href="#statistics" id="statistics-route" class="sidebar__link statistics-link">Statistics</a>';
    this.list.element.append(statisticsLink);
  }

  showSidebar(app: App): void {
    this.element.style.transform = 'translateX(0)';
    app.header.sidebarBtn.element.classList.add('sidebar-btn_active');
    this.element.addEventListener('transitionend', () => {
      this.isSidebarOpen = true;
    });
  }

  hideSidebar(app: App): void {
    this.element.style.transform = 'translateX(-102%)';
    app.header.sidebarBtn.element.classList.remove('sidebar-btn_active');
    this.element.addEventListener('transitionend', () => {
      this.isSidebarOpen = false;
    });
  }
}
