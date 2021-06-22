import './garage.scss';
import {
  createCar, deleteCar, deleteWinner, drive, getAllCars, getCar, startEngine, stopEngine, updateCar,
} from '../../api';
import {
  animation, getAnimationId, getCarName, getRandomCars, saveWinner,
  stopDriving,
} from '../../components/utils';
import { BaseComponent } from '../../components/base-component';
import { GarageControl } from '../../components/garage-control/garage-control';
import { GarageList } from '../../components/garage-list/garage-list';
import { PageControl } from '../../components/page-control/page-control';
import { Timer } from '../../components/timer';

import { GAP, GARAGE_LIMIT } from '../../constants';
import { AnimationState, CarProfile } from '../../interfaces';

export class Garage extends BaseComponent {
  private timer: Timer;

  private control: GarageControl;

  private garageList: GarageList;

  private garageTitle: BaseComponent;

  public pageNumperTitle: BaseComponent;

  private pageControl: PageControl;

  public currentPage = 1;

  public idOfCurrentlyUpdatedCar = 0;

  public animationStore: AnimationState[] = [];

  public carsId: number[] = [];

  public winner: number | null = null;

  public totalCars: number;

  private victoryMessage: BaseComponent;

  constructor(carList: CarProfile[], totalCars: number) {
    super('div', ['garage']);
    this.timer = new Timer();
    this.control = new GarageControl();
    this.garageTitle = new BaseComponent('h2', ['h2'], `Garage (${totalCars})`);
    this.pageNumperTitle = new BaseComponent('h3', ['h3'], 'Page #1');
    this.garageList = new GarageList(carList);
    this.pageControl = new PageControl();
    this.pageControl.checkPaginationStatus(totalCars, this.currentPage, GARAGE_LIMIT);
    this.totalCars = totalCars;
    this.victoryMessage = new BaseComponent('div', ['victory-message', 'message-hidden']);

    carList.forEach((item) => (item.id ? this.carsId.push(item.id) : ''));

    this.element.append(this.control.element, this.garageTitle.element, this.pageNumperTitle.element,
      this.garageList.element, this.pageControl.element, this.victoryMessage.element);

    const createTextInput = this.control.createTextInput.element as HTMLInputElement;
    const createColorInput = this.control.createColorInput.element as HTMLInputElement;
    const updateColorInput = this.control.updateColorInput.element as HTMLInputElement;

    this.control.createBtn.element.addEventListener('click', async () => {
      this.totalCars++;
      const carName = getCarName(createTextInput);
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
      const id = String(target.dataset.id);

      if (target.classList.contains('remove-btn')) {
        this.totalCars--;
        this.removeCar(target);
        await deleteWinner(id);
      } else if (target.classList.contains('select-btn')) {
        this.selectCar(target);
        updateColorInput.removeEventListener('input', changeCarColor);
        updateColorInput.addEventListener('input', changeCarColor);
        this.control.updateBtn.element.addEventListener('click', async () => {
          await this.updateCarData();
        }, { once: true });
      } else if (target.classList.contains('start-engine-btn')) {
        const animationId = await this.startDriving(id);
        const { success } = await drive(id);
        if (!success) window.cancelAnimationFrame(animationId.requestId);
      } else if (target.classList.contains('stop-engine-btn')) {
        await stopEngine(id);
        const animationId = getAnimationId(this.animationStore, id);
        if (animationId) stopDriving(id, animationId);
        const index = this.animationStore.findIndex((item: AnimationState) => item.carId === id);
        if (index !== -1) this.animationStore.splice(index, 1);
      }
    });

    this.control.generateBtn.element.addEventListener('click', async () => {
      const cars = getRandomCars();
      this.totalCars += 100;

      await Promise.all(cars.map(async (car) => createCar(car)));
      await this.updateCarsList();
    });

    this.control.raceBtn.element.addEventListener('click', async () => {
      this.control.raceBtn.disable();
      this.pageControl.nextPageBtn.disable();
      this.pageControl.prevPageBtn.disable();
      this.garageList.element.classList.add('non-interactive');
      this.timer.startTimer();
      await Promise.all(this.carsId.map(async (id) => {
        const animationId = await this.startDriving(String(id));
        const { success } = await drive(String(id));
        if (success && !this.winner) {
          this.timer.stopTimer();
          this.winner = id;
          const time = this.timer.getTime();
          await this.showVictoryMessage(id, time);
          await saveWinner(id, time);
        }
        if (!success) window.cancelAnimationFrame(animationId.requestId);
      }));
      this.control.resetBtn.enable();
    });

    this.control.resetBtn.element.addEventListener('click', async () => {
      this.pageControl.checkPaginationStatus(this.totalCars, this.currentPage, GARAGE_LIMIT);
      this.control.resetBtn.disable();
      this.garageList.element.classList.remove('non-interactive');
      await Promise.all(this.animationStore.map(async (item) => {
        await stopEngine(item.carId);
        stopDriving(item.carId, item.requestId);
      }));
      this.control.raceBtn.enable();
      this.animationStore = [];
      this.winner = null;
      this.hideVictoryMessage();
    });

    this.pageControl.prevPageBtn.element.addEventListener('click', async () => {
      this.currentPage--;
      this.updatePageNumberTitle();
      this.animationStore = [];
      await this.updateCarsList();
    });

    this.pageControl.nextPageBtn.element.addEventListener('click', async () => {
      this.currentPage++;
      this.updatePageNumberTitle();
      this.animationStore = [];
      await this.updateCarsList();
    });
  }

