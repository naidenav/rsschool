import './category-editor.scss';
import { createCategory, deleteCategory, getAllCategories, updateCategory, updateCategoryName } from "../../REST-api";
import { BaseComponent } from "../base-component";
import { CategoryCard } from "../category-card/category-card";
import { CLASS_NAMES } from '../../constants';
import { CategoryInfo } from '../../interfaces';
import { getNewCategory } from '../utils';

export class CategoryEditor extends BaseComponent {
  addCategoryCard: BaseComponent;

  constructor() {
    super('div', ['category-editor']);
    this.addCategoryCard = new BaseComponent('div', ['add-category-card']);
    this.addCategoryCard.element.innerHTML = `
      <p class="add-category-card__title">Add new Category</p>
      <div class="add-category-card__plus-icon"></div>
    `;

    this.element.addEventListener('click', async(e) => {
      await this.eventHandler(e);
    });

    this.addCategoryCard.element.addEventListener('click', this.addCategory);
  }

  async render() {
    this.clear();
    const categories = await getAllCategories();
    categories.forEach(category => {
      const card = new CategoryCard(category);
      this.element.append(card.element);
    })
    this.element.append(this.addCategoryCard.element);
  }

  clear(): void {
    this.element.firstElementChild?.remove();
    if (this.element.firstElementChild) this.clear();
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

  setCategoryEditMode(id: string) {
    const mainView = document.getElementById(`main-view-${id}`);
    const updateView = document.getElementById(`update-view-${id}`);
    if (!mainView?.classList.contains('show-update-view')) {
      mainView?.classList.add('show-update-view');
      updateView?.classList.add('show-update-view');
    }
  }

  removeCategoryEditMode(id: string) {
    const mainView = document.getElementById(`main-view-${id}`);
    const updateView = document.getElementById(`update-view-${id}`);
    if (mainView?.classList.contains('show-update-view')) {
      updateView?.classList.remove('show-update-view');
      mainView?.classList.remove('show-update-view');
    }
  }

  getNameInputValue(id: string) {
    const nameInput = document.getElementById(`category-name-input-${id}`);
    return (nameInput as HTMLInputElement).value;
  }

  async eventHandler(e: Event) {
    const target = e.target as HTMLElement;
    const id = target.dataset.id;
    if (id) {
      switch (target.className) {
        case CLASS_NAMES.addWordBtn:
          return;
        case CLASS_NAMES.cancelBtn:
          this.removeCategoryEditMode(id);
          return;
        case CLASS_NAMES.createBtn:
          const nameInputValue = this.getNameInputValue(id);
          if (nameInputValue) {
            const category = await updateCategoryName(Number(id), nameInputValue);
            this.updateCategoryCard(category);
          };
          return;
        case CLASS_NAMES.deleteBtn:
          await this.deleteCategory(id);
          return;
        case CLASS_NAMES.updateBtn:
          this.setCategoryEditMode(id);
          return;
        default:
          return;
      }
    }
  }
}
