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

  readonly buttonWrapper: BaseComponent;

  constructor(id: string) {
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
    this.buttonWrapper = new BaseComponent('div', ['buttons-wrapper']);

    this.element.append(this.popup.element);
    this.popup.element.append(this.popupTitle.element, this.popupForm.element);
    this.popupForm.element.append(this.inputAndAvatar.element, this.buttonWrapper.element);
    this.inputAndAvatar.element.append(this.inputWrapper.element, this.avatar.element);
    this.inputWrapper.element.append(this.firstNameInput.element, this.lastNameInput.element, this.emailInput.element);
    const avatar = require('../../assets/icons/default-avatar.svg');
    this.avatar.element.innerHTML = `<img src='${avatar}' alt='bg-popup'>`;
    this.buttonWrapper.element.append(this.addUserBtn.element, this.cancelBtn.element);

    this.firstNameInput.input.element.addEventListener('input', () => {
      if (/^[\p{L}+\d\s]{3,30}$/u.test((this.firstNameInput.input.element as HTMLInputElement).value)
      && /\p{L}+/u.test((this.firstNameInput.input.element as HTMLInputElement).value)) {
        this.firstNameInput.validIcon.element.classList.add('valid');
      } else {
        if (this.firstNameInput.validIcon.element.classList.contains('valid')) {
          this.firstNameInput.validIcon.element.classList.remove('valid');
        }
      }
    })

    this.lastNameInput.input.element.addEventListener('input', () => {
      if (/^[\d]{3,30}$/u.test((this.lastNameInput.input.element as HTMLInputElement).value)) {
        this.lastNameInput.validIcon.element.classList.add('valid');
      } else {
        if (this.lastNameInput.validIcon.element.classList.contains('valid')) {
          this.lastNameInput.validIcon.element.classList.remove('valid');
        }
      }
    })

    this.emailInput.input.element.addEventListener('input', () => {
      if (/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test((this.emailInput.input.element as HTMLInputElement).value)) {
        this.emailInput.validIcon.element.classList.add('valid');
      } else {
        if (this.emailInput.validIcon.element.classList.contains('valid')) {
          this.emailInput.validIcon.element.classList.remove('valid');
        }
      }
    })
  }
}
