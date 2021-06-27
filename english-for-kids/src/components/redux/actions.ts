import { Action } from "redux";
import { SWITCH_MODE } from "./types";

export function switchMode(): Action {
  return {
    type: SWITCH_MODE
  }
}

