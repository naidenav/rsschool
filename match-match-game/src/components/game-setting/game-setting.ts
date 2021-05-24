import './game-setting.scss';
import { BaseComponent } from "../base-component";
import { ImageCategoryModel } from "../models/image-category-model";
import { Select } from "../shared/select/select";
import { Popup } from '../popup/popup';

const difficulty = ['16 cards', '24 cards', '36 cards'];
const categories: string[] = [];

async function getCategories() {
  const res = await fetch('./images.json');
  const categories: ImageCategoryModel[] = await res.json();
  return categories.map((item) => item.category);
}
getCategories().then(result => result.forEach((item) => categories.push(item)));

export class GameSetting extends BaseComponent {
  readonly selectCardsType: Select;

  readonly selectDifficulty: Select;

  constructor() {
    super('div', ['game-setting']);

    this.selectDifficulty = new Select('Difficulty', difficulty, 'select-cards-type', 'select game difficulty');
    this.selectCardsType = new Select('Game cards', categories, 'select-cards-type', 'select game cards type');

    this.element.append(this.selectCardsType.element, this.selectDifficulty.element);

    this.selectCardsType.select.element.addEventListener('input', () => {
      const cardsTypeValue = (this.selectCardsType.select.element as HTMLInputElement).value;
      sessionStorage.setItem('cardsType', cardsTypeValue);
    })

    this.selectDifficulty.select.element.addEventListener('input', () => {
      const difficultyValue = (this.selectDifficulty.select.element as HTMLInputElement).value;
      sessionStorage.setItem('difficulty', difficultyValue.slice(0, 2));
    })
  }
}
