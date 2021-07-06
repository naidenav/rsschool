/* eslint-disable import/no-cycle */

import { App } from '../app';
import { MAIN_PAGE, PLAY_MODE, STATISTICS_PAGE } from '../constants';
import { CategoryInfo, State } from '../interfaces';
import { getCategory } from '../REST-api';
import { breakGame, switchPage } from './redux/actions';
import { navigate } from './utils';

export class Router {
  constructor(app: App) {
    window.onpopstate = async () => {
      const currentRouteName = window.location.hash.slice(1);
      const state: State = app.store.getState();
      if (state.isGameStarted) {
        app.store.dispatch(breakGame(true));
        app.cardModule.finishGame(app);
      }
      app.store.dispatch(switchPage(currentRouteName));
      app.background.show();
      if (currentRouteName === MAIN_PAGE) {
        if (state.mode === PLAY_MODE) app.header.hideGameBtn();
        navigate(app.categoryModule.element, app);
      } else if (currentRouteName === STATISTICS_PAGE) {
        if (state.mode === PLAY_MODE) app.header.showGameBtn();
        app.background.hide();
        app.statistics.render(app.categories);
        navigate(app.statistics.element, app);
      } else {
        if (state.mode === PLAY_MODE) app.header.showGameBtn();
        app.cardModule.clear();
        const id = Number(currentRouteName);
        const category = await getCategory(id);
        app.cardModule.render(state.mode, category);
        navigate(app.cardModule.element, app);
      }
    };
  }
}
