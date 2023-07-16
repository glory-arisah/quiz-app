import { defineStore } from "pinia";
import { FetchAndResetActions } from "./quizFetchAndResetActions";
import { LocalStorageActions } from "./quizLSActions";
import { NavigationActions } from "./quizNavActions";
import { TimerActions } from "./quizTimerActions";

export const useQuizActions = defineStore("repo.actions", () => {
  return {
    ...FetchAndResetActions(),
    ...LocalStorageActions(),
    ...NavigationActions(),
    ...TimerActions(),
  };
});
