import './winners.scss';
import { BaseComponent } from '../../components/base-component';
import { PageControl } from '../../components/page-control/page-control';
import { WinnersList } from '../../components/winners-list/winners-list';
import { WINNERS_LIMIT } from '../../constants';
import { FullWinnerInfo, WinnerProfile } from '../../interfaces';
import { getWinners } from '../../api';
import { updatePageNumberTitle } from '../../components/utils';

export class Winners extends BaseComponent {
  private winnersTitle: BaseComponent;

  public pageNumperTitle: BaseComponent;

  private winnersList: WinnersList;

  private pageControl: PageControl;

  public currentPage = 1;

  public totalWinners: number;

  constructor(fullWinnersInfo: FullWinnerInfo[], totalWinners: number) {
    super('div', ['winners', 'hidden']);
    this.winnersTitle = new BaseComponent('h2', ['h2'], `Winners (${totalWinners})`);
    this.pageNumperTitle = new BaseComponent('h3', ['h3'], 'Page #1');
    this.winnersList = new WinnersList(fullWinnersInfo);
    this.pageControl = new PageControl();
    this.pageControl.checkPaginationStatus(totalWinners, this.currentPage, WINNERS_LIMIT);
    this.totalWinners = totalWinners;

    this.element.append(this.winnersTitle.element, this.pageNumperTitle.element,
      this.winnersList.element, this.pageControl.element);

    this.pageControl.prevPageBtn.element.addEventListener('click', async () => {
      this.currentPage--;
      updatePageNumberTitle(this);
      await this.updateWinnersList();
    });

    this.pageControl.nextPageBtn.element.addEventListener('click', async () => {
      this.currentPage++;
      updatePageNumberTitle(this);
      await this.updateWinnersList();
    });
  }

  async updateWinnersList() {
    const queryParams = [
      {
        key: '_page',
        value: `${this.currentPage}`,
      },
      {
        key: '_limit',
        value: WINNERS_LIMIT,
      },
    ];
    const winners = await getWinners(queryParams);
    this.winnersList.renderWinners(winners.fullWinnersInfo);
    this.totalWinners = winners.totalWinners;
    this.pageControl.checkPaginationStatus(this.totalWinners, this.currentPage, WINNERS_LIMIT);
  }
}
