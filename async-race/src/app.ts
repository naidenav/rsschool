import { BaseComponent } from './components/base-component';

interface Nav {
  name: string;
  route: HTMLElement | null;
  content: HTMLElement;
}
export class App {
  private routing: Array<Nav>;

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.innerHTML = '<h2>Hallo work</h2>';

    this.routing = [
      // {
      //   name: 'garage',
      //   route: ,
      //   content: ,
      // },
      // {
      //   name: 'winners',
      //   route: ,
      //   content: ,
      // },
    ];

    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = this.routing.find((p: Nav) => p.name === currentRouteName);

      if (currentRoute) {
        this.navigate(currentRoute.route, currentRoute.content);
      }
    };


  }

  navigate(route: HTMLElement | null, content: HTMLElement): void {
    // const currentChild = ;
    // if (currentChild) {
    //   .replaceChild(content, currentChild);
    // }
  }

  // async start(): Promise<void> {
  //   const res = await fetch('');
  // }
}
