import './button.scss';
import { BaseComponent } from '../../base-component';

export class Button extends BaseComponent {
  constructor(title: string, styles: string[] = [], type = 'button', disabled = false) {
    super('button', ['button'], title);
    if (type) this.element.setAttribute('type', type);
    if (disabled) this.element.setAttribute('disabled', 'disabled');
    this.element.classList.add(...styles);
  }

  disable(): void {
    if (!this.element.hasAttribute('disabled')) {
      this.element.setAttribute('disabled', 'disabled');
    }
  }

  enable(): void {
    if (this.element.hasAttribute('disabled')) {
      this.element.removeAttribute('disabled');
    }
  }
}
