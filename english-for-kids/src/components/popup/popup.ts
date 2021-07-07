import './popup.scss';
import { BaseComponent } from '../base-component';
import { Input } from '../input/input';
import { LOGIN, PASSWORD } from '../../constants';
import { App } from '../../app';
import { setAdminMode } from '../redux/actions';

export class Popup extends BaseComponent {
  readonly popup: BaseComponent;

  readonly popupTitle: BaseComponent;

  readonly loginInput: Input;

  readonly passwordInput: Input;

  readonly loginBtn: BaseComponent;

  readonly cancelBtn: BaseComponent;

  readonly popupForm: BaseComponent;

  readonly inputWrapper: BaseComponent;

  readonly buttonWrapper: BaseComponent;

  constructor(app: App) {
    super('div', ['cover', 'cover_hidden']);
    this.popup = new BaseComponent('div', ['popup']);
    this.popupTitle = new BaseComponent('p', ['popup__title'], 'Log In');
    this.loginInput = new Input('First Name:', 'text', true, '30');
    this.passwordInput = new Input('Last Name:', 'text', true, '12');
    this.loginBtn = new BaseComponent('button', ['button_add-user'], 'Log In');
    this.loginBtn.element.setAttribute('type', 'submit');
    this.cancelBtn = new BaseComponent('button', ['button_cancel'], 'Cancel');
    this.cancelBtn.element.setAttribute('type', 'reset');
    this.popupForm = new BaseComponent('form', ['popup__form']);
    this.popupForm.element.setAttribute('id', 'popup-form');
    this.inputWrapper = new BaseComponent('div', ['input-wrapper']);
    this.buttonWrapper = new BaseComponent('div', ['buttons-wrapper']);

    this.element.append(this.popup.element);
    this.popup.element.append(this.popupTitle.element, this.popupForm.element);
    this.popupForm.element.append(this.inputWrapper.element, this.buttonWrapper.element);
    this.inputWrapper.element.append(this.loginInput.element, this.passwordInput.element);
    this.buttonWrapper.element.append(this.loginBtn.element, this.cancelBtn.element);

    const nameRegexp = /^[\p{L}+\d\s]{1,30}$/u;
    const loginRegexp = new RegExp(`^${LOGIN}$`);
    const passwordRegexp = new RegExp(`^${PASSWORD}$`);

    const loginInput = this.loginInput.input.element as HTMLInputElement;
    const passwordInput = this.passwordInput.input.element as HTMLInputElement;

    loginInput.addEventListener('input', () => {
      if (loginRegexp.test(loginInput.value)) {
        loginInput.setCustomValidity('');
      } else {
        loginInput.setCustomValidity('Wrong login');
      }
    });

    passwordInput.addEventListener('input', () => {
      if (passwordRegexp.test(passwordInput.value)) {
        passwordInput.setCustomValidity('');
      } else {
        passwordInput.setCustomValidity('Wrong password');
      }
    });

    this.cancelBtn.element.addEventListener('click', () => {
      this.hidePopup();
    });

    this.loginBtn.element.addEventListener('click', (e) => {
      if (loginInput.validity.valid && passwordInput.validity.valid) {
        e.preventDefault();
        app.store.dispatch(setAdminMode());
        app.sidebar.showControlRoute();
        app.sidebar.showLogOutBtn();
        this.hidePopup();
      }
    });
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
