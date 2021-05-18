import { AboutGame } from './components/about-game/about-game';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { ImageCategoryModel } from './components/models/image-category-model';
import { Popup } from './components/popup/popup';

interface Nav {
  name: string;
  component(): void;
}
export class App {
  private readonly header: Header;

  private readonly main: Main;

  private readonly about: AboutGame;

  private readonly game: Game;

  private readonly popup: Popup;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.main = new Main();
    this.about = new AboutGame();
    this.popup = new Popup('add-user');
    this.game = new Game();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
    this.main.element.appendChild(this.about.element);
    // this.about.element.append(this.popup.element);

    window.onpopstate = () => {
      console.log(window.location.hash);
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = this.routing.find((p: Nav) => p.name === currentRouteName);

      if (currentRoute) {
        currentRoute.component();
      }
    };

    this.header.gameBtn.element.addEventListener('click', () => {
      if (this.main.element.contains(this.about.element)) {
        document.body.classList.add('notScrollable');
        this.about.popup.element.classList.add('popup_opacity-up');
        this.about.popup.element.classList.remove('cover_hidden');
        this.about.popup.element.addEventListener('animationend', () => {
          this.about.popup.element.classList.remove('popup_opacity-up');
          this.about.popup.element.classList.remove('cover_hidden');
          document.body.classList.add('notScrollable');
        });
      }
    })

    this.about.popup.cancelBtn.element.addEventListener('click', () => {
      this.about.popup.element.classList.add('popup_opacity-down');
      this.about.popup.element.addEventListener('animationend', () => {
        document.body.classList.remove('notScrollable');
        this.about.popup.element.classList.add('cover_hidden');
        this.about.popup.element.classList.remove('popup_opacity-down');
      });
    })
  }

  private routing: Array<Nav> = [
    {
      name: 'about',
      component: () => {
        const currentChild = this.main.element.firstElementChild;
        if (currentChild) {
          this.main.element.replaceChild(this.about.element, currentChild);
        }
      },
    },
    {
      name: 'game',
      component: () => {
        const currentChild = this.main.element.firstElementChild;
        if (currentChild) {
          this.main.element.replaceChild(this.game.element, currentChild);
        }
      },
    },
    {
      name: 'score',
      component: () => {
        const currentChild = this.main.element.firstElementChild;
        if (currentChild) {
          this.main.element.replaceChild(this.game.element, currentChild);
        }
      },
    },
    {
      name: 'setting',
      component: () => {
        const currentChild = this.main.element.firstElementChild;
        if (currentChild) {
          this.main.element.replaceChild(this.game.element, currentChild);
        }
      },
    },
  ];

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
