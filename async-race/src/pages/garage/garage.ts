import { createCar, deleteCar, getAllCars } from "../../api";
import { BaseComponent } from "../../components/base-component";
import { GarageControl } from "../../components/garage-control/garage-control";
import { GarageList } from "../../components/garage-list/garage-list";
import { getRandomCarName } from "../../components/get-random-car-name";
import { CarProfile } from "../../interfaces";

export class Garage extends BaseComponent {
  private control: GarageControl;

  private garageList: GarageList;

  private garageTitle: BaseComponent;

  private pageNumperTitle: BaseComponent;

  private currentPage: number = 0;

  constructor(carList: CarProfile[], totalCars: number) {
    super('div', ['garage']);
    this.control = new GarageControl();
    this.garageTitle = new BaseComponent('h2', ['h2'], `Garage (${totalCars})`);
    this.pageNumperTitle = new BaseComponent('h3', ['h3'], `Page #${this.currentPage + 1}`)
    this.garageList = new GarageList(carList);

    this.element.append(this.control.element, this.garageTitle.element,
      this.pageNumperTitle.element, this.garageList.element);

    this.control.createBtn.element.addEventListener('click', async () => {
      const carName = this.getCarName(this.control.createTextInput.element as HTMLInputElement);
      const carColor = (this.control.createColorInput.element as HTMLInputElement).value;
      const car = {
        name: carName,
        color: carColor
      }

      await createCar(car);
      await this.updateCarsList();
    });

    this.garageList.element.addEventListener('click', async (e) => {
      if ((e.target as HTMLElement).classList.contains('remove-btn')) {
        const id = Number((e.target as HTMLElement).getAttribute('id'));

        await deleteCar(id);
        await this.updateCarsList();
      }
    })
  }

  getCarName(input: HTMLInputElement): string {
    if (input.value) {
      return input.value;
    } else return getRandomCarName();
  }

  updateCarsCount(count: number) {
    this.garageTitle.element.innerText = `Garage (${count})`;
  }

  async updateCarsList() {
    const queryParams = [
      {
        key: '_page',
        value: `${this.currentPage}`
      },
      {
        key: '_limit',
        value: '7'
      }
    ];
    const cars = await getAllCars(queryParams);

    this.garageList.renderCars(cars.cars);
    this.updateCarsCount(cars.totalCars);
  }
}
