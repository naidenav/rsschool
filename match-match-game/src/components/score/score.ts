import './score.scss';
import { BaseComponent } from '../base-component';
import { UserProfile } from '../models/user-profile-model';

export class Score extends BaseComponent {
  scoreTitle: BaseComponent;

  scoreTable: BaseComponent;

  tBody: BaseComponent;

  trHeader: BaseComponent;

  thPosition: BaseComponent;

  thAvatar: BaseComponent;

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
    this.thPosition = new BaseComponent('th', ['th']);
    this.thAvatar = new BaseComponent('th', ['th', 'th-avatar']);
    this.thPlayer = new BaseComponent('th', ['th', 'player-column'], 'Player');
    this.thScore = new BaseComponent('th', ['th'], 'Score');
    this.thTime = new BaseComponent('th', ['th'], 'Time');
    this.thDate = new BaseComponent('th', ['th'], 'Date');

    this.element.append(this.scoreTitle.element, this.scoreTable.element);
    this.scoreTable.element.append(this.tBody.element);
    this.tBody.element.append(this.trHeader.element);
    this.trHeader.element.append(this.thPosition.element, this.thAvatar.element, this.thPlayer.element,
      this.thScore.element, this.thTime.element, this.thDate.element);
  }

  clearScore():void {
    this.trHeader.element.nextSibling?.remove();
    if (this.trHeader.element.nextSibling) this.clearScore();
  }

  addRecord(data: UserProfile, index: number): void {
    const tr = new BaseComponent('tr', ['tr-body']);
    const tdPosition = new BaseComponent('td', ['td', 'td-position'], `${index + 1}.`);
    const tdAvatar = new BaseComponent('td', ['td-avatar']);
    tdAvatar.element.style.backgroundImage = `url('${data.avatar}')`;
    const tdPlayer = new BaseComponent('td', ['td', 'td-player'], `${data.firstName} ${data.lastName}`);
    const tdScore = new BaseComponent('td', ['td'], `${data.bestScore}`);
    const tdTime = new BaseComponent('td', ['td'], data.time);
    const day = data.date.getDate() < 10 ? `0${data.date.getDate()}` : data.date.getDate();
    const month = data.date.getMonth() < 10 ? `0${data.date.getMonth()}` : data.date.getMonth();
    const date = `${day}.${month}.${data.date.getFullYear()}`;
    const tdDate = new BaseComponent('td', ['td'], date);

    this.tBody.element.append(tr.element);
    tr.element.append(tdPosition.element, tdAvatar.element, tdPlayer.element, tdScore.element, tdTime.element, tdDate.element);
  }
}
