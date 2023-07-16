import { useStorage } from "@vueuse/core";
import { useQuizState } from "../state/quizState";

interface LSProps {
  fetchQuestionsFromLS(): void;
  fetchIndexFromLS(): void;
  fetchScoreFromLS(): void;
  fetchSelectionsFromLS(): void;
  fetchSelectionModeFromLS(): void;
  fetchCorrectAnswersFromLS(): void;
  fetchTimerFromLS(): void;
}

export function LocalStorageActions(): LSProps {
  const state = useQuizState();

  return {
    fetchQuestionsFromLS() {
      if (!state.questions.length)
        state.questions = useStorage("questions", [], localStorage).value;
    },
    fetchIndexFromLS() {
      if (state.index === null)
        state.index = useStorage("index", 0, localStorage).value;
    },
    fetchScoreFromLS() {
      if (state.correctAnswersCount === null) {
        state.correctAnswersCount = useStorage(
          "correctAnswersCount",
          null,
          localStorage
        ).value;
      }
    },
    fetchSelectionsFromLS() {
      if (Object.keys(state.selections).length === 0) {
        state.selections = useStorage("selections", {}, localStorage).value;
      }
    },
    fetchSelectionModeFromLS() {
      state.selectionMode = useStorage("selectionMode", 0, localStorage).value;
    },
    fetchCorrectAnswersFromLS() {
      if (!Object.keys(state.correctAnswers).length) {
        state.correctAnswers = useStorage(
          "correctAnswers",
          {},
          localStorage
        ).value;
      }
    },
    fetchTimerFromLS() {
      if (!state.timeUsed) {
        state.timeUsed = useStorage("timeUsed", 0, localStorage).value;
      }
    },
  };
}
