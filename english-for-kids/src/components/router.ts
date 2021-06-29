import { App } from "../app";
import { MAIN_PAGE } from "../constants";
import { State } from "../interfaces";
import { game, switchPage } from "./redux/actions";

export class Router {
  constructor(app: App) {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const state: State = app.store.getState();
      if (state.isGameStarted) app.cardModule.finishGame(app);
      app.store.dispatch(switchPage(currentRouteName));

      if (currentRouteName === MAIN_PAGE) {
        this.navigate(app.categoryModule.element, app);
      } else {
        app.cardModule.clear();
        app.cardModule.render(currentRouteName, state.mode);
        this.navigate(app.cardModule.element, app);
      }
    };
  }

  navigate(content: HTMLElement, app: App): void {
    const currentChild = app.container.element.firstElementChild;
    if (currentChild) {
      app.container.element.replaceChild(content, currentChild);
    }

  }
}
