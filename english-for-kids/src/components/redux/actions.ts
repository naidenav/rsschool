import { Action } from "redux";
import { CardAction, GameAction, ModeAction, PageAction, CardInfo } from "../../interfaces";
import { GAME, REMOVE_CURRENT_CARD, SET_CURRENT_CARD, SWITCH_MODE, SWITCH_PAGE } from "./types";

export function switchMode(mode: string): ModeAction {
  return {
    type: SWITCH_MODE,
    mode
  }
}

export function switchPage(page: string): PageAction {
  return {
    type: SWITCH_PAGE,
    page
  }
}

export function setCurrentCard(card: CardInfo | null): CardAction {
  return {
    type: SET_CURRENT_CARD,
    currentCard: card
  }
}

export function removeCurrentCard(): Action {
  return {
    type: REMOVE_CURRENT_CARD,
  }
}

export function game(state: boolean): GameAction {
  return {
    type: GAME,
    isGameStarted: state,
  }
}
