import { Action, combineReducers } from 'redux';
import { INITIAL_STATE } from '../../constants';
import {
  BreakGameAction, CardAction, GameAction, ModeAction, PageAction,
} from '../../interfaces';
import {
  ADD_MISTAKE, BREAK_GAME, GAME, REMOVE_ADMIN_MODE, REMOVE_MISTAKES, SET_ADMIN_MODE, SET_CURRENT_CARD, SWITCH_MODE, SET_PAGE,
} from './types';

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

function breakGameReducer(state = INITIAL_STATE.isBreak, action: BreakGameAction) {
  if (action.type === BREAK_GAME) {
    return action.isBreak;
  }

  return state;
}

function pageReducer(state = INITIAL_STATE.page, action: PageAction) {
  if (action.type === SET_PAGE) {
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

function mistakesReducer(state = INITIAL_STATE.mistakes, action: Action) {
  if (action.type === ADD_MISTAKE) {
    return state + 1;
  }
  if (action.type === REMOVE_MISTAKES) {
    return 0;
  }

  return state;
}

function adminReducer(state = INITIAL_STATE.isAdmin, action: Action) {
  if (action.type === SET_ADMIN_MODE) {
    return true;
  } else if (action.type === REMOVE_ADMIN_MODE) {
    return false;
  }

  return state;
}

export const rootReducer = combineReducers({
  mode: modeReducer,
  page: pageReducer,
  currentCard: cardReducer,
  isGameStarted: gameReducer,
  isBreak: breakGameReducer,
  mistakes: mistakesReducer,
  isAdmin: adminReducer,
});
