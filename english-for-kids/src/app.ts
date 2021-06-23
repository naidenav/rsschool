import { Background } from "./components/background";
import { Header } from "./components/header/header";
import { State } from "./interfaces";

export class App {
  private background: Background;

  private header: Header;

  private state: State = {
    mode: 'train',
  };

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.classList.add('train-mode');
    this.background = new Background();
    this.header = new Header();


    this.rootElement.append(this.background.element, this.header.element);




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
