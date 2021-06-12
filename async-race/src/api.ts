import { BASE_URL, PATH } from './constants';
import {
  CarProfile, Velocity, WinnerProfile, Winners, CarsInfo, IsSuccess, WinnersInfo, QueryParam,
} from './interfaces';

const generateQueryString = (queryParams: QueryParam[] = []): string => (queryParams.length ? `?${queryParams
  .map((param) => `${param.key}=${param.value}`).join('&')}`
  : '');

export const getAllCars = async (queryParams: QueryParam[] = []): Promise<CarsInfo> => {
  const response = await fetch(`${BASE_URL}${PATH.garage}${generateQueryString(queryParams)}`);
  const cars: CarProfile[] = await response.json();
  const totalCars = Number(response.headers.get('X-Total-Count'));

  return {
    cars,
    totalCars,
  };
};

export const getCar = async (id: number): Promise<CarProfile> => (await fetch(`${BASE_URL}${PATH.garage}/${id}`)).json();

export const createCar = async (car: CarProfile): Promise<CarProfile> => (await fetch(`${BASE_URL}${PATH.garage}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(car),
})).json();

export const updateCar = async (id: number, newCar: CarProfile): Promise<CarProfile> => (await fetch(`${BASE_URL}${PATH.garage}/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newCar),
})).json();

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}${PATH.garage}/${id}`, {
    method: 'DELETE',
  });
};

export const startEngine = async (id: string): Promise<Velocity> => (await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: string): Promise<Velocity> => (await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: string): Promise<IsSuccess> => {
  const response = await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=drive`).catch();

  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};

export const getWinners = async (queryParams?: QueryParam[]): Promise<WinnersInfo> => {
  const response = await fetch(`${BASE_URL}${PATH.winners}${generateQueryString(queryParams)}`);
  const winners: Winners[] = await Promise.all((await response.json()).map(async (winner: WinnerProfile) => ({
    winner,
    car: await getCar(winner.id),
  })));

  return {
    winners,
    totalWinners: Number(response.headers.get('X-Total-Count')),
  };
};

export const checkWinner = async (id: number): Promise<number> => (await fetch(`${BASE_URL}${PATH.winners}/${id}`)).status;

export const getWinner = async (id: number): Promise<WinnerProfile> => (await fetch(`${BASE_URL}${PATH.winners}/${id}`)).json();

export const deleteWinner = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}${PATH.winners}/${id}`, {
    method: 'DELETE',
  });
};
export const createWinner = async (newWinner: WinnerProfile): Promise<WinnerProfile> => (await fetch(`${BASE_URL}${PATH.winners}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newWinner),
})).json();

export const updateWinner = async (winner: WinnerProfile): Promise<WinnerProfile> => (await fetch(`${BASE_URL}${PATH.winners}/${winner.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(winner),
})).json();
