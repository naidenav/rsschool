/* eslint-disable import/no-cycle */

import { App } from '../app';
import { MAIN_PAGE, PLAY_MODE } from '../constants';
import { State } from '../interfaces';
import { switchPage } from './redux/actions';
import { navigate } from './utils';

export class Router {
  constructor(app: App) {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const state: State = app.store.getState();
      if (state.isGameStarted) app.cardModule.finishGame(app);
      app.store.dispatch(switchPage(currentRouteName));

      if (currentRouteName === MAIN_PAGE) {
        if (state.mode === PLAY_MODE) app.header.hideGameBtn();
        navigate(app.categoryModule.element, app);
      } else {
        if (state.mode === PLAY_MODE) app.header.showGameBtn();
        app.cardModule.clear();
        app.cardModule.render(currentRouteName, state.mode);
        navigate(app.cardModule.element, app);
      }
    };
  }
}
