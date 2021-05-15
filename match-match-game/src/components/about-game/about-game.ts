import { BaseComponent } from "../base-component";

export class AboutGame extends BaseComponent {
  constructor() {
    super('div', ['about-game']);
    this.element.innerHTML = '';
  }
}
