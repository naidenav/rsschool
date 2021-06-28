import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { Background } from "./components/background";
import { BaseComponent } from "./components/base-component";
import { CardModule } from "./components/card-module/card-module";
import { CategoryModule } from "./components/category-module/category-module";
import { Header } from "./components/header/header";
import { switchMode } from "./components/redux/actions";
import { rootReducer } from "./components/redux/rootReducer";
import { Router } from "./components/router";
import { Sidebar } from "./components/sidebar/sidebar";
import { INITIAL_STATE, PLAY_MODE, TRAIN_MODE } from "./constants";
import { State } from "./interfaces";

export class App {
  private router: Router;

  private background: Background;

  private wrapper: BaseComponent;

  readonly header: Header;

  private sidebar: Sidebar;

  readonly container: BaseComponent;

  readonly categoryModule: CategoryModule;

  readonly cardModule: CardModule;

  readonly store: Store = createStore(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(thunk)
  );

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.classList.add('train-mode');
    this.router = new Router(this);
    this.background = new Background();
    this.wrapper = new BaseComponent('div', ['wrapper']);
    this.header = new Header();
    this.sidebar = new Sidebar(this);
    this.sidebar.renderList();
    this.container = new BaseComponent('div', ['container']);
    this.categoryModule = new CategoryModule();
    this.categoryModule.render();
    this.cardModule = new CardModule();

    this.rootElement.append(this.background.element, this.wrapper.element, this.sidebar.element);
    this.container.element.append(this.categoryModule.element);
    this.wrapper.element.append(this.header.element, this.container.element);



    const modeSwitcher = document.getElementById('mode-switcher__input');

    modeSwitcher?.addEventListener('change', () => {
      const mode = (modeSwitcher as HTMLInputElement).checked ? PLAY_MODE : TRAIN_MODE;
      this.store.dispatch(switchMode(mode));
      console.log(this.store.getState())
    });

    this.store.subscribe(() => {
      const state = this.store.getState()

      this.updateMode(state);
    })
  }

  updateMode(state: State) {
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
