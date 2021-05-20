import { AboutGame } from './components/about-game/about-game';
import { GameSetting } from './components/game-setting/game-setting';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { ImageCategoryModel } from './components/models/image-category-model';
import { Popup } from './components/popup/popup';
import { getBase64Image } from './components/shared/getBase64';
import { DataBase } from './data-base';

interface Nav {
  name: string;
  component(): void;
}
export class App {
  private readonly dataBase: DataBase;

  private readonly header: Header;

  private readonly main: Main;

  private readonly about: AboutGame;

  private readonly setting: GameSetting;

  private readonly game: Game;

  private readonly popup: Popup;

  constructor(private readonly rootElement: HTMLElement) {
    this.dataBase = new DataBase('myDB', 'naidenav', 1);
    this.header = new Header();
    this.main = new Main();
    this.about = new AboutGame();
    this.setting = new GameSetting();
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

    const showPopup = () => {
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
    }

    const hidePopup = () => {
      this.about.popup.element.classList.add('popup_opacity-down');
      this.about.popup.element.addEventListener('animationend', () => {
        document.body.classList.remove('notScrollable');
        this.about.popup.element.classList.add('cover_hidden');
        this.about.popup.element.classList.remove('popup_opacity-down');
      });
    }

    const firstNameInput = this.about.popup.firstNameInput.input.element as HTMLInputElement;
    const lastNameInput = this.about.popup.lastNameInput.input.element as HTMLInputElement;
    const emailInput = this.about.popup.emailInput.input.element as HTMLInputElement;

    this.header.gameBtn.element.addEventListener('click', showPopup);

    this.about.popup.cancelBtn.element.addEventListener('click', hidePopup);

    this.about.popup.addUserBtn.element.addEventListener('click', (e) => {
      if (firstNameInput.validity.valid && lastNameInput.validity.valid && emailInput.validity.valid) {
        e.preventDefault();
        this.submit();
        hidePopup();
      }
    })

    // const avatarInput = this.about.popup.avatarInput.element as HTMLInputElement;
    // let avatarBase64;
    // avatarInput.addEventListener('input', () => {
    //   avatarBase64 = getBase64Image(avatarInput);
    // });
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
          this.main.element.replaceChild(this.setting.element, currentChild);
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

  submit():void {
    const firstNameInput = this.about.popup.firstNameInput.input.element as HTMLInputElement;
    const lastNameInput = this.about.popup.lastNameInput.input.element as HTMLInputElement;
    const emailInput = this.about.popup.emailInput.input.element as HTMLInputElement;

    if (firstNameInput.validity.valid && lastNameInput.validity.valid && emailInput.validity.valid) {
      console.log('все гуд')
      this.dataBase.addUser('naidenav',{
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        records: []
      })
    }
    sessionStorage.setItem('current User', `${firstNameInput.value} ${lastNameInput.value}`);
  }

}
