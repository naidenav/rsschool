import { AboutGame } from './components/about-game/about-game';
import { GameSetting } from './components/game-setting/game-setting';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { ImageCategoryModel } from './components/models/image-category-model';
import { UserProfile } from './components/models/user-profile-model';
import { Popup } from './components/popup/popup';
import { Score } from './components/score/score';
import { getFirstTenUsers } from './components/shared/getTenUsers';
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

  private readonly score: Score;

  private readonly setting: GameSetting;

  private readonly game: Game;

  private readonly popup: Popup;

  private routing: Array<Nav>;

  tenUsers: UserProfile[] = [];

  constructor(private readonly rootElement: HTMLElement) {
    this.dataBase = new DataBase('naidenav', 'userData', 2);

    this.dataBase.initDB('userData').then((db) => {
      if (db !== undefined) {
        this.dataBase.db = db;
        getFirstTenUsers(db)

          .then((tenUsers: UserProfile[]) => {
            this.tenUsers = tenUsers;
            this.updateScore();
          });
      }
    });

    this.header = new Header();
    this.main = new Main();
    this.about = new AboutGame();
    this.score = new Score();
    this.setting = new GameSetting();
    this.popup = new Popup();
    this.game = new Game();
    this.rootElement.append(this.header.element, this.main.element, this.popup.element);
    this.main.element.append(this.about.element);

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
        content: this.score.element,
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

    const showPopup = () => {
      this.popup.element.classList.add('popup_opacity-up');
      this.popup.element.classList.remove('cover_hidden');
      this.popup.element.addEventListener('animationend', () => {
        this.popup.element.classList.remove('popup_opacity-up');
        this.popup.element.classList.remove('cover_hidden');
        document.body.classList.add('notScrollable');
      });
    };

    const hidePopup = () => {
      this.popup.element.classList.add('popup_opacity-down');
      this.popup.element.addEventListener('animationend', () => {
        document.body.classList.remove('notScrollable');
        this.popup.element.classList.add('cover_hidden');
        this.popup.element.classList.remove('popup_opacity-down');
      });
    };

    const firstNameInput = this.popup.firstNameInput.input.element as HTMLInputElement;
    const lastNameInput = this.popup.lastNameInput.input.element as HTMLInputElement;
    const emailInput = this.popup.emailInput.input.element as HTMLInputElement;

    this.header.registerUserBtn.element.addEventListener('click', showPopup);

    this.header.startGameBtn.element.addEventListener('click', () => {
      this.start();
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#game`;
      this.header.btnWrapper.element.replaceChild(this.header.stopGameBtn.element, this.header.startGameBtn.element);
      this.header.nav.about.disable();
      this.header.nav.score.disable();
      this.header.nav.setting.disable();
    });

    this.header.stopGameBtn.element.addEventListener('click', () => {
      this.stopGame();
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#about`;
    });

    this.popup.cancelBtn.element.addEventListener('click', hidePopup);

    this.popup.addUserBtn.element.addEventListener('click', (e) => {
      if (firstNameInput.validity.valid && lastNameInput.validity.valid && emailInput.validity.valid) {
        e.preventDefault();
        this.submit();
        this.header.btnWrapper.element.replaceChild(
          this.header.startGameBtn.element,
          this.header.registerUserBtn.element,
        );
        hidePopup();
      }
    });

    this.game.finishPopup.button.element.addEventListener('click', () => {
      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      const email = sessionStorage.getItem('email');
      const { score } = this.game;
      const time = `${this.game.timer.minutes}.${this.game.timer.seconds}`;
      const date = new Date();
      if (firstName !== null && lastName !== null && email !== null) {
        const record: UserProfile = {
          firstName,
          lastName,
          email,
          bestScore: score,
          time,
          date,
        };
        this.dataBase.addRecord('userData', record);
      }
      if (this.dataBase.db !== null) {
        getFirstTenUsers(this.dataBase.db).then((tenUsers) => {
          this.tenUsers = tenUsers;
          this.updateScore();
        });
      }
      this.game.finishPopup.hideFinishPopup();
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#score`;
      this.stopGame();
    });

    // const avatarInput = this.about.popup.avatarInput.element as HTMLInputElement;
    // let avatarBase64;
    // avatarInput.addEventListener('input', () => {
    //   avatarBase64 = getBase64Image(avatarInput);
    // });
  }

  navigate(route: HTMLElement | null, content: HTMLElement): void {
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
    let category: ImageCategoryModel = categories[0];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category === sessionStorage.getItem('cardsType')) {
        category = categories[i];
      }
    }
    const images = category.images.map((name) => `${category.category}/${name}`);
    this.game.startGame(images);
  }

  submit(): void {
    const firstNameInput = this.popup.firstNameInput.input.element as HTMLInputElement;
    const lastNameInput = this.popup.lastNameInput.input.element as HTMLInputElement;
    const emailInput = this.popup.emailInput.input.element as HTMLInputElement;

    if (firstNameInput.validity.valid && lastNameInput.validity.valid && emailInput.validity.valid) {
      this.dataBase.addUser('userData', {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        bestScore: 0,
        time: '',
        date: new Date(),
      });

      this.header.userName.element.innerText = `${firstNameInput.value}`;
    }

    sessionStorage.setItem('firstName', `${firstNameInput.value}`);
    sessionStorage.setItem('lastName', `${lastNameInput.value}`);
    sessionStorage.setItem('email', `${emailInput.value}`);
  }

  stopGame(): void {
    this.game.timer.stopTimer();
    this.game.timer.resetTimer();
    this.game.cardsField.clear();

    this.header.nav.about.enable();
    this.header.nav.score.enable();
    this.header.nav.setting.enable();
    this.header.btnWrapper.element.replaceChild(this.header.startGameBtn.element, this.header.stopGameBtn.element);
  }

  updateScore(): void {
    this.score.clearScore();

    this.tenUsers.forEach((item: UserProfile, index) => {
      if (item.bestScore !== 0) {
        this.score.addRecord(item, index);
      }
    });
  }
}
