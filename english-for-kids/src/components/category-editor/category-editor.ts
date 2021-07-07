import './category-editor.scss';
import { getAllCategories } from "../../REST-api";
import { BaseComponent } from "../base-component";
import { CategoryCard } from "../category-card/category-card";

export class CategoryEditor extends BaseComponent {
  addCategoryCard: BaseComponent;

  constructor() {
    super('div', ['category-editor']);
    this.addCategoryCard = new BaseComponent('div', ['add-category-card']);
    this.addCategoryCard.element.innerHTML = `
      <p class="add-category-card__title">Add new Category</p>
      <div class="add-category-card__plus-icon"></div>
    `;
  }

  async render() {
    const categories = await getAllCategories();
    categories.forEach(category => {
      const card = new CategoryCard(category);
      this.element.append(card.element);
    })
    this.element.append(this.addCategoryCard.element);
  }
}
