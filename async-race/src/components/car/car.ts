import './car.scss';
import { CarProfile } from "../../interfaces";
import { BaseComponent } from "../base-component";
import { Button } from "../button/button";
import flagImg from '../../assets/finish-flag.png';

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
    this.removeBtn = new Button('remove', ['main-button', 'remove-btn']);
    this.removeBtn.element.setAttribute('id', String(carProfile.id));
    this.carName = new BaseComponent('p', ['car-name'], carProfile.name);
    this.carBody = new BaseComponent('div', ['car-body']);
    this.startEngineBtn = new Button('a', ['engine-btn']);
    this.stopEngineBtn = new Button('b', ['engine-btn'], true);
    this.car = new BaseComponent('div', ['car-container']);
    this.flag = new BaseComponent('img', ['flag-image']);
    this.carColor = carProfile.color;
    this.car.element.innerHTML = `
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="100px" height="100px" viewBox="0 0 324.447 110" style="enable-background:new 0 0 324.447 324.447;"
        xml:space="preserve">
        <g>
          <g>
            <path d="M233.772,140.177c0,0-24.083-19.884-50.595-26.952c-26.513-7.068-86.165-2.429-97.655,0S35.59,133.109,35.59,133.109
              s-34.9-5.525-30.701,7.731c4.2,13.256-1.988,9.942-4.417,24.524c-2.429,14.581,5.302,22.312,5.302,22.312l6.628,1.103l0.885,3.148
              c9.45,0,17.492,0.409,24.27,1.005c-0.026-0.497-0.075-0.994-0.075-1.502c0-15.896,12.933-28.832,28.834-28.832
              s28.834,12.93,28.834,28.832c0,2.128-0.249,4.189-0.684,6.188h139.9c-0.44-1.993-0.684-4.06-0.684-6.188
              c0-15.896,12.93-28.832,28.832-28.832c15.901,0,28.837,12.93,28.837,28.832c0,2.128-0.249,4.189-0.684,6.188h20.676
              c2.429-3.977,7.731-4.199,7.731-4.199c5.524-3.977,5.524-19.443,5.302-22.758s-7.73-11.045-7.73-11.045
              C297.183,147.25,233.772,140.177,233.772,140.177z" fill="${this.carColor}"/>
            <path d="M66.307,167.911c-12.997,0-23.532,10.533-23.532,23.53c0,0.698,0.148,1.356,0.208,2.04
              c1.048,12.023,11.029,21.489,23.325,21.489c10.837,0,19.874-7.374,22.605-17.347c0.541-1.983,0.927-4.029,0.927-6.188
              C89.833,178.438,79.304,167.911,66.307,167.911z" fill="#444"/>
            <path d="M262.496,167.911c-12.998,0-23.529,10.533-23.529,23.53c0,2.153,0.378,4.204,0.927,6.188
              c2.729,9.974,11.765,17.347,22.603,17.347s19.873-7.373,22.607-17.347c0.538-1.983,0.927-4.028,0.927-6.188
              C286.025,178.438,275.493,167.911,262.496,167.911z" fill="#444"/>
          </g>
        </g>
      </svg>
    `
    this.flag.element.setAttribute('src', flagImg);

    this.carHeader.element.append(this.selectBtn.element, this.removeBtn.element, this.carName.element);
    this.carBody.element.append(this.startEngineBtn.element, this.stopEngineBtn.element, this.car.element, this.flag.element);
    this.element.append(this.carHeader.element, this.carBody.element);



  }
}
