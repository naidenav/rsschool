import { getNewCategory } from './components/utils';
import { BASE_URL } from './constants';
import { CardInfo, CategoryInfo, QueryParam } from './interfaces';

const generateQueryString = (queryParams: QueryParam[] = []): string => (queryParams.length ? `?${queryParams
  .map((param) => `${param.key}=${param.value}`).join('&')}`
  : '');

export const getAllCategories = async (queryParams: QueryParam[] = []): Promise<CategoryInfo[]> => {
  const response = await fetch(`${BASE_URL}${generateQueryString(queryParams)}`);
  const categories: CategoryInfo[] = await response.json();

  return categories;
};

export const getCategory = async (id: number): Promise<CategoryInfo> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const category: CategoryInfo = await response.json();

  return category;
};

export const createCategory = async (name: string, ): Promise<CategoryInfo> => (await fetch(`${BASE_URL}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ categoryName: name }),
})).json();

export const updateCategoryName = async (id:number, name: string): Promise<CategoryInfo> => {
  const category = await getCategory(id);
  category.category = name;
  delete category._id;
  const newCategory = await updateCategory(category);
  console.log(newCategory)

  return newCategory;
}

export const updateCategory = async (newCategory: CategoryInfo): Promise<CategoryInfo> => {
  const response = await fetch(`${BASE_URL}/${newCategory.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCategory),
  });
  console.log(response.status)
  const category = await response.json();

  return category;
}

export const deleteCategory = async (id: number): Promise<CategoryInfo> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  const category = await response.json();

  return category;
};

export const getCard = async (id: number, word: string): Promise<CardInfo> => {
  const response = await fetch(`${BASE_URL}/${id}/${word}`);
  const card: CardInfo = await response.json();

  return card;
};

export const createCard = async (newCard: CardInfo ): Promise<CardInfo> => {
  const response = await fetch(`${BASE_URL}/${newCard.categoryId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCard),
  });
  const card: CardInfo = await response.json();

  return card;
}

export const updateCard = async (newCard: CardInfo): Promise<CardInfo> => {
  const response = await fetch(`${BASE_URL}/${newCard.categoryId}/${newCard.word}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCard),
  });
  const card = await response.json();

  return card;
}

export const deleteCard = async (id: number, word: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}/${word}`, {
    method: 'DELETE',
  });
  const card = await response.json();

  return card;
};
