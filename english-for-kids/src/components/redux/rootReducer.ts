import { Action, combineReducers } from "redux";
import { INITIAL_STATE, PLAY_MODE, TRAIN_MODE } from "../../constants";
import { CardAction, GameAction, ModeAction, PageAction, State } from "../../interfaces";
import { GAME, SET_CURRENT_CARD, SWITCH_MODE, SWITCH_PAGE } from "./types";

function modeReducer(state = INITIAL_STATE.mode, action: ModeAction) {
  if (action.type === SWITCH_MODE) {
    return action.mode;
  }

  return state;
}

function gameReducer(state = INITIAL_STATE.isGameStarted, action: GameAction) {
  if (action.type === GAME) {
    return action.isGameStarted;
  }

  return state;
}

function pageReducer(state = INITIAL_STATE.page, action: PageAction) {
  if (action.type === SWITCH_PAGE) {
    return action.page;
  }

  return state;
}

function cardReducer(state = INITIAL_STATE.currentCard, action: CardAction) {
  if (action.type === SET_CURRENT_CARD) {
    return action.currentCard;
  }

  return state;
}

export const rootReducer = combineReducers({
  mode: modeReducer,
  page: pageReducer,
  currentCard: cardReducer,
  isGameStarted: gameReducer,
})
