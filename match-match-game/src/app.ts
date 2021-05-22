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
  route: HTMLElement | null;
  content: HTMLElement;
}
export class App {
  private readonly dataBase: DataBase;

  private readonly header: Header;

  private readonly main: Main;

  private readonly about: AboutGame;

  private readonly setting: GameSetting;

  private readonly game: Game;

  private readonly popup: Popup;

  private routing: Array<Nav>;

  constructor(private readonly rootElement: HTMLElement) {
    this.dataBase = new DataBase('naidenav', 'userData', 1);
    this.header = new Header();
    this.main = new Main();
    this.about = new AboutGame();
    this.setting = new GameSetting();
    this.popup = new Popup('add-user');
    this.game = new Game();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
    this.main.element.appendChild(this.about.element);

    this.routing = [
      {
        name: 'about',
        route: this.header.nav.about.element,
        content: this.about.element,
      },
      {
        name: 'game',
        route: null,
        content: this.game.element,
      },
      {
        name: 'score',
        route: this.header.nav.score.element,
        content: this.game.element,
      },
      {
        name: 'setting',
        route: this.header.nav.setting.element,
        content: this.setting.element,
      },
    ];

    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = this.routing.find((p: Nav) => p.name === currentRouteName);

      if (currentRoute) {
        this.navigate(currentRoute.route, currentRoute.content);
      }
    };

    this.header.nav.score.element.addEventListener('click', () => {
      this.start();
    })
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

    this.header.registerUserBtn.element.addEventListener('click', showPopup);

    this.header.startGameBtn.element.addEventListener('click', () => {
      this.start();
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#game`;
      this.header.element.replaceChild(this.header.stopGameBtn.element, this.header.startGameBtn.element);
      this.header.nav.about.disable();
      this.header.nav.score.disable();
      this.header.nav.setting.disable();
    });

    this.header.stopGameBtn.element.addEventListener('click', () => {

    });

    this.about.popup.cancelBtn.element.addEventListener('click', hidePopup);

    this.about.popup.addUserBtn.element.addEventListener('click', (e) => {
      if (firstNameInput.validity.valid && lastNameInput.validity.valid && emailInput.validity.valid) {
        e.preventDefault();
        this.submit();
        this.header.element.replaceChild(this.header.startGameBtn.element, this.header.registerUserBtn.element);
        hidePopup();
      }
    })


    this.setting.selectDifficulty.select.element.addEventListener('input', () => {
      switch((this.setting.selectDifficulty.select.element as HTMLInputElement).value) {
        case '4 x 4': sessionStorage.setItem('difficulty', '16');
        break;
        case '6 x 6': sessionStorage.setItem('difficulty', '36');
        this.game.totalCountCouple = 18;
      }
    })

    // const avatarInput = this.about.popup.avatarInput.element as HTMLInputElement;
    // let avatarBase64;
    // avatarInput.addEventListener('input', () => {
    //   avatarBase64 = getBase64Image(avatarInput);
    // });
  }

  navigate(route: HTMLElement | null, content: HTMLElement) {
    const currentChild = this.main.element.firstElementChild;
    if (currentChild) {
      this.main.element.replaceChild(content, currentChild);
    }
    this.header.nav.removeHighlight();
    if (route !== null) {
      route.classList.add('nav-btn_highlight');
    }
  }

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
