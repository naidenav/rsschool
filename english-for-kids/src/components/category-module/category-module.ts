import { CategoryInfo } from '../../interfaces';
import { BaseComponent } from '../base-component';
import { Category } from '../category/category';
import defaultImage from '../../assets/images/default-category.jpg';

export class CategoryModule extends BaseComponent {
  constructor() {
    super('div', ['category-module']);
  }

  render(categories: CategoryInfo[]): void {
    categories.forEach((category) => {
      const imageSrc = category.cards[3]?.image || defaultImage;
      const categoryCard = new Category(category.category, imageSrc, category.id);
      this.element.append(categoryCard.element);
    });
  }
}
