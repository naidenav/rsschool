import { BASE_URL } from './constants';
import {
  CardInfo, CategoryInfo, СloudinaryResponse, QueryParam, Token, User,
} from './interfaces';

export const getAccessToken = async (userData: User): Promise<Token> => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const generateQueryString = (queryParams: QueryParam[] = []): string => (queryParams.length ? `?${queryParams
  .map((param) => `${param.key}=${param.value}`).join('&')}`
  : '');

export const getAllCategories = async (queryParams: QueryParam[] = []): Promise<CategoryInfo[]> => {
  const response = await fetch(`${BASE_URL}/categories${generateQueryString(queryParams)}`);
  const categories: CategoryInfo[] = await response.json();

  return categories;
};

export const getCategory = async (id: number): Promise<CategoryInfo> => {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  const category: CategoryInfo = await response.json();

  return category;
};

export const createCategory = async (name: string): Promise<CategoryInfo> => (await fetch(`${BASE_URL}/categories`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify({ categoryName: name }),
})).json();

export const updateCategoryInDB = async (newCategory: CategoryInfo): Promise<CategoryInfo> => {
  const response = await fetch(`${BASE_URL}/categories/${newCategory.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(newCategory),
  });
  const category = await response.json();

  return category;
};

export const updateCategoryName = async (id:number, name: string): Promise<CategoryInfo> => {
  const category = await getCategory(id);
  const catrgoryInfo: CategoryInfo = {
    category: name,
    id: category.id,
    cards: category.cards,
  };
  const newCategory = await updateCategoryInDB(catrgoryInfo);

  return newCategory;
};

export const deleteCategory = async (id: number): Promise<CategoryInfo> => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  const category = await response.json();

  return category;
};

export const getCard = async (id: number, word: string): Promise<CardInfo> => {
  const response = await fetch(`${BASE_URL}/categories/${id}/${word}`);
  const card: CardInfo = await response.json();

  return card;
};

export const createCard = async (newCard: CardInfo): Promise<CardInfo> => {
  const response = await fetch(`${BASE_URL}/categories/${newCard.categoryId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(newCard),
  });
  const card: CardInfo = await response.json();

  return card;
};

export const uploadImage = async (image: FormData): Promise<СloudinaryResponse> => {
  const response = await fetch('https://alluring-glacier-28316.herokuapp.com/image', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
    body: image,
  });
  const obj = await response.json();

  return obj;
};

export const uploadAudio = async (audio: FormData): Promise<СloudinaryResponse> => {
  const response = await fetch('https://alluring-glacier-28316.herokuapp.com/audio', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
    body: audio,
  });
  const obj = await response.json();

  return obj;
};

export const updateCard = async (newCard: CardInfo): Promise<void> => {
  await fetch(`${BASE_URL}/categories/${newCard.categoryId}/${newCard.word}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(newCard),
  });
};

export const deleteCard = async (id: number, word: string): Promise<void> => {
  await fetch(`${BASE_URL}/categories/${id}/${word}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
};
