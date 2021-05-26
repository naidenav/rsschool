import './score.scss';
import { BaseComponent } from "../base-component";
import { UserProfile } from '../models/user-profile-model';

export class Score extends BaseComponent {
  scoreTitle: BaseComponent;

  scoreTable: BaseComponent;

  tBody: BaseComponent;

  trHeader: BaseComponent;

  thPlayer: BaseComponent;

  thScore: BaseComponent;

  thTime: BaseComponent;

  thDate: BaseComponent;

  constructor() {
    super('div', ['score']);
    this.scoreTitle = new BaseComponent('h2', ['h2'], 'Score');
    this.scoreTable = new BaseComponent('table', ['score-table']);

    this.tBody = new BaseComponent('tbody', ['t-body']);
    this.trHeader = new BaseComponent('tr', ['tr-header']);
    this.thPlayer = new BaseComponent('th', ['th-header', 'first-column'], 'Player');
    this.thScore = new BaseComponent('th', ['th-header'], 'Score');
    this.thTime = new BaseComponent('th', ['th-header'], 'Time');
    this.thDate = new BaseComponent('th', ['th-header'], 'Date');

    this.element.append(this.scoreTitle.element, this.scoreTable.element);
    this.scoreTable.element.append(this.tBody.element);
    this.tBody.element.append(this.trHeader.element);
    this.trHeader.element.append(this.thPlayer.element, this.thScore.element,
      this.thTime.element, this.thDate.element);
  }

  addRecord(data: UserProfile) {
    const tr = new BaseComponent('tr', ['tr-body']);
    const tdPlayer = new BaseComponent('td', ['td', 'td-player'], `${data.firstName} ${data.lastName}`);
    const tdScore = new BaseComponent('td', ['td'], `${data.bestScore}`);
    const tdTime = new BaseComponent('td', ['td'], data.time);
    const date = `${data.date.getDate()}.${data.date.getMonth()}.${data.date.getFullYear()}`;
    const tdDate = new BaseComponent('td', ['td'], date);

    this.tBody.element.append(tr.element);
    tr.element.append(tdPlayer.element, tdScore.element, tdTime.element, tdDate.element);
  }
}
