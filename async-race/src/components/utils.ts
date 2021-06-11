import {
  checkWinner, createWinner, getWinner, updateWinner,
} from '../api';
import { AnimationState, CarProfile, WinnerProfile } from '../interfaces';

export const getAnimationId = (store: AnimationState[], carId: string): number | undefined => {
  const id = store.find((item) => item.carId === carId);
  return id?.requestId;
};

const brand = ['BMW', 'Mercedes', 'Audi', 'Volvo', 'Honda', 'Toyota', 'Nissan', 'Renault',
  'Ford', 'Ferrari', 'Lambargini', 'Jaguar', 'Lada', 'Hyundai', 'Bentley'];

const model = ['Granta', 'Mustang', 'Sierra', 'A4', 'SLA', 'Gelentvagen', 'Skyline', 'Mark II', 'Logan', 'Daster',
  'Escort', 'Kalina Sport', 'Solaris', 'Civic', 'Prius', 'Corolla', 'Camry', 'V40'];

const char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function randomIndex(arr: string[]): number {
  return Math.floor(Math.random() * arr.length);
}

export const getRandomColor = (): string => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += `${char[randomIndex(char)]}`;
  }
  return color;
};

export const getRandomCarName = (): string => `${brand[randomIndex(brand)]} ${model[randomIndex(model)]}`;

export const getRandomCars = (): CarProfile[] => {
  const arrOfCars = [];
  for (let i = 0; i < 100; i++) {
    arrOfCars.push({
      name: getRandomCarName(),
      color: getRandomColor(),
    });
  }
  return arrOfCars;
};

export const getCarName = (input: HTMLInputElement): string => {
  if (input.value) {
    return input.value;
  } return getRandomCarName();
};

export function animation(car: HTMLElement, distance: number, animationTime: number): AnimationState {
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

export const stopDriving = async (id: string, requestId: number): Promise<void> => {
  const carSection = document.getElementById(id);
  const startBtn = carSection?.querySelector('.start-engine-btn');
  const stopBtn = carSection?.querySelector('.stop-engine-btn');
  const car = carSection?.querySelector('.car-container') as HTMLElement;

  window.cancelAnimationFrame(requestId);

  car.style.transform = 'translateX(0)';
  startBtn?.removeAttribute('disabled');
  stopBtn?.setAttribute('disabled', '');
};

export const saveWinner = async (id: number, time: number): Promise<void> => {
  const status = await checkWinner(id);
  if (status === 200) {
    const winner: WinnerProfile = await getWinner(id);
    const newWinner: WinnerProfile = {
      id,
      wins: winner.wins + 1,
      time: winner.time < time ? winner.time : time,
    };
    await updateWinner(newWinner);
  } else {
    const newWinner: WinnerProfile = {
      id,
      wins: 1,
      time,
    };
    await createWinner(newWinner);
  }
};
