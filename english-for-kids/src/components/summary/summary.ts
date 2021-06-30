import './summary.scss';
import { BaseComponent } from "../base-component";
import { App } from '../../app';
import { removeMistakes } from '../redux/actions';
import { playAudio } from '../utils';
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

  succes(app: App) {
    this.clear();
    this.image.element.classList.add('success-image');
    this.title.element.innerHTML = 'Success!';
    app.router.navigate(this.element, app);
    playAudio(SUCCESS_AUDIO_SRC);
  }

  failure(mistakes: number, app: App) {
    this.clear();
    this.image.element.classList.add('failure-image');
    this.title.element.innerHTML = `You made ${mistakes} mistakes`;
    app.router.navigate(this.element, app);
    playAudio(FAILURE_AUDIO_SRC);
    app.store.dispatch(removeMistakes());
  }

  clear() {
    if (this.image.element.classList.contains('succes-image')) this.image.element.classList.remove('succes-image');
    if (this.image.element.classList.contains('failure-image')) this.image.element.classList.remove('failure-image');

    this.title.element.innerHTML = '';
  }
}
