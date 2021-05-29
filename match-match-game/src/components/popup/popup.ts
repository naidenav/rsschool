import './popup.scss';
import { BaseComponent } from '../base-component';
import { Button } from '../shared/button/button';
import { Input } from '../shared/input/input';

export class Popup extends BaseComponent {
  readonly popup: BaseComponent;

  readonly popupTitle: BaseComponent;

  readonly firstNameInput: Input;

  readonly lastNameInput: Input;

  readonly emailInput: Input;

  readonly addUserBtn: Button;

  readonly cancelBtn: Button;

  readonly popupForm: BaseComponent;

  readonly inputAndAvatar: BaseComponent;

  readonly inputWrapper: BaseComponent;

  readonly avatar: BaseComponent;

  readonly avatarLabel: BaseComponent;

  readonly avatarInput: BaseComponent;

  readonly buttonWrapper: BaseComponent;

  constructor() {
    super('div', ['cover', 'cover_hidden']);
    this.popup = new BaseComponent('div', ['popup']);
    this.popupTitle = new BaseComponent('p', ['popup__title'], 'Register new Player');
    this.firstNameInput = new Input('First Name:', 'text', true, '30');
    this.lastNameInput = new Input('Last Name:', 'text', true, '30');
    this.emailInput = new Input('Email:', 'email', true, '30');
    this.addUserBtn = new Button('add user', ['button_add-user'], 'submit');
    this.addUserBtn.element.setAttribute('form', 'popup-form');
    this.cancelBtn = new Button('cancel', ['button_cancel'], 'reset');
    this.popupForm = new BaseComponent('form', ['popup__form']);
    this.popupForm.element.setAttribute('id', 'popup-form');
    this.inputAndAvatar = new BaseComponent('div', ['input-and-avatar']);
    this.inputWrapper = new BaseComponent('div', ['input-wrapper']);
    this.avatar = new BaseComponent('div', ['avatar']);
    this.avatarLabel = new BaseComponent('label', ['avatar-label'], '');
    this.avatarLabel.element.setAttribute('for', 'avatar-input-file');
    this.avatarInput = new BaseComponent('input', ['avatar-input']);
    this.avatarInput.element.setAttribute('id', 'avatar-input-file');
    this.avatarInput.element.setAttribute('type', 'file');
    this.buttonWrapper = new BaseComponent('div', ['buttons-wrapper']);

    this.element.append(this.popup.element);
    this.popup.element.append(this.popupTitle.element, this.popupForm.element);
    this.popupForm.element.append(this.inputAndAvatar.element, this.buttonWrapper.element);
    this.inputAndAvatar.element.append(this.inputWrapper.element, this.avatar.element);
    this.inputWrapper.element.append(this.firstNameInput.element, this.lastNameInput.element, this.emailInput.element);
    this.avatar.element.append(this.avatarLabel.element, this.avatarInput.element);
    this.buttonWrapper.element.append(this.addUserBtn.element, this.cancelBtn.element);

    const regPart1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))/;
    const regPart2 = /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailRegexp = new RegExp(`${regPart1.source}${regPart2.source}`);

    const nameRegexp = /^[\p{L}+\d\s]{3,30}$/u;

    const firstNameInput = this.firstNameInput.input.element as HTMLInputElement;
    const lastNameInput = this.lastNameInput.input.element as HTMLInputElement;
    const emailInput = this.emailInput.input.element as HTMLInputElement;

    firstNameInput.addEventListener('input', () => {
      if (nameRegexp.test(firstNameInput.value) && /\p{L}+/u.test(firstNameInput.value)) {
        firstNameInput.setCustomValidity('');
      } else {
        firstNameInput.setCustomValidity('Bad First Name');
      }
    });

    lastNameInput.addEventListener('input', () => {
      if (nameRegexp.test(lastNameInput.value) && /\p{L}+/u.test(lastNameInput.value)) {
        lastNameInput.setCustomValidity('');
      } else {
        lastNameInput.setCustomValidity('Bad Last Name');
      }
    });

    emailInput.addEventListener('input', () => {
      if (emailRegexp.test(emailInput.value)) {
        emailInput.setCustomValidity('');
      } else {
        emailInput.setCustomValidity('Bad Email');
      }
    });
  }
}
