import './about-game.scss';
import { BaseComponent } from '../base-component';
import gameExample from '../../assets/game-example.png';
import popupExample from '../../assets/popup-example.png';

export class AboutGame extends BaseComponent {
  constructor() {
    super('div', ['about-game']);
    this.element.innerHTML = `
      <h2 class='h2'>How to play?</h2>
      <section class='register'>
        <div class='instruction'>
          <div class='instruction__number'>1</div>
          <p class='instruction__text'>
            Register a new player in the game
          </p>
          <button class='game-btn' id='register-user-btn'>Register new player</button>
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
            Start a new game! Memorize the positions
            of the cards and match them before the time runs out
          </p>
        </div>
        <div class='game-example'>
          <img src='${gameExample}' alt='game-example'>
        </div>
      </section>
    `;
  }
}
