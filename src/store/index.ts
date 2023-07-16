import { defineStore } from "pinia";
import { useQuizActions } from "./actions/useQuizActions";
import { useQuizState } from "./state/quizState";
import { useQuizGetters } from "./getters/quizGetters";

import { extractStore } from "./extractQuizStore";

// PURE FUNCTIONS
// format timer
export function formatTimer(timeInSecs: number) {
  type StrOrNum = string | number;
  let minutes: StrOrNum = Math.floor(timeInSecs / 60);
  let seconds: StrOrNum = timeInSecs - 60 * minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutes}:${seconds}`;
}

export const useQuizStore = defineStore("quiz", () => {
  return {
    ...extractStore(useQuizState()),
    ...extractStore(useQuizActions()),
    ...extractStore(useQuizGetters()),
  };
});
