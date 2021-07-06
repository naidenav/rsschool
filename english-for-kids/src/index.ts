import './styles.scss';
import { App } from './app';
import { getAllCategories } from './REST-api';
import { CategoryInfo } from './interfaces';

window.onload = async () => {
  const categories: CategoryInfo[] = await getAllCategories();
  const application = new App(document.body, categories);
};
