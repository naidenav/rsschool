/* eslint-disable import/no-cycle */

import { App } from '../app';
import { State } from '../interfaces';
import { breakGame, setPage } from './redux/actions';
import { switchPage } from './utils';

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
      await switchPage(app, currentRouteName);
    };
  }
}
