import './page.control.scss';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Garage } from '../../pages/garage/garage';

export class PageControl extends BaseComponent {
  readonly nextPageBtn: Button;

  readonly prevPageBtn: Button;

  constructor(context: Garage) {
    super('nav', ['page-control']);
    this.nextPageBtn = new Button('next', ['main-button', 'next-page-btn'], true);
    this.prevPageBtn = new Button('prev', ['main-button', 'prev-page-btn'], true);

    this.element.append(this.prevPageBtn.element, this.nextPageBtn.element);

    this.prevPageBtn.element.addEventListener('click', async () => {
      context.currentPage--;
      context.updatePageNumberTitle();
      await context.updateCarsList();
    });

    this.nextPageBtn.element.addEventListener('click', async () => {
      context.currentPage++;
      context.updatePageNumberTitle();
      await context.updateCarsList();
    });
  }

  checkPaginationStatus(totalCars: number, currentPage: number) {
    if (!this.nextPageBtn.element.hasAttribute('disabled') && Math.ceil(totalCars / 7) === currentPage) {
      this.nextPageBtn.disable();
    } else if (this.nextPageBtn.element.hasAttribute('disabled')
    && Math.ceil(totalCars / 7) > currentPage) {
      this.nextPageBtn.enable();
    }

    if (!this.prevPageBtn.element.hasAttribute('disabled') && currentPage === 1) {
      this.prevPageBtn.disable();
    } else if (this.prevPageBtn.element.hasAttribute('disabled') && currentPage > 1) {
      this.prevPageBtn.enable();
    }
  }
}
