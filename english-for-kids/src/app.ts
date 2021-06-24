import { Background } from "./components/background";
import { BaseComponent } from "./components/base-component";
import { Header } from "./components/header/header";
import { Sidebar } from "./components/sidebar/sidebar";
import { State } from "./interfaces";

export class App {
  private background: Background;

  private wrapper: BaseComponent;

  readonly header: Header;

  private sidebar: Sidebar;

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

    this.rootElement.append(this.background.element, this.wrapper.element, this.sidebar.element);
    this.wrapper.element.append(this.header.element);



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
