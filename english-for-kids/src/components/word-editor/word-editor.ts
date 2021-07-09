import './word-editor.scss';
import { createCard, createCategory, deleteCategory, getAllCategories, getCategory, updateCategory, updateCategoryName } from "../../REST-api";
import { BaseComponent } from "../base-component";
import { CategoryCard } from "../category-card/category-card";
import { CLASS_NAMES } from '../../constants';
import { CategoryInfo } from '../../interfaces';
import { clear, getNewCategory, getNewWord, updateCategoriesLists } from '../utils';
import { App } from '../../app';
import { WordCard } from '../word-card/word-card';

export class WordEditor extends BaseComponent {
  addWordCard: BaseComponent;

  currentCategory: CategoryInfo | null = null;

  constructor(app: App) {
    super('div', ['word-editor']);
    this.addWordCard = new BaseComponent('div', ['add-word-card']);
    this.addWordCard.element.innerHTML = `
      <p class="add-word-card__title">Add new Word</p>
      <div class="add-word-card__plus-icon"></div>
    `;

    this.element.addEventListener('click', async(e) => {
      await this.eventHandler(e, app);
    });

    this.addWordCard.element.addEventListener('click', async () => {
      await this.addWord();
    });
  }

  async render(id: number) {
    clear(this.element);
    const category = await getCategory(id);
    this.currentCategory = category;
    category.cards.forEach(card => {
      const wordCard = new WordCard(card);
      this.element.append(wordCard.element);
    })
    this.element.append(this.addWordCard.element);
  }

  updateCategoryCard(category: CategoryInfo) {
    const categoryName = document.getElementById(`category-name-${category.id}`);
    (categoryName as HTMLElement).innerHTML = `${category.category}`;
  }

  async addWord() {
    if (this.currentCategory) {
      const word = getNewWord(this.currentCategory)
      const newCard = await createCard(word);
      const wordCard = new WordCard(newCard);
      const addCard = document.querySelector('.add-word-card');
      (addCard as HTMLElement).before(wordCard.element);
    }
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
        default:
          return;
      }
    }
  }
}
