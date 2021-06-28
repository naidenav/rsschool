import { ModeAction, PageAction } from "../../interfaces";
import { SWITCH_MODE, SWITCH_PAGE } from "./types";

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

