import { Action } from 'redux';
import {
  CardAction, GameAction, ModeAction, PageAction, CardInfo, BreakGameAction,
} from '../../interfaces';
import {
  ADD_MISTAKE, BREAK_GAME, GAME, REMOVE_ADMIN_MODE, REMOVE_CURRENT_CARD, REMOVE_MISTAKES, SET_ADMIN_MODE, SET_CURRENT_CARD, SWITCH_MODE, SET_PAGE,
} from './types';

export function switchMode(mode: string): ModeAction {
  return {
    type: SWITCH_MODE,
    mode,
  };
}

export function setPage(page: string): PageAction {
  return {
    type: SET_PAGE,
    page,
  };
}

export function setCurrentCard(card: CardInfo | null): CardAction {
  return {
    type: SET_CURRENT_CARD,
    currentCard: card,
  };
}

export function removeCurrentCard(): Action {
  return {
    type: REMOVE_CURRENT_CARD,
  };
}

export function game(state: boolean): GameAction {
  return {
    type: GAME,
    isGameStarted: state,
  };
}

export function breakGame(isBreak: boolean): BreakGameAction {
  return {
    type: BREAK_GAME,
    isBreak,
  };
}

export function addMistake(): Action {
  return {
    type: ADD_MISTAKE,
  };
}

export function removeMistakes(): Action {
  return {
    type: REMOVE_MISTAKES,
  };
}

export function setAdminMode(): Action {
  return {
    type: SET_ADMIN_MODE,
  };
}

export function removeAdminMode(): Action {
  return {
    type: REMOVE_ADMIN_MODE,
  };
}
