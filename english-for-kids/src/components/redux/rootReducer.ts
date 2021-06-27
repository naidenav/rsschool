import { Action } from "redux";
import { PLAY_MODE, TRAIN_MODE } from "../../constants";
import { SWITCH_MODE } from "./types";

export function rootReducer(state: string = TRAIN_MODE, action: Action) {
  if (action.type === SWITCH_MODE) {
    if (state === TRAIN_MODE) return PLAY_MODE;
    if (state === PLAY_MODE) return TRAIN_MODE;
  }

  return state
}
