import './statistics.scss';
import { BaseComponent } from "../base-component";
import { SORT_ARROW } from '../../constants';
import { renderTableIcon } from '../utils';

export class Statistics extends BaseComponent {
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

  constructor() {
    super('div', ['statistics']);
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
  }

  clear(): void {
    this.trHeader.element.nextSibling?.remove();
    if (this.trHeader.element.nextSibling) this.clear();
  }

  // addRecord(data: UserProfile, index: number): void {
  //   const tr = new BaseComponent('tr', ['tr-body']);
  //   const tdPosition = new BaseComponent('td', ['td', 'td-position'], `${index + 1}.`);
  //   const tdAvatar = new BaseComponent('td', ['td-avatar']);
  //   tdAvatar.element.style.backgroundImage = `url('${data.avatar}')`;
  //   const tdPlayer = new BaseComponent('td', ['td', 'td-player'], `${data.firstName} ${data.lastName}`);
  //   const tdScore = new BaseComponent('td', ['td'], `${data.bestScore}`);
  //   const tdTime = new BaseComponent('td', ['td'], data.time);
  //   const day = data.date.getDate() < 10 ? `0${data.date.getDate()}` : data.date.getDate();
  //   const month = data.date.getMonth() < 10 ? `0${data.date.getMonth()}` : data.date.getMonth();
  //   const date = `${day}.${month}.${data.date.getFullYear()}`;
  //   const tdDate = new BaseComponent('td', ['td'], date);

  //   this.tBody.element.append(tr.element);
  //   tr.element.append(
  //     tdPosition.element,
  //     tdAvatar.element,
  //     tdPlayer.element,
  //     tdScore.element,
  //     tdTime.element,
  //     tdDate.element,
  //   );
  // }
}
