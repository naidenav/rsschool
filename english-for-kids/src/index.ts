import './styles.scss';
import { App } from './app';
import { CARDS, CARDS_STORAGE, CATEGORIES, CATEGORIES_STORAGE } from './constants';

window.onload = async () => {
  const application = new App(document.body);
};
