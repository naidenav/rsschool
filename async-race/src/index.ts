import './styles.scss';
import { App } from './app';
import { getAllCars, getWinners } from './api';

window.onload = async () => {
  const garageParams = [
    {
      key: '_page',
      value: '1',
    },
    {
      key: '_limit',
      value: '7',
    },
  ];

  const winnersParams = [
    {
      key: '_page',
      value: '1',
    },
    {
      key: '_limit',
      value: '10',
    },
  ];

  const cars = await getAllCars(garageParams);
  const winners = await getWinners(winnersParams);
  const application = new App(document.body, cars.cars, cars.totalCars, winners.winners, winners.totalWinners);
};
