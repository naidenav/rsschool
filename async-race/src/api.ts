import { CarProfile } from "./interfaces";

const baseURL = 'http://localhost:3000';

const path = {
  garage: '/garage',
  winners: '/winners',
}

interface QueryParam {
  key: string,
  value: string | number
}

export const getAllCars = async () => {
  const response = await fetch(`${baseURL}${path.garage}`);
  const cars = await response.json();
  const totalCars = Number(response.headers.get('X-Total-Count'));

  return {
    cars: cars,
    totalCars: totalCars
  }
}

export const getCar = async (id: number) => {
  const response = await fetch(`${baseURL}${path.garage}/${id}`);
  const car = await response.json();

  return car;
}

export const createCar = async (car: CarProfile) => {
  const response = await fetch(`${baseURL}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car),
  });
}

export const createOneHundredCars = async () => {
  const response = await fetch(`${baseURL}${path.garage}`);
  const cars = await response.json();
  const totalCars = Number(response.headers.get('X-Total-Count'));
}

export const updateCar = async (id: number, newCar: CarProfile) => {
  const response = await fetch(`${baseURL}${path.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCar),
  });
}

export const deleteCar = async (id: number) => {
  const response = await fetch(`${baseURL}${path.garage}/${id}`, {
    method: 'DELETE',
  });
}

const generateQueryString = (queryParams: QueryParam[]) => {
  return queryParams.length ? `?${queryParams
    .map((param) => `${param.key}=${param.value}`).join('&')}`
    : '';
}

export const getWinners = async (queryParams: QueryParam[]) => {
  const response = await fetch(`${baseURL}${path.garage}${generateQueryString(queryParams)}`);
  const winners = await response.json();
  const totalWinners = Number(response.headers.get('X-Total-Count'));

  return {
    winners: winners,
    totalWinners: totalWinners
  }
}
