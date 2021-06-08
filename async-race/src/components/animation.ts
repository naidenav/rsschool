import { AnimationState } from '../interfaces';

export function animation(car: HTMLElement, distance: number, animationTime: number) {
  let start: number | null = null;
  const state: AnimationState = { carId: car.id, requestId: 0 };

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