  updateCarsCount(count: number): void {
    this.garageTitle.element.innerText = `Garage (${count})`;
  }

  async removeCar(button: HTMLElement): Promise<void> {
    const id = Number(button.dataset.id);
    this.carsId.splice(this.carsId.indexOf(id), 1);
    await deleteCar(id);
    await this.updateCarsList();
  }

  selectCar(button: HTMLElement): void {
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

  async updateCarData(): Promise<void> {
    this.control.updateTextInput.disable();
    this.control.updateColorInput.disable();
    this.control.updateBtn.disable();

    const updateTextInput = this.control.updateTextInput.element as HTMLInputElement;
    const updateColorInput = this.control.updateColorInput.element as HTMLInputElement;

    const carName = getCarName(updateTextInput);
    const carColor = (updateColorInput).value;
    const car = {
      name: carName,
      color: carColor,
    };

    await updateCar(this.idOfCurrentlyUpdatedCar, car);
    await this.updateCarsList();
    (updateTextInput).value = '';
  }

  updatePageNumberTitle = (): void => {
    this.pageNumperTitle.element.innerText = `Page #${this.currentPage}`;
  };

  async updateCarsList(): Promise<void> {
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
    this.pageControl.checkPaginationStatus(cars.totalCars, this.currentPage, GARAGE_LIMIT);
    this.carsId = [];
    for (let i = 0; i < cars.cars.length; i++) {
      const { id } = cars.cars[i];
      if (id) this.carsId.push(id);
    }
  }

  async startDriving(id: string): Promise<AnimationState> {
    const carSection = document.getElementById(id);
    const startBtn = carSection?.querySelector('.start-engine-btn');
    const stopBtn = carSection?.querySelector('.stop-engine-btn');
    const car = carSection?.querySelector('.car-container') as HTMLElement;

    startBtn?.setAttribute('disabled', '');
    const res = await startEngine(id);
    const animationTime = res.distance / res.velocity;
    const animationDistance = document.documentElement.clientWidth - GAP;

    const animationId = animation(car, animationDistance, animationTime);
    animationId.carId = id;
    this.animationStore.push(animationId);
    stopBtn?.removeAttribute('disabled');

    return animationId;
  }

  async showVictoryMessage(id: number, time: number): Promise<void> {
    const car = await getCar(id);
    this.victoryMessage.element.innerHTML = `${car.name} has finished first (${time}s)`;
    this.victoryMessage.element.classList.remove('message-hidden');
  }

  hideVictoryMessage(): void {
    this.victoryMessage.element.innerHTML = '';
    this.victoryMessage.element.classList.add('message-hidden');
  }
}
