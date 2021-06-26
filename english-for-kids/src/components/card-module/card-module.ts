import { CARDS } from "../../constants";
import { BaseComponent } from "../base-component";
import { Card } from "../card/card";

export class CardModule extends BaseComponent {
  constructor() {
    super('div', ['card-module']);
  }

  render(index: string) {
    const i = +index;
    CARDS[i].forEach(item => {
      const card = new Card(item.image, item.word, item.translation, item.audioSrc);
      this.element.append(card.element);
    })
  }

  clear() {
    this.element.firstElementChild?.remove();
    if (this.element.firstElementChild) this.clear();
  }
}
