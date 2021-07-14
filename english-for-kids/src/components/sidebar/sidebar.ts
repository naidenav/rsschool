/* eslint-disable import/no-cycle */

import './sidebar.scss';
import { BaseComponent } from '../base-component';
import { App } from '../../app';
import { CategoryInfo, State } from '../../interfaces';
import { removeAdminMode } from '../redux/actions';
import {
  ACCESS_TOKEN_KEY, CONTROL_PAGE, MAIN_PAGE, STATISTICS_PAGE,
} from '../../constants';
import { hideControlRoute } from '../utils';

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
    });

    this.logOut.element.addEventListener('click', () => {
      app.store.dispatch(removeAdminMode());
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      this.showLogInBtn();
      hideControlRoute();
      const store: State = app.store.getState();
      if (store.page === CONTROL_PAGE) window.location.hash = `#${MAIN_PAGE}`;
    });
  }

  renderList(categories: CategoryInfo[]):void {
    this.clearList();
    const controlPage = document.createElement('li');
    controlPage.innerHTML = `<a href="#${CONTROL_PAGE}" id="categories-route" class="sidebar__link control-link btn-hidden">Control page</a>`;
    const mainLink = document.createElement('li');
    mainLink.innerHTML = `<a href="#${MAIN_PAGE}" id="main-route" class="sidebar__link main-link active-route">Main page</a>`;
    this.list.element.append(controlPage, mainLink);
    categories.forEach((category) => {
      const link = document.createElement('li');
      link.innerHTML = `<a href="#${category.id}" id="${category.id}-route" class="sidebar__link">${category.category}</a>`;
      this.list.element.append(link);
    });
    const statisticsLink = document.createElement('li');
    statisticsLink.innerHTML = `<a href="#${STATISTICS_PAGE}" id="statistics-route" class="sidebar__link statistics-link">Statistics</a>`;
    this.list.element.append(statisticsLink);
  }

  clearList(): void {
    this.list.element.firstElementChild?.remove();
    if (this.list.element.firstElementChild) this.clearList();
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
    if (this.logIn.element.classList.contains('btn-hidden')) {
      this.logIn.element.classList.remove('btn-hidden');
      this.logOut.element.classList.add('btn-hidden');
    }
  }

  showLogOutBtn(): void {
    if (this.logOut.element.classList.contains('btn-hidden')) {
      this.logOut.element.classList.remove('btn-hidden');
      this.logIn.element.classList.add('btn-hidden');
    }
  }
}
