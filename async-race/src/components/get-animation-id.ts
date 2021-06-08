import { AnimationState } from "../interfaces"

export const getAnimationId = (store: AnimationState[], carId: string) => {
  const item = store.find(item => item.carId === carId);
  return item?.requestId;
}
