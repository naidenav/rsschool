import { CategoryInfo } from './interfaces';

export const getNewCategory = (name: string, id: number): CategoryInfo => ({
  category: name,
  id,
  cards: [],
});
