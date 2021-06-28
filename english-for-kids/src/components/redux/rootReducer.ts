import { Action, combineReducers } from "redux";
import { INITIAL_STATE, PLAY_MODE, TRAIN_MODE } from "../../constants";
import { ModeAction, PageAction, State } from "../../interfaces";
import { SWITCH_MODE, SWITCH_PAGE } from "./types";

function modeReducer(state = INITIAL_STATE.mode, action: ModeAction) {
  if (action.type === SWITCH_MODE) {
    return action.mode;
  }

  return state;
}

function pageReducer(state = INITIAL_STATE.page, action: PageAction) {
  if (action.type === SWITCH_PAGE) {
    return action.page;
  }

  return state;
}

export const rootReducer = combineReducers({
  mode: modeReducer,
  page: pageReducer,
})
