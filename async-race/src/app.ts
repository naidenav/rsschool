import { BaseComponent } from './components/base-component';
import { Button } from './components/button/button';
import { CarProfile, Winners } from './interfaces';
import { Garage } from './pages/garage/garage';
import { WinnersPage } from './pages/winners/winners';

export class App {
  private navigation: BaseComponent;

  private garageBtn: Button;

  private winnersBtn: Button;

  private main: BaseComponent;

  private garage: Garage;

  private winners: WinnersPage;

  public isGaragePage = true;

  constructor(private readonly rootElement: HTMLElement, cars: CarProfile[], totalCars: number,
    fullWinnersInfo: Winners[], totalWinners: number) {
    this.navigation = new BaseComponent('nav', ['main-navigation']);
    this.garageBtn = new Button('garage', ['main-button', 'garage-btn']);
    this.winnersBtn = new Button('winners', ['main-button', 'winners-btn']);
    this.main = new BaseComponent('main', ['main']);
    this.garage = new Garage(cars, totalCars);
    this.winners = new WinnersPage(fullWinnersInfo, totalWinners);

    this.navigation.element.append(this.garageBtn.element, this.winnersBtn.element);
    this.main.element.append(this.garage.element, this.winners.element);
    this.rootElement.append(this.navigation.element, this.main.element);

    this.garageBtn.element.addEventListener('click', () => {
      if (this.garage.element.classList.contains('hidden')) {
        this.winners.element.classList.add('hidden');
        this.garage.element.classList.remove('hidden');
      }
    });

    this.winnersBtn.element.addEventListener('click', async () => {
      await this.winners.updateWinnersList();
      if (this.winners.element.classList.contains('hidden')) {
        this.garage.element.classList.add('hidden');
        this.winners.element.classList.remove('hidden');
      }
    });
  }
}
