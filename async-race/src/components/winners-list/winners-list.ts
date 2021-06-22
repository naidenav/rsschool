import './winners-list.scss';
import { BaseComponent } from '../base-component';
import { CarProfile, Winners, WinnerProfile } from '../../interfaces';
import { getCarImage } from '../utils';

export class WinnersList extends BaseComponent {
  tBody: BaseComponent;

  trHeader: BaseComponent;

  thNumber: BaseComponent;

  thCar: BaseComponent;

  thName: BaseComponent;

  thWins: BaseComponent;

  thBestTime: BaseComponent;

  winsSortArrow: BaseComponent;

  timeSortArrow: BaseComponent;

  constructor(fullWinnersInfo: Winners[]) {
    super('table', ['winners-list']);
    this.tBody = new BaseComponent('tbody', ['t-body']);
    this.trHeader = new BaseComponent('tr', ['tr-header']);
    this.thNumber = new BaseComponent('th', ['th', 'th-number'], 'Number');
    this.thCar = new BaseComponent('th', ['th', 'th-car'], 'Car');
    this.thName = new BaseComponent('th', ['th', 'th-name'], 'Name');
    this.thWins = new BaseComponent('th', ['th', 'th-wins'], 'Wins');
    this.thBestTime = new BaseComponent('th', ['th', 'th-time'], 'Best time (seconds)');
    this.winsSortArrow = new BaseComponent('div', ['sort-arrow']);
    this.timeSortArrow = new BaseComponent('div', ['sort-arrow']);

    this.thWins.element.append(this.winsSortArrow.element);
    this.thBestTime.element.append(this.timeSortArrow.element);

    this.element.append(this.tBody.element);
    this.tBody.element.append(this.trHeader.element);
    this.trHeader.element.append(
      this.thNumber.element,
      this.thCar.element,
      this.thName.element,
      this.thWins.element,
      this.thBestTime.element,
    );

    this.renderWinners(fullWinnersInfo);
  }

  addWinner(winner: WinnerProfile, car: CarProfile, index: number): void {
    const tr = new BaseComponent('tr', ['tr-body']);
    const tdNumber = new BaseComponent('td', ['td', 'td-number'], `${index + 1}`);
    const tdCar = new BaseComponent('td', ['td', 'td-car']);
    tdCar.element.innerHTML = getCarImage(car.color);
    const tdName = new BaseComponent('td', ['td'], `${car.name}`);
    const tdWins = new BaseComponent('td', ['td'], `${winner.wins}`);
    const tdBestTime = new BaseComponent('td', ['td'], `${winner.time}`);

    this.tBody.element.append(tr.element);
    tr.element.append(
      tdNumber.element,
      tdCar.element,
      tdName.element,
      tdWins.element,
      tdBestTime.element,
    );
  }

  renderWinners(fullWinnersInfo: Winners[]): void {
    while (this.trHeader.element.nextSibling) {
      this.trHeader.element.nextSibling.remove();
    }
    fullWinnersInfo.forEach((winner, index) => this.addWinner(winner.winner, winner.car, index));
  }
}
