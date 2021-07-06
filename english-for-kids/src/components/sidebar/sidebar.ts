/* eslint-disable import/no-cycle */

import './sidebar.scss';
import { BaseComponent } from '../base-component';
import { App } from '../../app';
import { CategoryInfo } from '../../interfaces';

export class Sidebar extends BaseComponent {
  private sidebarWrapper: BaseComponent;

  private list: BaseComponent;

  private buttonWrapper: BaseComponent;

  private logIn: BaseComponent;

  private logOut: BaseComponent;

  isSidebarOpen = false;

  constructor(app: App) {
    super('aside', ['sidebar']);
    this.sidebarWrapper = new BaseComponent('div', ['sidebar__wrapper']);
    this.list = new BaseComponent('ul', ['sidebar__list']);
    this.buttonWrapper = new BaseComponent('div', ['register-btn-wrapper']);
    this.logIn = new BaseComponent('button', ['register-btn'], 'Log In');
    this.logOut = new BaseComponent('button', ['register-btn', 'btn-hidden'], 'Log Out');
    this.buttonWrapper.element.append(this.logIn.element, this.logOut.element);
    this.sidebarWrapper.element.append(this.list.element);
    this.element.append(this.sidebarWrapper.element, this.buttonWrapper.element);

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

    this.logIn.element.addEventListener('click', () => {
      app.popup.showPopup();
    })
  }

  renderList(categories: CategoryInfo[]):void {
    const mainLink = document.createElement('li');
    mainLink.innerHTML = '<a href="#main" id="main-route" class="sidebar__link main-link active-route">Main page</a>';
    this.list.element.append(mainLink);
    categories.forEach((category) => {
      const link = document.createElement('li');
      link.innerHTML = `<a href="#${category.id}" id="${category.id}-route" class="sidebar__link">${category.category}</a>`;
      this.list.element.append(link);
    });
    const statisticsLink = document.createElement('li');
    const controlPage = document.createElement('li');
    statisticsLink.innerHTML = '<a href="#statistics" id="statistics-route" class="sidebar__link statistics-link">Statistics</a>';
    controlPage.innerHTML = '<a href="#control" id="control-route" class="sidebar__link btn-hidden">Control page</a>';
    this.list.element.append(statisticsLink, controlPage);
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

  showLogInBtn(): void {
    if (this.logIn.element.classList.contains('hidden')) {
      this.logIn.element.classList.remove('hidden');
      this.logOut.element.classList.add('hidden')
    }
  }

  showLogOutBtn(): void {
    if (this.logOut.element.classList.contains('hidden')) {
      this.logOut.element.classList.remove('hidden');
      this.logIn.element.classList.add('hidden')
    }
  }

  showControlRoute(): void {
    const controlRoute = document.getElementById('control-route');
    if (controlRoute?.classList.contains('hidden')) {
      controlRoute.classList.remove('hidden');
    }
  }

  hideControlRoute(): void {
    const controlRoute = document.getElementById('control-route');
    if (!controlRoute?.classList.contains('hidden')) {
      controlRoute?.classList.add('hidden');
    }
  }
}
