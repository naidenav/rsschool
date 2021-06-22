import './car.scss';
import { CarProfile } from '../../interfaces';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import flagImg from '../../assets/finish-flag.png';
import { getCarImage } from '../utils';

export class Car extends BaseComponent {
  private carHeader: BaseComponent;

  public selectBtn: Button;

  public removeBtn: Button;

  private carName: BaseComponent;

  private carBody: BaseComponent;

  private startEngineBtn: Button;

  private stopEngineBtn: Button;

  private car: BaseComponent;

  private flag: BaseComponent;

  public carColor: string;

  constructor(carProfile: CarProfile) {
    super('div', ['car']);
    if (carProfile.id !== undefined) this.element.setAttribute('id', String(carProfile.id));

    this.carHeader = new BaseComponent('div', ['car-header']);
    this.selectBtn = new Button('select', ['main-button', 'select-btn']);
    this.selectBtn.element.dataset.id = String(carProfile.id);
    this.selectBtn.element.dataset.name = carProfile.name;
    this.selectBtn.element.dataset.color = carProfile.color;
    this.removeBtn = new Button('remove', ['main-button', 'remove-btn']);
    this.removeBtn.element.dataset.id = String(carProfile.id);
    this.carName = new BaseComponent('p', ['car-name'], carProfile.name);
    this.carBody = new BaseComponent('div', ['car-body']);
    this.startEngineBtn = new Button('a', ['engine-btn', 'start-engine-btn']);
    this.startEngineBtn.element.dataset.id = String(carProfile.id);
    this.stopEngineBtn = new Button('b', ['engine-btn', 'stop-engine-btn'], true);
    this.stopEngineBtn.element.dataset.id = String(carProfile.id);
    this.car = new BaseComponent('div', ['car-container']);
    this.flag = new BaseComponent('img', ['flag-image']);
    this.carColor = carProfile.color;
    this.car.element.innerHTML = getCarImage(this.carColor);
    this.flag.element.setAttribute('src', flagImg);

    this.carHeader.element.append(this.selectBtn.element, this.removeBtn.element, this.carName.element);
    this.carBody.element.append(this.startEngineBtn.element, this.stopEngineBtn.element, this.car.element,
      this.flag.element);
    this.element.append(this.carHeader.element, this.carBody.element);
  }
}
