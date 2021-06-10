import './styles.scss';
import { App } from './app';
import { getAllCars, getWinners } from './api';
import { GARAGE_LIMIT, WINNERS_LIMIT } from './constants';

window.onload = async () => {
  const garageParams = [
    {
      key: '_page',
      value: '1',
    },
    {
      key: '_limit',
      value: GARAGE_LIMIT,
    },
  ];

  const winnersParams = [
    {
      key: '_page',
      value: '1',
    },
    {
      key: '_limit',
      value: WINNERS_LIMIT,
    },
  ];

  const cars = await getAllCars(garageParams);
  const winners = await getWinners(winnersParams);
  const application = new App(document.body, cars.cars, cars.totalCars, winners.fullWinnersInfo, winners.totalWinners);
};
