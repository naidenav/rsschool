import './sidebar.scss'
import { BaseComponent } from "../base-component";
import { App } from '../../app';
import { CATEGORIES } from '../../constants';

export class Sidebar extends BaseComponent {
  private list: BaseComponent;

  constructor(app: App) {
    super('aside', ['sidebar']);
    this.list = new BaseComponent('ul', ['sidebar__list']);
    this.element.append(this.list.element);

    app.header.sidebarBtn.element.addEventListener('click', () => {
      console.log('gdf')
      if (app.header.sidebarBtn.element.classList.contains('sidebar-btn_active')) {
        this.hideSidebar();
        app.header.sidebarBtn.element.classList.remove('sidebar-btn_active');
      } else {
        this.showSidebar();
        app.header.sidebarBtn.element.classList.add('sidebar-btn_active');
      }
    });
  }

  renderList():void {
    const mainLink = document.createElement('li');
    mainLink.innerHTML = '<a href="#main" class="sidebar__link main-link">Main page</a>';
    this.list.element.append(mainLink);
    CATEGORIES.forEach((category, index) => {
      const link = document.createElement('li');
      link.innerHTML = `<a href="#${index}" class="sidebar__link">${category}</a>`;
      this.list.element.append(link);
    });
  }

  showSidebar() {
    this.element.style.transform = 'translateX(0)';
  }

  hideSidebar() {
    this.element.style.transform = 'translateX(-102%)';
  }
}
