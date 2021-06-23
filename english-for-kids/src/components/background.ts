import { BaseComponent } from "./base-component";

export class Background extends BaseComponent {
  constructor() {
    super('div');
    this.element.setAttribute('id', 'bg-image');
    this.element.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#3af18d" fill-opacity="1" d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,
        411,208C480,171,549,117,617,96C685.7,75,754,85,823,106.7C891.4,128,960,160,1029,192C1097.1,224,1166,256,
        1234,250.7C1302.9,245,1371,203,1406,181.3L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,
        320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,
        320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
        </path>
      </svg>
    `
  }
}
