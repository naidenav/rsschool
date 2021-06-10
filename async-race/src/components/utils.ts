import { Garage } from "../pages/garage/garage";
import { Winners } from "../pages/winners/winners";
import { AnimationState } from "../interfaces";

export const updatePageNumberTitle = (page: Winners | Garage) => {
  page.pageNumperTitle.element.innerText = `Page #${page.currentPage}`;
}

export const getAnimationId = (store: AnimationState[], carId: string) => {
  const item = store.find(item => item.carId === carId);
  return item?.requestId;
}

const brand = ['BMW', 'Mercedes', 'Audi', 'Volvo', 'Honda', 'Toyota', 'Nissan', 'Renault',
  'Ford', 'Ferrari', 'Lambargini', 'Jaguar', 'Lada', 'Hyundai', 'Bentley'];

const model = ['Granta', 'Mustang', 'Sierra', 'A4', 'SLA', 'Gelentvagen', 'Skyline', 'Mark II', 'Logan', 'Daster',
  'Escort', 'Kalina Sport', 'Solaris', 'Civic', 'Prius', 'Corolla', 'Camry', 'V40'];

function randomIndex(arr: string[]) {
  return Math.floor(Math.random() * arr.length);
}

export const getRandomCarName = (): string => `${brand[randomIndex(brand)]} ${model[randomIndex(model)]}`;


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

const char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

export const getRandomColor = (): string => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += `${char[randomIndex(char)]}`;
  }
  return color;
};

export function animation(car: HTMLElement, distance: number, animationTime: number) {
  let start: number | null = null;
  const state: AnimationState = { carId: '', requestId: 0 };

  function step(timeStamp: number) {
    if (!start) start = timeStamp;
    const time = timeStamp - start;
    const passed = time * (distance / animationTime);

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.requestId = requestAnimationFrame(step);
    }
  }

  state.requestId = requestAnimationFrame(step);
  return state;
}
