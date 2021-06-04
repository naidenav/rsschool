import './button.scss';
import { BaseComponent } from "../base-component";

export class Button extends BaseComponent {
  constructor(title: string, styles: string[] = [], disabled: boolean = false) {
    super('button', styles, title);
    if (disabled) this.element.setAttribute('disabled', '')
    this.element.classList.add(...styles);
  }

  disable(): void {
    if (!this.element.hasAttribute('disabled')) {
      this.element.setAttribute('disabled', '');
    }
  }

  enable(): void {
    if (this.element.hasAttribute('disabled')) {
      this.element.removeAttribute('disabled');
    }
  }
}
