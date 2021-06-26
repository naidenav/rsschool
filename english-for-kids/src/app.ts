import { Background } from "./components/background";
import { BaseComponent } from "./components/base-component";
import { Card } from "./components/card/card";
import { CategoryModule } from "./components/category-module/category-module";
import { Category } from "./components/category/category";
import { Header } from "./components/header/header";
import { Sidebar } from "./components/sidebar/sidebar";
import { State } from "./interfaces";

export class App {
  private background: Background;

  private wrapper: BaseComponent;

  readonly header: Header;

  private sidebar: Sidebar;

  private container: BaseComponent;

  private categoryModule: CategoryModule;

  private state: State = {
    mode: 'train',
  };

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.classList.add('train-mode');
    this.background = new Background();
    this.wrapper = new BaseComponent('div', ['wrapper']);
    this.header = new Header();
    this.sidebar = new Sidebar(this);
    this.sidebar.renderList();
    this.container = new BaseComponent('div', ['card-container']);
    this.categoryModule = new CategoryModule();
    this.categoryModule.render();

    this.rootElement.append(this.background.element, this.wrapper.element, this.sidebar.element);
    this.container.element.append(this.categoryModule.element);
    this.wrapper.element.append(this.header.element, this.container.element);



    const modeSwitcher = document.getElementById('mode-switcher__input');

    modeSwitcher?.addEventListener('change', () => {
      if (document.body.classList.contains('train-mode')) {
        document.body.classList.remove('train-mode');
        document.body.classList.add('play-mode');
      } else if (document.body.classList.contains('play-mode')) {
        document.body.classList.remove('play-mode');
        document.body.classList.add('train-mode');
      }
    });
  }
}
