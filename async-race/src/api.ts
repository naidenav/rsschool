import { BASE_URL, PATH } from './constants';
import { CarProfile, Velocity } from './interfaces';

interface QueryParam {
  key: string,
  value: string | number
}

const generateQueryString = (queryParams: QueryParam[] = []) => (queryParams.length ? `?${queryParams
  .map((param) => `${param.key}=${param.value}`).join('&')}`
  : '');

export const getAllCars = async (queryParams: QueryParam[] = []) => {
  const response = await fetch(`${BASE_URL}${PATH.garage}${generateQueryString(queryParams)}`);
  const cars: CarProfile[] = await response.json();
  const totalCars = Number(response.headers.get('X-Total-Count'));

  return {
    cars: cars,
    totalCars: totalCars,
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

export const startEngine = async (id: string): Promise<Velocity> => {
  return (await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=started`)).json();
}

export const stopEngine = async (id: string) => {
  return (await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=stopped`)).json();
}

export const drive = async (id: string) => {
  const res = await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
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
