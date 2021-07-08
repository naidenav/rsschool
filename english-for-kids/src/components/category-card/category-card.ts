import './category-card.scss';
import { CategoryInfo } from "../../interfaces";
import { BaseComponent } from "../base-component";

export class CategoryCard extends BaseComponent {
  constructor(category: CategoryInfo) {
    super('div', ['category-card']);
    this.element.setAttribute('id', `category-card-${category.id}`);
    this.element.innerHTML = `
      <div class="category-card__main-view" id="main-view-${category.id}">
        <p class="category-card__title" id="category-name-${category.id}">${category.category}</p>
        <p class="category-card__words">Words: <span class="category-card__number">${category.cards.length}</span></p>
        <div class="category-card__btn-wrapper">
          <button class="category-card__update-btn" data-id="${category.id}">Update</button>
          <button class="category-card__add-word-btn" data-id="${category.id}">Add word</button>
        </div>
        <div class="category-card__delete-btn" data-id="${category.id}"></div>
      </div>
      <div class="category-card__update-view" id="update-view-${category.id}">
        <fieldset class="category-card__fieldset">
          <legend class="category-card__legend">Category name:</legend>
          <input class="category-card__input" type="text" value="${category.category}" id="category-name-input-${category.id}">
        </fieldset>
        <div class="category-card__btn-wrapper">
          <button class="category-card__create-btn" data-id="${category.id}">Create</button>
          <button class="category-card__cancel-btn" data-id="${category.id}">Cancel</button>
        </div>
      </div>
    `;
  }
}
