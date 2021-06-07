import { BASE_URL, PATH } from './constants';
import { CarProfile } from './interfaces';

interface QueryParam {
  key: string,
  value: string | number
}

const generateQueryString = (queryParams: QueryParam[] = []) => (queryParams.length ? `?${queryParams
  .map((param) => `${param.key}=${param.value}`).join('&')}`
  : '');

export const getAllCars = async (queryParams: QueryParam[] = []) => {
  const response = await fetch(`${BASE_URL}${PATH.garage}${generateQueryString(queryParams)}`);
  const cars = await response.json();
  const totalCars = Number(response.headers.get('X-Total-Count'));

  return {
    cars,
    totalCars,
  };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${BASE_URL}${PATH.garage}/${id}`);
  const car = await response.json();

  return car;
};

export const createCar = async (car: CarProfile) => {
  const response = await fetch(`${BASE_URL}${PATH.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });

  const newCar = await response.json();

  return newCar;
};

export const updateCar = async (id: number, newCar: CarProfile) => {
  const response = await fetch(`${BASE_URL}${PATH.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCar),
  });

  const updatedCar = await response.json();

  return updatedCar;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${BASE_URL}${PATH.garage}/${id}`, {
    method: 'DELETE',
  });
};

export const startStopCarsEngine = async (queryParams: QueryParam[]) => {
  const request = await fetch(`${BASE_URL}${PATH.engine}${generateQueryString(queryParams)}`);
  const response = await request.json();

  return response;
}

export const getWinners = async (queryParams?: QueryParam[]) => {
  const response = await fetch(`${BASE_URL}${PATH.winners}${generateQueryString(queryParams)}`);
  const winners = await response.json();
  const totalWinners = Number(response.headers.get('X-Total-Count'));

  return {
    winners,
    totalWinners,
  };
};
