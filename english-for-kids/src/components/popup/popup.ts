/* eslint-disable import/no-cycle */

import './popup.scss';
import { BaseComponent } from '../base-component';
import { Input } from '../input/input';
import { ACCESS_TOKEN_KEY } from '../../constants';
import { App } from '../../app';
import { setAdminMode } from '../redux/actions';
import { getAccessToken } from '../../REST-api';
import { showControlRoute } from '../utils';

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

    const loginInput = this.loginInput.input.element as HTMLInputElement;
    const passwordInput = this.passwordInput.input.element as HTMLInputElement;

    this.cancelBtn.element.addEventListener('click', () => {
      this.hidePopup();
    });

    this.loginBtn.element.addEventListener('click', async (e) => {
      e.preventDefault();
      if (loginInput.value && passwordInput.value) {
        try {
          const token = await getAccessToken({
            username: loginInput.value,
            password: passwordInput.value,
          });
          sessionStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
          app.store.dispatch(setAdminMode());
          showControlRoute();
          app.sidebar.showLogOutBtn();
          this.hidePopup();
        } catch (err) {
          loginInput.setCustomValidity('Wrong login or password');
          passwordInput.setCustomValidity('Wrong login or password');
        }
      }
    });
  }

  showPopup(): void {
    this.element.classList.add('popup_opacity-up');
    this.element.classList.remove('cover_hidden');
    this.element.addEventListener('animationend', () => {
      this.element.classList.remove('popup_opacity-up');
      this.element.classList.remove('cover_hidden');
    });
  }

  hidePopup(): void {
    this.element.classList.add('popup_opacity-down');
    this.element.addEventListener('animationend', () => {
      this.element.classList.add('cover_hidden');
      this.element.classList.remove('popup_opacity-down');
    });
  }
}
