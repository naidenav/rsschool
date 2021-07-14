/* eslint-disable import/no-cycle */

import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { AdminModule } from './components/admin-module/admin-module';
import { Background } from './components/background';
import { BaseComponent } from './components/base-component';
import { CardModule } from './components/card-module/card-module';
import { CategoryModule } from './components/category-module/category-module';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Popup } from './components/popup/popup';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { breakGame, setAdminMode, switchMode } from './components/redux/actions';
import { rootReducer } from './components/redux/rootReducer';
import { Router } from './components/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Statistics } from './components/statistics/statistics';
import { Summary } from './components/summary/summary';
import { highlightActiveRoute, showControlRoute, updateMode } from './components/utils';
import {
  ACCESS_TOKEN_KEY,
  INITIAL_STATE, PLAY_MODE, STATISTICS_PAGE, TRAIN_MODE,
} from './constants';
import { CategoryInfo, State } from './interfaces';

export class App {
  categories: CategoryInfo[];

  readonly router: Router;

  readonly background: Background;

  private wrapper: BaseComponent;

  readonly header: Header;

  readonly progressBar: ProgressBar;

  readonly sidebar: Sidebar;

  readonly summary: Summary;

  readonly container: BaseComponent;

  readonly categoryModule: CategoryModule;

  readonly cardModule: CardModule;

  readonly footer: Footer;

  readonly statistics: Statistics;

  readonly popup: Popup;

  readonly adminModule: AdminModule;

  readonly store: Store = createStore(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(thunk),
  );

  constructor(private readonly rootElement: HTMLElement, categories: CategoryInfo[]) {
    this.rootElement.classList.add('train-mode');
    this.categories = categories;
    this.router = new Router(this);
    this.background = new Background();
    this.wrapper = new BaseComponent('div', ['wrapper']);
    this.header = new Header(this);
    this.progressBar = new ProgressBar();
    this.sidebar = new Sidebar(this);
    this.sidebar.renderList(categories);
    this.summary = new Summary();
    this.container = new BaseComponent('div', ['container']);
    this.categoryModule = new CategoryModule();
    this.categoryModule.render(categories);
    this.cardModule = new CardModule(this);
    this.footer = new Footer();
    this.statistics = new Statistics(this);
    this.popup = new Popup(this);
    this.adminModule = new AdminModule(this);

    this.rootElement.append(this.background.element, this.wrapper.element, this.sidebar.element,
      this.footer.element, this.popup.element);
    this.container.element.append(this.categoryModule.element);
    this.wrapper.element.append(this.header.element, this.progressBar.element, this.container.element);

    if (sessionStorage.getItem(ACCESS_TOKEN_KEY)) {
      this.store.dispatch(setAdminMode());
      showControlRoute();
      this.sidebar.showLogOutBtn();
    }

    const modeSwitcher = document.getElementById('mode-switcher__input');

    modeSwitcher?.addEventListener('change', () => {
      const state: State = this.store.getState();
      if (state.isGameStarted) {
        this.store.dispatch(breakGame(true));
        this.cardModule.finishGame(this);
      }
      const mode = (modeSwitcher as HTMLInputElement).checked ? PLAY_MODE : TRAIN_MODE;
      this.store.dispatch(switchMode(mode));
      if (mode === PLAY_MODE && (Number(state.page) >= 0 || state.page === STATISTICS_PAGE)) this.header.showGameBtn();
      if (mode === TRAIN_MODE) {
        this.header.hideGameBtn();
        setTimeout(() => this.header.setStartGameBtn(), 300);
      }
    });

    this.store.subscribe(() => {
      const state: State = this.store.getState();
      updateMode(state, this);
      highlightActiveRoute(state.page);
    });
  }
}
