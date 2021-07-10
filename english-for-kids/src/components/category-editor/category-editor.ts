import './category-editor.scss';
import { createCategory, deleteCategory, getAllCategories, updateCategoryName } from "../../REST-api";
import { BaseComponent } from "../base-component";
import { CategoryCard } from "../category-card/category-card";
import { CLASS_NAMES, CONTROL_PAGE } from '../../constants';
import { CategoryInfo } from '../../interfaces';
import { clear, getNewCategory, removeCardEditMode, setCardEditMode, updateCategoriesLists } from '../utils';
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

    this.element.addEventListener('click', async(e) => {
      await this.eventHandler(e, app);
    });

    this.addCategoryCard.element.addEventListener('click', async () => {
      await this.addCategory();
      await updateCategoriesLists(app);
    });

    this.element.addEventListener('scroll', (e) => {
      if (this.element.scrollTop + this.element.clientHeight >= this.element.scrollHeight) {
        this.increaseCategories(4);
      }
    })
  }

  async render() {
    clear(this.element);
    this.categoriesList = await getAllCategories();
    this.element.append(this.addCategoryCard.element);
    this.increaseCategories(6);
  }

  increaseCategories(num: number) {
    for (let i = 0; i < num; i++) {
      const category = this.categoriesList.shift();
      if (category) {
        const card = new CategoryCard(category);
        const addCard = document.querySelector('.add-category-card');
        (addCard as HTMLElement).before(card.element);
      } else break;
    }
  }

  updateCategoryCard(category: CategoryInfo) {
    const categoryName = document.getElementById(`category-name-${category.id}`);
    (categoryName as HTMLElement).innerHTML = `${category.category}`;
  }

  async addCategory() {
    const newCategory = await createCategory('New Category');
    const category = new CategoryCard(getNewCategory('New Category', newCategory.id));
    const addCard = document.querySelector('.add-category-card');
    (addCard as HTMLElement).before(category.element);
  }

  async deleteCategory(id: string) {
    await deleteCategory(Number(id));
    const category = document.getElementById(`${CLASS_NAMES.categoryCard}-${id}`);
    category?.remove();
  }

  getNameInputValue(id: string) {
    const nameInput = document.getElementById(`category-name-input-${id}`);
    return (nameInput as HTMLInputElement).value;
  }

  async eventHandler(e: Event, app: App) {
    const target = e.target as HTMLElement;
    const id = target.dataset.id;
    if (id) {
      switch (target.className) {
        case CLASS_NAMES.addWordBtn:
          window.location.hash = `#${CONTROL_PAGE}/${id}`;
          return;
        case CLASS_NAMES.cancelBtn:
          removeCardEditMode(id);
          return;
        case CLASS_NAMES.createBtn:
          const nameInputValue = this.getNameInputValue(id);
          if (nameInputValue) {
            const category = await updateCategoryName(Number(id), nameInputValue);
            this.updateCategoryCard(category);
            await updateCategoriesLists(app);
          };
          return;
        case CLASS_NAMES.deleteBtn:
          await this.deleteCategory(id);
          await updateCategoriesLists(app);
          return;
        case CLASS_NAMES.updateBtn:
          setCardEditMode(id);
          return;
        default:
          return;
      }
    }
  }
}
