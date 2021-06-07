import { BaseComponent } from './components/base-component';
import { Button } from './components/button/button';
import { CarProfile, Winners } from './interfaces';
import { Garage } from './pages/garage/garage';

export class App {
  // private routing: Array<Nav>;
  private navigation: BaseComponent;

  private garageBtn: Button;

  private winnersBtn: Button;

  private main: BaseComponent;

  private garage: Garage;

  public isGaragePage = true;

  constructor(private readonly rootElement: HTMLElement, cars: CarProfile[], totalCars: number,
    winners: Winners[], totalWinners: number) {
    this.navigation = new BaseComponent('nav', ['main-navigation']);
    this.garageBtn = new Button('garage', ['main-button', 'garage-btn']);
    this.winnersBtn = new Button('winners', ['main-button', 'winners-btn']);
    this.main = new BaseComponent('main', ['main']);
    this.garage = new Garage(cars, totalCars);

    this.navigation.element.append(this.garageBtn.element, this.winnersBtn.element);
    this.main.element.append(this.garage.element);
    this.rootElement.append(this.navigation.element, this.main.element);

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
