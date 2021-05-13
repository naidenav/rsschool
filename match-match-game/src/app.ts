import { Main } from './components/main/main';
import { ImageCategoryModel } from './components/models/image-category-model';

export class App {
  private readonly main: Main;

  constructor(private readonly rootElement: HTMLElement) {
    this.main = new Main();
    this.rootElement.appendChild(this.main.element);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.main.game.newGame(images);
  }
}
