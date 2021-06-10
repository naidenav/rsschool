import { BASE_URL, PATH } from './constants';
import { CarProfile, Velocity, WinnerProfile } from './interfaces';

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
    cars,
    totalCars,
  };
};

export const getCar = async (id: number) => (await fetch(`${BASE_URL}${PATH.garage}/${id}`)).json();

export const createCar = async (car: CarProfile) => {
  return (await fetch(`${BASE_URL}${PATH.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })).json();
};

export const updateCar = async (id: number, newCar: CarProfile) => {
  return (await fetch(`${BASE_URL}${PATH.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCar),
  })).json();
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
  const response = await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=drive`).catch();

  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
}

export const getWinners = async (queryParams?: QueryParam[]) => {
  const response = await fetch(`${BASE_URL}${PATH.winners}${generateQueryString(queryParams)}`);
  const winners: WinnerProfile[] = await Promise.all((await response.json()).map(async (winner: WinnerProfile) => {
    return {
      winner,
      winnersCar: await getCar(winner.id)
    }
  }));

  return {
    winners,
    totalWinners: Number(response.headers.get('X-Total-Count')),
  };
};

export const checkWinner = async (id: number) => (await fetch(`${BASE_URL}${PATH.winners}/${id}`)).status;

export const getWinner = async (id: number) => (await fetch(`${BASE_URL}${PATH.winners}/${id}`)).json();

export const createWinner = async (newWinner: WinnerProfile) => {
  return (await fetch(`${BASE_URL}${PATH.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWinner),
  })).json();
};

export const updateWinner = async (winner: WinnerProfile) => {
  return (await fetch(`${BASE_URL}${PATH.winners}/${winner.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  })).json();
};

