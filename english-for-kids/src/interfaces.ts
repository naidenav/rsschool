import { Action } from 'redux';

export interface User {
  username: string,
  password: string,
}

export interface Token {
  accessToken: string,
}
export interface CardInfo {
  category: string,
  categoryId: number,
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
  trainModeTurns: number,
  trueChoices: number,
  falseChoices: number,
  trueChoicesPer: number,
}

export interface СloudinaryResponse{
  asset_id: string,
  public_id: string,
  version: number,
  version_id: string,
  signature: string,
  width: number,
  height: number,
  format: string,
  resource_type: string,
  created_at: string,
  tags: string[],
  bytes: number,
  type: string,
  etag: string,
  placeholder: boolean,
  url: string,
  secure_url: string,
  access_mode: string,
  original_filename: string,
}
export interface CategoryInfo {
  _id?: string,
  category: string,
  id: number,
  cards: CardInfo[],
}
export interface State {
  mode: string,
  page: string,
  currentCard: CardInfo | null,
  isGameStarted: boolean,
  isBreak: boolean,
  mistakes: number,
  isAdmin: boolean,
}

export interface QueryParam {
  key: string,
  value: string | number
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
