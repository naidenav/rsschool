import { CategoryInfo } from '../../interfaces';
import { BaseComponent } from '../base-component';
import { CategoryIcon } from '../category-icon/category-icon';
import defaultImage from '../../assets/images/default-category.jpg';
import { clear } from '../utils';

export class CategoryModule extends BaseComponent {
  constructor() {
    super('div', ['category-module']);
  }

  render(categories: CategoryInfo[]): void {
    clear(this.element);
    categories.forEach((category) => {
      const imageSrc = category.cards[3]?.image || defaultImage;
      const categoryCard = new CategoryIcon(category.category, imageSrc, category.id);
      this.element.append(categoryCard.element);
    });
  }
}
