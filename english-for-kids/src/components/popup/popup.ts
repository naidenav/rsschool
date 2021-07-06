import './popup.scss';
import { BaseComponent } from '../base-component';
import { Input } from '../input/input';

export class Popup extends BaseComponent {
  readonly popup: BaseComponent;

  readonly popupTitle: BaseComponent;

  readonly firstNameInput: Input;

  readonly lastNameInput: Input;

  readonly addUserBtn: BaseComponent;

  readonly cancelBtn: BaseComponent;

  readonly popupForm: BaseComponent;

  readonly inputWrapper: BaseComponent;

  readonly buttonWrapper: BaseComponent;

  constructor() {
    super('div', ['cover', 'cover_hidden']);
    this.popup = new BaseComponent('div', ['popup']);
    this.popupTitle = new BaseComponent('p', ['popup__title'], 'Log In');
    this.firstNameInput = new Input('First Name:', 'text', true, '30');
    this.lastNameInput = new Input('Last Name:', 'text', true, '30');
    this.addUserBtn = new BaseComponent('button', ['button_add-user'], 'Log In');
    this.addUserBtn.element.setAttribute('type', 'submit');
    this.cancelBtn = new BaseComponent('button', ['button_cancel'], 'Cancel');
    this.cancelBtn.element.setAttribute('type', 'reset');
    this.popupForm = new BaseComponent('form', ['popup__form']);
    this.popupForm.element.setAttribute('id', 'popup-form');
    this.inputWrapper = new BaseComponent('div', ['input-wrapper']);
    this.buttonWrapper = new BaseComponent('div', ['buttons-wrapper']);

    this.element.append(this.popup.element);
    this.popup.element.append(this.popupTitle.element, this.popupForm.element);
    this.popupForm.element.append(this.inputWrapper.element, this.buttonWrapper.element);
    this.inputWrapper.element.append(this.firstNameInput.element, this.lastNameInput.element);
    this.buttonWrapper.element.append(this.addUserBtn.element, this.cancelBtn.element);

    const nameRegexp = /^[\p{L}+\d\s]{3,30}$/u;

    const firstNameInput = this.firstNameInput.input.element as HTMLInputElement;
    const lastNameInput = this.lastNameInput.input.element as HTMLInputElement;

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

    this.cancelBtn.element.addEventListener('click', () => {
      this.hidePopup();
    })
  }

  showPopup() {
    this.element.classList.add('popup_opacity-up');
    this.element.classList.remove('cover_hidden');
    this.element.addEventListener('animationend', () => {
      this.element.classList.remove('popup_opacity-up');
      this.element.classList.remove('cover_hidden');
    });
  };

  hidePopup() {
    this.element.classList.add('popup_opacity-down');
    this.element.addEventListener('animationend', () => {
      this.element.classList.add('cover_hidden');
      this.element.classList.remove('popup_opacity-down');
    });
  };
}
