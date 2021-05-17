import { AboutGame } from './components/about-game/about-game';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { ImageCategoryModel } from './components/models/image-category-model';

interface Nav {
  name: string;
  component(): void;
}
export class App {
  private readonly header: Header;

  private readonly main: Main;

  private readonly about: AboutGame;

  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.main = new Main();
    this.about = new AboutGame();
    this.game = new Game();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
    this.main.element.appendChild(this.about.element);

    window.onpopstate = () => {
      console.log(window.location.hash);
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = this.routing.find((p: Nav) => p.name === currentRouteName);

      if (currentRoute) {
        currentRoute.component();
      }
    };
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
