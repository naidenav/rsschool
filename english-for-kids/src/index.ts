import './styles.scss';
import { App } from './app';
import { CARDS } from './constants';

window.onload = async () => {
  if (!localStorage.getItem('englishForKidsData')) {
    const data = JSON.stringify(CARDS);
    localStorage.setItem('englishForKidsData', data);
  }
  console.log(typeof JSON.stringify([{gff: 'sddc'},{dscsdc: 32}]))
  const application = new App(document.body);
};
