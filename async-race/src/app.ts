import { BaseComponent } from './components/base-component';
import { MainButton } from './components/main-button/main-button';

export class App {
  // private routing: Array<Nav>;
  private navigation: BaseComponent;

  private garageBtn: MainButton;

  private winnersBtn: MainButton;

  private main: BaseComponent;

  private paginationBtnsWrapper: BaseComponent;

  private nextPageBtn: MainButton;

  private prevPageBtn: MainButton;

  constructor(private readonly rootElement: HTMLElement) {
    this.navigation = new BaseComponent('nav', ['main-navigation']);
    this.garageBtn = new MainButton('garage', ['garage-btn']);
    this.winnersBtn = new MainButton('winners', ['winners-btn']);
    this.main = new BaseComponent('main', ['main']);
    this.paginationBtnsWrapper = new BaseComponent('nav', ['pagination-btns-wrapper']);
    this.nextPageBtn = new MainButton('next', ['next-page-btn']);
    this.prevPageBtn = new MainButton('prev', ['prev-page-btn']);

    this.navigation.element.append(this.garageBtn.element, this.winnersBtn.element);
    this.paginationBtnsWrapper.element.append(this.prevPageBtn.element, this.nextPageBtn.element);
    this.rootElement.append(this.navigation.element, this.main.element,this.paginationBtnsWrapper.element);


    // this.routing = [
    //   {
    //     name: 'garage',
    //     route: ,
    //     content: ,
    //   },
    //   {
    //     name: 'winners',
    //     route: ,
    //     content: ,
    //   },
    // ];

    // window.onpopstate = () => {
    //   const currentRouteName = window.location.hash.slice(1);
    //   const currentRoute = this.routing.find((p: Nav) => p.name === currentRouteName);

    //   if (currentRoute) {
    //     this.navigate(currentRoute.route, currentRoute.content);
    //   }
    // }
  }

  // navigate(route: HTMLElement | null, content: HTMLElement): void {
  //   const currentChild = ;
  //   if (currentChild) {
  //     .replaceChild(content, currentChild);
  //   }
  // }

  // async start(): Promise<void> {
  //   const res = await fetch('');
  // }
}
