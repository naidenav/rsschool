import {
  createCar, deleteCar, drive, getAllCars, startEngine, updateCar,
} from '../../api';
import { animation } from '../../components/animation';
import { BaseComponent } from '../../components/base-component';
import { GarageControl } from '../../components/garage-control/garage-control';
import { GarageList } from '../../components/garage-list/garage-list';
import { getAnimationId } from '../../components/get-animation-id';
import { getRandomCarName } from '../../components/get-random-car-name';
import { getRandomCars } from '../../components/get-random-cars';
import { PageControl } from '../../components/page-control/page-control';
import { GAP, GARAGE_LIMIT } from '../../constants';
import { AnimationState, CarProfile } from '../../interfaces';

export class Garage extends BaseComponent {
  private control: GarageControl;

  private garageList: GarageList;

  private garageTitle: BaseComponent;

  public pageNumperTitle: BaseComponent;

  private pageControl: PageControl;

  public currentPage = 1;

  public idOfCurrentlyUpdatedCar = 0;

  public animationStore: AnimationState[] = [];

  public carsId: number[] = [];

  constructor(carList: CarProfile[], totalCars: number) {
    super('div', ['garage']);
    this.control = new GarageControl();
    this.garageTitle = new BaseComponent('h2', ['h2'], `Garage (${totalCars})`);
    this.pageNumperTitle = new BaseComponent('h3', ['h3'], 'Page #1');
    this.garageList = new GarageList(carList);
    this.pageControl = new PageControl(this);
    this.pageControl.checkPaginationStatus(totalCars, this.currentPage);

    carList.forEach(item => item.id ? this.carsId.push(item.id) : '');

    this.element.append(this.control.element, this.garageTitle.element,
      this.pageNumperTitle.element, this.garageList.element, this.pageControl.element);

    const createTextInput = this.control.createTextInput.element as HTMLInputElement;
    const createColorInput = this.control.createColorInput.element as HTMLInputElement;
    const updateColorInput = this.control.updateColorInput.element as HTMLInputElement;

    this.control.createBtn.element.addEventListener('click', async () => {
      const carName = this.getCarName(createTextInput);
      const carColor = (createColorInput).value;
      const car = {
        name: carName,
        color: carColor,
      };

      await createCar(car);
      await this.updateCarsList();
      (createTextInput).value = '';
    });

    const changeCarColor = () => {
      const car = document.getElementById(String(this.idOfCurrentlyUpdatedCar));
      const path = car?.querySelector('path');
      if (path) path.style.fill = updateColorInput.value;
    };

    this.garageList.element.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('remove-btn')) {
        this.removeCar(target);
      } else if (target.classList.contains('select-btn')) {
        this.selectCar(target);
        updateColorInput.removeEventListener('input', changeCarColor);
        updateColorInput.addEventListener('input', changeCarColor);

        this.control.updateBtn.element.addEventListener('click', async () => {
          await this.updateCarData();
        }, { once: true });
      } else if (target.classList.contains('start-engine-btn')) {
        const id = String(target.dataset.id);
        const animationId = await this.startDriving(id);
        const { success } = await drive(id);
        if (!success) window.cancelAnimationFrame(animationId.requestId);
      } else if (target.classList.contains('stop-engine-btn')) {
        const id = String(target.dataset.id);
        const animationId = getAnimationId(this.animationStore, id)
        if (animationId) this.stopDriving(id, animationId);
      }
    });

    this.control.generateBtn.element.addEventListener('click', async () => {
      const cars = getRandomCars();

      await Promise.all(cars.map(async car => await createCar(car)));
      await this.updateCarsList();
    });

    this.control.raceBtn.element.addEventListener('click', async () => {
      this.control.raceBtn.disable();
      await Promise.all(this.carsId.map(async id => {
        const animationId = await this.startDriving(String(id));
        this.control.resetBtn.enable();
        const { success } = await drive(String(id));
        if (!success) window.cancelAnimationFrame(animationId.requestId);
      }));


    })

    this.control.resetBtn.element.addEventListener('click', async () => {
      this.control.resetBtn.disable();
      this.animationStore.map(async item => await this.stopDriving(item.carId, item.requestId));
      this.control.raceBtn.enable();
    })
  }

  getCarName(input: HTMLInputElement): string {
    if (input.value) {
      return input.value;
    } return getRandomCarName();
  }

  updateCarsCount(count: number) {
    this.garageTitle.element.innerText = `Garage (${count})`;
  }

  updatePageNumberTitle() {
    this.pageNumperTitle.element.innerText = `Page #${this.currentPage}`;
  }

  async removeCar(button: HTMLElement) {
    const id = Number(button.dataset.id);

    await deleteCar(id);
    await this.updateCarsList();
  }

  selectCar(button: HTMLElement) {
    this.control.updateTextInput.enable();
    this.control.updateColorInput.enable();
    this.control.updateBtn.enable();

    this.idOfCurrentlyUpdatedCar = Number(button.dataset.id);
    const { name } = button.dataset;
    const { color } = button.dataset;
    const updateTextInput = this.control.updateTextInput.element as HTMLInputElement;
    const updateColorInput = this.control.updateColorInput.element as HTMLInputElement;

    if (name) updateTextInput.value = name;
    if (color) updateColorInput.value = color;
  }

  async updateCarData() {
    this.control.updateTextInput.disable();
    this.control.updateColorInput.disable();
    this.control.updateBtn.disable();

    const updateTextInput = this.control.updateTextInput.element as HTMLInputElement;
    const updateColorInput = this.control.updateColorInput.element as HTMLInputElement;

    const carName = this.getCarName(updateTextInput);
    const carColor = (updateColorInput).value;
    const car = {
      name: carName,
      color: carColor,
    };

    await updateCar(this.idOfCurrentlyUpdatedCar, car);
    await this.updateCarsList();
    (updateTextInput).value = '';
  }

  async updateCarsList() {
    const queryParams = [
      {
        key: '_page',
        value: `${this.currentPage}`,
      },
      {
        key: '_limit',
        value: GARAGE_LIMIT,
      },
    ];
    const cars = await getAllCars(queryParams);

    this.garageList.renderCars(cars.cars);
    this.updateCarsCount(cars.totalCars);
    this.pageControl.checkPaginationStatus(cars.totalCars, this.currentPage);
    for (let car of cars.cars) {
      if (car.id) this.carsId.push(car.id);
    }
  }

  async startDriving(id: string) {
    const carSection = document.getElementById(id);
    const startBtn = carSection?.querySelector('.start-engine-btn');
    const stopBtn = carSection?.querySelector('.stop-engine-btn');
    const car = carSection?.querySelector('.car-container') as HTMLElement;

    startBtn?.setAttribute('disabled', '');
    stopBtn?.removeAttribute('disabled');
    const res = await startEngine(id);
    const animationTime = res.distance / res.velocity;
    const animationDistance = document.documentElement.clientWidth - GAP;

    let animationId = animation(car, animationDistance, animationTime);
    animationId.carId = id;
    this.animationStore.push(animationId);

    return animationId;
  }

  async stopDriving(id: string, requestId: number) {
    const carSection = document.getElementById(id);
    const startBtn = carSection?.querySelector('.start-engine-btn');
    const stopBtn = carSection?.querySelector('.stop-engine-btn');
    const car = carSection?.querySelector('.car-container') as HTMLElement;

    window.cancelAnimationFrame(requestId);

    car.style.transform = 'translateX(0)';
    startBtn?.removeAttribute('disabled');
    stopBtn?.setAttribute('disabled', '');
  }
}
