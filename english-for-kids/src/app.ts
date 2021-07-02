/* eslint-disable import/no-cycle */

import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { Background } from './components/background';
import { BaseComponent } from './components/base-component';
import { CardModule } from './components/card-module/card-module';
import { CategoryModule } from './components/category-module/category-module';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { breakGame, switchMode } from './components/redux/actions';
import { rootReducer } from './components/redux/rootReducer';
import { Router } from './components/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Statistics } from './components/statistics/statistics';
import { Summary } from './components/summary/summary';
import { highlightActiveRoute } from './components/utils';
import {
  INITIAL_STATE, MAIN_PAGE, PLAY_MODE, TRAIN_MODE,
} from './constants';
import { State } from './interfaces';

export class App {
  readonly router: Router;

  private background: Background;

  private wrapper: BaseComponent;

  readonly header: Header;

  readonly progressBar: ProgressBar;

  private sidebar: Sidebar;

  readonly summary: Summary;

  readonly container: BaseComponent;

  readonly categoryModule: CategoryModule;

  readonly cardModule: CardModule;

  readonly footer: Footer;

  readonly statistics: Statistics;

  readonly store: Store = createStore(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(thunk),
  );

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.classList.add('train-mode');
    this.router = new Router(this);
    this.background = new Background();
    this.wrapper = new BaseComponent('div', ['wrapper']);
    this.header = new Header(this);
    this.progressBar = new ProgressBar();
    this.sidebar = new Sidebar(this);
    this.sidebar.renderList();
    this.summary = new Summary();
    this.container = new BaseComponent('div', ['container']);
    this.categoryModule = new CategoryModule();
    this.categoryModule.render();
    this.cardModule = new CardModule(this);
    this.footer = new Footer();
    this.statistics = new Statistics(this);

    this.rootElement.append(this.background.element, this.wrapper.element, this.sidebar.element,
      this.footer.element);
    this.container.element.append(this.categoryModule.element);
    this.wrapper.element.append(this.header.element, this.progressBar.element, this.container.element);

    const modeSwitcher = document.getElementById('mode-switcher__input');

    modeSwitcher?.addEventListener('change', () => {
      const state: State = this.store.getState();
      if (state.isGameStarted) {
        this.store.dispatch(breakGame(true));
        this.cardModule.finishGame(this);
      }
      const mode = (modeSwitcher as HTMLInputElement).checked ? PLAY_MODE : TRAIN_MODE;
      this.store.dispatch(switchMode(mode));
      if (mode === PLAY_MODE && state.page !== MAIN_PAGE) this.header.showGameBtn();
      if (mode === TRAIN_MODE) {
        this.header.hideGameBtn();
        setTimeout(() => this.header.setStartGameBtn(), 300);
      }
    });

    this.store.subscribe(() => {
      const state: State = this.store.getState();

      this.updateMode(state);
      highlightActiveRoute(state.page);
    });
  }

  updateMode(state: State): void {
    if (state.mode === PLAY_MODE) {
      if (document.body.classList.contains(TRAIN_MODE)) {
        document.body.classList.remove(TRAIN_MODE);
        document.body.classList.add(PLAY_MODE);
      }

      this.cardModule.hideTitles();
    } else if (state.mode === TRAIN_MODE) {
      if (document.body.classList.contains(PLAY_MODE)) {
        document.body.classList.remove(PLAY_MODE);
        document.body.classList.add(TRAIN_MODE);
      }

      this.cardModule.showTitles();
    }
  }
}
