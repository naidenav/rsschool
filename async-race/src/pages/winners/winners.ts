import './winners.scss';
import { BaseComponent } from '../../components/base-component';
import { PageControl } from '../../components/page-control/page-control';
import { WinnersList } from '../../components/winners-list/winners-list';
import { WINNERS_LIMIT } from '../../constants';
import { WinnerProfile } from '../../interfaces';

export class Winners extends BaseComponent {
  private winnersTitle: BaseComponent;

  public pageNumperTitle: BaseComponent;

  private winnersList: WinnersList;

  private pageControl: PageControl;

  public currentPage = 1;

  public totalWinners: number;

  constructor(winners: WinnerProfile[], totalWinners: number) {
    super('div', ['winners', 'hidden']);
    this.winnersTitle = new BaseComponent('h2', ['h2'], `Winners (${totalWinners})`);
    this.pageNumperTitle = new BaseComponent('h3', ['h3'], 'Page #1');
    this.winnersList = new WinnersList(winners);
    this.pageControl = new PageControl();
    this.pageControl.checkPaginationStatus(totalWinners, this.currentPage);
    this.totalWinners = totalWinners;

    this.element.append(this.winnersTitle.element, this.pageNumperTitle.element,
      this.winnersList.element, this.pageControl.element)
  }
}
