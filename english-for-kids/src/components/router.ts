/* eslint-disable import/no-cycle */

import { App } from '../app';
import { CONTROL_PAGE, MAIN_PAGE, PLAY_MODE, STATISTICS_PAGE } from '../constants';
import { CategoryInfo, State } from '../interfaces';
import { getCategory } from '../REST-api';
import { breakGame, setPage } from './redux/actions';
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
      app.store.dispatch(setPage(currentRouteName));
      app.background.show();
      await this.switchPage(app, currentRouteName);
    };
  }

  async switchPage(app: App, routeName: string) {
    const state: State = app.store.getState();

    switch(routeName) {
      case MAIN_PAGE:
        if (state.mode === PLAY_MODE) app.header.hideGameBtn();
        navigate(app.categoryModule.element, app);
        break;
      case STATISTICS_PAGE:
        app.background.hide();
        app.statistics.render(app.categories);
        navigate(app.statistics.element, app);
        break;
      case CONTROL_PAGE:
        if (state.mode === PLAY_MODE) app.header.hideGameBtn();
        // if (!state.isAdmin) {
        //   window.location.hash = `#${MAIN_PAGE}`;
        //   break;
        // }
        navigate(app.adminModule.element, app);
        break;
      default:
        if (state.mode === PLAY_MODE) app.header.showGameBtn();
        app.cardModule.clear();
        navigate(app.cardModule.element, app);
        const id = Number(routeName);
        const category = await getCategory(id);
        app.cardModule.render(state.mode, category);
    }
  }
}
