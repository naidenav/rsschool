/* eslint-disable import/no-cycle */

import './category-editor.scss';
import { getAllCategories } from '../../REST-api';
import { BaseComponent } from '../base-component';
import { CategoryCard } from '../category-card/category-card';
import { CategoryInfo } from '../../interfaces';
import {
  addCategory,
  clear, eventHandler, updateCategoriesLists,
} from '../utils';
import { App } from '../../app';

export class CategoryEditor extends BaseComponent {
  addCategoryCard: BaseComponent;

  categoriesList: CategoryInfo[] = [];

  constructor(app: App) {
    super('div', ['category-editor']);
    this.addCategoryCard = new BaseComponent('div', ['add-category-card']);
    this.addCategoryCard.element.innerHTML = `
      <p class="add-category-card__title">Add new Category</p>
      <div class="add-category-card__plus-icon"></div>
    `;

    this.element.addEventListener('click', async (e) => {
      await eventHandler(e, app);
    });

    this.addCategoryCard.element.addEventListener('click', async () => {
      await addCategory();
      await updateCategoriesLists(app);
    });

    this.element.addEventListener('scroll', () => {
      if (this.element.scrollTop + this.element.clientHeight >= this.element.scrollHeight) {
        this.increaseCategories(4);
      }
    });
  }

  async render(): Promise<void> {
    clear(this.element);
    this.categoriesList = await getAllCategories();
    this.element.append(this.addCategoryCard.element);
    this.increaseCategories(6);
  }

  increaseCategories(num: number): void {
    for (let i = 0; i < num; i++) {
      const category = this.categoriesList.shift();
      if (category) {
        const card = new CategoryCard(category);
        const addCard = document.querySelector('.add-category-card');
        (addCard as HTMLElement).before(card.element);
      } else break;
    }
  }
}
