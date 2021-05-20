import './game-setting.scss';
import { BaseComponent } from "../base-component";
import { ImageCategoryModel } from "../models/image-category-model";
import { Select } from "../shared/select/select";


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

    this.selectDifficulty = new Select('Difficulty', ['4 x 4', '6 x 6'], 'select-cards-type', 'select game cards type');
    this.selectCardsType = new Select('Game cards', categories, 'select-cards-type', 'select game cards type');
    this.element.append(this.selectCardsType.element, this.selectDifficulty.element);

  }
}
