import './styles.scss';
import { App } from './app';
import { Background } from './components/background';

const background = new Background();
document.body.classList.add('train-mode');
document.body.append(background.element);

window.onload = async () => {
  const application = new App(document.body);
};

document.body.addEventListener('click', () => {
  if (document.body.classList.contains('train-mode')) {
    document.body.classList.remove('train-mode');
    document.body.classList.add('play-mode');
  } else if (document.body.classList.contains('play-mode')) {
    document.body.classList.remove('play-mode');
    document.body.classList.add('train-mode');
  }
})
