import './input.scss';
import { BaseComponent } from '../base-component';

export class Input extends BaseComponent {
  constructor(type: string, styles: string[] = [], disabled = false, id?: string) {
    super('input', ['input']);
    this.element.setAttribute('type', type);
    this.element.classList.add(...styles);
    if (disabled) this.element.setAttribute('disabled', '');
    if (id) this.element.setAttribute('id', id);
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
