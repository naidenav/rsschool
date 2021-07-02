/* eslint-disable import/no-cycle */

import { App } from '../app';
import { MAIN_PAGE, PLAY_MODE, STATISTICS_PAGE } from '../constants';
import { State } from '../interfaces';
import { breakGame, switchPage } from './redux/actions';
import { navigate } from './utils';

export class Router {
  constructor(app: App) {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const state: State = app.store.getState();
      if (state.isGameStarted) {
        app.store.dispatch(breakGame(true));
        app.cardModule.finishGame(app);
      }
      app.store.dispatch(switchPage(currentRouteName));

      if (currentRouteName === MAIN_PAGE) {
        if (state.mode === PLAY_MODE) app.header.hideGameBtn();
        navigate(app.categoryModule.element, app);
      } else if (currentRouteName === STATISTICS_PAGE) {
        if (state.mode === PLAY_MODE) app.header.showGameBtn();
        app.statistics.render();
        navigate(app.statistics.element, app);
      } else {
        if (state.mode === PLAY_MODE) app.header.showGameBtn();
        app.cardModule.clear();
        app.cardModule.render(state.mode, currentRouteName);
        navigate(app.cardModule.element, app);
      }
    };
  }
}
