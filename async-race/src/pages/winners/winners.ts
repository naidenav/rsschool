import './winners.scss';
import { BaseComponent } from '../../components/base-component';
import { PageControl } from '../../components/page-control/page-control';
import { WinnersList } from '../../components/winners-list/winners-list';
import { WINNERS_LIMIT } from '../../constants';
import { QueryParam, Winners } from '../../interfaces';
import { getWinners } from '../../api';

export class WinnersPage extends BaseComponent {
  private winnersTitle: BaseComponent;

  public pageNumperTitle: BaseComponent;

  private winnersList: WinnersList;

  private pageControl: PageControl;

  public currentPage = 1;

  public totalWinners: number;

  private sortOrder: string | null = null;

  constructor(fullWinnersInfo: Winners[], totalWinners: number) {
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
      this.updatePageNumberTitle();
      await this.updateWinnersList();
    });

    this.pageControl.nextPageBtn.element.addEventListener('click', async () => {
      this.currentPage++;
      this.updatePageNumberTitle();
      await this.updateWinnersList();
    });

    this.winnersList.thWins.element.addEventListener('click', async () => {
      this.toSort('wins', this.winnersList.winsSortArrow.element, this.winnersList.timeSortArrow.element)
    });

    this.winnersList.thBestTime.element.addEventListener('click', async () => {
      this.toSort('time', this.winnersList.timeSortArrow.element, this.winnersList.winsSortArrow.element)
    });
  }

  updatePageNumberTitle = (): void => {
    this.pageNumperTitle.element.innerText = `Page #${this.currentPage}`;
  };

  async updateWinnersList(sort?: string, order?: string): Promise<void> {
    const queryParams = this.getQueryParams(sort, order);
    const winners = await getWinners(queryParams);
    this.winnersList.renderWinners(winners.winners);
    this.totalWinners = winners.totalWinners;
    this.pageControl.checkPaginationStatus(this.totalWinners, this.currentPage, WINNERS_LIMIT);
  }

  getQueryParams(sort?: string, order?: string): QueryParam[] {
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
    if (sort && order) {
      queryParams.push({ key: '_sort', value: sort });
      queryParams.push({ key: '_order', value: order });
    }
    return queryParams;
  }

  async toSort(column: string, sortArrow: HTMLElement, otherSortArrow: HTMLElement) {
    if (otherSortArrow.classList.contains('arrow-up')) {
      otherSortArrow.classList.remove('arrow-up')
    }
    if (otherSortArrow.classList.contains('arrow-down')) {
      otherSortArrow.classList.remove('arrow-down')
    }
    if (this.sortOrder !== 'ASC') {
      this.sortOrder = 'ASC';
      if (sortArrow.classList.contains('arrow-down')) sortArrow.classList.remove('arrow-dowm');
      sortArrow.classList.add('arrow-up');
      await this.updateWinnersList(column, 'ASC');
    } else {
      this.sortOrder = 'DESC';
      if (sortArrow.classList.contains('arrow-up')) sortArrow.classList.remove('arrow-up');
      sortArrow.classList.add('arrow-down');
      await this.updateWinnersList(column, 'DESC');
    }
  }
}
