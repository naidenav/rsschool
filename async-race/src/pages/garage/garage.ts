import { BaseComponent } from "../../components/base-component";
import { GarageControl } from "../../components/garage-control/garage-control";
import { GarageList } from "../../components/garage-list/garage-list";
import { CarProfile } from "../../interfaces";

export class Garage extends BaseComponent {
  private control: GarageControl;

  private garageList: GarageList;

  constructor(carList: CarProfile[]) {
    super('div', ['garage']);
    this.control = new GarageControl();
    this.garageList = new GarageList(carList);

    this.element.append(this.control.element, this.garageList.element)
  }
}
