import './game-setting.scss';
import { BaseComponent } from '../base-component';
import { Select } from '../shared/select/select';
import { DIFFICULTY, CATEGORIES } from '../constants';

export class GameSetting extends BaseComponent {
  readonly selectCardsType: Select;

  readonly selectDifficulty: Select;

  constructor() {
    super('div', ['game-setting']);

    this.selectDifficulty = new Select('Difficulty', DIFFICULTY, 'select-cards-type', 'select game difficulty');
    this.selectCardsType = new Select('Game cards', CATEGORIES, 'select-cards-type', 'select game cards type');

    this.element.append(this.selectCardsType.element, this.selectDifficulty.element);

    this.selectCardsType.select.element.addEventListener('input', () => {
      const cardsTypeValue = (this.selectCardsType.select.element as HTMLInputElement).value;
      sessionStorage.setItem('cardsType', cardsTypeValue);
    });

    this.selectDifficulty.select.element.addEventListener('input', () => {
      const difficultyValue = (this.selectDifficulty.select.element as HTMLInputElement).value;
      sessionStorage.setItem('difficulty', difficultyValue.slice(0, 2));
    });
  }
}
