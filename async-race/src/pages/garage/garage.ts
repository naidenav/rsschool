import { createCar, deleteCar, getAllCars, updateCar } from "../../api";
import { BaseComponent } from "../../components/base-component";
import { Car } from "../../components/car/car";
import { GarageControl } from "../../components/garage-control/garage-control";
import { GarageList } from "../../components/garage-list/garage-list";
import { getRandomCarName } from "../../components/get-random-car-name";
import { PageControl } from "../../components/page-control/page-control";
import { CarProfile } from "../../interfaces";

export class Garage extends BaseComponent {
  private control: GarageControl;

  private garageList: GarageList;

  private garageTitle: BaseComponent;

  public pageNumperTitle: BaseComponent;

  private pageControl: PageControl;

  public currentPage: number = 1;

  constructor(carList: CarProfile[], totalCars: number) {
    super('div', ['garage']);
    this.control = new GarageControl();
    this.garageTitle = new BaseComponent('h2', ['h2'], `Garage (${totalCars})`);
    this.pageNumperTitle = new BaseComponent('h3', ['h3'], 'Page #1')
    this.garageList = new GarageList(carList);
    this.pageControl = new PageControl(this);
    this.pageControl.checkPaginationStatus(totalCars, this.currentPage);

    this.element.append(this.control.element, this.garageTitle.element,
      this.pageNumperTitle.element, this.garageList.element, this.pageControl.element);

      const createTextInput = this.control.createTextInput.element as HTMLInputElement;
      const createColorInput = this.control.createColorInput.element as HTMLInputElement;
      const updateTextInput = this.control.updateTextInput.element as HTMLInputElement;
      const updateColorInput = this.control.updateColorInput.element as HTMLInputElement;

    this.control.createBtn.element.addEventListener('click', async () => {
      const carName = this.getCarName(createTextInput);
      const carColor = (createColorInput).value;
      const car = {
        name: carName,
        color: carColor
      }

      await createCar(car);
      await this.updateCarsList();
      (createTextInput).value = ''
    });

    this.control.updateBtn.element.addEventListener('click', async ()=> {

    })

    this.garageList.element.addEventListener('click', async (e) => {
      if ((e.target as HTMLElement).classList.contains('remove-btn')) {
        const id = Number((e.target as HTMLElement).dataset.id);

        await deleteCar(id);
        await this.updateCarsList();
      } else if ((e.target as HTMLElement).classList.contains('select-btn')) {
        updateColorInput.removeEventListener('input', () => {});
        const id = Number((e.target as HTMLElement).dataset.id);
        const name = (e.target as HTMLElement).dataset.name;
        const color = (e.target as HTMLElement).dataset.color;
        if (name) updateTextInput.value = name;
        if (color) updateColorInput.value = color;

        updateColorInput.addEventListener('input', () => {
          const car = document.getElementById(String(id));
          const path = car?.querySelector('path');
          if (path) path.style.fill = updateColorInput.value;
        });

        this.control.updateBtn.element.addEventListener('click', async () => {
          const carName = this.getCarName(updateTextInput);
          const carColor = (updateColorInput).value;
          const car = {
            name: carName,
            color: carColor
          }

          await updateCar(id, car);
          await this.updateCarsList();
          (updateTextInput).value = ''
        }, { once: true });
      }
    });
  }

  getCarName(input: HTMLInputElement): string {
    if (input.value) {
      return input.value;
    } else return getRandomCarName();
  }

  updateCarsCount(count: number) {
    this.garageTitle.element.innerText = `Garage (${count})`;
  }

  updatePageNumberTitle() {
    this.pageNumperTitle.element.innerText = `Page #${this.currentPage}`;
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
    this.pageControl.checkPaginationStatus(cars.totalCars, this.currentPage);
  }

  changeCarColor(id: string, input: HTMLInputElement) {
    const car = document.getElementById(String(id));
    const path = car?.querySelector('path');
    if (path) path.style.fill = input.value;
  }
}
