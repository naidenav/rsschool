import { getRandomCarName } from "./get-random-car-name";
import { getRandomColor } from "./get-random-color";

export const getRandomCars = () => {
  const arrOfCars = [];
  for (let i = 0; i < 100; i++) {
    arrOfCars.push({
      name: getRandomCarName(),
      color: getRandomColor(),
    });
  }
  return arrOfCars;
}
