import './category.scss';
import { BaseComponent } from "../base-component";
import { CARDS } from '../../constants';

export class Category extends BaseComponent {
  title: BaseComponent;

  constructor(title: string, imageSrc: string, index: number) {
    super('a', ['category']);
    this.title = new BaseComponent('div', ['category__title'], title);

    this.element.style.backgroundImage = `url('${imageSrc}')`;
    this.element.setAttribute('href', `#${index}`);

    this.element.append(this.title.element);
  }
}
