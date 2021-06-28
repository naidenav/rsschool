import { Action } from "redux";

export interface Card {
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
}

export interface State {
  mode: string,
  page: string,
}

export interface PageAction extends Action {
  page: string,
}

export interface ModeAction extends Action {
  mode: string,
}
