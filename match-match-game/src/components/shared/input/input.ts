import './input.scss';
import { BaseComponent } from '../../base-component';

export class Input extends BaseComponent {
  readonly fieldset: BaseComponent;

  readonly legend: BaseComponent;

  readonly input: BaseComponent;

  readonly validIcon: BaseComponent;

  constructor(title: string, type: string, required: boolean = true, id?: string, maxlength?: string, disabled?: boolean) {
    super('div', ['register-input']);
    this.fieldset = new BaseComponent('fieldset', ['register-input__fieldset']);
    this.legend = new BaseComponent('legend', ['register-input__legend'], title);
    this.input = new BaseComponent('input', ['register-input__input']);
    this.validIcon = new BaseComponent('div', ['register-input__valid-icon']);

    this.element.append(this.fieldset.element);
    this.fieldset.element.append(this.legend.element, this.input.element, this.validIcon.element);

    if (type) this.input.element.setAttribute('type', type);
    if (required) this.input.element.setAttribute('required', '');
    if (maxlength) this.input.element.setAttribute('maxlength', maxlength);
    if (disabled) this.input.element.setAttribute('disabled', '');
    if (id) this.input.element.setAttribute('id', id);
  }

  disable() {
    if (!this.input.element.hasAttribute('disabled')) {
      this.input.element.setAttribute('disabled', '');
    }
  }

  enable() {
    if (this.input.element.hasAttribute('disabled')) {
      this.input.element.removeAttribute('disabled');
    }
  }
}
