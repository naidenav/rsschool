/* eslint-disable import/no-cycle */

import './summary.scss';
import { BaseComponent } from '../base-component';
import { App } from '../../app';
import { removeMistakes } from '../redux/actions';
import { navigate, playAudio } from '../utils';
import { FAILURE_AUDIO_SRC, SUCCESS_AUDIO_SRC } from '../../constants';

export class Summary extends BaseComponent {
  image: BaseComponent;

  title: BaseComponent;

  constructor() {
    super('div', ['summary']);
    this.image = new BaseComponent('div', ['summary__image']);
    this.title = new BaseComponent('p', ['summary__title']);
    this.element.append(this.title.element, this.image.element);
  }

  succes(app: App): void {
    this.clear();
    this.image.element.classList.add('success-image');
    this.title.element.innerHTML = 'Success!';
    navigate(this.element, app.container.element);
    playAudio(SUCCESS_AUDIO_SRC);
  }

  failure(mistakes: number, app: App): void {
    this.clear();
    this.image.element.classList.add('failure-image');
    this.title.element.innerHTML = `You made <span class="mistakes">${mistakes}</span> mistakes`;
    navigate(this.element, app.container.element);
    playAudio(FAILURE_AUDIO_SRC);
    app.store.dispatch(removeMistakes());
  }

  clear(): void {
    if (this.image.element.classList.contains('succes-image')) this.image.element.classList.remove('succes-image');
    if (this.image.element.classList.contains('failure-image')) this.image.element.classList.remove('failure-image');

    this.title.element.innerHTML = '';
  }
}
