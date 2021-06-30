import { Action } from "redux";

export interface CardInfo {
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
}

export interface State {
  mode: string,
  page: string,
  currentCard: CardInfo | null,
  isGameStarted: boolean,
  isBreak: boolean,
  mistakes: number,
}

export interface PageAction extends Action {
  page: string,
}

export interface GameAction extends Action {
  isGameStarted: boolean,
}

export interface ModeAction extends Action {
  mode: string,
}

export interface CardAction extends Action {
  currentCard: CardInfo | null,
}

export interface BreakGameAction extends Action {
  isBreak: boolean,
}
