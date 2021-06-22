import './page-control.scss';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class PageControl extends BaseComponent {
  readonly nextPageBtn: Button;

  readonly prevPageBtn: Button;

  constructor() {
    super('nav', ['page-control']);
    this.nextPageBtn = new Button('next', ['main-button', 'next-page-btn'], true);
    this.prevPageBtn = new Button('prev', ['main-button', 'prev-page-btn'], true);

    this.element.append(this.prevPageBtn.element, this.nextPageBtn.element);
  }

  checkPaginationStatus(totalCars: number, currentPage: number, recordsLimit: string): void {
    const limit = Number(recordsLimit);

    const nextBtnIsEnable = !this.nextPageBtn.element.hasAttribute('disabled');
    const pageIsLast = Math.ceil(totalCars / limit) === currentPage;
    const pageIsNotLast = Math.ceil(totalCars / limit) > currentPage;

    if (nextBtnIsEnable && pageIsLast) {
      this.nextPageBtn.disable();
    } else if (!nextBtnIsEnable && pageIsNotLast) {
      this.nextPageBtn.enable();
    }

    const prevBtnIsEnable = !this.prevPageBtn.element.hasAttribute('disabled');

    if (prevBtnIsEnable && currentPage === 1) {
      this.prevPageBtn.disable();
    } else if (!prevBtnIsEnable && currentPage > 1) {
      this.prevPageBtn.enable();
    }
  }
}
