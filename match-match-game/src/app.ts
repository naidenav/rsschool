import { Header } from './components/header/header';
import { Game } from './components/game/game';
import { ImageCategoryModel } from './components/models/image-category-model';

export class App {
  private readonly header: Header;

  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.game = new Game();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.game.element);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
