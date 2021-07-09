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
        navigate(app.categoryModule.element, app.container.element);
        break;
      case STATISTICS_PAGE:
        app.background.hide();
        app.statistics.render(app.categories);
        navigate(app.statistics.element, app.container.element);
        break;
      default:
        const adminWordsRoute = new RegExp(`^${CONTROL_PAGE}\/\\d+$`);
        const adminCategoriesRoute = new RegExp(`^${CONTROL_PAGE}$`);
        const cardsModuleRoute = new RegExp('^\\d+$');
        if (cardsModuleRoute.test(routeName)) {
          if (state.mode === PLAY_MODE) app.header.showGameBtn();
          app.cardModule.clear();
          navigate(app.cardModule.element, app.container.element);
          const id = Number(routeName);
          const category = await getCategory(id);
          app.cardModule.render(state.mode, category);
        } else if (adminWordsRoute.test(routeName)) {  // && state.isAdmin
          const categoryId = Number(routeName.split('/')[1]);
          navigate(app.adminModule.element, app.container.element);
          navigate(app.adminModule.wordEditor.element, app.adminModule.container.element);
          app.adminModule.wordEditor.render(categoryId);
        } else if (adminCategoriesRoute.test(routeName)) {   // && state.isAdmin
          navigate(app.adminModule.element, app.container.element);
          navigate(app.adminModule.categoryEditor.element, app.adminModule.container.element);
          app.adminModule.categoryEditor.render();
        } else {
        //   window.location.hash = `#${MAIN_PAGE}`;
        //   break;
        }
    }
  }
}
