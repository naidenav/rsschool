import './about-game.scss';
import { BaseComponent } from '../base-component';
import { Popup } from '../popup/popup';

export class AboutGame extends BaseComponent {
  readonly popup: Popup;

  constructor() {
    super('div', ['about-game']);
    this.popup = new Popup('add-user');
    const gameExample = require('../../assets/game-example.png');
    const popupExample = require('../../assets/popup-example.png');
    this.element.innerHTML = `
      <h2 class='h2'>How to play?</h2>
      <section class='register'>
        <div class='instruction'>
          <div class='instruction__number'>1</div>
          <p class='instruction__text'>
            Register new player in game
          </p>
        </div>
        <div class='popup-form'>
        <img src='${popupExample}' alt='popup-example'>
        </div>
      </section>
      <section class='setting'>
      <div class='instruction'>
          <div class='instruction__number'>2</div>
          <p class='instruction__text'>
            Configure your game settings
          </p>
        </div>
        <div class='setting-btn-wrapper'>
          <a href='#setting' class='setting-btn'>Game Setting</a>
        </div>
      </section>
      <section class='how-to-play'>
      <div class='instruction'>
          <div class='instruction__number'>3</div>
          <p class='instruction__text'>
            Start you new game! Remember card
            positions and match it before times up
          </p>
        </div>
        <div class='game-example'>
          <img src='${gameExample}' alt='game-example'>
        </div>
      </section>
    `;
    this.element.append(this.popup.element);
  }
}
