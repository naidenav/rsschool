import { App } from "../app";
import { MAIN_ROUTE } from "../constants";

export class Router {
  constructor(app: App) {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);

      if (currentRouteName === MAIN_ROUTE) {
        this.navigate(app.categoryModule.element, app);
      } else {
        app.cardModule.clear();
        app.cardModule.render(currentRouteName);
        this.navigate(app.cardModule.element, app);
      }

      // const currentRoute = this.routing.find((p: Nav) => p.name === currentRouteName);

      // if (currentRoute) {
      //   this.navigate(currentRoute.route, currentRoute.content);
      // }
    };
  }

  navigate(content: HTMLElement, app: App): void {
    const currentChild = app.container.element.firstElementChild;
    if (currentChild) {
      app.container.element.replaceChild(content, currentChild);
    }

  }
}
