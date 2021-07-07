/* eslint-disable import/no-cycle */

import './statistics.scss';
import { BaseComponent } from '../base-component';
import { CARDS_STORAGE, CATEGORIES_STORAGE, SORT_ARROW } from '../../constants';
import {
  createRecord, initLocalStorage, renderTableIcon, trainDifficultWords,
} from '../utils';
import { CardInfo } from '../../interfaces';
import { App } from '../../app';

export class Statistics extends BaseComponent {
  wrapper: BaseComponent;

  btnWrapper: BaseComponent;

  trainDifficultBtn: BaseComponent;

  resetBtn: BaseComponent;

  statTable: BaseComponent;

  tBody: BaseComponent;

  trHeader: BaseComponent;

  thPosition: BaseComponent;

  thCategory: BaseComponent;

  thWord: BaseComponent;

  thTranslation: BaseComponent;

  thTrainCardsNum: BaseComponent;

  thPlayCardsNum: BaseComponent;

  thTrueCardsNum: BaseComponent;

  thTrueCardsPer: BaseComponent;

  constructor(app: App) {
    super('div', ['statistics']);
    this.wrapper = new BaseComponent('div', ['wrapper']);
    this.btnWrapper = new BaseComponent('div', ['statistics__btn-wrapper']);
    this.trainDifficultBtn = new BaseComponent('button', ['statistics__button'], 'Train Difficult');
    this.resetBtn = new BaseComponent('button', ['statistics__button'], 'Reset Statistics');
    this.btnWrapper.element.append(this.trainDifficultBtn.element, this.resetBtn.element);

    this.statTable = new BaseComponent('table', ['table']);
    this.tBody = new BaseComponent('tbody', ['t-body']);
    this.trHeader = new BaseComponent('tr', ['tr-header']);
    this.thPosition = new BaseComponent('th', ['th'], '№');
    this.thCategory = new BaseComponent('th', ['th']);
    this.thCategory.element.innerHTML = `Category ${SORT_ARROW}`;
    this.thWord = new BaseComponent('th', ['th'], 'Word');
    this.thWord.element.innerHTML = `Word ${SORT_ARROW}`;
    this.thTranslation = new BaseComponent('th', ['th'], 'Translation');
    this.thTranslation.element.innerHTML = `Translation ${SORT_ARROW}`;
    this.thTrainCardsNum = new BaseComponent('th', ['th']);
    this.thTrainCardsNum.element.innerHTML = `${renderTableIcon('train')} ${SORT_ARROW}`;
    this.thPlayCardsNum = new BaseComponent('th', ['th']);
    this.thPlayCardsNum.element.innerHTML = `${renderTableIcon('play')} ${SORT_ARROW}`;
    this.thTrueCardsNum = new BaseComponent('th', ['th']);
    this.thTrueCardsNum.element.innerHTML = `${renderTableIcon('true-card')} ${SORT_ARROW}`;
    this.thTrueCardsPer = new BaseComponent('th', ['th']);
    this.thTrueCardsPer.element.innerHTML = `${renderTableIcon('percentage')} ${SORT_ARROW}`;

    this.element.append(this.btnWrapper.element, this.statTable.element);
    // this.wrapper.element.append();
    this.statTable.element.append(this.tBody.element);
    this.tBody.element.append(this.trHeader.element);
    this.trHeader.element.append(
      this.thPosition.element,
      this.thCategory.element,
      this.thWord.element,
      this.thTranslation.element,
      this.thTrainCardsNum.element,
      this.thPlayCardsNum.element,
      this.thTrueCardsNum.element,
      this.thTrueCardsPer.element,
    );

    this.resetBtn.element.addEventListener('click', () => {
      localStorage.removeItem(CARDS_STORAGE);
      localStorage.removeItem(CATEGORIES_STORAGE);
      app.statistics.render();
    });

    this.trainDifficultBtn.element.addEventListener('click', async () => {
      trainDifficultWords(app);
    });
  }

  clear(): void {
    this.trHeader.element.nextSibling?.remove();
    if (this.trHeader.element.nextSibling) this.clear();
  }

  addRecord(card: CardInfo, category: string, index: number): void {
    const record = createRecord(card, category, index);

    this.tBody.element.append(record);
  }

  render(): void {
    this.clear();
    initLocalStorage();
    const categoryData = localStorage.getItem(CATEGORIES_STORAGE);
    const cardsData = localStorage.getItem(CARDS_STORAGE);

    if (categoryData !== null && cardsData !== null) {
      const categories: string[] = JSON.parse(categoryData);
      const cards: CardInfo[][] = JSON.parse(cardsData);
      let position = 0;
      categories.forEach((category, index) => {
        cards[index].forEach((card) => this.addRecord(card, category, position++));
      });
    }
  }
}
