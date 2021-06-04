import { BaseComponent } from '../base-component';
import { CarProfile } from '../../interfaces'
import { Car } from '../car/car';

export class GarageList extends BaseComponent {
  constructor(carsList: CarProfile[]) {
    super('div', ['garage-list']);
    this.renderCars(carsList);
  }

  renderCars(carList: CarProfile[]) {
    carList.forEach(car => {
      const carSection = new Car(car);
      this.element.append(carSection.element);
    })
  }
}
