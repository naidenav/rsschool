import './category-module.scss';
import { CARDS, CATEGORIES } from "../../constants";
import { BaseComponent } from "../base-component";
import { Category } from "../category/category";

export class CategoryModule extends BaseComponent {
  constructor() {
    super('div', ['category-module']);
  }

  render() {
    CATEGORIES.forEach((item, index) => {
      const imageSrc = CARDS[index][0].image;
      const category = new Category(item, imageSrc, index)
      this.element.append(category.element);
    })
  }
}
