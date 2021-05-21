import './styles.scss';
import { App } from './app';

window.onload = () => {
  sessionStorage.setItem('difficulty', '16');
  sessionStorage.setItem('cardsType', 'animals');
  new App(document.body);
};
